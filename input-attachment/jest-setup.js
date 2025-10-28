// Jest setup file for DOM polyfills

// Polyfill replaceChildren for test environment
Element.prototype.replaceChildren = Element.prototype.replaceChildren || function(...nodes) {
  while (this.lastChild) {
    this.removeChild(this.lastChild);
  }
  this.append(...nodes);
};

// Mock HTML input validation methods
if (typeof HTMLInputElement !== 'undefined') {
  Object.defineProperty(HTMLInputElement.prototype, 'setCustomValidity', {
    value: function() {},
    writable: true
  });

  Object.defineProperty(HTMLInputElement.prototype, 'reportValidity', {
    value: function() { return true; },
    writable: true
  });
}

// Progress-bar and file-drop components are mocked via moduleNameMapper in stencil.config.ts