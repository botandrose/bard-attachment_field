import { newE2EPage } from '@stencil/core/testing';

describe('attachment-preview', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<attachment-preview></attachment-preview>');

    const element = await page.find('attachment-preview');
    expect(element).toHaveClass('hydrated');
  });
});
