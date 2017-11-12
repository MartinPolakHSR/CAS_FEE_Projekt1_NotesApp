'use strict';


class Note {

    constructor(title, description, importance, untildate, created) {
        this.id = getLastID();
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

function deleteNote(id){

    let noteArray = getSavedNotes();
    for (var i = 0; i < noteArray.length; i++) {
        if(id == noteArray[i].id){
            noteArray.splice(i,1);
            break;
        }
    }
    sessionStorage.setItem('notes', JSON.stringify(noteArray));
};

function saveNewNote(Note) {

    let noteArray = getSavedNotes();
    noteArray.push(Note.getNoteObject());
    sessionStorage.notes = JSON.stringify(noteArray);
}

function saveNote(Note,id){

    let noteArray = getSavedNotes();
    for (var i = 0; i < noteArray.length; i++) {
        if(id == noteArray[i].id){
            noteArray[i] = Note;
            noteArray[i].id = id;
            break;
        }
    }

    sessionStorage.setItem('notes', JSON.stringify(noteArray));

};

function getSavedNotes() {

    if(sessionStorage.notes)
    {
        return JSON.parse(sessionStorage.getItem('notes'));
    }else{
        return [];
    }
}

function getSavedNote(id) {

    if(sessionStorage.notes)
    {
        let noteArray = getSavedNotes();
        for (var i = 0; i < noteArray.length; i++) {
            if(id == noteArray[i].id){
                return noteArray[i];
                break;
            }
        }
    }else{
        return [];
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

    if (type == 'js'){
        return(todayJS);
    } else {
        return(todayEURO)
    }
};




function getLastID(){

    let maxID = 0;
    let noteArray = getSavedNotes();
    if (noteArray.length > 0) {

        for (var i = 0; i < noteArray.length; i++) {
            if (noteArray[i].id > maxID) {
                maxID = noteArray[i].id;
            }
            ;
        }
        return maxID + 1;
    } else {
        return 0;
    }
};