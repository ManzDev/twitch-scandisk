import { LitElement, html, css } from "lit";

class ScandiskButton extends LitElement {
  static get properties() {
    return {
      text: { type: String },
      href: { type: String },
    };
  }

  constructor() {
    super();
    this.text = this.textContent;
    this.href = this.hasAttribute("href") ? this.getAttribute("href") : "#";
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        margin-bottom: 1em;
      }
      a {
        background: var(--darkgray-color);
        font-family: var(--font-name);
        font-size: 1rem;
        color: var(--gray-color);
        outline: 0;
        border: 0;
        padding: 2px;
        margin-right: 1em;
        box-shadow: 10px 8px 0 black;
        text-decoration: none;
      }
      a:active {
        color: var(--highlight-color);
        position: relative;
        left: 10px;
        top: 8px;
        box-shadow: none;
      }
      a::before {
        content: "⯇ ";
        color: var(--highlight-color);
      }
      a::after {
        content: " ⯈";
        color: var(--highlight-color);
      }
    `;
  }

  render() {
    return html`<a href="${this.href}" target="_parent">${this.text}</a>`;
  }
}

customElements.define("scandisk-button", ScandiskButton);
