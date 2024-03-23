const express = require('express');
const { deleteUser,updatePasswordForUser } = require('../Controller/adminController');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('admincorner.html', { root: './views' });
});

router.post('/deleteUser',deleteUser);
router.post('/UpdatePassword',updatePasswordForUser);


module.exports = router;