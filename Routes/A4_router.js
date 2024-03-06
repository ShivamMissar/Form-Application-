
const express = require('express');
const router = express.Router();
const { post_A_Discussion, getAllDiscussionsForModel } = require('../Controller/discussionsController');



router.get('/', (req, res) => {
    res.sendFile('A4community.html', { root: './views' });
  });

  router.post('/A4discussions', post_A_Discussion);

  // gets the posts made for A4 model
  router.get('/discussions', async (req, res) => {
    try {
        const modelType = 'A4';
        const discussions = await getAllDiscussionsForModel(modelType);
        res.json(discussions);
    } catch (error) {
        console.error('Error fetching discussions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

  


  module.exports = router