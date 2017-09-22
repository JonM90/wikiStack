const morgan = require('morgan');
const express = require('express');
const app = express();
const routes = require('./routes')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: true })


app.use('/', routes)

app.use(morgan('tiny'));

app.use(express.static('public'));

app.use(urlencodedParser)

