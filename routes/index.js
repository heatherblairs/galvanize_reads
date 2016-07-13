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

router.get('/:id/detail', function(req, res, next){
  knex('book').where({id: req.params.id}).first().then(function(book){
    res.render('detail', {book: book})
  })
})

router.get('/add', function(req, res, next) {
  res.render('add')
});

router.post('/add', function(req, res, next) {
  knex('book').insert(req.body).then(function(){
    res.redirect('/');
  }).catch(function(err){
    console.log(err)
    next(err)
  })
});

router.get('/:id/edit', function(req, res, next){
  knex('book').where({id: req.params.id}).first().then(function(book){
    res.render('edit', {book: book})
  })
})

router.post('/:id/edit', function(req, res, next){
  knex('book').where({id: req.params.id}).update(req.body)
  .then(function(book){
    res.redirect('/');
  })
})

router.get('/:id/delete', function(req, res, next){
  knex('book').where({id: req.params.id}).first().then(function(book){
    res.render('delete', {book: book})
  })
})

router.post('/:id/delete', function(req, res, next){
  knex('book').where({id: req.params.id}).del()
  .then(function(book){
    res.redirect('/');
  })
})

module.exports = router;
