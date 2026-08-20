#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Checking AWS login (needed for cross-bucket S3 sync)..."
if ! aws sts get-caller-identity --profile default >/dev/null 2>&1; then
  echo "==> AWS session expired or missing, launching login..."
  aws login --profile default
fi

FILE="sync-uat-to-dev-$(date +%s)"

echo "==> Exporting UAT data (Postgres)..."
npx dotenv -e .env.uat -- npx strapi export --no-encrypt --only content -f "$FILE"

echo "==> Importing into dev (Postgres)..."
npx dotenv -e .env.dev -- npx strapi import -f "${FILE}.tar.gz" --only content --force

echo "==> Cleaning up..."
rm -f "${FILE}.tar.gz"

echo "==> Syncing S3 assets (UAT -> dev, server-side)..."
aws s3 sync "s3://$(grep -E '^AWS_BUCKET=' .env.uat | cut -d= -f2-)" "s3://$(grep -E '^AWS_BUCKET=' .env.dev | cut -d= -f2-)" \
  --profile default --region ap-southeast-1 --delete

echo "==> Syncing Content Manager layout config + menu/auth logos..."
node scripts/sync-layout.js .env.uat .env.dev

echo "Done. UAT data has been synced to dev."
