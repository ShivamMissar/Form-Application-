const express = require('express');

const session = require('express-session');

const discussionsController = require('./Controller/discussionsController');

const bodyParser = require('body-parser');

// Routes to diffrent pages
const indexRouter = require('./Routes/Index_router'); 
const loginRouter = require('./Routes/login_router'); 
const registerRouter = require('./Routes/register_router'); 
const manage_accountRouter = require('./Routes/manage_account_router'); 
const communitiesRouter = require('./Routes/communities_router'); 
const signOutRouter = require('./Routes/signOut_router'); 

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
  res.json({ isLoggedIn });
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


app.get('/api/discussionsA4', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("A4");
      const discussionsJSON = discussions.map(discussion => ({
          Username: discussion.Username,
          Title: discussion.Title,
          Description: discussion.Description
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/discussionsA1', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("A1");
      const discussionsJSON = discussions.map(discussion => ({
          Username: discussion.Username,
          Title: discussion.Title,
          Description: discussion.Description
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/discussionsA3', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("A3");
      const discussionsJSON = discussions.map(discussion => ({
          Username: discussion.Username,
          Title: discussion.Title,
          Description: discussion.Description
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/discussionsA5', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("A5");
      const discussionsJSON = discussions.map(discussion => ({
          Username: discussion.Username,
          Title: discussion.Title,
          Description: discussion.Description
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/discussionsA6', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("A6");
      const discussionsJSON = discussions.map(discussion => ({
          Username: discussion.Username,
          Title: discussion.Title,
          Description: discussion.Description
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/discussionsA7', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("A7");
      const discussionsJSON = discussions.map(discussion => ({
          Username: discussion.Username,
          Title: discussion.Title,
          Description: discussion.Description
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/discussionsA8', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("A8");
      const discussionsJSON = discussions.map(discussion => ({
          Username: discussion.Username,
          Title: discussion.Title,
          Description: discussion.Description
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/discussionsQ3', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("Q3");
      const discussionsJSON = discussions.map(discussion => ({
          Username: discussion.Username,
          Title: discussion.Title,
          Description: discussion.Description
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/discussionsQ5', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("Q5");
      const discussionsJSON = discussions.map(discussion => ({
          Username: discussion.Username,
          Title: discussion.Title,
          Description: discussion.Description
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/discussionsQ7', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("Q7");
      const discussionsJSON = discussions.map(discussion => ({
          Username: discussion.Username,
          Title: discussion.Title,
          Description: discussion.Description
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/discussionsQ8', async (req, res) => {
  try {
      const discussions = await discussionsController.getAllDiscussionsForModel("Q8");
      const discussionsJSON = discussions.map(discussion => ({
          Username: discussion.Username,
          Title: discussion.Title,
          Description: discussion.Description
      }));
      res.json(discussionsJSON);
  } catch (error) {
      console.error('Error fetching discussions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

