const DB = require('./db');
const bcrypt = require('bcrypt');


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

    static securePassword(password) {
        const saltRounds = 10; // Recommended number of rounds for salt generation
        return new Promise((resolve, reject) => {
            bcrypt.hash(password.toString(), saltRounds, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
    }

    static async updatePassword(UserId,new_password)
    {
        let current_TIME = new Date();
        const hashedpassword = await Admin.securePassword(new_password);
        const sql = "UPDATE users SET Password = ?, LastUpdatedAt = ? WHERE UserId = ?";
        const values = [hashedpassword, current_TIME, UserId];

        return new Promise((resolve,reject) => 
        {
            DB.query(sql,values, (err,result) =>
            {
                if(err)
                {
                    reject(err);
                    return;
                }
                else
                {
                    resolve(result.insertId);
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