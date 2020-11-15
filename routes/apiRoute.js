//dependencies
const fs = require("fs");
// internal file
const noteData = require("../db/db.json");

module.exports = function(app) {
   
    // API GET Requests

    app.get("/api/notes", function(req, res) {
        fs.readFile("./db/db.json", (err, data) => {
            if (err) 
              console.log(err); 
            else { 
                //return new note to the client
                let parseNote = JSON.parse(data);
                res.send(parseNote); 

            }      
    });
  
    // API POST Requests
    app.post("/api/notes", function(req, res) {
        //receive new note to save on the request body 
        //apply unique id:
         
        let randomId = Math.floor((Math.random() * 100) + 1); 

        let newNote = [{
            id = randomId,
            title = req.body.title,
            text = req.body.text
        }];

        fs.readFile("./db/db.json", (err, data) => {
            if (err) 
              console.log(err); 
            else { 
               
                fs.writeFile("./db/db.json", note, err => {
                    if (err) {
                      console.error(err)
                      return
                    }
                    let allNote = JSON.stringify(note);
                    newNote.push(allNote)
                  })
            //return new note to the client
                
                res.send(data); 

            }      

        })


        //add the note to db.json 
        fs.writeFile("./db/db.json", newNote, (err) => { 
            if (err) 
              console.log(err); 
            else { 
                //return new note to the client
                res.send(noteData); 
            } //????
      

       
        
      
    });
 
  
    app.delete("/api/notes/:id", function(req, res) {
      // Need to read all notes from db.json and remove note with the given id property and reqerite notes tot eh db.json file





    });
  };

