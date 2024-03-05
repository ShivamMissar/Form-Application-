
const POOL = require('./db');



class Discussions
{

    static genDiscussionId()
    {
        let generate_disccussion_id = Math.random().toString(36).substring(2,10);
        return generate_disccussion_id;
    }


    static async postDiscussionToDatabase(postInformation, userId) {
        const { Title, description, modelType } = postInformation;
    
        let discussionId = this.genDiscussionId(); 
    
        const SQL = "INSERT INTO posts (DiscussionId, UserId, Title, Description, ModelType) VALUES (?, ?, ?, ?, ?)";
        const VALUES = [discussionId, userId, Title, description, modelType];
    
        return new Promise((resolve, reject) => {
            POOL.query(SQL, VALUES, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId); 
                }
            });
        });
    }
    
     
}

module.exports = Discussions;