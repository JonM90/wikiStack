const express = require('express');
const userRouter = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

userRouter.route('/')
.get(function(req, res, next) {
  User.findAll({}).then(function(users){
    res.render('users', { users: users });
  }).catch(next);
});

userRouter.route('/:id')
.get(function(req, res, next) {
  const userPromise = User.findById(req.params.id);

  const pagesPromise = Page.findAll({
    where: { authorId: req.params.id }
  });

  Promise.all([
    userPromise,
    pagesPromise
  ])
  .then(function(vals) {
    var user = vals[0];
    var pages = vals[1];
      res.render('users', {
        user: user,
        pages: pages
      });
  })
  .catch(next);
});

module.exports = userRouter;
