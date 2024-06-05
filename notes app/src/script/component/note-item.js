




class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    set note(data) {
        this.noteData = data;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
        :host {
            display: block;
            margin-bottom: 10px;
            padding: 15px;
            background: white;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            border-left: 5px solid var(--primary-color);
            transition: transform 0.3s ease;
        }
        :host(:hover) {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        h3 {
            margin: 0 0 5px 0;
            color: var(--text-color);
        }
        p {
            margin: 0;
            color: var(--text-secondary-color);
        }
        button {
            background-color: red;
            color: white;
            padding: 8px 16px;
            margin-top: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
            <h3>${this.noteData.title}</h3>
            <p>${this.noteData.body}</p>
            <button>Delete</button>
        `;

        const deleteBtn = this.shadowRoot.querySelector('button');
        deleteBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to delete this note?")) {
                this.dispatchEvent(new CustomEvent('delete-note', {
                    detail: { id: this.noteData.id },
                    bubbles: true,
                    composed: true
                }));
            }
        });
    }
}

customElements.define('note-item', NoteItem);
