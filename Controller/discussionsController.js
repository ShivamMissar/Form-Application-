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


const getAllDiscussionsForModel = async (car_model, req) => {
    try {
        const discussions = await Discussions.getAllDiscussions(car_model);
        const formattedDiscussions = discussions.map(row => {
            return {
                DiscussionId: row.DiscussionId,
                UserId: row.UserId,
                Username: row.Username,
                Title: row.Title,
                Description: row.Description
            };
        });
        req.session.Discussions = req.session.Discussions || [];
        req.session.Discussions = req.session.Discussions.concat(formattedDiscussions); // Store discussions in the session
        return formattedDiscussions;
    } catch (error) {
        console.error('Error fetching discussions:', error);
        throw error; 
    }
};


const deletePost = async (req,res) => 
{
    
    try
    {
        const {discussionId} = req.body;
        const find_and_delete = await Discussions.deletePostById(discussionId);
        if(find_and_delete)
        {
            res.status(201).json({ message: 'Discussion deleted successfully'});
        }
    }catch(error)
    {
        console.error('Error fetching discussions:', error);
        throw error; 
    };
};







module.exports = {post_A_Discussion, getAllDiscussionsForModel, deletePost};