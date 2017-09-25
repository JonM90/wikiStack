const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const models = require('../models');
const Page = models.Page; 

router.use('/wiki', wikiRouter);

router.get('/', function(req, res, next) {
  const pages = Page.findAll()
    .then(function (vals) {
      res.render('index', {
        pages: vals,
      });
    });
});

module.exports = router;
