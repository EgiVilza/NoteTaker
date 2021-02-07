const fs = require("fs");
//let readFile = JSON.parse(fs.readFileSync("./db/db.json", "utf8")) 


let notesArray = []
//let readFile = JSON.parse(fs.readFileSync("./db/db.json", "utf8")) 
let newNote = {"title":"Did it worked?","text":"I hope so"}
let newNote2 = "test"
let noteID = notesArray.length + 1
let noteIDString = noteID.toString()
newNote.id = noteIDString
notesArray.push(newNote)

fs.writeFile("./db/db.json", JSON.stringify(notesArray), (err) => {
    if (err) {
        console.log(err)
    }
})

console.log("Writing the file worked")
//res.json(readFile)
//console.log(readFile)