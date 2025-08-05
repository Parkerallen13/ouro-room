#!/bin/bash
echo "🔨 Building frontend..."
npm run build

echo "📤 Uploading to EC2 temp folder..."
scp -i ~/Downloads/ouro.pem -r dist/* ec2-user@3.134.207.90:/home/ec2-user/temp-frontend/

echo "🔐 Moving files and restarting Nginx on EC2..."
ssh -i ~/Downloads/ouro.pem ec2-user@3.134.207.90 << EOF
  sudo cp -r /home/ec2-user/temp-frontend/* /usr/share/nginx/html/
  rm -rf /home/ec2-user/temp-frontend
  sudo systemctl restart nginx
EOF

echo "✅ Frontend deployed!"

# ./deploy_frontend.sh

# ssh -i ~/Downloads/ouro.pem ec2-user@3.134.207.90 
# exit