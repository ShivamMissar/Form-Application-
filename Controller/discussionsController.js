const Discussions = require('../Model/Discussions');



const post_A_Discussion = async(req,res) => 
{

    const {Title, description, modelType} = req.body;
    const userId = req.session.User.UserId;
    try
    {
       await Discussions.postDiscussionToDatabase({Title, description, modelType}, userId);
        res.status(201).json({ message: 'Discussion created successfully'});
    } catch (error) {
        console.error('Error posting discussion:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {post_A_Discussion};