const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./Routes/Index_router'); 
const loginRouter = require('./Routes/login_router'); 
const registerRouter = require('./Routes/register_router'); 
const manage_accountRouter = require('./Routes/manage_account_router'); 
const communitiesRouter = require('./Routes/communities_router'); 


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files such as HTML, CSS, and JavaScript
app.use(express.static('public'));

// index page
app.use('/',indexRouter);


app.use('/communities', communitiesRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/manage-account', manage_accountRouter);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
