const express = require('express');

const session = require('express-session');

const discussionsController = require('./Controller/discussionsController');
const repliessController = require('./Controller/repliesController');
const adminController = require('./Controller/adminController');

const bodyParser = require('body-parser');

// Routes to diffrent pages
const indexRouter = require('./Routes/Index_router'); 
const loginRouter = require('./Routes/login_router'); 
const registerRouter = require('./Routes/register_router'); 
const manage_accountRouter = require('./Routes/manage_account_router'); 
const communitiesRouter = require('./Routes/communities_router'); 
const signOutRouter = require('./Routes/signOut_router'); 
const adminRouter = require('./Routes/Admin_router');

const a1CommunityRouter = require('./Routes/A1_router');
const a3CommunityRouter = require('./Routes/A3_router');
const a4CommunityRouter = require('./Routes/A4_router');
const a5CommunityRouter = require('./Routes/A5_router');
const a6CommunityRouter = require('./Routes/A6_router');
const a7CommunityRouter = require('./Routes/A7_router');
const a8CommunityRouter = require('./Routes/A8_router');
const q3CommunityRouter = require('./Routes/Q3_router');
const q5CommunityRouter = require('./Routes/Q5_router');
const q7CommunityRouter = require('./Routes/Q7_router');
const q8CommunityRouter = require('./Routes/Q8_router');





const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files such as HTML, CSS, and JavaScript
app.use(express.static('public'));

app.use(session({
  secret: 'audiForm', 
  resave: false,
  saveUninitialized: true
}));





// index page
app.use('/',indexRouter);


app.use('/communities', communitiesRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);

//routers for all the models
app.use('/A1', a1CommunityRouter);
app.use('/A3', a3CommunityRouter);
app.use('/A4', a4CommunityRouter);
app.use('/A5', a5CommunityRouter);
app.use('/A6', a6CommunityRouter);
app.use('/A7', a7CommunityRouter);
app.use('/A8', a8CommunityRouter);
app.use('/Q3', q3CommunityRouter);
app.use('/Q5', q5CommunityRouter);
app.use('/Q7', q7CommunityRouter);
app.use('/Q8', q8CommunityRouter);







app.use('/signout', signOutRouter);
app.use('/register', registerRouter);
app.use('/manage-account', manage_accountRouter);

// Add this middleware function to your Express app
app.use((req, res, next) => {
  console.log('Session data:', req.session);
  next();
});

// this gets the session data for the flag
app.get('/login-status', (req, res) => {
  const isLoggedIn = req.session.isLoggedIn || false;
  const getUserInformation = req.session.User;
  res.json({ isLoggedIn, getUserInformation});
});


app.get('/profile', (req, res) => 
{

  if (req.session.isLoggedIn) // if the user is logged in, it will retrieve the details about the user through the session
  {
    const userInformation = req.session.user;

    res.render('manageaccount', {user});
  }else
  {
    res.redirect('/login');
  }

});



//GET FOR A4 MODEL
app.get('/api/discussionsA4', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("A4", req);

      
      const discussionsJSON = discussions.map(discussion => ({
          discussionId : discussion.DiscussionId, 
          userId: discussion.UserId,
          username: discussion.Username,
          title: discussion.Title,
          description: discussion.Description,
          userInformation : req.session.User
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/discussionsA4/:discussionId/replies', async (req, res) => {
  try {
      const discussionId = req.params.discussionId;
      // Call the controller function to fetch replies for the given discussionId
      const replies = await repliessController.get_reply_to_discussion(discussionId);
      res.json(replies);
  } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


//GET FOR A1 MODEL
app.get('/api/discussionsA1', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("A1", req);

      
      const discussionsJSON = discussions.map(discussion => ({
          discussionId : discussion.DiscussionId, 
          userId: discussion.UserId,
          username: discussion.Username,
          title: discussion.Title,
          description: discussion.Description,
          userInformation : req.session.User
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/discussionsA1/:discussionId/replies', async (req, res) => {
  try {
      const discussionId = req.params.discussionId;
      // Call the controller function to fetch replies for the given discussionId
      const replies = await repliessController.get_reply_to_discussion(discussionId);
      res.json(replies);
  } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});





//GET FOR A3 MODEL
app.get('/api/discussionsA3', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("A3", req);

      
      const discussionsJSON = discussions.map(discussion => ({
          discussionId : discussion.DiscussionId, 
          userId: discussion.UserId,
          username: discussion.Username,
          title: discussion.Title,
          description: discussion.Description,
          userInformation : req.session.User
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/discussionsA3/:discussionId/replies', async (req, res) => {
  try {
      const discussionId = req.params.discussionId;
      // Call the controller function to fetch replies for the given discussionId
      const replies = await repliessController.get_reply_to_discussion(discussionId);
      res.json(replies);
  } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

//GET FOR A5 MODEL
app.get('/api/discussionsA5', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("A5", req);

      
      const discussionsJSON = discussions.map(discussion => ({
          discussionId : discussion.DiscussionId, 
          userId: discussion.UserId,
          username: discussion.Username,
          title: discussion.Title,
          description: discussion.Description,
          userInformation : req.session.User
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/discussionsA5/:discussionId/replies', async (req, res) => {
  try {
      const discussionId = req.params.discussionId;
      // Call the controller function to fetch replies for the given discussionId
      const replies = await repliessController.get_reply_to_discussion(discussionId);
      res.json(replies);
  } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

//GET FOR A6 MODEL
app.get('/api/discussionsA6', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("A6", req);

      
      const discussionsJSON = discussions.map(discussion => ({
          discussionId : discussion.DiscussionId, 
          userId: discussion.UserId,
          username: discussion.Username,
          title: discussion.Title,
          description: discussion.Description,
          userInformation : req.session.User
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/discussionsA6/:discussionId/replies', async (req, res) => {
  try {
      const discussionId = req.params.discussionId;
      // Call the controller function to fetch replies for the given discussionId
      const replies = await repliessController.get_reply_to_discussion(discussionId);
      res.json(replies);
  } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

//GET FOR A7 MODEL
app.get('/api/discussionsA7', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("A7", req);

      
      const discussionsJSON = discussions.map(discussion => ({
          discussionId : discussion.DiscussionId, 
          userId: discussion.UserId,
          username: discussion.Username,
          title: discussion.Title,
          description: discussion.Description,
          userInformation : req.session.User
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/discussionsA7/:discussionId/replies', async (req, res) => {
  try {
      const discussionId = req.params.discussionId;
      // Call the controller function to fetch replies for the given discussionId
      const replies = await repliessController.get_reply_to_discussion(discussionId);
      res.json(replies);
  } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


//GET FOR A8 MODEL
app.get('/api/discussionsA8', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("A8", req);

      
      const discussionsJSON = discussions.map(discussion => ({
          discussionId : discussion.DiscussionId, 
          userId: discussion.UserId,
          username: discussion.Username,
          title: discussion.Title,
          description: discussion.Description,
          userInformation : req.session.User
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/discussionsA8/:discussionId/replies', async (req, res) => {
  try {
      const discussionId = req.params.discussionId;
      // Call the controller function to fetch replies for the given discussionId
      const replies = await repliessController.get_reply_to_discussion(discussionId);
      res.json(replies);
  } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


//GET FOR Q3 MODEL
app.get('/api/discussionsQ3', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("Q3", req);

      
      const discussionsJSON = discussions.map(discussion => ({
          discussionId : discussion.DiscussionId, 
          userId: discussion.UserId,
          username: discussion.Username,
          title: discussion.Title,
          description: discussion.Description,
          userInformation : req.session.User
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/discussionsQ3/:discussionId/replies', async (req, res) => {
  try {
      const discussionId = req.params.discussionId;
      // Call the controller function to fetch replies for the given discussionId
      const replies = await repliessController.get_reply_to_discussion(discussionId);
      res.json(replies);
  } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

//GET FOR Q5 MODEL
app.get('/api/discussionsQ5', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("Q5", req);

      
      const discussionsJSON = discussions.map(discussion => ({
          discussionId : discussion.DiscussionId, 
          userId: discussion.UserId,
          username: discussion.Username,
          title: discussion.Title,
          description: discussion.Description,
          userInformation : req.session.User
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/discussionsQ5/:discussionId/replies', async (req, res) => {
  try {
      const discussionId = req.params.discussionId;
      // Call the controller function to fetch replies for the given discussionId
      const replies = await repliessController.get_reply_to_discussion(discussionId);
      res.json(replies);
  } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

//GET FOR Q7 MODEL
app.get('/api/discussionsQ7', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("Q7", req);

      
      const discussionsJSON = discussions.map(discussion => ({
          discussionId : discussion.DiscussionId, 
          userId: discussion.UserId,
          username: discussion.Username,
          title: discussion.Title,
          description: discussion.Description,
          userInformation : req.session.User
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/discussionsQ7/:discussionId/replies', async (req, res) => {
  try {
      const discussionId = req.params.discussionId;
      // Call the controller function to fetch replies for the given discussionId
      const replies = await repliessController.get_reply_to_discussion(discussionId);
      res.json(replies);
  } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


//GET FOR Q8 MODEL
app.get('/api/discussionsQ8', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("Q8", req);

      
      const discussionsJSON = discussions.map(discussion => ({
          discussionId : discussion.DiscussionId, 
          userId: discussion.UserId,
          username: discussion.Username,
          title: discussion.Title,
          description: discussion.Description,
          userInformation : req.session.User
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/discussionsQ8/:discussionId/replies', async (req, res) => {
  try {
      const discussionId = req.params.discussionId;
      // Call the controller function to fetch replies for the given discussionId
      const replies = await repliessController.get_reply_to_discussion(discussionId);
      res.json(replies);
  } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});



// Route to fetch user list for admin
app.get('/api/admin/users', async (req, res) => {
  try {
    const userList = await adminController.getuserlist();
    res.json(userList);
  } catch (error) {
    console.error('Error fetching user list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

