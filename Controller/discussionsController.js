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


const getAllDiscussionsForModel = async (car_model) => {
    try {
        const discussions = await Discussions.getAllDiscussions(car_model);
        const formattedDiscussions = discussions.map(row => {
            return {
                Username: row.Username,
                Title: row.Title,
                Description: row.Description
            };
        });
        return formattedDiscussions;
    } catch (error) {
        console.error('Error fetching discussions:', error);
        throw error; // Propagate the error to the caller
    }
};






module.exports = {post_A_Discussion, getAllDiscussionsForModel};