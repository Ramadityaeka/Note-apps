class HeaderBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
    :host {
        display: block;
        width: 100%;
        text-align: center;
        color: white; 
        background: linear-gradient(to right, #6a11cb, #2575fc); /* Gradient background */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); 
        border-bottom: 3px solid #283593; 
        border-radius: 10px 10px 0 0;
        padding: 20px 0; /* Add padding */
    }

    .brand-name {
        margin: 0;
        font-size: 2.5em; 
        font-family: 'Arial', sans-serif; 
        text-shadow: 2px 2px 4px rgba(0,0,0,0.2); /* Text shadow */
    }
    `;
}


  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div>
        <h1 class="brand-name">Simple Note App</h1>
      </div>
    `;
  }
}

customElements.define("header-bar", HeaderBar);
