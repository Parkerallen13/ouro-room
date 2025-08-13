#!/bin/bash
set -euo pipefail

# ==== EDIT THESE ====
EC2_USER=ec2-user
EC2_IP=3.134.207.90
SSH_KEY="$HOME/Downloads/ouro.pem"   # <-- path to your .pem
REMOTE_DIR=/home/ec2-user/ouro-backend
VENV_DIR=/home/ec2-user/venv-ourob   # or comment out if not using a venv
SERVICE_NAME=gunicorn                # your systemd unit name
# ====================

# use the key for rsync/ssh
RSYNC_SSH="ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no"

echo "🔄 Syncing backend to EC2 (${EC2_IP}) ..."
rsync -avz --delete -e "$RSYNC_SSH" \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude 'venv' \
  --exclude 'media' \
  ./ "${EC2_USER}@${EC2_IP}:${REMOTE_DIR}/"

echo "💻 Running remote update steps..."
ssh -i "${SSH_KEY}" ${EC2_USER}@${EC2_IP} bash -lc "
  set -e
  cd ${REMOTE_DIR}

  if [ -d '${VENV_DIR}' ]; then
    source ${VENV_DIR}/bin/activate
  fi

  echo '📦 pip install ...'
  pip3 install -r requirements.txt

  echo '🗃️  migrate ...'
  python3 manage.py migrate --noinput

  # echo '🧹 collectstatic ...'
  # python3 manage.py collectstatic --noinput

  echo '🚀 restart ${SERVICE_NAME} ...'
  sudo systemctl restart ${SERVICE_NAME}
  sleep 2
  sudo systemctl is-active ${SERVICE_NAME} || (sudo systemctl status ${SERVICE_NAME} --no-pager; exit 1)

  echo '📋 recent logs:'
  sudo journalctl -u ${SERVICE_NAME} -n 50 --no-pager
"

echo "✅ Backend deployed."

# ./deploy_backend.sh