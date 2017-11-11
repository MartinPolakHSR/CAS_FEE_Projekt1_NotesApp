const Datastore = require('nedb');
const db = new Datastore({ filename: './server/data/notes.db', autoload: true});

function Note(date) {

    this.title = 'Set title';
    this.creationDate = date;
    this.finishedDate = null;
    this.description = 'Set description';
    this.importance = 0;
}

let notesController = {

    getNotes: function(callback) {
        db.find({}, callback);
    },

    getNote: function(id, callback) {
        db.findOne({ _id: id }, callback);
    },

    addNote: function(callback) {
        let note = new Note(new Date());
        db.insert(note, callback);
    },

    updateNote: function(id, updatedNote, callback) {
        db.update({ _id: id },
            {
                title: updatedNote.title,
                creationDate: updatedNote.creationDate,
                finishedDate: updatedNote.finishedDate,
                description: updatedNote.description,
                importance: updatedNote.importance
            }, callback);
    },

    deleteNote: function(id, callback) {
        db.remove({ _id: id }, {multi: false}, callback);
    }
}

module.exports = notesController;