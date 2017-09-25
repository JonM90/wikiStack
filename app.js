const morgan = require('morgan');
const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const models = require('./models');

app.use(express.static('public'));

app.use(morgan('tiny')); // Log request details before passing control over to routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render);// when res.render works with html files, have it use nunjucks to do so


models.User.sync({})
.then(function () {
  return models.Page.sync({});
})
.then(function () {
  return models.db.sync({force: true});
})
.then(function () {
  app.use('/', routes);
  app.listen(3000, function() {
    console.log('Listening on port 3000');
  });
})
.catch(console.error);

