const express = require('express');

const session = require('express-session');


const bodyParser = require('body-parser');
const indexRouter = require('./Routes/Index_router'); 
const loginRouter = require('./Routes/login_router'); 
const registerRouter = require('./Routes/register_router'); 
const manage_accountRouter = require('./Routes/manage_account_router'); 
const communitiesRouter = require('./Routes/communities_router'); 
const signOutRouter = require('./Routes/signOut_router'); 



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
app.use('/signout', signOutRouter);
app.use('/register', registerRouter);
app.use('/manage-account', manage_accountRouter);

// Add this middleware function to your Express app
app.use((req, res, next) => {
  console.log('Session data:', req.session);
  next();
});


app.get('/login-status', (req, res) => {
  const isLoggedIn = req.session.isLoggedIn || false;
  res.json({ isLoggedIn });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

