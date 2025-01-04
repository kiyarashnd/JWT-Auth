const express = require('express');
const router = express.Router();
const path = require('path');

console.log(path.join(__dirname, '..', 'views', 'index.html'));
//below regex says if start with slash or end with slash or index.html or just index
router.get('^/$|/index(.html)?', (req, res) => {
  // res.send('Hello world!');
  // res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});

router.get('/old-page(.html)?', (req, res) => {
  res.redirect('/new-page.html'); //302 by default
});

module.exports = router;
