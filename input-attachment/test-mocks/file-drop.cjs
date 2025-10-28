// Mock for @botandrose/file-drop in Jest tests (CommonJS)
module.exports = {};
if (typeof customElements !== 'undefined' && !customElements.get('file-drop')) {
  customElements.define('file-drop', class extends HTMLElement {
    connectedCallback() {}
  });
}
