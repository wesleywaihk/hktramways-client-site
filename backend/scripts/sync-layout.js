#!/usr/bin/env node
"use strict";

const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const { Client } = require("pg");
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const [srcEnvFile, destEnvFile] = process.argv.slice(2);
if (!srcEnvFile || !destEnvFile) {
  console.error("Usage: node scripts/sync-layout.js <src.env file> <dest.env file>");
  process.exit(1);
}

function loadEnv(file) {
  return dotenv.parse(fs.readFileSync(path.join(__dirname, "..", file)));
}

function pgClientFor(env) {
  return new Client({
    host: env.DATABASE_HOST,
    port: Number(env.DATABASE_PORT),
    database: env.DATABASE_NAME,
    user: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    ssl: env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  });
}

function s3ClientFor(env) {
  return new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_ACCESS_SECRET,
    },
  });
}

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

async function copyLogoObject({ srcS3, destS3, srcBucket, destBucket, key, contentType }) {
  const obj = await srcS3.send(new GetObjectCommand({ Bucket: srcBucket, Key: key }));
  const body = await streamToBuffer(obj.Body);
  await destS3.send(
    new PutObjectCommand({
      Bucket: destBucket,
      Key: key,
      Body: body,
      ContentType: contentType || obj.ContentType,
    })
  );
}

async function upsertCoreStoreRow(destPg, row) {
  const existing = await destPg.query(
    "SELECT id FROM strapi_core_store_settings WHERE key = $1 AND environment IS NOT DISTINCT FROM $2 AND tag IS NOT DISTINCT FROM $3",
    [row.key, row.environment, row.tag]
  );
  if (existing.rows.length > 0) {
    await destPg.query("UPDATE strapi_core_store_settings SET value = $1, type = $2 WHERE id = $3", [
      row.value,
      row.type,
      existing.rows[0].id,
    ]);
  } else {
    await destPg.query(
      "INSERT INTO strapi_core_store_settings (key, value, type, environment, tag) VALUES ($1, $2, $3, $4, $5)",
      [row.key, row.value, row.type, row.environment, row.tag]
    );
  }
}

async function syncProjectSettings({ srcPg, destPg, srcEnv, destEnv }) {
  const { rows } = await srcPg.query(
    "SELECT key, value, type, environment, tag FROM strapi_core_store_settings WHERE key = $1",
    ["core_admin_project-settings"]
  );
  if (rows.length === 0) {
    console.log("No project-settings (menu/auth logo) row found on source, skipping.");
    return;
  }

  const srcS3 = s3ClientFor(srcEnv);
  const destS3 = s3ClientFor(destEnv);
  const srcBucket = srcEnv.AWS_BUCKET;
  const destBucket = destEnv.AWS_BUCKET;

  const row = rows[0];
  const value = JSON.parse(row.value);

  for (const field of ["menuLogo", "authLogo"]) {
    const file = value[field];
    if (!file || !file.url) continue;
    const key = new URL(file.url).pathname.replace(/^\//, "");
    console.log(`Copying ${field} (${key}) from ${srcBucket} to ${destBucket}...`);
    await copyLogoObject({ srcS3, destS3, srcBucket, destBucket, key });
    file.url = file.url.replace(`${srcBucket}.s3.`, `${destBucket}.s3.`);
  }

  await upsertCoreStoreRow(destPg, { ...row, value: JSON.stringify(value) });
  console.log("Synced menu logo + auth logo (project-settings).");
}

async function syncContentManagerLayouts({ srcPg, destPg }) {
  const { rows } = await srcPg.query(
    `SELECT key, value, type, environment, tag FROM strapi_core_store_settings
     WHERE key LIKE 'plugin_content_manager_configuration_content_types::%'
        OR key LIKE 'plugin_content_manager_configuration_components::%'`
  );

  for (const row of rows) {
    await upsertCoreStoreRow(destPg, row);
  }

  console.log(`Synced ${rows.length} Content Manager layout config row(s).`);
}

const SIMPLE_SETTING_KEYS = [
  "core_admin_auth",
  "plugin_upload_settings",
  "plugin_upload_view_configuration",
  "plugin_users-permissions_advanced",
  "plugin_users-permissions_email",
  "plugin_users-permissions_grant",
  "plugin_documentation_config",
];

async function syncSimpleSettings({ srcPg, destPg }) {
  let synced = 0;
  for (const key of SIMPLE_SETTING_KEYS) {
    const { rows } = await srcPg.query(
      "SELECT key, value, type, environment, tag FROM strapi_core_store_settings WHERE key = $1",
      [key]
    );
    if (rows.length === 0) {
      console.log(`No "${key}" settings row found on source, skipping.`);
      continue;
    }
    await upsertCoreStoreRow(destPg, rows[0]);
    synced += 1;
  }
  console.log(`Synced ${synced} settings row(s) (admin auth, media library, users-permissions, documentation).`);
}

async function syncI18nLocales({ srcPg, destPg }) {
  const { rows: srcLocales } = await srcPg.query("SELECT * FROM i18n_locale");
  const { rows: destLocales } = await destPg.query("SELECT id, code FROM i18n_locale");
  const srcCodes = new Set(srcLocales.map((r) => r.code));

  for (const l of destLocales) {
    if (!srcCodes.has(l.code)) {
      console.log(`Removing destination-only locale "${l.code}".`);
      await destPg.query("DELETE FROM i18n_locale WHERE id = $1", [l.id]);
    }
  }

  for (const row of srcLocales) {
    const existing = await destPg.query("SELECT id FROM i18n_locale WHERE code = $1", [row.code]);
    if (existing.rows.length > 0) {
      await destPg.query(
        "UPDATE i18n_locale SET name = $1, updated_at = $2, published_at = $3 WHERE id = $4",
        [row.name, row.updated_at, row.published_at, existing.rows[0].id]
      );
    } else {
      await destPg.query(
        `INSERT INTO i18n_locale (document_id, name, code, created_at, updated_at, published_at, locale)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [row.document_id, row.name, row.code, row.created_at, row.updated_at, row.published_at, row.locale]
      );
    }
  }

  console.log(`Synced ${srcLocales.length} locale(s).`);
}

// -- Admin panel: roles, users, permissions -------------------------------
//
// admin_users can only be upserted, never deleted: content tables across the
// schema (globals, homes, tram_routes, files, ...) reference admin_users via
// created_by_id/updated_by_id with ON DELETE RESTRICT, so removing a user
// that authored any content would fail. Roles and permissions have no such
// restriction (their FKs cascade), so those are fully mirrored.

async function syncAdminRoles({ srcPg, destPg }) {
  const { rows: srcRoles } = await srcPg.query("SELECT * FROM admin_roles");
  const { rows: destRoles } = await destPg.query("SELECT id, code FROM admin_roles");
  const srcCodes = new Set(srcRoles.map((r) => r.code));

  for (const r of destRoles) {
    if (!srcCodes.has(r.code)) {
      console.log(`Removing destination-only admin role "${r.code}".`);
      await destPg.query("DELETE FROM admin_roles WHERE id = $1", [r.id]);
    }
  }

  const codeToDestId = new Map();
  for (const row of srcRoles) {
    const existing = await destPg.query("SELECT id FROM admin_roles WHERE code = $1", [row.code]);
    if (existing.rows.length > 0) {
      await destPg.query(
        "UPDATE admin_roles SET name = $1, description = $2, updated_at = $3, published_at = $4 WHERE id = $5",
        [row.name, row.description, row.updated_at, row.published_at, existing.rows[0].id]
      );
      codeToDestId.set(row.code, existing.rows[0].id);
    } else {
      const ins = await destPg.query(
        `INSERT INTO admin_roles (document_id, name, code, description, created_at, updated_at, published_at, locale)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [row.document_id, row.name, row.code, row.description, row.created_at, row.updated_at, row.published_at, row.locale]
      );
      codeToDestId.set(row.code, ins.rows[0].id);
    }
  }

  console.log(`Synced ${srcRoles.length} admin role(s).`);
  return codeToDestId;
}

async function syncAdminUsers({ srcPg, destPg }) {
  const { rows: srcUsers } = await srcPg.query("SELECT * FROM admin_users");
  const { rows: destUsers } = await destPg.query("SELECT id, email FROM admin_users");
  const destByEmail = new Map(destUsers.map((r) => [r.email, r.id]));
  const srcByIdEmail = new Map(srcUsers.map((r) => [r.id, r.email]));

  const emailToDestId = new Map();
  for (const row of srcUsers) {
    const existingId = destByEmail.get(row.email);
    if (existingId) {
      await destPg.query(
        `UPDATE admin_users SET firstname = $1, lastname = $2, username = $3, password = $4, is_active = $5,
         blocked = $6, prefered_language = $7, updated_at = $8, published_at = $9, locale = $10 WHERE id = $11`,
        [
          row.firstname,
          row.lastname,
          row.username,
          row.password,
          row.is_active,
          row.blocked,
          row.prefered_language,
          row.updated_at,
          row.published_at,
          row.locale,
          existingId,
        ]
      );
      emailToDestId.set(row.email, existingId);
    } else {
      const ins = await destPg.query(
        `INSERT INTO admin_users (document_id, firstname, lastname, username, email, password, is_active, blocked,
          prefered_language, created_at, updated_at, published_at, locale)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
        [
          row.document_id,
          row.firstname,
          row.lastname,
          row.username,
          row.email,
          row.password,
          row.is_active,
          row.blocked,
          row.prefered_language,
          row.created_at,
          row.updated_at,
          row.published_at,
          row.locale,
        ]
      );
      emailToDestId.set(row.email, ins.rows[0].id);
    }
  }

  // second pass: created_by/updated_by are self-referential, resolve once all ids exist
  for (const row of srcUsers) {
    const destId = emailToDestId.get(row.email);
    const createdBy = row.created_by_id != null ? emailToDestId.get(srcByIdEmail.get(row.created_by_id)) ?? null : null;
    const updatedBy = row.updated_by_id != null ? emailToDestId.get(srcByIdEmail.get(row.updated_by_id)) ?? null : null;
    await destPg.query("UPDATE admin_users SET created_by_id = $1, updated_by_id = $2 WHERE id = $3", [
      createdBy,
      updatedBy,
      destId,
    ]);
  }

  const srcEmails = new Set(srcUsers.map((r) => r.email));
  const destOnly = destUsers.filter((r) => !srcEmails.has(r.email));
  if (destOnly.length > 0) {
    console.log(
      `NOTE: ${destOnly.length} admin user(s) exist only on destination and were kept as-is (deleting them ` +
        `would violate FK constraints from content authored by them): ${destOnly.map((u) => u.email).join(", ")}`
    );
  }

  console.log(`Synced ${srcUsers.length} admin user(s).`);
  return emailToDestId;
}

async function syncAdminUserRoleLinks({ srcPg, destPg, codeToDestRoleId, emailToDestUserId }) {
  const { rows: srcLinks } = await srcPg.query(
    `SELECT u.email AS user_email, r.code AS role_code
     FROM admin_users_roles_lnk lnk
     JOIN admin_users u ON u.id = lnk.user_id
     JOIN admin_roles r ON r.id = lnk.role_id`
  );

  const desired = new Set();
  for (const l of srcLinks) {
    const uid = emailToDestUserId.get(l.user_email);
    const rid = codeToDestRoleId.get(l.role_code);
    if (uid && rid) desired.add(`${uid}:${rid}`);
  }

  // only touch links for users that exist in src; leave destination-only users' roles alone
  const relevantUserIds = new Set(emailToDestUserId.values());
  const { rows: destLinks } = await destPg.query("SELECT id, user_id, role_id FROM admin_users_roles_lnk");
  for (const l of destLinks) {
    if (!relevantUserIds.has(l.user_id)) continue;
    const key = `${l.user_id}:${l.role_id}`;
    if (!desired.has(key)) {
      await destPg.query("DELETE FROM admin_users_roles_lnk WHERE id = $1", [l.id]);
    } else {
      desired.delete(key);
    }
  }
  for (const key of desired) {
    const [uid, rid] = key.split(":").map(Number);
    await destPg.query("INSERT INTO admin_users_roles_lnk (user_id, role_id) VALUES ($1, $2)", [uid, rid]);
  }

  console.log("Synced admin user-role assignments.");
}

async function syncAdminPermissions({ srcPg, destPg, codeToDestRoleId, emailToDestUserId }) {
  const { rows: srcPerms } = await srcPg.query(
    `SELECT p.*, r.code AS role_code
     FROM admin_permissions p
     JOIN admin_permissions_role_lnk lnk ON lnk.permission_id = p.id
     JOIN admin_roles r ON r.id = lnk.role_id`
  );
  const { rows: srcAdminUsers } = await srcPg.query("SELECT id, email FROM admin_users");
  const srcByIdEmail = new Map(srcAdminUsers.map((r) => [r.id, r.email]));

  const byRole = new Map();
  for (const p of srcPerms) {
    if (!byRole.has(p.role_code)) byRole.set(p.role_code, []);
    byRole.get(p.role_code).push(p);
  }

  for (const [roleCode, perms] of byRole) {
    const destRoleId = codeToDestRoleId.get(roleCode);
    if (!destRoleId) continue;

    const { rows: existingLinked } = await destPg.query(
      `SELECT p.id FROM admin_permissions p
       JOIN admin_permissions_role_lnk lnk ON lnk.permission_id = p.id
       WHERE lnk.role_id = $1`,
      [destRoleId]
    );
    for (const row of existingLinked) {
      await destPg.query("DELETE FROM admin_permissions WHERE id = $1", [row.id]);
    }

    for (const p of perms) {
      const createdBy = p.created_by_id != null ? emailToDestUserId.get(srcByIdEmail.get(p.created_by_id)) ?? null : null;
      const updatedBy = p.updated_by_id != null ? emailToDestUserId.get(srcByIdEmail.get(p.updated_by_id)) ?? null : null;
      const ins = await destPg.query(
        `INSERT INTO admin_permissions (document_id, action, action_parameters, subject, properties, conditions,
          created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`,
        [
          p.document_id,
          p.action,
          JSON.stringify(p.action_parameters ?? {}),
          p.subject,
          JSON.stringify(p.properties ?? {}),
          JSON.stringify(p.conditions ?? []),
          p.created_at,
          p.updated_at,
          p.published_at,
          createdBy,
          updatedBy,
          p.locale,
        ]
      );
      await destPg.query("INSERT INTO admin_permissions_role_lnk (permission_id, role_id) VALUES ($1, $2)", [
        ins.rows[0].id,
        destRoleId,
      ]);
    }
  }

  console.log(`Synced admin permissions for ${byRole.size} role(s).`);
}

// -- Public "Users & Permissions" plugin -----------------------------------
// None of up_users/up_roles/up_permissions are referenced elsewhere with
// ON DELETE RESTRICT, so these can be fully mirrored including deletes.

async function syncUpRoles({ srcPg, destPg }) {
  const { rows: srcRoles } = await srcPg.query("SELECT * FROM up_roles");
  const { rows: destRoles } = await destPg.query("SELECT id, type FROM up_roles");
  const srcTypes = new Set(srcRoles.map((r) => r.type));

  for (const r of destRoles) {
    if (!srcTypes.has(r.type)) {
      console.log(`Removing destination-only public role "${r.type}".`);
      await destPg.query("DELETE FROM up_roles WHERE id = $1", [r.id]);
    }
  }

  const typeToDestId = new Map();
  for (const row of srcRoles) {
    const existing = await destPg.query("SELECT id FROM up_roles WHERE type = $1", [row.type]);
    if (existing.rows.length > 0) {
      await destPg.query(
        "UPDATE up_roles SET name = $1, description = $2, updated_at = $3, published_at = $4 WHERE id = $5",
        [row.name, row.description, row.updated_at, row.published_at, existing.rows[0].id]
      );
      typeToDestId.set(row.type, existing.rows[0].id);
    } else {
      const ins = await destPg.query(
        `INSERT INTO up_roles (document_id, name, description, type, created_at, updated_at, published_at, locale)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [row.document_id, row.name, row.description, row.type, row.created_at, row.updated_at, row.published_at, row.locale]
      );
      typeToDestId.set(row.type, ins.rows[0].id);
    }
  }

  console.log(`Synced ${srcRoles.length} public role(s).`);
  return typeToDestId;
}

async function syncUpUsers({ srcPg, destPg }) {
  const { rows: srcUsers } = await srcPg.query("SELECT * FROM up_users");
  const { rows: destUsers } = await destPg.query("SELECT id, email FROM up_users");
  const srcEmails = new Set(srcUsers.map((r) => r.email));

  for (const u of destUsers) {
    if (!srcEmails.has(u.email)) {
      await destPg.query("DELETE FROM up_users WHERE id = $1", [u.id]);
    }
  }

  const emailToDestId = new Map();
  for (const row of srcUsers) {
    const existing = await destPg.query("SELECT id FROM up_users WHERE email = $1", [row.email]);
    if (existing.rows.length > 0) {
      await destPg.query(
        `UPDATE up_users SET username = $1, provider = $2, password = $3, confirmed = $4, blocked = $5,
         updated_at = $6, published_at = $7, locale = $8 WHERE id = $9`,
        [row.username, row.provider, row.password, row.confirmed, row.blocked, row.updated_at, row.published_at, row.locale, existing.rows[0].id]
      );
      emailToDestId.set(row.email, existing.rows[0].id);
    } else {
      const ins = await destPg.query(
        `INSERT INTO up_users (document_id, username, email, provider, password, confirmed, blocked,
          created_at, updated_at, published_at, locale)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
        [
          row.document_id,
          row.username,
          row.email,
          row.provider,
          row.password,
          row.confirmed,
          row.blocked,
          row.created_at,
          row.updated_at,
          row.published_at,
          row.locale,
        ]
      );
      emailToDestId.set(row.email, ins.rows[0].id);
    }
  }

  console.log(`Synced ${srcUsers.length} public user(s).`);
  return emailToDestId;
}

async function syncUpUserRoleLinks({ srcPg, destPg, typeToDestRoleId, emailToDestUserId }) {
  const { rows: srcLinks } = await srcPg.query(
    `SELECT u.email AS user_email, r.type AS role_type
     FROM up_users_role_lnk lnk
     JOIN up_users u ON u.id = lnk.user_id
     JOIN up_roles r ON r.id = lnk.role_id`
  );

  const desired = new Set();
  for (const l of srcLinks) {
    const uid = emailToDestUserId.get(l.user_email);
    const rid = typeToDestRoleId.get(l.role_type);
    if (uid && rid) desired.add(`${uid}:${rid}`);
  }

  const { rows: destLinks } = await destPg.query("SELECT id, user_id, role_id FROM up_users_role_lnk");
  for (const l of destLinks) {
    const key = `${l.user_id}:${l.role_id}`;
    if (!desired.has(key)) {
      await destPg.query("DELETE FROM up_users_role_lnk WHERE id = $1", [l.id]);
    } else {
      desired.delete(key);
    }
  }
  for (const key of desired) {
    const [uid, rid] = key.split(":").map(Number);
    await destPg.query("INSERT INTO up_users_role_lnk (user_id, role_id) VALUES ($1, $2)", [uid, rid]);
  }

  console.log("Synced public user-role assignments.");
}

async function syncUpPermissions({ srcPg, destPg, typeToDestRoleId }) {
  const { rows: srcPerms } = await srcPg.query(
    `SELECT p.*, r.type AS role_type
     FROM up_permissions p
     JOIN up_permissions_role_lnk lnk ON lnk.permission_id = p.id
     JOIN up_roles r ON r.id = lnk.role_id`
  );

  const byRole = new Map();
  for (const p of srcPerms) {
    if (!byRole.has(p.role_type)) byRole.set(p.role_type, []);
    byRole.get(p.role_type).push(p);
  }

  for (const [roleType, perms] of byRole) {
    const destRoleId = typeToDestRoleId.get(roleType);
    if (!destRoleId) continue;

    const { rows: existingLinked } = await destPg.query(
      `SELECT p.id FROM up_permissions p
       JOIN up_permissions_role_lnk lnk ON lnk.permission_id = p.id
       WHERE lnk.role_id = $1`,
      [destRoleId]
    );
    for (const row of existingLinked) {
      await destPg.query("DELETE FROM up_permissions WHERE id = $1", [row.id]);
    }

    for (const p of perms) {
      const ins = await destPg.query(
        `INSERT INTO up_permissions (document_id, action, created_at, updated_at, published_at, locale)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [p.document_id, p.action, p.created_at, p.updated_at, p.published_at, p.locale]
      );
      await destPg.query("INSERT INTO up_permissions_role_lnk (permission_id, role_id) VALUES ($1, $2)", [
        ins.rows[0].id,
        destRoleId,
      ]);
    }
  }

  console.log(`Synced public permissions for ${byRole.size} role(s).`);
}

async function main() {
  const srcEnv = loadEnv(srcEnvFile);
  const destEnv = loadEnv(destEnvFile);

  const srcPg = pgClientFor(srcEnv);
  const destPg = pgClientFor(destEnv);

  await srcPg.connect();
  await destPg.connect();

  try {
    await syncContentManagerLayouts({ srcPg, destPg });
    await syncProjectSettings({ srcPg, destPg, srcEnv, destEnv });

    await destPg.query("BEGIN");
    try {
      const codeToDestRoleId = await syncAdminRoles({ srcPg, destPg });
      const emailToDestUserId = await syncAdminUsers({ srcPg, destPg });
      await syncAdminUserRoleLinks({ srcPg, destPg, codeToDestRoleId, emailToDestUserId });
      await syncAdminPermissions({ srcPg, destPg, codeToDestRoleId, emailToDestUserId });

      const typeToDestRoleId = await syncUpRoles({ srcPg, destPg });
      const upEmailToDestUserId = await syncUpUsers({ srcPg, destPg });
      await syncUpUserRoleLinks({ srcPg, destPg, typeToDestRoleId, emailToDestUserId: upEmailToDestUserId });
      await syncUpPermissions({ srcPg, destPg, typeToDestRoleId });

      await syncSimpleSettings({ srcPg, destPg });
      await syncI18nLocales({ srcPg, destPg });

      await destPg.query("COMMIT");
    } catch (err) {
      await destPg.query("ROLLBACK");
      throw err;
    }
  } finally {
    await srcPg.end();
    await destPg.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
