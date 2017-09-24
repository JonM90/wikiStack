const morgan = require('morgan');
const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(express.static('public'));

app.use(morgan('tiny')); // Log request details before passing control over to routes
app.use(urlencodedParser);

app.use('/', routes());

app.listen(3000, function() {
  console.log('Listening on port 3000');
});

