const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files such as HTML, CSS, and JavaScript
app.use(express.static('public'));

// index page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Views/index.html');
  });

// Route to handle form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  // Here you can process the form data as needed, for example, send an email, save to a database, etc.
  console.log(`Received form submission: Name: ${name}, Email: ${email}, Message: ${message}`);
  res.send('Form submitted successfully!'); // Send a response back to the client
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
