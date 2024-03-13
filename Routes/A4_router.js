
const express = require('express');
const router = express.Router();
const { post_A_Discussion,deletePost} = require('../Controller/discussionsController');
const { reply_to_discussions, reload} = require('../Controller/repliesController');



router.get('/', (req, res) => {
    res.sendFile('A4community.html', { root: './views' });
  });


  // POST/DELETE REQUESTS
  router.post('/A4discussions', post_A_Discussion);
  router.post('/A4DeletePost', deletePost);
  router.post('/A4Reply',reply_to_discussions,reload);
  module.exports = router