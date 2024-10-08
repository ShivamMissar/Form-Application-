const { log } = require('console');
const User = require('../Model/User');
const path = require('path');


const get_login_data = (req,res) => {res.sendFile('login.html', {root: './views'})};



const logUserIn = async(req,res) => 
{
    const { Username, LoginPassword } = req.body;
    

    try
    {
        const login_confirmation = await User.user_login(Username, LoginPassword);

        if(login_confirmation.success) // if the return from the promise is success i.e., true it will execute 
        {
            req.session.isLoggedIn = true;
            req.session.User = login_confirmation.user; 
            const userDataQueryString = encodeURIComponent(JSON.stringify(login_confirmation));
           // goes back to the index page
           return res.redirect(`/?loggedIn=true&userData=${userDataQueryString}`);
        
        }
        else
        {
            return res.sendFile(path.join(__dirname, '../views/login.html'), {
                errorMessage: 'Invalid Username or password'
            });
        }
    } catch (error) 
    {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {logUserIn};