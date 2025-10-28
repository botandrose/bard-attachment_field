import { newSpecPage } from '@stencil/core/testing';
import { AttachmentPreview } from './attachment-preview';

describe('attachment-preview', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AttachmentPreview],
      html: `<attachment-preview></attachment-preview>`,
    });
    expect(page.root).toEqualHtml(`
      <attachment-preview class="other">
        <mock:shadow-root>
          This file does not offer a preview
          <slot></slot>
        </mock:shadow-root>
      </attachment-preview>
    `);
  });
});
