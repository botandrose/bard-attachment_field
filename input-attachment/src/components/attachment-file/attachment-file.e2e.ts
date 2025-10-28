import { newE2EPage } from '@stencil/core/testing';

describe('attachment-file', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<attachment-file></attachment-file>');

    const element = await page.find('attachment-file');
    expect(element).toHaveClass('hydrated');
  });
});
