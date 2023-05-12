const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// let notes = []
let notes = [
  {
    id: 1,
    note: "work on a side project",
    completed: false,
    archived: false
  },
  {
    id: 2,
    note: "take the dog on a walk",
    completed: true,
    archived: false
  },
  {
    id: 3,
    note: "eat some food",
    completed: false,
    archived: true
  }
]

let noteId = 4;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/getNotes", (req, res) => {
  res.json({ notes })
})

app.post('/api/addNote', (req, res) => {
  const newNote = {
    note: req.body.input,
    id: noteId,
  }
  noteId++;

  notes.push(newNote);
  res.status(200).send({ notes });
});

app.post('/api/taskComplete', (req, res) => {
  const id = req.body.id;

  var index = notes.findIndex(x => x.id === id);
  if (index !== -1) {
    // Update array
    notes[index].completed = !notes[index].completed
    res.status(200).send({ notes });
  } else {
    res.status(404).send('Error: Element Not Found');
  }

});

app.post('/api/taskArchive', (req, res) => {
  const id = req.body.id;

  var index = notes.findIndex(x => x.id === id);
  if (index !== -1) {
    // Update array
    notes[index].archived = !notes[index].archived
    res.status(200).send({ notes });
  } else {
    res.status(404).send('Error: Element Not Found');
  }

});

app.delete('/api/deleteNote', (req, res) => {
  const id = req.body.id;

  var index = notes.findIndex(x => x.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    res.status(200).send({ notes });
  } else {
    res.status(404).send('Error: Element Not Found');
  }

});

app.listen(5000, () => { console.log("Server Started on port 5000") })