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

module.exports = router;
