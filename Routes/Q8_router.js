
const express = require('express');
const router = express.Router();
const { post_A_Discussion, deletePost } = require('../Controller/discussionsController');
const { reply_to_discussions, reload} = require('../Controller/repliesController');


router.get('/', (req, res) => {
    res.sendFile('Q8community.html', { root: './views' });
  });

  router.post('/Q8discussions', post_A_Discussion);
  router.post('/AQ8DeletePost', deletePost);
  router.post('/Q8Reply',reply_to_discussions,reload);

module.exports = router