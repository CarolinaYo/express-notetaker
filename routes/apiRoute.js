//Dependencies
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// internal file
const noteData = require("../db/db.json");

module.exports = function (app) {
  // API GET Requests
  app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", (err, data) => {
      if (err) console.log(err);
      else {
        //return new note to the client
        let parseNote = JSON.parse(data);
        res.send(parseNote);
      }
    });
  });

  // API POST Requests
  app.post("/api/notes", function (req, res) {
    //receive new note to save on the request body
    //apply unique id:

    let newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };

    fs.readFile("./db/db.json", (err, data) => {
      if (err) console.log(err);

      let allNotes = JSON.parse(data);

      allNotes.push(newNote);

      fs.writeFile("./db/db.json", JSON.stringify(allNotes), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        //return new note to the client
        res.send(newNote);
      });
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    // Read all notes from db.json and remove note with the given id property and rewrite notes tot eh db.json file
    fs.readFile("./db/db.json", (err, data) => {
      let noteIndex;
      if (err) console.log(err);

      let allNotes = JSON.parse(data);
      allNotes.filter(function (note, index) {
        if (note.id === req.params.id) {
          noteIndex = index;
          return;
        }
      });

      allNotes.splice(noteIndex);

      fs.writeFile("./db/db.json", JSON.stringify(allNotes), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        res.sendStatus(200);
      });
    });
  });
};
