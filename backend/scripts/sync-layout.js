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
  } finally {
    await srcPg.end();
    await destPg.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
