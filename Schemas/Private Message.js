const mongoose = require('mongoose');

// Mesage Schema 
// from_user, to_user, room, text, String columns 
// date_sent Column and current date set if not provided 
const messageSchema = new mongoose.Schema({
  from_user: String,
  to_user: String,
  room: String,
  text: String,
  date_sent: { type: Date, default: Date.now }
});

const Message = mongoose.model('Private_Message', messageSchema);
module.exports = Message;