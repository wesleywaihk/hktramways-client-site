#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

FILE="sync-to-uat-$(date +%s)"

echo "==> Exporting local SQLite data..."
npx strapi export --no-encrypt --only content,files -f "$FILE"

echo "==> Importing into UAT (Postgres + S3)..."
npx dotenv -e .env.uat -- npx strapi import -f "${FILE}.tar.gz" --only content,files --force

echo "==> Cleaning up..."
rm -f "${FILE}.tar.gz"

echo "Done. Local SQLite data has been synced to UAT."
