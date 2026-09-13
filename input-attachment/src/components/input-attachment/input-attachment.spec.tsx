
// Mock rails-request-json to avoid ES module issues
jest.mock('rails-request-json', () => ({
  get: jest.fn(() => Promise.resolve({}))
}));

// Mock @botandrose/file-drop to avoid ES module issues
jest.mock('@botandrose/file-drop', () => ({}));

import { newSpecPage } from '@stencil/core/testing';
import { InputAttachment } from './input-attachment';

describe('input-attachment', () => {

  it('renders', async () => {
    const page = await newSpecPage({
      components: [InputAttachment],
      html: `<form><input-attachment></input-attachment></form>`,
    });
    expect(page.root).toEqualHtml(`
      <input-attachment>
        <mock:shadow-root>
          <input aria-label="Choose file" type="file">
          <file-drop>
            <p part="title">
              <strong>Choose file </strong>
              <span>or drag it here.</span>
            </p>
            <div class="media-preview">
              <slot></slot>
            </div>
          </file-drop>
        </mock:shadow-root>
      </input-attachment>
    `);
  });

  describe('formStateRestoreCallback (Firefox session restore)', () => {
    async function newPage() {
      const page = await newSpecPage({
        components: [InputAttachment],
        html: `<form><input-attachment name="attachments[]" multiple></input-attachment></form>`,
      });
      const instance: any = page.rootInstance;
      const calls: any[] = [];
      instance.internals = {
        setFormValue: (value: any, state: any) => calls.push({ value, state }),
        setValidity: () => {},
      };
      return { page, instance, calls };
    }

    it('saves the files as a JSON string state, not the FormData Firefox would flatten', async () => {
      const { instance, calls } = await newPage();
      instance.files = [{ value: 'signed-one' }, { value: 'signed-two' }];
      instance.updateFormValue();
      const last = calls[calls.length - 1];
      expect(typeof last.state).toBe('string');
      expect(JSON.parse(last.state).map((f: any) => f.value)).toEqual(['signed-one', 'signed-two']);
    });

    it('rebuilds the attachments from the restored state string', async () => {
      const { instance, calls } = await newPage();
      const state = JSON.stringify([{ value: 'signed-one', filename: 'a.png', state: 'complete' }]);
      instance.formStateRestoreCallback(state);
      expect(instance.files.map((f: any) => f.value)).toEqual(['signed-one']);
      instance.updateFormValue();
      expect(calls[calls.length - 1].value.getAll('attachments[]')).toEqual(['signed-one']);
    });

    it('falls back to the current files when the restored state is the coerced "[object Object]"', async () => {
      const { instance, calls } = await newPage();
      instance.files = [{ value: 'signed-one' }];
      instance.formStateRestoreCallback('[object Object]');
      expect(calls[calls.length - 1].value.getAll('attachments[]')).toEqual(['signed-one']);
    });
  });
});
