const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const models = require('../models');
const Page = models.Page;

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

router.get('/', function(req, res, next) {
  Page.findAll()
    .then(function (vals) {
      res.render('index', {
        pages: vals,
      });
    }).catch(next);
});

module.exports = router;
