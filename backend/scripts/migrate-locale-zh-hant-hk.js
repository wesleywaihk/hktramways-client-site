'use strict';

const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../.tmp/data.db'));

const FROM = 'zh-Hant-HK';
const TO = 'zh-HK';

const run = db.transaction(() => {
  const tables = [
    { table: 'i18n_locale', column: 'code' },
    { table: 'landings', column: 'locale' },
    { table: 'globals', column: 'locale' },
    { table: 'strapi_history_versions', column: 'locale' },
  ];

  for (const { table, column } of tables) {
    const result = db
      .prepare(`UPDATE ${table} SET ${column} = ? WHERE ${column} = ?`)
      .run(TO, FROM);
    if (result.changes > 0) {
      console.log(`${table}.${column}: updated ${result.changes} row(s)`);
    }
  }

  console.log('Done.');
});

run();
db.close();
