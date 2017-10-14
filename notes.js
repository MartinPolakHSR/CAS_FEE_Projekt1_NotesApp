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

    $( 'a.edit' ).on( 'click', function() {
        editNote( $( this ).data('id') );
    });

}




function editNote(id){
    $(location).attr('href','newnote.html?id='+id)
    //window.location.replace("newnote.html");
    console.log( 'hallo');
    $("#title").val('Titel');
    $("#description").val('Beschreibung');
    $("#untildate").val('01.01.2017');
};


