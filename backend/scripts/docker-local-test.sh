#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."

IMAGE_TAG="hktramways-backend-local-test"

echo "==> Building Docker image..."
docker build -t "$IMAGE_TAG" -f backend/Dockerfile .

echo "==> Starting container (connected to UAT Postgres + S3)..."
cd backend
export ECR_IMAGE="$IMAGE_TAG"
docker compose -f docker-compose.uat.yml up -d --force-recreate

echo "==> Tailing logs (Ctrl+C to stop tailing; container keeps running)..."
docker compose -f docker-compose.uat.yml logs -f
