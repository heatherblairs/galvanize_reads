var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/books', function(req, res, next){
  knex('book').select()
  .then(function(bookResults){
    res.render('books', {bookList: bookResults})
  })
})

router.get('/authors', function(req, res, next){
  knex('author').select()
  .then(function(authorResults){
    res.render('authors', {authors: authorResults})
  })
})

router.get('/:id/bookDetail', function(req, res, next){
  knex('book').where({id: req.params.id}).first().then(function(book){
    res.render('bookDetail', {book: book})
  })
})

router.get('/addBook', function(req, res, next) {
  res.render('addBook')
});

router.post('/addBook', function(req, res, next) {
  knex('book').insert(req.body).then(function(){
    res.redirect('/');
  }).catch(function(err){
    console.log(err)
    next(err)
  })
});

router.get('/addAuthor', function(req, res, next) {
  res.render('addAuthor')
});

router.post('/addAuthor', function(req, res, next) {
  knex('author').insert(req.body).then(function(){
    res.redirect('/');
  }).catch(function(err){
    console.log(err)
    next(err)
  })
});

router.get('/:id/editBook', function(req, res, next){
  knex('book').where({id: req.params.id}).first().then(function(book){
    res.render('editBook', {book: book})
  })
})

router.post('/:id/editBook', function(req, res, next){
  knex('book').where({id: req.params.id}).update(req.body)
  .then(function(book){
    res.redirect('/');
  })
})

router.get('/:id/editAuthor', function(req, res, next){
  knex('author').where({id: req.params.id}).first().then(function(author){
    res.render('editAuthor', {author: author})
  })
})

router.post('/:id/editAuthor', function(req, res, next){
  knex('author').where({id: req.params.id}).update(req.body)
  .then(function(author){
    res.redirect('/');
  })
})

router.get('/:id/deleteBook', function(req, res, next){
  knex('book').where({id: req.params.id}).first().then(function(book){
    res.render('deleteBook', {book: book})
  })
})

router.post('/:id/deleteBook', function(req, res, next){
  knex('book').where({id: req.params.id}).del()
  .then(function(book){
    res.redirect('/');
  })
})

router.get('/:id/deleteAuthor', function(req, res, next){
  knex('author').where({id: req.params.id}).first().then(function(author){
    res.render('deleteAuthor', {author: author})
  })
})

router.post('/:id/deleteAuthor', function(req, res, next){
  knex('author').where({id: req.params.id}).del()
  .then(function(author){
    res.redirect('/');
  })
})

module.exports = router;
