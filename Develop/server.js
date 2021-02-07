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
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

//Reads the db.json file and return all saved notes as JSON
app.get(`/api/notes`, (req, res) => res.sendFile(path.join(__dirname, "/db/db.json")))

app.post(`/api/notes`, (req, res) => {
    let readFile = JSON.parse(fs.readFileSync("./db/db.json", "utf8")) 
    let newNote = req.body
    let noteID = readFile.length
    let noteIDString = noteID.toString()
    newNote.id = noteIDString
    readFile.push(newNote)

    fs.writeFile("./db/db.json", JSON.stringify(readFile), (err) => {
        if (err) {
            console.log(err)
        }
    })

    console.log("Writing to the file worked")
    res.json(readFile)
})

app.delete(`/api/notes/:id`, (req, res) => {

})

//[{"title":"Test Title","text":"Test text"}]



//Starts Server
app.listen(PORT, function() {
    console.log(`Now listening to port ${PORT}.`);
})