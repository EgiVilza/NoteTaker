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
    //Grabs the object array data from the json from and puts it into a variable
    let getFile = JSON.parse(fs.readFileSync("./db/db.json", "utf8")) 

    //Grabs the note data from the html body
    let newNote = req.body

    //Note id based on getFile length
    let noteID = getFile.length

    //Adds id onto the note object
    newNote.id = noteID

    //Pushes new note to the getFile array
    getFile.push(newNote)

    //Adds updated object array onto the JSON file
    fs.writeFile("./db/db.json", JSON.stringify(getFile), (err) => {
        if (err) {
            console.log(err)
        }
    })

    console.log("Writing to the file worked")
    res.json(getFile)
})

app.delete(`/api/notes/:id`, (req, res) => {
    //Grabs the object array data from the json from and puts it into a variable
    let getFile = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))

    //Grabs the id
    let noteID = req.params.id

    //Deletes the element in the getFile array
    getFile.splice(noteID, 1)

    //Calls the new ElementID Function
    newElementID()
    
    //Once a element gets deleted, new ids are created to match their index in the array
    function newElementID() {
        //This is to recreate the new ID for each element on the object array
        let newID = 0

        getFile.forEach(element => {
            element.id = newID
            newID++
        });
    }

    //Adds updated object array onto the JSON file
    fs.writeFile("./db/db.json", JSON.stringify(getFile), (err) => {
        if (err) {
            console.log(err)
        }
    })

    console.log("Note Deleted")
    res.json(getFile)
})

//Starts Server
app.listen(PORT, function() {
    console.log(`Now listening to port ${PORT}.`);
})