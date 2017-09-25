const express = require('express');
const wikiRouter = express.Router();

wikiRouter.get('/', function(req, res) {
  //res.send('got to GET /wiki/');
  res.redirect('/');
});

wikiRouter.post('/', function(req, res, next) {
  //res.render('/wiki/', {name: 'FSA', email:'FSA@fsa.com', title: 'My wiki', content: 'slkhsflhs', status: 'open'});
  res.json(req.body);
});

wikiRouter.get('/add', function(req, res, next) {
  res.render('addpage');
});

module.exports = wikiRouter;
