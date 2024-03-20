const DB = require('./db');


class Admin
{


    static async viewAllUsers() 
    {
        const SQL = 'SELECT UserId, Username, Email FROM users';
        return new Promise((resolve, reject) => 
        {
            DB.query(SQL, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }


    static async deleteUserById(userId)
    {
        const SQL = 'DELETE FROM users WHERE UserId = ?';
        const VALUE = [userId];

        return new Promise((resolve, reject) => 
        {
            DB.query(SQL, VALUE, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}



module.exports = Admin;