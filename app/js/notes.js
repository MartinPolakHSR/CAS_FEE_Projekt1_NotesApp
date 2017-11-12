"use strict";

// Controller für index.html


$( document ).ready(function() {

    showNotes(getSavedNotes());
    setShowViewAll();
    showCurrentStyle(loadStyle());


    $( "#sortByFinishDate" ).on( "click", function() {
        SortNotesByFinishUntilDate();
    });

    $( "#sortByCreatedDate" ).on( "click", function() {
        SortNotesByCreatedDate();
    });

    $( "#sortByImportance" ).on( "click", function() {
        SortNotesByImportance();
    });

    $( "#sortByFinished" ).on( "click", function() {
        SortNotesByFinished();
    });

    $( 'a.editbutton' ).on( 'click', function() {
        let id = $( this ).data('id');
        $( 'div#note_'+id ).toggleClass('edit view');
        if   ($( 'div#note_'+id ).hasClass('view')) {
            $( 'div#note_'+id+ ' .deletebutton' ).removeClass('cancel');
            setEditData(id,'edit');
            setShowViewNote(id);
        } else {
            $( 'div#note_'+id+ ' .deletebutton' ).addClass('cancel');
            seteEditViewNote(id);
        }
    });

    $( 'a.deletebutton' ).on( 'click', function() {
        if ($(this).hasClass('cancel')) {
            $( 'div#note_'+$(this).data('id') ).toggleClass('edit view');
            undoChanges($(this).data('id'));
            setShowViewNote($(this).data('id'));

        } else {
            deleteNote($(this).data('id'));
            showNotes(getSavedNotes());
            setShowViewAll();

        }
    });


    $( '.finished input' ).on( 'click', function() {
            setFinishdateData($( this ).data('id'));
            showFinishedDate($( this ).data('id'))
    });


    $( '#styleswitcher select' ).on( 'change', function() {
       setStyle($(this).val() + '.css')
    });


});





function setEditData (id, mode, ) {

    let NoteData = getSavedNote(id);
    let description = $("#note_"+id+ " .description textarea").val();
    let importance = $("#note_"+id+ " .importance select").val();
    let title = $("#note_"+id+" .title input").val();
    let untildate = $("#note_"+id+" .untildate input").val();


    let editNoteData = new Note(title, description, importance, untildate);

    if ($("#note_"+id+" .finished input").is(":checked")) {
        editNoteData.finished = true;
        editNoteData.finisheddate = NoteData.finisheddate;
    } else {
        editNoteData.finished = false;
    }

    editNoteData.getNoteObject();
    saveNote(editNoteData,id);

}


function setFinishdateData (id ) {

    let NoteData = getSavedNote(id);

    console.log(id);
    let title = NoteData.title;
    let description = NoteData.description;
    let importance = NoteData.importance;
    let untildate = NoteData.untildate;


    let editNoteData = new Note(title, description, importance, untildate);
    editNoteData.getNoteObject();

    if ($("#note_"+id+" .finished input").is(":checked")) {
        editNoteData.finished = true;
        editNoteData.finisheddate = getCurrentDate('euro');
    } else {
        editNoteData.finished = false;
    }

    saveNote(editNoteData,id);

}


function setStyle(style) {
    saveStyle(style);
    showCurrentStyle(style);
}







