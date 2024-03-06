
const express = require('express');
const router = express.Router();
const { post_A_Discussion, getAllDiscussionsForModel } = require('../Controller/discussionsController');


router.get('/', (req, res) => {
    res.sendFile('A7community.html', { root: './views' });
  });

  router.post('/A7discussions', post_A_Discussion);

  // gets the posts made for A1 model
  router.get('/discussions', async (req, res) => {
    try {
        const modelType = 'A7';
        const discussions = await getAllDiscussionsForModel(modelType);
        res.json(discussions);
    } catch (error) {
        console.error('Error fetching discussions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router