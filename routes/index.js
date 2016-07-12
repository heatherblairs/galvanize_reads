var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('book').select().then(function(queryResults){
    res.render('index', {title: 'Galvanize Reads', bookList: queryResults})
  })
});

// router.get('/:id', function(req, res, next) {
//   res.render('index', { title: 'Galvanize Reads' });
// });

module.exports = router;
