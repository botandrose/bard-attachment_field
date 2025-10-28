import { newE2EPage } from '@stencil/core/testing';

describe('input-attachment', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<input-attachment></input-attachment>');

    const element = await page.find('input-attachment');
    expect(element).toHaveClass('hydrated');
  });
});
