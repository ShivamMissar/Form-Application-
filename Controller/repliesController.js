

const Replies = require('../Model/Reply');



const reply_to_discussions = async(req, res) => 
{
    const{ReplyMessage,discussionId,Username} = req.body;

    try
    {
        await Replies.replyToUser({ReplyMessage,discussionId,Username});
        // res.redirect('/communties');
    }catch(error)
    {
        console.log('Error posting reply:', error)
        res.status(500).json({ error: 'server error' });
    };
}


const get_reply_to_discussion = async (discussionId) => {
    const replies = await Replies.getReply(discussionId);
    return replies; // Send the fetched replies
}


module.exports = {reply_to_discussions,get_reply_to_discussion};