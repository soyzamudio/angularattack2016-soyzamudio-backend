var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  image: { type: String, required: true },
  products: { type: Array , default: [] },
  title: { type: String },
  comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment', default: [] }],
  favs: { type: Number, default: 0 },
  faved: { type: Boolean, default: false },
  loadingFav: { type: Boolean, default: false }
});

module.exports = mongoose.model('Post', postSchema);
