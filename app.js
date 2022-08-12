const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

//Accessing path module
const path = require("path");
app.use(express.static(path.resolve(__dirname, "./books/build")));
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./books/build", "index.html"));
});
// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));