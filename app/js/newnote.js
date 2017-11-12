"use strict";

// Controller für newnote.html


$( document ).ready(function() {

    document.getElementById("createNewNote").onclick = function() {createNewNote()};
    document.getElementById("cancel").onclick = function() {location.href="index.html"};

    showCurrentStyle(loadStyle());

})


function createNewNote(){

    if (testInput()) {

        let title = $("#title").val();
        let description = $("#description").val();
        let importance = $("#importance").val();
        let untildate = $("#untildate").val();
        let finished = false;

        let newNote = new Note(title, description, importance, untildate);
        saveNewNote(newNote);
        window.location.replace("index.html");

    } else {

        alert('Bitte füllen Sie alle Felder aus!');
    }

}

function testInput(){

    let error;
    if (($("#title").val() === '') || ($("#description").val() === '') || ($("#untildate").val() === '')){
        return false;
    }
    return true;

}




