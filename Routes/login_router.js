
// routes/loginRouter.js
const express = require('express');
const { logUserIn } = require('../Controller/loginController');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('login.html', { root: './views' });
});

router.post('/',logUserIn);

module.exports = router;
