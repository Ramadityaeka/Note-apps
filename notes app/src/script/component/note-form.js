class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            form {
                display: grid;
                grid-gap: 10px;
                padding: 20px;
                background: #f9f9f9;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
            input[type="text"], textarea {
                padding: 15px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            button {
                background-color: var(--primary-color);
                color: blue;
                padding: 12px 24px;
                border-radius: 6px;
                border: none;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
                outline: none;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                font-size: 16px;
                font-weight: bold;
            }
            button:hover, button:focus {
                background-color: lighten(var(--primary-color), 10%);
                transform: scale(1.00);
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            }
        </style>
            <form>
                <input type="text" name="title" placeholder="Judul" required>
                <textarea name="body" placeholder="Isi Catatan" required></textarea>
                <button type="submit">Add Note</button>
            </form>
        `;

        this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = this.shadowRoot.querySelector('input[name="title"]').value.trim();
            const body = this.shadowRoot.querySelector('textarea[name="body"]').value.trim();
            if (title !== "" && body !== "") {
                this.dispatchEvent(new CustomEvent('add-note', {
                    detail: { title, body },
                    bubbles: true,
                    composed: true
                }));
                this.shadowRoot.querySelector('form').reset();
            } else {
                alert("Both title and body are required.");
            }
        });
    }
}

customElements.define('note-form', NoteForm);
