// Mock for @botandrose/progress-bar in Jest tests (CommonJS)
module.exports = {};
if (typeof customElements !== 'undefined' && !customElements.get('progress-bar')) {
  customElements.define('progress-bar', class extends HTMLElement {
    static get observedAttributes() { return ['value', 'max']; }
    connectedCallback() {}
    attributeChangedCallback() {}
  });
}
