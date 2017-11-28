const Datastore = require('nedb');
const db = new Datastore({ filename: './server/data/notes.db', autoload: true});




let notesController = {

    getNotes: function(callback) {
        db.find({},function (err, docs) {
            callback( err, docs);
        });
    },

    getNote: function(id, callback) {
        db.findOne({ id: id }, callback);
    },

    addNote: function(newNote, callback) {
        db.insert(newNote, callback);
    },

    updateNote: function(id, updatedNote, callback) {
        db.update({ id: id },
            {
                id: updatedNote.id,
                title: updatedNote.title,
                created: updatedNote.created,
                untildate: updatedNote.untildate,
                finished: updatedNote.finished,
                finisheddate: updatedNote.finisheddate,
                description: updatedNote.description,
                importance: updatedNote.importance

            },function (err, docs) {
                callback( err, docs);
            })
    },

    deleteNote: function(id, callback) {
        db.remove({ id: id },function (err, docs) {
            callback( err, docs);
        });
    }
};

module.exports = notesController;