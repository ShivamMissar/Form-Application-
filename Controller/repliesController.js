

const Replies = require('../Model/Reply');

const reload = (req,res,next) => {res.redirect(req.orginalUrl);}; 

const reply_to_discussions = async(req, res) => 
{
    const{ReplyMessage,discussionId} = req.body;
    const Username = req.session.User.Username;

    try
    {
        await Replies.replyToUser({ReplyMessage,discussionId,Username});
        res.redirect('/A4');
    }catch(error)
    {
        console.log('Error posting reply:', error)
        res.status(500).json({ error: 'server error' });
    };
}


const get_reply_to_discussion = async (discussionId) => {
    const replies = await Replies.getReply(discussionId);
    return replies;
}


module.exports = {reply_to_discussions,get_reply_to_discussion,reload};