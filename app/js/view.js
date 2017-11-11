'use strict';


function showNoteViewAll(){

    let noteArray = getSavedNotes();
    for (var i = 0; i < noteArray.length; i++) {
        diableElements(noteArray[i].id)
    }

};


function editNoteView(id){


    var untildate = $("#note_"+id+ " .untildate span").html();
    $( "#note_"+id+ " .untildate input.onlyedit" ).val(untildate);

    var title = $("#note_"+id+ " .title span").html();
    $( "#note_"+id+ " .title input.onlyedit" ).val(title);

    $("#note_"+id+ " span").hide();
    $( "#note_"+id+ " input.onlyedit" ).show();

    enableElements(id)

};


function showNoteView(id){

    var untildate = $("#note_"+id+ " .untildate input").val();
    $( "#note_"+id+ " .untildate span" ).html(untildate);

    var title = $("#note_"+id+ " .title input").val();
    $("#note_"+id+ " .title span" ).html(title);


    $( "#note_"+id+ " .onlyedit" ).hide();
    $( "#note_"+id+ " span" ).show();

    diableElements(id)
};


function diableElements(id){
    $( "#note_"+id+ " .description textarea" ).attr('readonly', true);
    $( "#note_"+id+ " .importance select" ).attr('disabled', true);
};

function enableElements(id){
    $( "#note_"+id+ " .description textarea" ).attr('readonly', false);
    $( "#note_"+id+ " .importance select" ).attr('disabled', false);
};


function showFinishedDate(id){


    var today = getCurrentDate();

    if ($("#note_"+id+" .finished input").is(":checked")) {
        $("#note_"+id+" .finished label").html('Finished (' + today + ')');
    } else {
        $("#note_"+id+" .finished label").html('Finished');
    }

};

function showNotes(savedNotes){

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
};

Handlebars.registerHelper('isEqual', function (expectedValue, value) {
    return value === expectedValue;
});