class NotesData extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                /* Styles might be added here if needed */
            </style>
            <div class="notes-container"></div>
            <loading-spinner></loading-spinner>
        `;
        this.notesContainer = this.shadowRoot.querySelector('.notes-container');
        this.spinner = this.shadowRoot.querySelector('loading-spinner');
        this.loadNotes();
    }

    showLoading(show) {
        if (show) {
            this.spinner.style.display = 'block'; 
        } else {
            this.spinner.style.display = 'none'; 
        }
    }

    async loadNotes() {
        this.showLoading(true);
        try {
            const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            this.notes = data.data;
            this.dispatchEvent(new CustomEvent('notes-loaded', {
                detail: { notes: this.notes },
                bubbles: true,
                composed: true
            }));
        } catch (error) {
            console.error('Failed to load notes:', error);
        } finally {
            this.showLoading(false);
        }
    }

    async addNote(note) {
        this.showLoading(true);
        try {
            const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            this.notes.push(data.data);
            this.updateNotes();
        } catch (error) {
            console.error('Failed to add note:', error);
        } finally {
            this.showLoading(false);
        }
    }

    async deleteNote(noteId) {
        this.showLoading(true);
        try {
            const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.notes = this.notes.filter(note => note.id !== noteId);
            this.updateNotes();
        } catch (error) {
            console.error('Failed to delete note:', error);
        } finally {
            this.showLoading(false);
        }
    }

    updateNotes() {
        this.dispatchEvent(new CustomEvent('notes-updated', {
            detail: { notes: this.notes },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('notes-data', NotesData);
