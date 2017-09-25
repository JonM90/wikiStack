const express = require('express');
const wikiRouter = express.Router();
const models = require('../models');
const Page = models.Page; 
const User = models.User; 

wikiRouter.route('/')
  .get(function(req, res, next) {
    res.redirect('/');
  })
  .post(function(req, res, next) {
    const page = Page.build({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    });

    const user = User.build({
      name: req.body.name,
      email: req.body.email
    });

    user.save()
      .then(function() {
        return page.save();
      })
      .then(function (savedPage) {
        // res.send(savedPage.route); WHY ISN'T THE GETTER WORKING?!?
        res.redirect('/wiki/' + req.body.title);
      });
  });

wikiRouter.route('/add')
  .get(function(req, res, next) {
    res.render('addpage');
  });

wikiRouter.route('/:createdPage')
  .get(function (req, res, next) {
    Page.findOne({where: {
        urlTitle: req.params.createdPage
      }
    })
    .then(function (post) {
      res.render('wikipage', {
        'title': post.title,
        'title-url': post.urlTitle,
        content: post.content,
        'author-name': 2,
        'author-url': 3

      });
    })
    .catch(next);
  });


module.exports = wikiRouter;
