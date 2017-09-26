const express = require('express');
const wikiRouter = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

wikiRouter.route('/')
  //index tab url is /wiki
  .get(function(req, res, next) {
    res.redirect('/');
  })
  .post(function(req, res, next) {
    User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
    .then(function (values) {

      var user = values[0];

      var page = Page.build(req.body);
      //   {
      //   title: req.body.title,
      //   content: req.body.content,
      //   status: req.body.status
      // }

      return page.save().then(function (page) {
        return page.setAuthor(user);
      });

    })
    .then(function (page) {
      res.redirect(page.route);
      //('/wiki/' + page.urlTitle);
    })
    .catch(next);

    // const page = Page.build({
    //   title: req.body.title,
    //   content: req.body.content,
    //   status: req.body.status
    // });
    // const user = User.build({
    //   name: req.body.name,
    //   email: req.body.email
    // });
    // user.save()
    //   .then(function() {
    //     return page.save();
    //   })
      // .then(function (savedPage) {
      //   // res.send(savedPage.route); WHY ISN'T THE GETTER WORKING?!?
      //   res.redirect('/wiki/' + req.body.title);
      // });
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
    }
    // , { include: [{
    //   model: User
    //   // as: 'author' , where: {id: this.authorId}
    // }]
    // }
    )
    .then(function(post) {
      User.findOne({where:  { id: post.authorId }
      }).then(function(pUse) {
        return pUse
      }).then(function(use) {
        console.log(post.urlTitle)
        res.render('wikipage', {
          page: post,
          author: use
        });
      })
    })
    .catch(next);

  });


module.exports = wikiRouter;
