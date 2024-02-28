
const express = require('express');
const router = express.Router();
const User = require('../Model/User');

// Route for signout
router.get('/', async (req, res) => 
{

    await User.signOut();
    // Set isLoggedIn to false
    req.session.isLoggedIn = false;

    // Destroy the session to clear user's login status
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        // Redirect the user to the login page after signing out
        res.redirect('/login'); // Update with your login page URL
    });
});

module.exports = router