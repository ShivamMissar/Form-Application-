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
    const {newPassword} = req.body;
    const userId = req.session.User.UserId;
    const newPasswordUpdate = await User.updatePassword(userId,newPassword); 

    res.redirect('/manage-account');
};


const update_UserName = async(req, res) => 
{
    const {newUsername} = req.body;
    const userId = req.session.User.UserId;
    const newUsernameUpdate = await User.updateUsername(userId,newUsername); 
    res.redirect('/manage-account');
};




module.exports = {updateEmail,updatePassword,update_UserName};