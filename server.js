const express = require("express"); 
const path = require("path");
const fs = require("fs");
const util = require("util");
const uuid = require('./helper/uuid');
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
});

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`Note added to ${destination}`)
  );

const createNote = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const createdNote = JSON.parse(data);
      createdNote.push(content);
      writeToFile(file, createdNote);
    }
  });
};

app.get("/api/notes", (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
}); 
app.post('/api/notes', (req, res) => {

    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      createNote(newNote, './db/db.json');
  
      res.json(`You have created a note`);
      
    } else {
      res.error('Unable to create note');
    }
  });
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
  });

app.listen(PORT, () =>
  console.log(`Server live at http://localhost:${PORT}.`)
);