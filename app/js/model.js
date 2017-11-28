'use strict';

class Note {

    constructor(id, title, description, importance, untildate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.untildate = untildate;
        this.finished = "";
        this.finisheddate = "";
        this.created = getCurrentDate();
    }


    getNoteObject() {

        let noteObject = {};

        noteObject.id = this.id;
        noteObject.title = this.title;
        noteObject.description = this.description;
        noteObject.importance = this.importance;
        noteObject.untildate = this.untildate;
        noteObject.finished = this.finished;
        noteObject.finisheddate = this.finished;
        noteObject.created = this.created;

        return noteObject;
    }
}

class dataModel {

    constructor() {
        this.dataAccess = new dataAccess();
        this.notes = [];
    }

    getAllNotes() {
        return this.dataAccess.getAllNotes()
            .then(function(notes) {
                this.notes = notes;
                return notes;
            }.bind(this))
    }


    getNextId() {

        let maxID = 0;
        let noteArray = this.notes;
        if (noteArray.length > 0) {

            for (let i = 0; i < noteArray.length; i++) {
                if ( parseInt(noteArray[i].id) > maxID) {
                    maxID = noteArray[i].id;
                }
            }
            return parseInt(maxID) + 1;
        } else {
            return 0;
        }

    }

    createNote(newNote) {
        return this.dataAccess.createNote(newNote)
            .then(function(note) {
                this.notes.push(note);
                return note;
            }.bind(this));
    }

    deleteNote(id) {
        return this.dataAccess.deleteNote(id)
            .then(function(numRemoved) {
                if (numRemoved === 1) {
                    let newNotes = this.notes.filter((n) => {
                        return n.id !== id;
                    });
                    this.notes = newNotes;
                }
            }.bind(this));
    }

    getNote(id) {
        return this.dataAccess.getNote(id);
    }

    updateNoteContent(id, content) {

        let note = {};

        this.notes.forEach((n) => {
            if (n.id === id) {
                n.title = content.title;
                n.description = content.description;
                n.importance = content.importance;
                n.untildate = content.untildate;
                n.finished = content.finished;
                n.finisheddate = content.finisheddate;
                note = n;
            }
        });

        return this.dataAccess.updateNote(note);
    }

}



function saveStyle(style) {
    sessionStorage.style = style;
}


function loadStyle() {

    if(sessionStorage.style)
    {
        return sessionStorage.getItem('style');
    }else{
        return 'redstyle.css';
    }
}


function getCurrentDate(type){

    let today = new Date();
    let todayJS;
    let todayEURO;

    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd;
    }
    if(mm<10) {
        mm='0'+mm;
    }
    todayEURO = dd+'.'+mm+'.'+yyyy;
    todayJS = yyyy+'-'+mm+'-'+dd;

    if (type === 'js'){
        return(todayJS);
    } else {
        return(todayEURO)
    }
}



