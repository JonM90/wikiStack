const express = require('express');
const router = express.Router();

// -------------RULES FOR '/routes/index.js' MODULE.EXPORTS object ------------
// Save all routes in one big function that gets exported and require in app.js
// Should return router object
// ----------------------------------------------------------------------------
module.exports = function () {
  router.get('/', function(req, res) {
    res.send('WIKISTACK HOME');
  });
  router.get('/jonathan', function(req, res) {
    res.send('Jonathan: co founder of wikistack');
  });
  router.get('/devon', function(req, res) {
    res.send('Devon: also co founder of wikistack');
  });
  return router;
};
