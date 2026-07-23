import { newE2EPage } from '@stencil/core/testing';

describe('attachment-preview', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<attachment-preview></attachment-preview>');

    const element = await page.find('attachment-preview');
    expect(element).toHaveClass('hydrated');
  });

  it('does not bubble video preview clicks to ancestor upload handlers', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="drop">
        <attachment-preview filetype="video" src="data:video/mp4;base64,AAAA"></attachment-preview>
      </div>
    `);
    await page.evaluate(() => {
      (window as any).ancestorClicked = false;
      document
        .getElementById('drop')
        .addEventListener('click', () => { (window as any).ancestorClicked = true; });
      const video = document
        .querySelector('attachment-preview')
        .shadowRoot.querySelector('video') as any;
      video.play = () => Promise.resolve();
      video.pause = () => {};
    });

    const video = await page.find('attachment-preview >>> video');
    await video.click();
    await page.waitForChanges();

    const ancestorClicked = await page.evaluate(() => (window as any).ancestorClicked);
    expect(ancestorClicked).toBe(false);
  });
});
