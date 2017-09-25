const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('WIKISTACK HOME');
});
router.get('/jonathan', function(req, res) {
  res.send('Jonathan: co founder of wikistack');
});
router.get('/devon', function(req, res) {
  res.send('Devon: also co founder of wikistack');
});

module.exports = router;
