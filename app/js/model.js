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





function addNoteToSessionStorage(Note) {

    console.log(Note);

    let noteArray = getSavedNotes();

    noteArray.push(Note.getNoteObject());
    sessionStorage.notes = JSON.stringify(noteArray);

}

function saveNote(Note,id){

    //console.log(Note);

    let noteArray = getSavedNotes();

    for (var i = 0; i < noteArray.length; i++) {
        if(id == noteArray[i].id){
            noteArray[i] = Note;
            noteArray.id = id;
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




function getCurrentDate(){

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10)
    {
        dd='0'+dd;
    }

    if(mm<10)
    {
        mm='0'+mm;
    }


    today = dd+'.'+mm+'.'+yyyy;

    return(today);


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