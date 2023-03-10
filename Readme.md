<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Tech Spaces</title>
</head>
<body>
<h1>Tech Spaces</h1>

<p>Tech Spaces is a web application that connects developers with tech spaces such as co-working spaces, meetups, hackathons, and conferences in their area. The application allows developers to search for tech spaces by location, technology, and event type, and also provides a chat feature for developers to communicate with each other.</p>

<h2>Technologies Used</h2>
<ul>
	<li>Python (Django)</li>
	<li>MongoDB</li>
	<li>Angular</li>
</ul>

<h2>Contributors</h2>
<ul>
	<li>Yvonne Charawe (Frontend Engineer) - yvonnecharawe@gmail.com</li>
	<li>Robert Mongare (Backend Engineer) - mongarerobert3@gmail.com</li>
	<li>David Motari (Backend Engineer) - davemotari22@gmail.com</li>
</ul>

<h2>Getting Started</h2>
<ol>
	<li>Clone the repository:</li>
	<pre><code>git clone https://github.com/mongarerobert3/TECH-SPACES.git</code></pre>

	<li>Install the dependencies:</li>
	<pre><code>cd techspaces/backend<br>
pip install -r requirements.txt</code></pre>


	<pre><code>cd techspaces/frontend<br>
npm install</code></pre>


	<li>Start the backend server:</li>
	<pre><code>cd techspaces/backend<br>
python manage.py runserver</code></pre>


	<li>Start the frontend server:</li>
	<pre><code>cd techspaces/frontend<br>
</code></pre>


	<li>Access the application at <a href="http://localhost:4200/">http://localhost:4200/</a></li>
</ol>

<h2>Deploying to Production</h2>
<ol>
	<li>Set up a web server with a database and install the necessary dependencies for Python and MongoDB.</li>

    <li>Clone the repository on the production server.</li>

	<li>Install the dependencies:</li>
	<pre><code>cd techspaces/backend<br>
pip install -r requirements.txt</code></pre>


<pre><code>cd techspaces/frontend<br>
npm install</code></pre>


<li>Build the frontend:</li>
<pre><code>cd techspaces/frontend<br>
ng build --prod</code></pre>


<li>Set up the environment variables for the backend server:</li>
<pre><code>export DJANGO_SETTINGS_MODULE=techspaces.settings.production<br>
export DB_NAME=<database_name><br>
export DB_USER=<database_user><br>
export DB_PASSWORD=<database_password><br>
export DB_HOST=<database_host><br>
export DB_PORT=<database_port><br>
export SECRET_KEY=<secret_key><br>
export DEBUG=False</code></pre>


	<li>Run the backend server using a WSGI server such as Gunicorn:</li>
	<pre><code>cd techspaces/backend<br>
gunicorn techspaces.wsgi:application</code

Access the application at http://<server_ip>/.

<h2>License</h2>
<p>The Tech Spaces app is licensed under the MIT License. See LICENSE for more information.</p>
