// index.js

const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express(); // ✅ THIS MUST BE express()

// middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
    res.send("Hello, it is my first Express application");
});

// About route
app.get("/about", (req, res) => {
    res.send("This is basic express application");
});

// Params route
app.get("/users/:userId/books/:bookId", (req, res) => {
    res.send(req.params);
});

// Read JSON file
app.get("/GetStudents", (req, res) => {
    fs.readFile(__dirname + "/Student.json", "utf8", (err, data) => {
        res.json(JSON.parse(data));
    });
    
});

// Search student by ID
app.get("/GetStudentid/:id", (req, res) => {
    fs.readFile(__dirname + "/Student.json", "utf8", (err, data) => {
        const students = JSON.parse(data);
        const student = students["Student" + req.params.id];
        res.json(student || { message: "Student not found" });
    });
});

// Serve HTML form
app.get("/studentinfo", (req, res) => {
    res.sendFile("StudentInfo.html", { root: __dirname });
});

// Handle POST
app.post("/submit-data", (req, res) => {
    res.json({
        status: true,
        data: req.body
    });
});

// Start server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
