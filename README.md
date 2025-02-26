# 1to1_Socketio_chat_App 

# Overview
This project implements a simple real-time group and personal messaging system using Node.js, Express, Socket.io, and MongoDB. Users can sign up, log in, join chat groups, send messages to specific groups, and send private messages to other users.


# Features
User Authentication: Users can sign up, log in, and store their credentials in a MongoDB database. Passwords are hashed for security.

Group Chat: Users can join various predefined groups and send messages to the entire group.

Personal Chat: Users can send personal messages to each other.

Real-time Updates: All messages are sent and received in real-time using Socket.io.


# Technologies Used
Node.js: Backend server running JavaScript.

Express: Web framework for handling HTTP requests.

Socket.io: For real-time communication between clients and server.

MongoDB: For storing user credentials and other relevant data.

Crypto (MD5): For hashing passwords before storing them in the database.


# Prerequisites
Node.js and npm installed on your system.


# File Structure
app.js: Main server-side application using Express and Socket.io.

Schemas/Users.js: Mongoose schema for storing user data (username, password, etc.).

view/signup.html: Frontend page for user sign-up.

view/login.html: Frontend page for user login.

view/group_chat.html: Frontend page for group chat functionality.


# Key Routes

## Sign Up: /signUp
Page where users can create an account.
HTTP method: GET

## Login: /login
Page where users can log in using their credentials.
HTTP method: GET

## Group Chat: /group
Page where users can join a group chat and send messages.
HTTP method: GET
Query Parameter: user (username of the logged-in user)

# Frontend Files
signup.html: User sign-up form. Submits the form to create a new user.

login.html: User login form. Submits credentials to the server to log in.

group_chat.html: Chat interface for sending group and personal messages.
