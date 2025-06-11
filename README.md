# 1. Clone the repo
git clone https://github.com/your-username/ouro-room.git
cd ouro-room  # or cd ouro-room-website if that's the actual folder name

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
