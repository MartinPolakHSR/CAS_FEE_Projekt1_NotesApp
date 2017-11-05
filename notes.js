var savedNotes;

$( document ).ready(function() {


    showNotesInit();

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


            saveNote(id);
            showNoteView(id);

        } else {


            editNoteView(id);
        }


    });

    $( '.finishedcheck' ).on( 'click', function() {


        var id = $( this ).data('id');



            finishNote(id);





    });


    $( '#styleswitcher select' ).on( 'change', function() {

        var linkTag = $('link')[0];
        var currentStylesheet = linkTag.href.replace(/^.*[\\\/]/, '');
        var newStylesheet = $(this).val() + '.css';


        linkTag.href = linkTag.href.replace(currentStylesheet, newStylesheet);





    });









})


function showNotesInit() {

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


    $( ".note .onlyedit" ).hide();
    $( ".note span" ).show();



}

function saveNote(id){

    for (var i = 0; i < savedNotes.length; i++) {
        if(id == savedNotes[i].id){
            getNoteDataInput(savedNotes[i],i);
            break;
        }
    }

    sessionStorage.setItem('notes', JSON.stringify(savedNotes));


};

function finishNote(id){

    for (var i = 0; i < savedNotes.length; i++) {
        if(id == savedNotes[i].id){
            getNoteDataInputFinished(savedNotes[i],i);
            break;
        }
    }

    sessionStorage.setItem('notes', JSON.stringify(savedNotes));


};


function getNoteDataInput (Note, id) {
    Note.id =id;
    Note.title = $("#note_"+id+" .titel input").val();
    Note.description = $("#note_"+id+ " .description textarea").val();
    Note.untildate = $("#note_"+id+" .untildate input").val();


    if ($("#note_"+id+" .finishedcheck").is(":checked")) {
        Note.finished = true;
    } else {
        Note.finished = false;
    }

}

function getNoteDataInputFinished (Note, id) {

    if ($("#note_"+id+" .finishedcheck").is(":checked")) {
        Note.finished = true;
    } else {
        Note.finished = false;
    }

}



function editNoteView(id){


    var untildate = $("#note_"+id+ " .untildate span").html();
    $( "#note_"+id+ " .untildate input.onlyedit" ).val(untildate);

    var titel = $("#note_"+id+ " .titel span").html();
    $( "#note_"+id+ " .titel input.onlyedit" ).val(titel);

    $( "#note_"+id+ " .description textarea" ).attr('readonly', false);


    $("#note_"+id+ " span").hide();
    $( "#note_"+id+ " input.onlyedit" ).show();

};

function showNoteView(id){

    var untildate = $("#note_"+id+ " .untildate input").val();
    $( "#note_"+id+ " .untildate span" ).html(untildate);

    var titel = $("#note_"+id+ " .titel input").val();
    $("#note_"+id+ " .titel span" ).html(titel);

    $( "#note_"+id+ " .description textarea" ).attr('readonly', true);

    $( "#note_"+id+ " .onlyedit" ).hide();
    $( "#note_"+id+ " span" ).show();

};


