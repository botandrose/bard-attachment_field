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
});
