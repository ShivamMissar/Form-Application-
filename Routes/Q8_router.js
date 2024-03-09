
const express = require('express');
const router = express.Router();
const { post_A_Discussion, getAllDiscussionsForModel } = require('../Controller/discussionsController');


router.get('/', (req, res) => {
    res.sendFile('Q8community.html', { root: './views' });
  });

  router.post('/Q8discussions', post_A_Discussion);

module.exports = router