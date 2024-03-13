
const express = require('express');
const router = express.Router();
const { post_A_Discussion, deletePost } = require('../Controller/discussionsController');
const { reply_to_discussions, reload} = require('../Controller/repliesController');


router.get('/', (req, res) => {
    res.sendFile('A8community.html', { root: './views' });
  });
  // POST/DELETE REQUESTS
  router.post('/A8discussions', post_A_Discussion);
  router.post('/A8DeletePost', deletePost);
  router.post('/A8Reply',reply_to_discussions,reload);

module.exports = router