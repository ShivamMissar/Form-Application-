const DB = require('./db');
const bcrypt = require('bcrypt');

class User
{
     //generates user id for when registering a user
    static genUserId()
    {
        let generate_user_id = Math.random().toString(36).substring(2,10);
        return generate_user_id;
    }

    // use of bcrypt and hashes password more securely. 
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


    // Function for registering user.
    static async register_user(userInformation) {
        const { Username, Email, Password } = userInformation;
        const user_id = User.genUserId();
    
        try {
            const hashedPassword = await User.securePassword(Password);
            const sql = 'INSERT INTO users (UserId, Username, Email, Password) VALUES (?, ?, ?, ?)';
            const values = [user_id, Username, Email, hashedPassword];
    
            return new Promise((resolve, reject) => {
                DB.query(sql, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        
                        resolve(result.insertId);
                        console.log(result.insertId);
                    }
                });
            });
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
    

    // static async user_login(Username, Password) {
    //     const sql = "SELECT UserId, Username, Email, Password FROM users WHERE Username = ?";
    //     const values = [Username];
    //     return new Promise((resolve, reject) => {
    //         DB.query(sql, values, async (err, result) => {
    //             if (err) {
    //                 console.error('Database Error:', err);
    //                 reject(err);
    //                 return;
    //             } else {
    //                 if (result.length > 0) {
    //                     const hashedPasswordFromDB = result[0].Password; // retrieves the db value to check against current password
    //                     try {
    //                         const passwordMatch = await bcrypt.compare(Password, hashedPasswordFromDB);
    
    //                         if (passwordMatch) {
    //                             resolve({ success: true, user: result[0] }); // will get all user data and store into the user object for other uses
    //                         } else {
    //                             resolve({ success: false, message: "Incorrect password" });
    //                         }
    //                     } catch (bcryptError) {
    //                         console.error('Error comparing passwords:', bcryptError);
    //                         reject(bcryptError);
    //                     }
    //                 } else {
    //                     console.log('User not found');
    //                     resolve({ fail: false, message: "User not found" });
    //                 }
    //             }
    //         });
    //     });
    // }

    static async user_login(Username, Password) {
        const sql = "SELECT UserId, Username, Email, Password FROM users WHERE Username = ?";
        const values = [Username];
        return new Promise((resolve, reject) => {
            DB.query(sql, values, async (err, result) => {
                if (err) {
                    console.error('Database Error:', err);
                    reject(err);
                    return;
                } else {
                    if (result.length > 0) {
                        const hashedPasswordFromDB = result[0].Password;
                        try {
                            const passwordMatch = await bcrypt.compare(Password, hashedPasswordFromDB);
    
                            if (passwordMatch) {
                                resolve({ success: true, user: result[0] });
                            } else {
                                resolve({ success: false, message: "Incorrect password" });
                            }
                        } catch (bcryptError) {
                            console.error('Error comparing passwords:', bcryptError);
                            reject(bcryptError);
                        }
                    } else {
                        console.log('User not found');
                        resolve({ success: false, message: "User not found" });
                    }
                }
            });
        });
    }
    
    

    static async signOut() {
        return new Promise((resolve, reject) => {
            // End the database connection
            DB.end((err) => {
                if (err) {
                    console.error('Error ending database connection: ' + err.stack);
                    reject(err);
                    return;
                }
                console.log('Database connection ended');
                resolve({ success: true });
            });
        });
    }

    static async updateEmail(UserId,new_email)
    {

        let current_TIME = new Date();
        const sql = "UPDATE users SET Email = ?, LastUpdatedAt = ? WHERE UserId = ?";
        const values = [new_email, current_TIME, UserId];

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


    static async updatePassword(UserId,new_password)
    {
        let current_TIME = new Date();
        const hashedpassword = await User.securePassword(new_password);
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


    static async updateUsername(UserId,_new_username)
    {
        let current_TIME = new Date();
    
        const sql = "UPDATE users SET Username = ?, LastUpdatedAt = ? WHERE UserId = ?";
        const values = [_new_username, current_TIME, UserId];

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
}
module.exports = User;