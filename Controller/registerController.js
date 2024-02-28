const User = require('../Model/User');



const registerUser = async(req,res) => 
{
    try
    {
        
         const { Username, Email, Password } = req.body;
         await User.register_user({ Username, Email, Password });
         return res.redirect('/login');
    
        
     } catch (err) {
         console.error('Error registering user', err);
         res.status(500).json({ error: 'Error registering user' });
     }

};


module.exports = {registerUser};