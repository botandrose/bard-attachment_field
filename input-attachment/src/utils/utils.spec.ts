import { html, arrayRemove } from './utils';

describe('utils', () => {
  describe('html', () => {
    it('creates DOM elements from HTML string', () => {
      const element = html('<div>test</div>');
      expect(element.tagName).toBe('DIV');
      expect(element.textContent).toBe('test');
    });
  });

  describe('arrayRemove', () => {
    it('removes first occurrence of item from array', () => {
      const arr = [1, 2, 3, 4, 3];
      arrayRemove(arr, 3);
      expect(arr).toEqual([1, 2, 4, 3]);
    });
  });
});
