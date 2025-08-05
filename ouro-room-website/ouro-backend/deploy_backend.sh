#!/bin/bash

# Configuration
EC2_USER=ec2-user
EC2_IP=3.134.207.90
LOCAL_BACKEND_DIR=ouro-backend
REMOTE_BACKEND_DIR=/home/ec2-user/ouro-backend

echo "🔄 Uploading backend files to EC2..."
scp -r $LOCAL_BACKEND_DIR $EC2_USER@$EC2_IP:/home/ec2-user/

echo "💻 Connecting to EC2 and restarting backend..."
ssh $EC2_USER@$EC2_IP << EOF
  cd $REMOTE_BACKEND_DIR
  echo "✅ Pull complete. Restarting backend..."
  sudo systemctl restart gunicorn
  echo "🚀 Backend restarted."
EOF

echo "✅ Deployment complete!"

# ./deploy_backend.sh