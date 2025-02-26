const mongoose = require('mongoose');

// Group Mesage Schema 
// from_user, room, message String columns 
// date_sent Column and current date set if not provided 
const messageSchema = new mongoose.Schema({
  from_user: String,
  room: String,
  message: String,
  date_sent: { type: Date, default: Date.now }
});

const Message = mongoose.model('Group_Message', messageSchema);
module.exports = Message;