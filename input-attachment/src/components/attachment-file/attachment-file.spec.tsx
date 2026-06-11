// Mock rails-request-json to avoid ES module issues
jest.mock('rails-request-json', () => ({
  get: jest.fn(() => Promise.resolve({}))
}));

import { newSpecPage } from '@stencil/core/testing';
import { AttachmentFile } from './attachment-file';

describe('attachment-file', () => {

  it('renders', async () => {
    const page = await newSpecPage({
      components: [AttachmentFile],
      html: `<attachment-file></attachment-file>`,
    });

    // Just check that it renders without error
    expect(page.root.tagName).toBe('ATTACHMENT-FILE');
  });

  it('links the download link to src by default', async () => {
    const page = await newSpecPage({
      components: [AttachmentFile],
      html: `<attachment-file src="/preview.jpg" filename="image.jpg"></attachment-file>`,
    });

    const link = page.root.shadowRoot.querySelector('a.download-link');
    expect(link.getAttribute('href')).toBe('/preview.jpg');
    expect(link.getAttribute('download')).toBe('image.jpg');
  });

  it('links the download link to href and download when provided', async () => {
    const page = await newSpecPage({
      components: [AttachmentFile],
      html: `<attachment-file src="/preview.jpg" href="/master.jpg" download="original.jpg" filename="image.jpg"></attachment-file>`,
    });

    const link = page.root.shadowRoot.querySelector('a.download-link');
    expect(link.getAttribute('href')).toBe('/master.jpg');
    expect(link.getAttribute('download')).toBe('original.jpg');
  });
});
