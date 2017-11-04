
var savedNotes = sessionStorage.getItem("notes");
if (!savedNotes) {
    sessionStorage.setItem("notes", JSON.stringify([]));
    savedNotes = sessionStorage.getItem("notes");
}
savedNotes = JSON.parse(savedNotes);





function createNewNote(){


    var newNote = new Object();
    var notes;



    newNote.id =  getLastID();
    newNote.title = $("#title").val();
    newNote.description = $("#description").val();
    newNote.untildate = $("#untildate").val();
    newNote.finished = false;


    if(sessionStorage.notes)
    {
        notes= JSON.parse(sessionStorage.getItem('notes'));
    }else{
        notes=[];
    }

    savedNotes.push(newNote);
    sessionStorage.setItem('notes', JSON.stringify(savedNotes));
    window.location.replace("index.html");


};


function getLastID(){

    var maxID = 0;

    if (savedNotes.length > 0) {

        for (var i = 0; i < savedNotes.length; i++) {
            if (savedNotes[i].id > maxID) {
                maxID = savedNotes[i].id;
            }
            ;
        }

        return maxID + 1;
    } else {
        return 0;
    }
};



