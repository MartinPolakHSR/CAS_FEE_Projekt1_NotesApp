"use strict";

// Controller für newnote.html


$( document ).ready(function() {

    document.getElementById("createNewNote").onclick = function() {createNewNote()};
    document.getElementById("cancel").onclick = function() {location.href="index.html"};

})


function createNewNote(){


    let title = $("#title").val();
    let description = $("#description").val();
    let importance = $("#importance").val();
    let untildate = $("#untildate").val();
    let finished = false;


    let newNote = new Note(title, description, importance, untildate);
    addNoteToSessionStorage(newNote);
    window.location.replace("index.html");


};






