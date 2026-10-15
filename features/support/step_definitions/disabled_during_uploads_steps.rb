Given "uploads are held" do
  page.execute_script(<<~JS)
    (() => {
      const origSend = XMLHttpRequest.prototype.send;
      window._origXHRSend = origSend;
      window._uploadGate = new Promise(resolve => { window._releaseUploads = resolve; });
      XMLHttpRequest.prototype.send = function(...args) {
        window._uploadGate.then(() => origSend.apply(this, args));
      };
    })();
  JS
end

When "uploads are released" do
  page.execute_script(<<~JS)
    XMLHttpRequest.prototype.send = window._origXHRSend;
    window._releaseUploads();
  JS
end

When "I begin attaching the file {string} to {string}" do |path, field|
  file_path_full = Bard::AttachmentField::TestHelper.resolve_fixture_path(path)
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  Bard::AttachmentField::TestHelper.attach_files(page, element[:id], [file_path_full])
  Bard::AttachmentField::TestHelper.wait_for_files(page, element[:id], 1)
end

Then "the upload completes for {string}" do |field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  Bard::AttachmentField::TestHelper.wait_for_upload(page, element[:id])
end

When "I mark the page" do
  page.execute_script("window._pageMark = true")
end

Then "the page should not have reloaded" do
  expect(page.evaluate_script("window._pageMark")).to be(true)
end

Then "the form should have dispatched {int} submit event(s)" do |count|
  expect(page.evaluate_script("window._submitCount")).to eq(count)
end
