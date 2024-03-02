const { log } = require('console');
const User = require('../Model/User');
const path = require('path');


const get_login_data = (req,res) => {res.sendFile('login.html', {root: './views'})};



const logUserIn = async(req,res) => 
{
    const { Username, Password } = req.body;
    

    try
    {
        const login_confirmation = await User.user_login(Username, Password);

        if(!login_confirmation)
        {
            return res.status(401).json({message: 'Invalid Username or password'});
        }
        else
        {
            req.session.isLoggedIn = true;
            req.session.User = login_confirmation.user; 
            const userDataQueryString = encodeURIComponent(JSON.stringify(login_confirmation));
           // goes back to the index page
           return res.redirect(`/?loggedIn=true&userData=${userDataQueryString}`);
        }
    } catch (error) 
    {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {logUserIn};