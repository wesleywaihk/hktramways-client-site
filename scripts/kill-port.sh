#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-3000}"

PIDS=$(lsof -ti tcp:"$PORT" 2>/dev/null || true)

if [ -z "$PIDS" ]; then
  # lsof silently sees nothing when the listener is owned by another user
  # (e.g. root), so retry with sudo before concluding the port is free.
  PIDS=$(sudo lsof -ti tcp:"$PORT" 2>/dev/null || true)
fi

if [ -z "$PIDS" ]; then
  echo "==> No process found listening on port $PORT"
  exit 0
fi

echo "==> Killing process(es) on port $PORT: $PIDS"
if ! kill -9 $PIDS 2>/dev/null; then
  echo "==> Permission denied, retrying with sudo..."
  sudo kill -9 $PIDS
fi
