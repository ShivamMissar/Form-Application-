// routes/manageAccountRouter.js
const express = require('express');
const {updateEmail} = require('../Controller/manageAccountController');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('manageaccounts.html', { root: './views' });
});

// router for updating email
router.post('/update-email',updateEmail); 

module.exports = router;
