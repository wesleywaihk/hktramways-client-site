#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

FILE="sync-from-uat-$(date +%s)"

echo "==> Exporting UAT data (Postgres + S3)..."
npx dotenv -e .env.uat -- npx strapi export --no-encrypt --only content,files -f "$FILE"

echo "==> Importing into local SQLite..."
npx strapi import -f "${FILE}.tar.gz" --only content,files --force

echo "==> Cleaning up..."
rm -f "${FILE}.tar.gz"

echo "Done. UAT data has been synced to local SQLite."
