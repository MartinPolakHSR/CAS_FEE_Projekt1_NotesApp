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

    $( '.finished input' ).on( 'click', function() {

        var id = $( this ).data('id');



            saveNote(id);
            setFinishedDate(id)





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




function getNoteDataInput (Note, id) {
    Note.id =id;

    Note.description = $("#note_"+id+ " .description textarea").val();

    if ($("#note_"+id).hasClass('edit')) {
        Note.title = $("#note_"+id+" .title input").val();
        Note.untildate = $("#note_"+id+" .untildate input").val();

    } else {
        Note.title = $("#note_"+id+" .title span").html();
        Note.untildate = $("#note_"+id+" .untildate span").html();

    }



    if ($("#note_"+id+" .finished input").is(":checked")) {
        Note.finished = true;
        Note.finisheddate = getCurrentDate();
    } else {
        Note.finished = false;
        delete Note.finisheddate;
    }

}




function editNoteView(id){


    var untildate = $("#note_"+id+ " .untildate span").html();
    $( "#note_"+id+ " .untildate input.onlyedit" ).val(untildate);

    var title = $("#note_"+id+ " .title span").html();
    $( "#note_"+id+ " .title input.onlyedit" ).val(title);

    $( "#note_"+id+ " .description textarea" ).attr('readonly', false);


    $("#note_"+id+ " span").hide();
    $( "#note_"+id+ " input.onlyedit" ).show();

};

function showNoteView(id){

    var untildate = $("#note_"+id+ " .untildate input").val();
    $( "#note_"+id+ " .untildate span" ).html(untildate);

    var title = $("#note_"+id+ " .title input").val();
    $("#note_"+id+ " .title span" ).html(title);

    $( "#note_"+id+ " .description textarea" ).attr('readonly', true);

    $( "#note_"+id+ " .onlyedit" ).hide();
    $( "#note_"+id+ " span" ).show();

};


function setFinishedDate(id){



    var today = getCurrentDate();


    if ($("#note_"+id+" .finished input").is(":checked")) {
        $("#note_"+id+" .finished label").html('Finished (' + today + ')');
    } else {
        $("#note_"+id+" .finished label").html('Finished');
    }

};

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

