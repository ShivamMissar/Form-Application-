// routes/registerRouter.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('register.html', { root: './views' });
});

module.exports = router;
