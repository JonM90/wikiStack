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
    // Create a user only if it doesn't exist in User database already
    User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
    // When done, create a new field on the Page table
    .then(function () {
      return Page.create({
        title: req.body.title,
        urlTitle: Page.route,
        content: req.body.content,
        status: req.body.status
      });
    })
    // When new page created, redirect to the new url created
    .then(function(file) {
      res.redirect('/wiki/' + file.urlTitle);
    })
    .catch(next);

    // OLD CODE
    // -------------------------------------------
    // User.findOrCreate({
//       where: {
//         name: req.body.name,
//         email: req.body.email
//       }
//     })
//     .then(function (values) {

//       var user = values[0];

//       var page = Page.build(req.body);
//       //   {
//       //   title: req.body.title,
//       //   content: req.body.content,
//       //   status: req.body.status
//       // }

//       return page.save().then(function (page) {
//         return page.setAuthor(user);
//       });

//     })
//     .then(function (page) {
//       res.redirect(page.route);
//       //('/wiki/' + page.urlTitle);
//     })
//     .catch(next);
//    ______________________________________________
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
        return pUse;
      }).then(function(use) {
        console.log(post.urlTitle);
        res.render('wikipage', {
          page: post,
          author: use
        });
      });
    })
    .catch(next);

  });

module.exports = wikiRouter;
