//Dependencies
const express = require("express");


const app = express();

//Set initial PORT
const PORT = process.env.PORT || 3000;

//Set up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Router
// require("./routes/apiRoute")(app);
require("./routes/htmlRoute")(app);

//Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
