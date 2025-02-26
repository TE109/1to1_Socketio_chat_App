const mongoose = require('mongoose');

// User Schema 
// unique User name Column allowing only 1 user name with the same value 
// firstname, lastname, and password String columns  
// createon Column and current date set if not provided 
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true},
    firstname: String,
    lastname: String,
    password: String,
    createon: { type: Date, default: Date.now }
});

const user = mongoose.model('User', userSchema);
module.exports = user;