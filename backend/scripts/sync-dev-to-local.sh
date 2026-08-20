#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

# Works around intermittent "SocketError: other side closed" failures during
# S3 asset transfer (see scripts/undici-fresh-connections.cjs).
export NODE_OPTIONS="--require $(pwd)/scripts/undici-fresh-connections.cjs${NODE_OPTIONS:+ $NODE_OPTIONS}"

FILE="sync-dev-to-local-$(date +%s)"

echo "==> Exporting dev data (Postgres + S3)..."
npx dotenv -e .env.dev -- npx strapi export --no-encrypt --only content,files -f "$FILE"

echo "==> Importing into local SQLite..."
npx strapi import -f "${FILE}.tar.gz" --only content,files --force

echo "==> Cleaning up..."
rm -f "${FILE}.tar.gz"

echo "Done. Dev data has been synced to local SQLite."
