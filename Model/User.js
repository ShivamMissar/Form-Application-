const POOL = require('./db');
const md5 = require('md5');



class User
{
     //generates user id for when registering a user
    static genUserId()
    {
        let generate_user_id = Math.random().toString(36).substring(2,10);
        return generate_user_id;
    }

    static hashPassword(password)
    {
      
        let hashedPass = md5(password);
        return hashedPass;
    }


    static async register_user(userInformation)
    {
        const { Username, Email, Password } = userInformation;
        const user_id = User.genUserId();

        const sql = 'INSERT INTO users (UserId, Username, Email, Password) VALUES (?, ?, ?, ?)';
        //hash the password for better security.
        let hashedpassword = User.hashPassword(Password);
        const values = [user_id, Username, Email, hashedpassword];
        
        // Promise is a API provided by SQL which supports async methods and helps reduce code reduncy.
        return new Promise((resolve,reject) => 
        {
            POOL.query(sql,values, (err,result) =>
            {
                if(err)
                {
                    reject(err);
                    return;
                }
                else
                {
                    resolve(result.insertId); // confirms that the user has successfully registered
                }
            });
        });
    }




    static async user_login(Username,Password)
    {
        const sql = "SELECT Username, Password FROM users WHERE Username = ? AND Password = ?";
        let hashpassword = User.hashPassword(Password);
        const  values = [Username,hashpassword]; // This provides the values to the query.

        return new Promise((resolve,reject) => 
        {
            POOL.query(sql,values, (err,result) =>
            {
                if(err)
                {
                    reject(err);
                    return;
                }else
                {
                    if(result.length > 0) // if the query returns something more than 0 then it means it has found the values provided
                    {
                        resolve({success: true, user: result[0]});
                    }else
                    {
                        resolve({success:false});
                    }
                }
            });
        });

    }

    static async signOut() {
        return new Promise((resolve, reject) => {
            // End the database connection
            POOL.end((err) => {
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
}




module.exports = User;