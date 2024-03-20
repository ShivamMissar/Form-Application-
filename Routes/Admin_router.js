const express = require('express');
const { deleteUser } = require('../Controller/adminController');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('admincorner.html', { root: './views' });
});

router.post('/',deleteUser);

module.exports = router;