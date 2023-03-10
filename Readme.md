Tech Spaces
Tech Spaces is a web application that connects developers with tech spaces such as co-working spaces, meetups, hackathons, and conferences in their area. The application allows developers to search for tech spaces by location, technology, and event type, and also provides a chat feature for developers to communicate with each other.

Technologies Used
Python (Django)
MongoDB
Angular

Contributors
Yvonne Charawe (Frontend Engineer) - yvonnecharawe@gmail.com
Robert Mong'are (Backend Engineer) - mongarerobert3@gmail.com
David Motari (Backend Engineer) - davemotari22@gmail.com

Getting Started
To get started with the Tech Spaces app, follow these steps:

Clone the repository:

 
git clone https://github.com/mongarerobert3/TECH-SPACES.git

Install the dependencies:

cd techspaces/backend

pip install -r requirements.txt


cd techspaces/frontend
npm install
Start the backend server:

cd techspaces/backend
python manage.py runserver
Start the frontend server:


cd techspaces/frontend
ng serve
Access the application at http://localhost:4200/

Deploying to Production
To deploy the Tech Spaces app to a production server, follow these steps:

Set up a web server with a database and install the necessary dependencies for Python and MongoDB.

Clone the repository on the production server.

Install the dependencies:

cd techspaces/backend
pip install -r requirements.txt

cd techspaces/frontend
npm install

Build the frontend:
cd techspaces/frontend
ng build --prod

Set up the environment variables for the backend server:

javascript

export DJANGO_SETTINGS_MODULE=techspaces.settings.production
export DB_NAME=<database_name>
export DB_USER=<database_user>
export DB_PASSWORD=<database_password>
export DB_HOST=<database_host>
export DB_PORT=<database_port>
export SECRET_KEY=<secret_key>
export DEBUG=False
Run the backend server using a WSGI server such as Gunicorn:


cd techspaces/backend
gunicorn techspaces.wsgi:application
Access the application at http://<server_ip>/.

License
The Tech Spaces app is licensed under the MIT License. See LICENSE for more information.
