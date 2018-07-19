const express = require('express');

const bookRouter = express.Router();

const books = [
  {
    title: 'Mort',
    genre: 'Fantasy',
    author: 'Terry Pratchett',
    read: true
  },
  {
    title: 'Papillon',
    genre: 'Crime',
    author: 'Henri Charrierre',
    read: true
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'Thud',
    genre: 'Fantasy',
    author: 'Terry Pratchett',
    read: true
  },
];

bookRouter.route('/')
  .get((req, res) => {
    res.render(
      'books',
      {
        nav: [{ link: '/books', title: 'Books' },
          { link: '/authors', title: 'Authors' }],
        title: 'Library',
        books
      }
    );
  });

bookRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    res.render(
      'book',
      {
        nav: [{ link: '/books', title: 'Books' },
          { link: '/authors', title: 'Authors' }],
        title: 'Library',
        book: books[id]
      }
    );
  });

module.exports = bookRouter;
