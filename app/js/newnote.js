

// Controller für newnote.html


$( document ).ready(function() {


    document.getElementById("createNewNote").onclick = function() {createNewNote()};
    document.getElementById("cancel").onclick = function() {location.href="index.html"};

    showCurrentStyle(loadStyle());



    let model = new dataModel();



    function createNewNote(){



        if (validateInput()) {

            let title = $("#title").val();
            let description = $("#description").val();
            let importance = $("#importance").val();
            let untildate = $("#untildate").val();


            model.getAllNotes().then(function (result) {
               let newId = model.getNextId();
               if (newId === null) {
                   newId = 0;
               }


                let newNote = new Note(String(newId), title, description, importance, untildate);
                model.createNote(newNote);
            });

            window.location.replace("index.html");


        } else {

            alert('Bitte füllen Sie alle Felder aus!');
        }

    }

    function validateInput(){


        if (($("#title").val() === '') || ($("#description").val() === '') || ($("#untildate").val() === '')){
            return false;
        }
        return true;

    }

});