"use strict";

// controler for index.html


$( document ).ready(function() {



    let model = new dataModel();

    model.getAllNotes().then(function () {
        showNotes(model.notes);
        setShowViewAll(model.notes);
        showCurrentStyle(loadStyle());




        // Event Handling

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

                    model.getNote(id).then(function (NoteData) {

                        let description = $("#note_"+id+ " .description textarea").val();
                        let importance = $("#note_"+id+ " .importance select").val();
                        let title = $("#note_"+id+" .title input").val();
                        let untildate = $("#note_"+id+" .untildate input").val();


                        let editNoteData = new Note("dummy", title, description, importance, untildate);
                        editNoteData.getNoteObject();

                        if ($("#note_"+id+" .finished input").is(":checked")) {
                            editNoteData.finished = true;
                            editNoteData.finisheddate = NoteData.finisheddate;
                        } else {
                            editNoteData.finished = false;
                        }

                        model.updateNoteContent(id, editNoteData).then(function (result) {
                            setShowViewNote(id);
                        });


                    });




            } else {
                $( 'div#note_'+id+ ' .deletebutton' ).addClass('cancel');
                setEditViewNote(id);
            }
        });

        $( 'a.deletebutton' ).on( 'click', function() {
            let id = $(this).data('id');
            if ($(this).hasClass('cancel')) {
                $('div#note_' +id).toggleClass('edit view');

                model.getNote(id).then(function (result) {
                    undoChanges(result);
                    setShowViewNote(result.id);
                });
            } else {

                model.deleteNote(id).then(function (result) {
                    $('div#note_' +id).addClass('deleted');
                    hideFinished();
                });



            }
        });


        $( '.finished input' ).on( 'click', function() {


                      let id = $( this ).data('id');
                      model.getNote(id).then(function (NoteData) {


                          let title = NoteData.title;
                          let description = NoteData.description;
                          let importance = NoteData.importance;
                          let untildate = NoteData.untildate;


                          let editNoteData = new Note('dummy',title, description, importance, untildate);
                          editNoteData.getNoteObject();

                          if ($("#note_" + id + " .finished input").is(":checked")) {
                              editNoteData.finished = true;
                              editNoteData.finisheddate = getCurrentDate('euro');
                          } else {
                              editNoteData.finished = false;
                          }

                          model.updateNoteContent(id, editNoteData).then(function (result) {

                          });
                      });



                showFinishedDate($( this ).data('id'))
        });


        $( '#styleswitcher select' ).on( 'change', function() {
           setStyle($(this).val() + '.css')
        });


    });




});


function setStyle(style) {
    saveStyle(style);
    showCurrentStyle(style);
}






