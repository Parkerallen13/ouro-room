------------------------------------------------------------------

# SETUP
⸻

# 1. Clone the repo

git clone https://github.com/your-username/ouro-room.git

cd ouro-room  # or cd ouro-room-website if that's the actual folder name

# PREREQUISITES (Mac)
	•	Node.js + npm installed
	•	Python3 + pip installed
	•	SSH key file: ouro.pem in ~/Downloads
	•	VS Code installed
	•	Repo cloned: ouro-room

# 2. Set up the backend

cd ouro-backend

python -m venv env

source env/bin/activate  # On Windows: env\Scripts\activate

pip install -r requirements.txt  # or pip install django djangorestframework pillow

python manage.py migrate

python manage.py runserver 8002

# 3. Set up the frontend

cd ../ouro-frontend

npm install

npm run dev

------------------------------------------------------------------

# FRONTEND – MAKE & DEPLOY A CHANGE

⸻

# 1. Open Frontend Project in VS Code (from mac terminal)

cd ~/path/to/ouro-room/ouro-frontend
code .

# 2. Make Your Change
	•	Edit .tsx, .css, images, etc.
	•	Test locally (optional):

npm run dev

to check if it works: 
Visit: http://localhost:5173

# 3. Build the Frontend for Deployment

npm run build

# This creates dist/ folder with production files.

# 4. Upload Build to EC2

From your Mac terminal:

scp -i ~/Downloads/ouro.pem -r dist/* ec2-user@3.134.207.90:/home/ec2-user/temp-frontend/

# 5. SSH into EC2

ssh -i ~/Downloads/ouro.pem ec2-user@3.134.207.90

# 6. Move Files to Nginx Web Directory

sudo cp -r /home/ec2-user/temp-frontend/* /usr/share/nginx/html/
sudo systemctl restart nginx

# 7. Test Live Site

Visit:
https://ouroroomcollective.com

------------------------------------------------------------------

# BACKEND – MAKE & DEPLOY A CHANGE

⸻

# 1. Open Backend Project in VS Code

cd ~/path/to/ouro-room/ouro-backend
code .

# 2. Make Your Change
	•	Edit Python files: API, models, views, etc.
	•	Optional: test locally with Django/Flask

⸻

# 3. Upload Backend to EC2

From Mac:

scp -i ~/Downloads/ouro.pem -r ouro-backend ec2-user@3.134.207.90:/home/ec2-user/

# 4. SSH into EC2

ssh -i ~/Downloads/ouro.pem ec2-user@3.134.207.90

# 5. Restart Backend Server (Gunicorn)

sudo systemctl restart gunicorn

------------------------------------------------------------------

# Quick Reference: Common Commands (Task | Command)
Build | frontend npm run build
Upload frontend files | scp -i ouro.pem -r dist/* ...
SSH into EC2 | ssh -i ouro.pem ec2-user@3.134.207.90
Copy frontend to live | dir sudo cp -r temp-frontend/* /usr/share/nginx/html/
Restart Nginx | sudo systemctl restart nginx
Upload backend code | scp -i ouro.pem -r ouro-backend ...
Restart backend | (Gunicorn) sudo systemctl restart gunicorn

























