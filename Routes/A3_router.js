
const express = require('express');
const router = express.Router();
const { post_A_Discussion, deletePost } = require('../Controller/discussionsController');
const { reply_to_discussions, reload} = require('../Controller/repliesController');


router.get('/', (req, res) => {
    res.sendFile('A3community.html', { root: './views' });
  });

  router.post('/A3discussions', post_A_Discussion);
  router.post('/A4DeletePost', deletePost);
  router.post('/A3Reply',reply_to_discussions,reload);
module.exports = router