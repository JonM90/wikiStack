const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');

router.use('/', function(req, res, next) {
  res.render('index');
  res.send('got to homepage!');
});

router.use('/wiki', wikiRouter);


module.exports = router;
