var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  avatar: { type: String },
  password: { type: String }
});

module.exports = mongoose.model('User', userSchema);
