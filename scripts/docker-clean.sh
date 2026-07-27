#!/usr/bin/env bash
set -euo pipefail

echo "==> Removing stopped containers, unused networks and dangling images..."
docker system prune -f

echo "==> Removing build cache..."
docker builder prune -f

echo "==> Removing dangling volumes..."
docker volume prune -f
