const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");

const app = express();

// cors
app.use(cors({ origin: true, credentials: true }));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
const books = require("./routes/api/books");
app.use("/api/books", books);
const port = process.env.PORT || 5000;

//Accessing path module
const path = require("path");
app.use(express.static(path.resolve(__dirname, "./books/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./books/build", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
