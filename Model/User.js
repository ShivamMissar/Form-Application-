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
        const { Username, Email, Password } = userInformation; // gets the data from the frontend 
        const user_id = User.genUserId(); // this generates a unique ID when storing into the database. 

        // creates a SQL statement to send the data into the database
        const sql = 'INSERT INTO users (UserId, Username, Email, Password) VALUES (?, ?, ?, ?)';
        //hash the password for better security.
        let hashedpassword = User.hashPassword(Password); // hashes the password using MD5 hashing method
        const values = [user_id, Username, Email, hashedpassword]; // provides the values to the SQL statement
        
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
        const sql = "SELECT UserId,Username, Email, Password FROM users WHERE Username = ? AND Password = ?";
        let hashpassword = User.hashPassword(Password); // has to hash the password to compare against values in the database.
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
                        resolve({success: true, user: result[0]}); // stores the user data found first if matched in result
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

    static async updateEmail(UserId,new_email)
    {

        let current_TIME = new Date();
        const sql = "UPDATE users SET Email = ?, LastUpdatedAt = ? WHERE UserId = ?";
        const values = [new_email, current_TIME, UserId];

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
                    resolve(result.insertId);
                }
            });
        });
    }


    static async updatePassword(new_password,UserId)
    {
        let current_TIME = new Date();
        const hashedpassword = md5(new_password);
        const sql = "UPDATE users SET Password = ?, LastUpdatedAt = ? WHERE UserId = ?";
        const values = [hashedpassword, current_TIME, UserId];

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
                    resolve(result.insertId);
                }
            });
        });
    }


    static async updateUsername(_new_username, UserId)
    {
        let current_TIME = new Date();
    
        const sql = "UPDATE users SET Username = ?, LastUpdatedAt = ? WHERE UserId = ?";
        const values = [_new_username, current_TIME, UserId];

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
                    resolve(result.insertId);
                }
            });
        });
    }
}




module.exports = User;