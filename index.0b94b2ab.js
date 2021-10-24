import{s as i,r as c,p as s,o as k}from"./vendor.162fabc4.js";const y=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))p(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const h of a.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&p(h)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function p(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}};y();const n=(r=1,e=6)=>r+~~(Math.random()*e);class v extends i{static get properties(){return{text:{type:String},href:{type:String}}}constructor(){super();this.text=this.textContent,this.href=this.hasAttribute("href")?this.getAttribute("href"):"#"}static get styles(){return c`
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
    `}render(){return s`<a href="${this.href}" target="_parent">${this.text}</a>`}}customElements.define("scandisk-button",v);class g extends i{static get properties(){return{value:{type:Number}}}constructor(){super();this.value=this.getAttribute("value")||0}static get styles(){return c`
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
    `}setProgress(e){this.value=e}incProgress(e=15){const o=Math.min(100,parseInt(this.value)+e);this.setProgress(o)}render(){return s`
      <div class="status-bar">
        <span>${this.value}% completed</span>
        <div class="progressbar">
          <div class="fillbar" style="width: ${this.value}%"></div>
        </div>
      </div>
    `}}customElements.define("scandisk-bar",g);class S extends i{static get properties(){return{currentStage:{type:Number},stages:{type:Array}}}constructor(){super();this.currentStage=0,this.stages=[{name:"Media descriptor",status:"current"},{name:"File allocation tables",status:"pending"},{name:"Directory structure",status:"pending"},{name:"File system",status:"pending"},{name:"Free space",status:"pending"},{name:"Surface scan",status:"pending"}]}firstUpdated(){this.scandiskBar=this.shadowRoot.querySelector("scandisk-bar"),setTimeout(()=>this.processStage(),n(500,2e3))}nextStage(){if(this.currentStage++,this.currentStage<this.stages.length){const e=n(500,2e3);this.stages[this.currentStage].status="current",this.scandiskBar.incProgress(),setTimeout(()=>this.processStage(),e)}else{const e=n(500,2e3);setTimeout(()=>this.finish(),e)}}processStage(){const e=n(1,8);this.stages[this.currentStage].status=e===4?"fixed":"correct",this.nextStage()}finish(){const e=new CustomEvent("SCANDISK_SURFACE_START",{composed:!0});this.dispatchEvent(e)}static get styles(){return c`
      .list {
        display: grid;
        grid-template-columns: 125px 1fr;
        margin-top: 2em;
        margin-bottom: 4em;
      }
      .list span:nth-child(2n-1) {
        text-align: center;
        display: block;
      }
      .list span[data-status="correct"]::before {
        content: "♦";
        color: var(--cyan-color);
      }
      .list span[data-status="current"]::before {
        content: "»";
        color: var(--cyan-color);
      }
      .list span[data-status="fixed"]::before {
        content: "fixed";
        color: var(--red-color);
        font-weight: bold;
      }
      ul {
        margin-left: 2em;
      }
      hr {
        border: 1px solid var(--cyan-color);
      }
    `}get stageList(){return this.stages.map(e=>s`<span data-status="${e.status}"></span> <span>${e.name}</span>`)}render(){return s`
      <div class="screen">
        <p class="title">Microsoft ScanDisk</p>
        <hr />
        <p>ScanDisk is now checking the following areas of drive C:</p>
        <div class="list">
          ${this.stageList}
        </div>
        <div class="buttons">
          <scandisk-button>Pause</scandisk-button>
          <scandisk-button href="https://manz.dev/">More info</scandisk-button>
          <scandisk-button>Exit</scandisk-button>
        </div>
        <hr />
        <scandisk-bar></scandisk-bar>
      </div>
    `}}customElements.define("scandisk-screen-check",S);const x=()=>{const r=n(1,2);new Audio(`bad${r}.mp3`).play()},l=50,d=150,B=100,E=["unused","unused","unused","used","full"];class m extends i{static get properties(){return{read:{type:Boolean},type:{type:String}}}constructor(){super();this.read=!1,this.type="unused"}setRandomType(){const e=n(0,5);this.type=E[e]}getTimeRead(){return{unused:()=>n(l*0,d),used:()=>n(l*1,d*3),full:()=>n(l*1,d*7),bad:()=>n(l*40,d*27)}[this.type]()}isBadBlock(){return n(1,B)===1}markBad(){this.type="bad",x()}readBlock(){return this.read=!0,this.isBadBlock()&&this.markBad(),this.getTimeRead()}static get styles(){return c`
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
    `}get classNames(){return{read:this.read,unused:this.type==="unused",used:this.type==="used",full:this.type==="full",bad:this.type==="bad"}}render(){return s`<span class="block ${k(this.classNames)}"></span>`}}customElements.define("scandisk-surface-block",m);const u=518,f=~~(Math.random()*1e5)+5e5,b=~~(f/u);class A extends i{static get properties(){return{failedBlocks:{type:Number},currentIndex:{type:Number},blocks:{type:Array},scandiskBar:{type:g}}}constructor(){super();this.failedBlocks=0,this.currentIndex=0,this.genSurfaceBlocks()}firstUpdated(){this.scandiskBar=this.shadowRoot.querySelector("scandisk-bar"),this.start()}genSurfaceBlocks(){this.blocks=[];for(let e=0;e<u;e++){const o=new m;o.setRandomType(),this.blocks.push(o)}}get readClusters(){return(this.currentIndex*b).toLocaleString()}get badClusters(){return this.failedBlocks.toLocaleString()}nextBlock(){const e=this.blocks[this.currentIndex],o=e.readBlock();e.type==="bad"&&this.failedBlocks++,this.currentIndex<u-1?setTimeout(()=>this.nextBlock(),o):this.finish();const t=~~(this.currentIndex/u*100);this.scandiskBar.setProgress(t),this.currentIndex++}start(){this.nextBlock()}finish(){this.currentCluster=f;const e=new CustomEvent("SCANDISK_SUMMARY_START",{detail:{value:this.failedBlocks},composed:!0});this.dispatchEvent(e)}static get styles(){return c`
      .screen {
        background: var(--gray-color);
        color: black;
        width: 93%;
        min-height: 400px;
        margin-bottom: 30px;
        box-shadow: 10px 10px 0 black;
        padding: 20px;
        display: grid;
        grid-template-columns: 2fr 1.35fr;
        grid-template-rows: 4fr 0.4fr;
      }
      .screen ul {
        list-style-type: none;
        margin: 0 0 2em;
      }
      .screen ul.data {
        margin-right: 2em;
        text-align: right;
      }
      .drive-info {
        padding: 20px;
      }
      .buttons {
        grid-row: 2;
        grid-column: span 2;
        text-align: center;
      }
      hr {
        border: 1px solid var(--cyan-color);
      }
    `}render(){return s`
    <div class="screen">
      <div class="surface-scan">${this.blocks}</div>
      <div class="drive-info">
        <p>Drive C:</p>
        <ul class="data">
          <li class="total"><span>${f.toLocaleString()}</span> clusters</li>
          <li class="examined"><span>${this.readClusters}</span> examined</li>
          <li class="badc"><span>${this.badClusters}</span> found bad</li>
        </ul>
        <ul class="legend">
          <li>
            <scandisk-surface-block type="unused"></scandisk-surface-block> =
            <var>${b.toLocaleString()}</var> clusters
          </li>
          <li>
            <scandisk-surface-block type="unused"></scandisk-surface-block> unused clusters
          </li>
          <li>
            <scandisk-surface-block type="used"></scandisk-surface-block> some used clusters
          </li>
          <li>
            <scandisk-surface-block type="full"></scandisk-surface-block> used clusters
          </li>
          <li>
            <scandisk-surface-block type="bad"></scandisk-surface-block> some bad clusters
          </li>
        </ul>
      </div>
      <div class="buttons">
        <scandisk-button href="https://manz.dev/">More info</scandisk-button>
        <scandisk-button>Exit</scandisk-button>
      </div>
    </div>
    <hr />
    <scandisk-bar></scandisk-bar>
    `}}customElements.define("scandisk-screen-surface",A);class T extends i{static get properties(){return{errors:{type:Number}}}constructor(){super();this.errors=this.getAttribute("errors")||0}static get styles(){return c`
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
    `}get errorMessage(){return this.errors===0?s`<p>Scandisk not found problems on drive C.</p>`:s`<p>ScanDisk found and fixed <span>${this.errors}</span> problems on drive C.</p>`}render(){return s`
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
    `}}customElements.define("scandisk-screen-summary",T);class C extends i{static get properties(){return{phase:{type:Number},errors:{type:Number}}}constructor(){super();this.phase=0,this.errors=0,document.body.style.setProperty("--blue-color","#0028aa")}firstUpdated(){this.addEventListener("SCANDISK_SURFACE_START",()=>this.phase=1),this.addEventListener("SCANDISK_SUMMARY_START",e=>{this.phase=2,this.errors=e.detail.value})}currentPhase(){return{0:s`<scandisk-screen-check></scandisk-screen-check>`,1:s`<scandisk-screen-surface></scandisk-screen-surface>`,2:s`<scandisk-screen-summary errors="${this.errors}"></scandisk-screen-summary>`}[this.phase]}static get styles(){return c`
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
    `}render(){return s`<div class="monitor">${this.currentPhase()}</div>`}}customElements.define("scandisk-app",C);
