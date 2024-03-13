
const express = require('express');
const router = express.Router();
const { post_A_Discussion, deletePost } = require('../Controller/discussionsController');
const { reply_to_discussions, reload} = require('../Controller/repliesController');


router.get('/', (req, res) => {
    res.sendFile('A7community.html', { root: './views' });
  });

  router.post('/A7discussions', post_A_Discussion);
  router.post('/A7DeletePost', deletePost);
  router.post('/A7Reply',reply_to_discussions,reload);
module.exports = router