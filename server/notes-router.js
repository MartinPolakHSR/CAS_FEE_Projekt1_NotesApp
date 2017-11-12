const express = require('express');
const notesController = require('./notes-services');
const notesRouter = express.Router();

// get a note by id
notesRouter.get('/:id', (req, res) => {
  let id = req.params.id;
  notesController.getNote(id, (err, note) => {
    if (note) {
      res.json(note);
    }
    else {
      res.sendStatus(404);
    }
  });
});

// get all notes from the db
notesRouter.get('/', (req, res) => {
  notesController.getNotes((err, notes) => {
    res.json(notes);
  });
});

// create a new note
notesRouter.post('/', (req, res) => {
  notesController.addNote((err, newNote) => {
    res.json(newNote);
  });
});

// update an existing note
notesRouter.put('/:id', (req, res) => {
  let id = req.params.id;
  notesController.updateNote(id, req.body, (err, updatedNote) => {
    res.json(updatedNote);
  });
});

// delete an existing note
notesRouter.delete('/:id', (req, res) => {
  let id = req.params.id;
  notesController.deleteNote(id, (err, numNotes) => {
    res.json(numNotes);
  });
});

module.exports = notesRouter;