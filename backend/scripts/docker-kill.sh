#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

export ECR_IMAGE="${ECR_IMAGE:-placeholder}"

echo "==> Stopping and removing backend Docker test container..."
docker compose -f docker-compose.uat.yml down --remove-orphans

echo "==> Killing any leftover process on port 1337..."
bash ../scripts/kill-port.sh 1337
