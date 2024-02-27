const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req, res) => {
    // Use path.join to construct the correct file path
    res.sendFile(path.join(__dirname, '../Views/index.html'));
  });




module.exports = router;