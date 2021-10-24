import { LitElement, html, css } from "lit";

import "./ScandiskScreenCheck.js";
import "./ScandiskScreenSurface.js";
import "./ScandiskScreenSummary.js";

class ScandiskApp extends LitElement {
  static get properties() {
    return {
      phase: { type: Number },
      errors: { type: Number },
    };
  }

  constructor() {
    super();
    this.phase = 0;
    this.errors = 0;
    document.body.style.setProperty("--blue-color", "#0028aa");
  }

  firstUpdated() {
    this.addEventListener("SCANDISK_SURFACE_START", () => (this.phase = 1));
    this.addEventListener("SCANDISK_SUMMARY_START", (ev) => {
      this.phase = 2;
      this.errors = ev.detail.value;
    });
  }

  currentPhase() {
    const PHASES = {
      0: html`<scandisk-screen-check></scandisk-screen-check>`,
      1: html`<scandisk-screen-surface></scandisk-screen-surface>`,
      2: html`<scandisk-screen-summary errors="${this.errors}"></scandisk-screen-summary>`,
    };
    return PHASES[this.phase];
  }

  static get styles() {
    return css`
      :host {
        --gray-color: #bcbdaa;
        --darkgray-color: #525252;
        --yellow-color: #fffa51;
        --cyan-color: #59ffff;
        --emerald-color: #184343;
        --light-emerald-color: #38a6a6;
        --red-color: #9c0b07;
        --bad-text-color: #fe6666;
        --highlight-text-color: #fff;
        --font-name: "IBM Plex Mono", monospaced;
      }
      .monitor {
        width: 800px;
        margin: 3em auto;
        color: var(--gray-color);
        font-family: var(--font-name);
        font-size: 18px;
      }
    `;
  }

  render() {
    return html`<div class="monitor">${this.currentPhase()}</div>`;
  }
}

customElements.define("scandisk-app", ScandiskApp);
