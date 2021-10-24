import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { getRandomNumber } from "../modules/getRandomNumber.js";

const playBadSector = () => {
  const num = getRandomNumber(1, 2);
  const audio = new Audio(`bad${num}.mp3`);
  audio.play();
};

const MIN_BASE_READ_TIME = 50;
const MAX_BASE_READ_TIME = 150;
const BAD_SECTOR_PROBABILITY = 100;
const PROBABILITY_TYPES = ["unused", "unused", "unused", "used", "full"];

export class ScandiskSurfaceBlock extends LitElement {
  static get properties() {
    return {
      read: { type: Boolean },
      type: { type: String },
    };
  }

  constructor() {
    super();
    this.read = false;
    this.type = "unused";
  }

  setRandomType() {
    const typeIndex = getRandomNumber(0, 5);
    this.type = PROBABILITY_TYPES[typeIndex];
  }

  getTimeRead() {
    const time = {
      unused: () => getRandomNumber(MIN_BASE_READ_TIME * 0, MAX_BASE_READ_TIME),
      used: () => getRandomNumber(MIN_BASE_READ_TIME * 1, MAX_BASE_READ_TIME * 3),
      full: () => getRandomNumber(MIN_BASE_READ_TIME * 1, MAX_BASE_READ_TIME * 7),
      bad: () => getRandomNumber(MIN_BASE_READ_TIME * 40, MAX_BASE_READ_TIME * 27),
    };
    return time[this.type]();
  }

  isBadBlock() {
    return getRandomNumber(1, BAD_SECTOR_PROBABILITY) === 1;
  }

  markBad() {
    this.type = "bad";
    playBadSector();
  }

  readBlock() {
    this.read = true;
    if (this.isBadBlock()) this.markBad();
    return this.getTimeRead();
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        background: black;
      }
      .block::before {
        width: 12px;
        height: 22px;
        text-align: center;
        display: inline-block;
      }
      .unused::before {
        content: "░";
        background: var(--emerald-color);
        color: var(--light-emerald-color);
      }
      .used::before {
        content: "▒";
        background: var(--light-emerald-color);
        color: black;
      }
      .full::before {
        content: "•";
        background: var(--cyan-color);
        color: black;
      }
      .read::before {
        background: var(--yellow-color);
      }
      .bad::before {
        content: "B";
        background: black;
        color: var(--bad-text-color);
      }
    `;
  }

  get classNames() {
    return {
      read: this.read,
      unused: this.type === "unused",
      used: this.type === "used",
      full: this.type === "full",
      bad: this.type === "bad",
    };
  }

  render() {
    return html`<span class="block ${classMap(this.classNames)}"></span>`;
  }
}

customElements.define("scandisk-surface-block", ScandiskSurfaceBlock);
