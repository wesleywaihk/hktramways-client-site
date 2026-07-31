#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

export ECR_IMAGE="${ECR_IMAGE:-placeholder}"

echo "==> Stopping frontend Docker container..."
(cd frontend && docker compose -f docker-compose.uat.yml down --remove-orphans)

echo "==> Stopping backend Docker container..."
(cd backend && docker compose -f docker-compose.uat.yml down --remove-orphans)

echo "==> Killing any leftover processes on ports 3000 and 1337..."
bash scripts/kill-port.sh 3000
bash scripts/kill-port.sh 1337
