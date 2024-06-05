import './script/component/note-form.js';
import './script/component/note-item.js';
import './script/Data/Local/notes-data.js';
import './script/component/header-bar.js';
import './script/component/loading-spinner.js';



const notesContainer = document.getElementById('notes-container');
const dataStore = document.getElementById('data-store');

document.addEventListener('DOMContentLoaded', () => {
    console.log('Application loaded');

    
    document.querySelector('note-form').addEventListener('add-note', function (e) {
        const newNote = {
            title: e.detail.title,
            body: e.detail.body
        };
        dataStore.addNote(newNote);
    });

   
    dataStore.addEventListener('notes-loaded', function (e) {
        notesContainer.innerHTML = ''; 
        e.detail.notes.forEach(noteData => {
            const note = document.createElement('note-item');
            note.note = noteData;
            notesContainer.appendChild(note);
        });
    });

    
    dataStore.addEventListener('notes-updated', function (e) {
        notesContainer.innerHTML = ''; 
        e.detail.notes.forEach(noteData => {
            const note = document.createElement('note-item');
            note.note = noteData;
            notesContainer.appendChild(note);
        });
    });

    
    notesContainer.addEventListener('delete-note', function (e) {
        dataStore.deleteNote(e.detail.id);
    });
});
