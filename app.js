const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/Book');

const app = express();
const PORT = 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mydata')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Show all books
app.get('/', async (req, res) => {
  const books = await Book.find();
  res.render('index', { books });
});

// Add book form
app.get('/add', (req, res) => {
  res.render('add');
});

// Add book (POST)
app.post('/add', async (req, res) => {
  const { title, author, price, description, image } = req.body;
  const newBook = new Book({ title, author, price, description, image });
  await newBook.save();
  res.redirect('/');
});

// Edit book form
app.get('/edit/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('edit', { book });
});

// Update book
app.post('/edit/:id', async (req, res) => {
  const { title, author, price, description, image } = req.body;
  await Book.findByIdAndUpdate(req.params.id, { title, author, price, description, image });
  res.redirect('/');
});

// Delete book
app.get('/delete/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
