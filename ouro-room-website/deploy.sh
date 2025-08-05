#!/bin/bash

PEM_PATH=~/Downloads/ouro.pem
EC2_USER=ec2-user
EC2_IP=3.134.207.90

echo "Syncing Frontend..."
rsync -avz -e "ssh -i $PEM_PATH" ./ouro-frontend/ $EC2_USER@$EC2_IP:/home/ec2-user/ouro-frontend/

echo "Syncing Backend..."
rsync -avz -e "ssh -i $PEM_PATH" ./ouro-backend/ $EC2_USER@$EC2_IP:/home/ec2-user/ouro-backend/

echo "Deploy complete!"

# ./deploy.sh

# ssh -i ouro.pem ec2-user@3.134.207.90