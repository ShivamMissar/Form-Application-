
const express = require('express');
const router = express.Router();




router.get('/', (req, res) => {
    res.sendFile('A4community.html', { root: './views' });
  });

  module.exports = router