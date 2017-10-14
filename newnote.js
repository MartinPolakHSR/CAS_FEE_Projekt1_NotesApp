var params = getSearchParameters();

var savedNotes = sessionStorage.getItem("notes");
if (!savedNotes) {
    sessionStorage.setItem("notes", JSON.stringify([]));
    savedNotes = sessionStorage.getItem("notes");
}
savedNotes = JSON.parse(savedNotes);

$( document ).ready(function() {



    if (params.id) {
        showData(params.id);

    }

})







function showData(id){

   $("#title").val(savedNotes[id].title);
   $("#description").val(savedNotes[id].description);
   $("#untildate").val(savedNotes[id].untildate);

};

function CreateEditNote(id){

    if (params.id) {
        alert('TODO');

    } else {
        createNewNote();
    }

}


function createNewNote(){




    var newNote = new Object();
    var notes;

    newNote.id = getLastID();
    newNote.title = $("#title").val();
    newNote.description = $("#description").val();
    newNote.untildate = $("#untildate").val();

    if(sessionStorage.notes)
    {
        notes= JSON.parse(sessionStorage.getItem('notes'));
    }else{
        notes=[];
    }

    notes.push(newNote);


    sessionStorage.setItem('notes', JSON.stringify(notes));

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


function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}