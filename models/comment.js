var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  text: { type: String },
});

module.exports = mongoose.model('Comment', commentSchema);
