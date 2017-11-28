
/* Interface between model and db */

class dataAccess {

    constructor() {
        this.dbServerURL = 'http://localhost:3000';
    }

    // gets all notes from db
    getAllNotes() {

        return this._fetch({path: "notes", method: "get"})
            .then(this._getBodyContent)
    }

    // creates a new note in the db
    createNote(newNote) {
        return this._fetch({path: "notes", method: "post",body: JSON.stringify(newNote)})
            .then(this._getBodyContent)

    }

    // deletes a note by id from db
    deleteNote(id) {
        return this._fetch({path: `notes/${id}`, method: "delete"})
            .then(this._getBodyContent);
    }

    // get note by id from db
    getNote(id) {
        return this._fetch({path: `notes/${id}`, method: "get"})
            .then(this._getBodyContent)

    }

    // update a note in the db
    updateNote(note) {
        return this._fetch({path: `notes/${note.id}`, method: "put", body: JSON.stringify(note)})
            .then(this._getBodyContent)

    }

    // method for requesting resources from the db
    _fetch(options) {
        let body = options.body ? options.body : undefined;
        const request = new Request(`${this.dbServerURL}/${options.path}`, {
            method: options.method,
            headers: new Headers({
                'Content-type': 'application/json'
            }),
            body: body
        });
        return fetch(request);
    }

    // Extract the response as json
    _getBodyContent(response) {
        return response.json();
    }





}
