const express = require('express');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();
const bookService = require('../services/goodreadsService');

function router(nav) {
  const { getIndex, getById, middleware } = bookController(bookService, nav);
  bookRouter.use(middleware);
  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .all(getById);

  return bookRouter;
}

module.exports = router;
