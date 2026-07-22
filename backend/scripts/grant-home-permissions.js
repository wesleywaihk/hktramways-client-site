'use strict';

async function grantPublicPermissions(uid, actions) {
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  for (const action of actions) {
    const actionId = `api::${uid}.${uid}.${action}`;
    const existing = await strapi.query('plugin::users-permissions.permission').findOne({
      where: { action: actionId, role: publicRole.id },
    });

    if (existing) {
      console.log(`Permission already exists: ${actionId}`);
      continue;
    }

    await strapi.query('plugin::users-permissions.permission').create({
      data: { action: actionId, role: publicRole.id },
    });
    console.log(`Granted: ${actionId}`);
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await grantPublicPermissions('home', ['find', 'findOne']);

  await app.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
