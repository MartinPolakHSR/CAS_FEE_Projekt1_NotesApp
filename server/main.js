const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const notesRouter = require('./notes-router');

// Middleware to serve static files
app.use(express.static('app'));

// Middleware that only parses url encoded bodies
// Set extended to false to return a key-value pairs object
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware that only parses json and only looks at requests where the Content-Type
// header matches the type option
app.use(bodyParser.json());

// Add a router for notes
app.use('/notes', notesRouter);

app.get('/favicon.ico', function(req, res) {
    res.status(204);
});



app.listen(3000, function () {
    console.log('Note App listening on port 3000!');
});