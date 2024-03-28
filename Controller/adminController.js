const adminModel = require('../Model/admin');
const userModel = require('../Model/User');


const getuserlist = async (req, res) => {
    try {
        const userList = await adminModel.viewAllUsers();
        const formattedUserList = userList.map(row => {
            return {
                UserId: row.UserId,
                Username: row.Username,
                Email: row.Email
            };
        });
        return formattedUserList;
    } catch (error) {
        console.error('Error fetching user list:', error);
        throw error;
    }
}

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const find_and_delete = await adminModel.deleteUserById(userId);
        if (find_and_delete) {
            return res.redirect('/admin');
        }
    } catch (error) {
        console.error('Error fetching discussions:', error);
        throw error;
    };
};

const updatePasswordForUser = async (req, res) => 
{
    const {newPassword,userId} = req.body;
    await userModel.updatePassword(userId,newPassword); 
    return res.redirect('/admin');
};


module.exports = { getuserlist, deleteUser,updatePasswordForUser };


