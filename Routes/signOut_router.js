
const express = require('express');
const router = express.Router();
const User = require('../Model/User');

router.get('/', async (req, res) => 
{

    await User.signOut();
    req.session.isLoggedIn = false; // set it to false so it logs the user out removes their data from session 
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.redirect('/login');
    });
});

module.exports = router