var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('book').select().then(function(queryResults){
    res.render('index', {title: 'Galvanize Reads', bookList: queryResults})
  })
});

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
