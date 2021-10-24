import { LitElement, html, css } from "lit";
import "./ScandiskButton.js";
import "./ScandiskBar.js";

class ScandiskScreenSummary extends LitElement {
  static get properties() {
    return {
      errors: { type: Number },
    };
  }

  constructor() {
    super();
    this.errors = this.getAttribute("errors") || 0;
  }

  static get styles() {
    return css`
      .title {
        color: var(--cyan-color);
        margin-bottom: 0;
      }
      .buttons {
        margin-top: 8em;
      }
      ul {
        margin-left: 2em;
      }
      hr {
        border: 1px solid var(--cyan-color);
      }
    `;
  }

  get errorMessage() {
    if (this.errors === 0) return html`<p>Scandisk not found problems on drive C.</p>`;
    return html`<p>ScanDisk found and fixed <span>${this.errors}</span> problems on drive C.</p>`;
  }

  render() {
    return html`
      <div class="screen">
        <p class="title">Microsoft ScanDisk</p>
        <hr />
        ${this.errorMessage}
        <div class="buttons">
          <scandisk-button href="https://manz.dev/">More info</scandisk-button>
          <scandisk-button href="#">Exit</scandisk-button>
        </div>
      </div>
      <hr />
    `;
  }
}

customElements.define("scandisk-screen-summary", ScandiskScreenSummary);
