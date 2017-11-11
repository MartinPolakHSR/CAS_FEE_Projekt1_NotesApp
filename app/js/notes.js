
"use strict";

// Controller für index.html


$( document ).ready(function() {


    showNotes(getSavedNotes());
    showNoteViewAll();


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


            getNoteDataInput(id,'edit');
            showNoteView(id);

        } else {


            editNoteView(id);
        }


    });

    $( '.finished input' ).on( 'click', function() {

        var id = $( this ).data('id');


            getNoteDataInput(id);
            showFinishedDate(id)



    });


    $( '#styleswitcher select' ).on( 'change', function() {

        var linkTag = $('link')[0];
        var currentStylesheet = linkTag.href.replace(/^.*[\\\/]/, '');
        var newStylesheet = $(this).val() + '.css';


        linkTag.href = linkTag.href.replace(currentStylesheet, newStylesheet);


    });


})





function getNoteDataInput (id, mode) {

    let title;
    let description;
    let importance;
    let untildate;
    let finished;
    let finisheddate;


    description = $("#note_"+id+ " .description textarea").val();
    importance = $("#note_"+id+ " .importance select").val();

    // edit = wurde soeben bearbeitet
    if (mode == 'edit') {

        title = $("#note_"+id+" .title input").val();
        untildate = $("#note_"+id+" .untildate input").val();

    } else {
        title = $("#note_"+id+" .title span").html();
        untildate = $("#note_"+id+" .untildate span").html();

    }

    console.log(title);


    let editNoteData = new Note(title, description, importance, untildate);

    if ($("#note_"+id+" .finished input").is(":checked")) {
        editNoteData.finished = true;
        editNoteData.finisheddate = getCurrentDate();
    } else {
        editNoteData.finished = false;
    }

    editNoteData.getNote();
    //console.log(editNoteData);
    saveNote(editNoteData,id);

}










