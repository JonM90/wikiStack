const express = require('express');
const wikiRouter = express.Router();

wikiRouter.get('/', function(req, res) {
  res.send('got to GET /wiki/');
});

wikiRouter.post('/', function(req, res, next) {
  res.send('got to POST /wiki/');
});

wikiRouter.get('/add', function(req, res, next) {
  res.render('addpage');
});

module.exports = wikiRouter;
