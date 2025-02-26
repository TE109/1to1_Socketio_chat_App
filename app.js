const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const crypto = require('crypto');
const { Console } = require('console');
const User = require('./Schemas/Users');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:pass@comp3123cluster.arhm6.mongodb.net/comp3133_101400506_lab_Test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const userSockets = {};
var user

app.use(express.json());
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/login`);
});

// Link to add new User
app.get("/signUp", (req, res) => {
  res.sendFile(__dirname + '/view/signup.html')
})

// Link to Login to User 
app.get("/login", (req, res) => {

  res.sendFile(__dirname + '/view/login.html')
})

// link to Group chat Home screen
app.get("/group", (req, res) => {
  user = req.query.user
  res.sendFile(__dirname + '/view/group_chat.html')
})

// Socket Connection 
io.on('connection', (socket) => {

  console.log('User:', user);
  console.log('User connected:', socket.id);

  // on Singup event create a new user with a hashed password 
  // Save the new user to the database 
  socket.on('signUp', async (data) => {
    try {
      const newUser = new User({
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        password: crypto.createHash('md5').update(data.password).digest('hex'),
      });
      await newUser.save();
      console.log("New user saved:", newUser);
      socket.emit("loginResponse", { user: { username: newUser.username, firstname: newUser.firstname, lastname: newUser.lastname } });
    } catch (error) {
      console.error("Error saving user:", error);
    }
  });

  // On Login event 
  // If user exesits save variables and send login event to Server
  // If user dosnt exsist throw Invalid user Credentials error  
  socket.on("login", async (data) => {
    try {
      const user = await User.findOne({
        username: data.username,
        password: crypto.createHash('md5').update(data.password).digest('hex'),
      });

      if (user != null) {
        userSockets[user.username] = socket.id;
        console.log(`User registered: ${user.username} -> ${socket.id}`);
        socket.emit("loginResponse", { user: { username: user.username, firstname: user.firstname, lastname: user.lastname } });
      } else {
        throw new Error("Invalid User Credentials");
      }
    } catch (error) {
      console.error("Error Logging in:", error);
    }
  });

  // Event to join a chat room 
  // Save updated socket id to User name 
  socket.on('join_group', (roomName) => {
    userSockets[user] = socket.id;
    console.log(`User ${socket.id} joined room ${roomName}`);
    socket.join(roomName);
  });

  // Event to leave a chat room 
  socket.on('leave_group', (roomName) => {
    socket.leave(roomName);
  });

  // Event to send text message to Group chat 
  socket.on('group_message', (data) => {
    console.log(`User ${data.username} sent message to room ${data.group}`);
    io.to(data.group).emit('group_message', data);
  });

  // Event to send message to other user 
  socket.on('personal_message', async (data) => {
    console.log(userSockets[data.toUser])
    io.to(userSockets[data.toUser]).emit("personal_message", data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

});


