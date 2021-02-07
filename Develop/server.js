const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Route to notes.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))

//Routes index.html as the main directory
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

//test
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, "/db/db.json")))










//Starts Server
app.listen(PORT, function() {
    console.log(`Now listening to port ${PORT}.`);
})