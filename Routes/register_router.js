// routes/registerRouter.js
const express = require('express');
const { registerUser } = require('../Controller/registerController');
const router = express.Router();

// GET request to render the registration form
router.get('/', (req, res) => {
  res.sendFile('register.html', { root: './views' });
});

// POST request to handle user registration
router.post('/', registerUser); // pass the function reference without calling it

module.exports = router;
