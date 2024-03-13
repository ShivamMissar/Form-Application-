
const express = require('express');
const router = express.Router();
const { post_A_Discussion, deletePost } = require('../Controller/discussionsController');
const { reply_to_discussions, reload} = require('../Controller/repliesController');


router.get('/', (req, res) => {
    res.sendFile('Q3community.html', { root: './views' });
  });
  // POST/DELETE REQUESTS
  router.post('/Q3discussions', post_A_Discussion);
  router.post('/Q3DeletePost', deletePost);
  router.post('/Q3Reply',reply_to_discussions,reload);

module.exports = router