
const { query } = require('express');
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





   
    static async getAllDiscussions(discussionsForModel) {
        const SQL = "SELECT posts.DiscussionId, posts.UserId, users.Username, posts.Title, posts.Description FROM users, posts WHERE posts.UserId = users.UserId AND ModelType = ?";
        const VALUES = [discussionsForModel];
    
        return new Promise((resolve, reject) => {
            POOL.query(SQL, VALUES, (err, result) => {
                if (err) 
                {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }



    static async deletePostById(Id)
    {

       
        const SQL = "DELETE FROM POSTS WHERE DiscussionId = ?";
        const VALUE = [Id];
        return new Promise((resolve, reject) => {
            POOL.query(SQL, VALUE, (err, result) => {
                if (err) 
                {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
}

module.exports = Discussions;