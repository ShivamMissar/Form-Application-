
const express = require('express');
const router = express.Router();
const { post_A_Discussion,deletePost} = require('../Controller/discussionsController');



router.get('/', (req, res) => {
    res.sendFile('A4community.html', { root: './views' });
  });

  router.post('/A4discussions', post_A_Discussion);
  router.post('/A4DeletePost', deletePost);


  module.exports = router