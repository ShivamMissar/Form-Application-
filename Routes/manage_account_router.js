// routes/manageAccountRouter.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('manage-account.html', { root: './views' });
});

module.exports = router;
