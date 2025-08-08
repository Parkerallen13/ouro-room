#!/bin/bash

# Set variables
FRONTEND_DIR="/home/ec2-user/ouro-frontend"
BACKEND_DIR="/home/ec2-user/ouro-backend"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

echo "==== Deploy started at $TIMESTAMP ===="

# Update Backend
echo "--- Updating Backend ---"
cd "$BACKEND_DIR" || { echo "Backend directory not found"; exit 1; }
git pull origin main
docker compose down
docker compose up -d

# Update Frontend
echo "--- Updating Frontend ---"
cd "$FRONTEND_DIR" || { echo "Frontend directory not found"; exit 1; }
git pull origin main
npm install
npm run build

# Optional: Reload nginx if frontend is served via nginx
echo "--- Reloading nginx ---"
sudo nginx -t && sudo systemctl reload nginx

echo "==== Deploy completed at $(date +"%Y-%m-%d %H:%M:%S") ===="

# ./deploy.sh

# ssh -i ouro.pem ec2-user@3.134.207.90