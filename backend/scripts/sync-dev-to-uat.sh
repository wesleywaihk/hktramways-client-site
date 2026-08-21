#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "What do you want to sync?"
echo "  1) db only"
echo "  2) s3 only"
echo "  3) both"
read -rp "Choose [1-3]: " CHOICE

case "$CHOICE" in
  1) SYNC_DB=true; SYNC_S3=false ;;
  2) SYNC_DB=false; SYNC_S3=true ;;
  3) SYNC_DB=true; SYNC_S3=true ;;
  *) echo "Invalid choice: $CHOICE" >&2; exit 1 ;;
esac

echo "==> Checking AWS login (needed for cross-bucket S3 sync)..."
if ! aws sts get-caller-identity --profile default >/dev/null 2>&1; then
  echo "==> AWS session expired or missing, launching login..."
  aws login --profile default
fi

if [ "$SYNC_DB" = true ]; then
  FILE="sync-dev-to-uat-$(date +%s)"

  echo "==> Exporting dev data (Postgres)..."
  npx dotenv -e .env.dev -- npx strapi export --no-encrypt --only content -f "$FILE"

  echo "==> Importing into UAT (Postgres)..."
  npx dotenv -e .env.uat -- npx strapi import -f "${FILE}.tar.gz" --only content --force

  echo "==> Cleaning up..."
  rm -f "${FILE}.tar.gz"

  echo "==> Syncing Content Manager layout config + menu/auth logos..."
  node scripts/sync-layout.js .env.dev .env.uat
fi

if [ "$SYNC_S3" = true ]; then
  echo "==> Syncing S3 assets (dev -> UAT, server-side)..."
  aws s3 sync "s3://$(grep -E '^AWS_BUCKET=' .env.dev | cut -d= -f2-)" "s3://$(grep -E '^AWS_BUCKET=' .env.uat | cut -d= -f2-)" \
    --profile default --region ap-southeast-1 --delete
fi

echo "Done. Dev data has been synced to UAT."
