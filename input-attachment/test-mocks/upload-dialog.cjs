// Mock for upload-dialog in Jest tests (CommonJS)
module.exports = {};
if (typeof customElements !== "undefined" && !customElements.get("upload-dialog")) {
  customElements.define("upload-dialog", class extends HTMLElement {
    connectedCallback() {}
    open() {}
    close() {}
    addUpload() {}
    startUpload() {}
    updateProgress() {}
    setError() {}
    completeUpload() {}
    removeUpload() {}
  });
}
