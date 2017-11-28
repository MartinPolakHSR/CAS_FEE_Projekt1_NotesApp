'use strict';

// view functions for index.html
function setShowViewAll(noteArray){


    for (let i = 0; i < noteArray.length; i++) {
        diableElements(noteArray[i].id);
        formatUntildateFromNote(noteArray[i])
    }

}

function setEditViewNote(id){

    let untildate = $("#note_"+id+ " .untildate span.storeformat").html();
    $( "#note_"+id+ " .untildate input.onlyedit" ).val(untildate);

    let title = $("#note_"+id+ " .title span").html();
    $( "#note_"+id+ " .title input.onlyedit" ).val(title);

    $("#note_"+id+ " span").hide();
    $( "#note_"+id+ " input.onlyedit" ).show();

    enableElements(id)

}

function undoChanges(oldNote){

   let id = oldNote.id;

    let untildate = $("#note_"+id+ " .untildate span.storeformat").html();
    $( "#note_"+id+ " .untildate input.onlyedit" ).val(untildate);

    let title = $("#note_"+id+ " .title span").html();
    $( "#note_"+id+ " .title input.onlyedit" ).val(title);

   let description = oldNote.description;
   $( "#note_"+id+ " .description textarea" ).val(description);

    let importance = oldNote.importance;
    $( "#note_"+id+ " .importance select" ).val(importance);

}

function setShowViewNote(id){


    let untildate = $("#note_"+id+ " .untildate input").val();
    untildate = formatUntildate(untildate);


    $( "#note_"+id+ " .untildate span.viewformat" ).html(untildate);

    let title = $("#note_"+id+ " .title input").val();
    $("#note_"+id+ " .title span" ).html(title);


    $( "#note_"+id+ " .onlyedit" ).hide();
    $( "#note_"+id+ " span" ).show();

    diableElements(id);
}


function diableElements(id){
    $( "#note_"+id+ " .description textarea" ).attr('readonly', true);
    $( "#note_"+id+ " .importance select" ).attr('disabled', true);
}

function enableElements(id){
    $( "#note_"+id+ " .description textarea" ).attr('readonly', false);
    $( "#note_"+id+ " .importance select" ).attr('disabled', false);
}


function showFinishedDate(id){

    let today = getCurrentDate('euro');

    if ($("#note_"+id+" .finished input").is(":checked")) {
        $("#note_"+id+" .finished label").html('Finished (' + today + ')');
        $("#note_"+id).addClass('finish');

    } else {
        $("#note_"+id+" .finished label").html('Finished');
        $("#note_"+id).removeClass('finish');
    }
}

function showNotes(savedNotes){

    // Grab the template script
    let theTemplateScript = $("#notes-template").html();

    // Compile the template
    let theTemplate = Handlebars.compile(theTemplateScript);

    // Define our data object
    let context = savedNotes;

    // Pass our data to the template
    let theCompiledHtml = theTemplate(context);

    // Add the compiled html to the page
    $('.content-placeholder').html(theCompiledHtml);

    $( ".note .onlyedit" ).hide();
    $( ".note span" ).show();
}

function SortNotesByFinishUntilDate(){

    $('.content-placeholder .note').show().sort(sortFinshDate).appendTo('.content-placeholder');
    $('.content-placeholder .note.deleted').hide();
}

function SortNotesByCreatedDate(){

    $('.content-placeholder .note').show().sort(sortCreatedDateASC).appendTo('.content-placeholder');
    $('.content-placeholder .note.deleted').hide();
}

function SortNotesByImportance(){

    $('.content-placeholder .note').show().sort(sortImportanceDESC).appendTo('.content-placeholder');
    $('.content-placeholder .note.deleted').hide();
}


function SortNotesByFinished(){

    $('.content-placeholder .note:not(.finish)').hide();
}

function hideFinished(){

    $('.content-placeholder .note.deleted').hide();
}

function formatUntildateFromNote (noteArray){

    let id = noteArray.id;
    let untildate = formatUntildate(noteArray.untildate);
    $( "#note_"+id+ " .untildate span.viewformat" ).html(untildate);
}

function formatUntildate (untildate){

    let datearray = untildate.split("-");
    let year = datearray[0];
    let month = datearray[1];
    let day = datearray[2];
    return (day + "." + month + "." + year);
}


function sortFinshDate(a, b) {

    let date1 = $(a).find(".untildate .storeformat").text();
    date1 = date1.split('-');
    date1 = new Date(date1[0], date1[1] - 1, date1[2]);
    let date2 = $(b).find(".untildate .storeformat").text();
    date2 = date2.split('-');
    date2 = new Date(date2[0], date2[1] - 1, date2[2]);
    return date1 > date2;
}

function sortCreatedDateASC(a, b) {

    let date1 = $(a).data('created');
    date1 = date1.split('.');
    date1 = new Date(date1[2], date1[1] - 1, date1[0]);
    let date2 = $(b).data('created');
    date2 = date2.split('.');
    date2 = new Date(date2[2], date2[1] - 1, date2[0]);

    return date1 > date2;
}

function sortImportanceDESC(a, b) {

    let importance1 = $(a).find(".importance :selected").text();
    let importance2 = $(b).find(".importance :selected").text();

    return importance1 < importance2;
}


function showCurrentStyle(newStylesheet) {

    let linkTag = $('link')[0];
    let currentStylesheet = linkTag.href.replace(/^.*[\\\/]/, '');
    linkTag.href = linkTag.href.replace(currentStylesheet, newStylesheet);
}



// Handelbars Helper
Handlebars.registerHelper('isEqual', function (expectedValue, value) {
    return value === expectedValue;
});