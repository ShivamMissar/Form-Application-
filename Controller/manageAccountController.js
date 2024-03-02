const User = require('../Model/User');


//  update email function
const updateEmail = async (req,res) => 
{


    const {newemail} = req.body;
    const userId = req.session.User.UserId;
    const newEmail = await User.updateEmail(userId,newemail);
    
    res.redirect('/manage-account');
};

const updatePassword = async (req, res) => 
{

};


const updateUserName = async(req, res) => 
{

};

module.exports = {updateEmail};