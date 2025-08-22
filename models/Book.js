const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  description: String,
  image: String // for book cover URL
});

module.exports = mongoose.model('Book', bookSchema);
