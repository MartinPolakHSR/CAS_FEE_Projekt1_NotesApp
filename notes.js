var savedNotes;

function showNotes() {

    savedNotes = sessionStorage.getItem("notes");
    if (!savedNotes) {
        sessionStorage.setItem("notes", JSON.stringify([]));
        savedNotes = sessionStorage.getItem("notes");
    }
    savedNotes = JSON.parse(savedNotes);


// Grab the template script
    var theTemplateScript = $("#notes-template").html();

// Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

// Define our data object
    var context = savedNotes;

// Pass our data to the template
    var theCompiledHtml = theTemplate(context);

// Add the compiled html to the page
    $('.content-placeholder').html(theCompiledHtml);


}





function editNote(){

    for (var i = 0; i < savedNotes.length; i++) {
        if(params.id == savedNotes[i].id){
            getNoteData(savedNotes[i],i);
            break;
        }
    }
};



$( document ).ready(function() {

    showNotes();

    $( "#sortByFinishDate" ).on( "click", function() {
        alert('ToDo SortByFinishData');
    });

    $( "#sortByCreatedDate" ).on( "click", function() {
        alert('ToDo sortByCreatedDate')
    });

    $( "#sortByImportance" ).on( "click", function() {
        alert('ToDo sortByImportance')
    });

    $( "#sortByFinished" ).on( "click", function() {
        alert('ToDo sortByFinished')
    });

    $( 'a.editbutton' ).on( 'click', function() {

        var id = $( this ).data('id');
        $( 'div#note_'+id ).toggleClass('edit view');

        if   ($( 'div#note_'+id ).hasClass('view')) {

            editNote(id);
        }


            });




})


function editNote(id){

    for (var i = 0; i < savedNotes.length; i++) {
        if(id == savedNotes[i].id){
            console.log(savedNotes[i]);
            getNoteData(savedNotes[i],i);
            console.log(savedNotes[i]);
            break;
        }
    }

    sessionStorage.setItem('notes', JSON.stringify(savedNotes));
};


function getNoteData (Note, id) {
    Note.id =id;
    Note.title = $("#title_"+id).val();
    Note.description = $("#description_"+id).val();
    Note.untildate = $("#untildate_"+id).val();
}