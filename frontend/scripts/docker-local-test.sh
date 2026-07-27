#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."

IMAGE_TAG="hktramways-frontend-local-test"

set -a
source frontend/.env.uat
set +a

echo "==> Building Docker image..."
docker build \
  --build-arg NEXT_PUBLIC_API_URL="$NEXT_PUBLIC_API_URL" \
  --build-arg NEXT_PUBLIC_IMG_URL="$NEXT_PUBLIC_IMG_URL" \
  -t "$IMAGE_TAG" -f frontend/Dockerfile .

echo "==> Starting container (using .env.uat)..."
cd frontend
export ECR_IMAGE="$IMAGE_TAG"
docker compose -f docker-compose.uat.yml up -d --force-recreate

echo "==> Tailing logs (Ctrl+C to stop tailing; container keeps running)..."
docker compose -f docker-compose.uat.yml logs -f
