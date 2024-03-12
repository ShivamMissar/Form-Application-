const POOL = require('./db');

class Reply
{
    static genReplyId()
    {
        let generate_disccussion_id = Math.random().toString(36).substring(2,10);
        return generate_disccussion_id;
    }
   
    static async replyToUser(reply)
    {
        const {ReplyMessage,discussionId,Username} = reply;
        let replyId = this.genReplyId();


        const SQL = "INSERT INTO reply (ReplyId, DiscussionId, Username, message) VALUES (?, ?, ?, ?)";
        const VALUES = [replyId, discussionId, Username,ReplyMessage];
    
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
    
     //this class will query the reply for visual display
     static async getReply(discussionId) {
        const SQL = "SELECT Username, message FROM reply WHERE DiscussionId = ?";
        const VALUES = [discussionId];
    
        return new Promise((resolve, reject) => {
            POOL.query(SQL, VALUES, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result); 
                }
            });
        });
    }
    

}
module.exports = Reply;