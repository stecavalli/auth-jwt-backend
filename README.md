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

## 🔧 Environment Setup

<i>Create a .env file with the following:</i>
<br><br>
JWT_SECRET=your_secret_key
<br>
MONGO_URI=your_mongo_database_url

## 🖥️ Local installation

<b> 📦 Clone the repository:</b>
<br>
git clone https://github.com/stecavalli/auth-jwt-backend.git
<br>
cd auth-jwt-backend
<br>

<b> 📦 Install dependencies:</b>

npm install

<b> ▶️ Start the server:</b>

npm start

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
