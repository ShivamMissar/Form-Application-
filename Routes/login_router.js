
// routes/loginRouter.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('login.html', { root: './views' });
});

module.exports = router;
