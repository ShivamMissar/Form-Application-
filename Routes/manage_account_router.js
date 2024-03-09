// routes/manageAccountRouter.js
const express = require('express');
const {updateEmail,updatePassword, update_UserName} = require('../Controller/manageAccountController');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('manageaccounts.html', { root: './views' });
});

// router for updating email

router.post('/update-email',updateEmail); 
router.post('/update-password',updatePassword); 
router.post('/update-username',update_UserName); 

module.exports = router;
