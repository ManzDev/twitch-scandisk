import { LitElement, html, css } from "lit";

export class ScandiskBar extends LitElement {
  static get properties() {
    return {
      value: { type: Number },
    };
  }

  constructor() {
    super();
    this.value = this.getAttribute("value") || 0;
  }

  static get styles() {
    return css`
      .status-bar {
        display: grid;
        grid-template-columns: 1fr 600px;
      }
      .progressbar {
        background: var(--darkgray-color);
      }
      .fillbar {
        background: var(--yellow-color);
        height: 100%;
      }
    `;
  }

  setProgress(value) {
    this.value = value;
  }

  incProgress(step = 15) {
    const value = Math.min(100, parseInt(this.value) + step);
    this.setProgress(value);
  }

  render() {
    return html`
      <div class="status-bar">
        <span>${this.value}% completed</span>
        <div class="progressbar">
          <div class="fillbar" style="width: ${this.value}%"></div>
        </div>
      </div>
    `;
  }
}

customElements.define("scandisk-bar", ScandiskBar);
