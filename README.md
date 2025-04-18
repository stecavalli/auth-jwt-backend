## 🗄️🔐 Auth-JWT-Backend

This repository contains a backend API for user authentication using JWT (JSON Web Tokens) 
<br>
with Node.js, Express, and MongoDB. 
<br>
It handles user registration, login, and authentication via JWT stored in HttpOnly cookies, 
<br>
with routes that are protected using middleware.
<br>
The backend of this project is connected and managed by the [Render](https://www.render.com/) site
<br>
and the frontend by the [Netlify](https://www.netlify.com/) site. 
<br>
The database is hosted on the [MongoDB](https://www.mongodb.com/) site. 
<br>
Environment variables must be set on the [Render](https://www.render.com/) site
<br>
The [auth-jwt-frontend](https://github.com/stecavalli/auth-jwt-frontend) repository is an integral part of this project.

## ✅ Features

<b>JWT Authentication:</b> Secure login and registration with JWT tokens.
<br>
<b>Cookie Storage:</b> JWT stored in HttpOnly cookies for enhanced security.
<br>
<b>Protected Routes:</b> Routes like /api/users are protected and require a valid JWT.
<br>
<b>User Management:</b> Register, list, and delete users (admin functionality).
<br>
<b>Logout:</b> Clear JWT cookie on logout.

## 🖥️ Local installation

<b> 📦 Clone the repository:</b>
<br>
git clone https://github.com/stecavalli/auth-jwt-backend.git
<br>
cd auth-jwt-backend
<br>

<b> 🔧 Environment Setup</b>

<i>Create a .env file (and place it in the root folder where the server.js file is located) 
<br>
with the following:</i>
<br><br>
JWT_SECRET=your_secret_key  &nbsp;&nbsp;&nbsp;&nbsp;*** Secret key to be set directly on the [Render](https://www.render.com/) site. ***
<br>
MONGO_URI=your_mongo_database_url  &nbsp;&nbsp;&nbsp;&nbsp;*** Url of your MongoDb database to set on the [Render](https://www.render.com/) site. ***
<br>
NODE_ENV=development
<br>
PORT: 3001  &nbsp;&nbsp;&nbsp;&nbsp;*** URL for local tests, replace 3001 with the actual port number your server is listening on. ***
<br><br>

## ✏️ Local Test File Changes
This repository and its frontend repository are configured to run on the servers listed above.
<br>
To run locally on your PC, some changes to three files in the backend are required, and the .env files 
<br>
need to be added to both repositories.
<br>
Here are the changes needed:
<br>
Go to the [auth-jwt-frontend](https://github.com/stecavalli/auth-jwt-frontend) repository to see the changes you need to make.
<br>
In this repository you need to add the .env file as described above and modify the server.js, auth.js 
<br>
and verifyToken.js files.
<br>
Use the modified files you find inside the local_test folder in this repository, read the readme.txt 
<br>
file for the changes.

## 📦 Install dependencies:

npm install

## ▶️ Start the server:

node server.js
<br><br>
![Powershell](images/powershell7.png)
<br>

## 🌐Localhost Home page

Open your browser and type <b><i>localhost:3001</i></b>.
<br>
Replace <b><i>3001</i></b> with the port number the server is listening on.
<br>
In your browser you will see something like this:
<br><br>
![Localhost Home page](images/localhost3001.png)
<br>

## 🚀 Deployment  
You can deploy the backend on platforms like [Render](https://render.com), [Railway](https://railway.app), or [Heroku](https://www.heroku.com/).  
<br>
Make sure to set environment variables such as `MONGO_URI` and `JWT_SECRET` 
<br>
securely in your deployment dashboard.


## 📬 API Endpoints (Used by Frontend)

<b>GET /api/users:</b> Get the list of all users (protected route, JWT required).
<br>
<b>GET /api/me:</b> Get the currently logged-in user's information (protected route, JWT required).
<br>
<b>POST /api/auth/register:</b> Register a new user.
<br>
<b>POST /api/auth/login:</b> Login and receive a JWT token, stored in an HttpOnly cookie.
<br>
<b>POST /api/auth/logout:</b> Logout by clearing the JWT cookie.
<br>
<b>DELETE /api/users/:username:</b> Delete a user (protected route, JWT required).

## 🛠️ Technologies

Node.js
<br>
Express.js
<br>
JWT
<br>
MongoDB
<br>
bcrypt
<br>
Cookies (HttpOnly)

## 🧱 Middleware

verifyToken: Middleware to verify the JWT token and protect routes.

## 🌐 Web server home page

On the Render site when you open your server's web page you will see 
<br>
something very similar to the following images:
<br><br>
![Backend home page](images/backend.png)
<br>
![Status server](images/backend2.png)
