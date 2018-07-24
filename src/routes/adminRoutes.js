const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

const books = [
  {
    title: 'Mort',
    genre: 'Fantasy',
    author: 'Terry Pratchett',
    bookId: 386372,
    read: true
  },
  {
    title: 'Papillon',
    genre: 'Crime',
    author: 'Henri Charrierre',
    bookId: 6882,
    read: true
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    bookId: 2493,
    read: false
  },
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 656,
    read: false
  },
  {
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    bookId: 24280,
    read: false
  },
  {
    title: 'Thud!',
    genre: 'Fantasy',
    author: 'Terry Pratchett',
    bookId: 62530,
    read: true
  },
];

function router() {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to the server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });

  return adminRouter;
}

module.exports = router;
