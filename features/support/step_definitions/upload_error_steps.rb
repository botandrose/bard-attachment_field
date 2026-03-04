When "the direct upload URL is set to fail" do
  page.execute_script(<<~JS)
    document.querySelectorAll('input-attachment').forEach(el => {
      el.directupload = '/fail_upload';
    });
  JS
end

When "the direct upload URL is restored" do
  page.execute_script(<<~JS)
    document.querySelectorAll('input-attachment').forEach(el => {
      el.directupload = '/rails/active_storage/direct_uploads';
    });
    document.querySelectorAll('attachment-file').forEach(el => {
      el.url = '/rails/active_storage/direct_uploads';
    });
  JS
end

# Clicks remove without waiting for DOM confirmation, since the form
# may auto-submit and navigate before the element is removed.
When "I click remove for the errored upload in {string}" do |field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  page.execute_script(<<~JS, element[:id])
    ((elementId) => {
      const host = document.getElementById(elementId);
      const attachmentFile = host.querySelector('attachment-file[state="error"]');
      const removeLink = attachmentFile.shadowRoot.querySelector('a.remove-media');
      removeLink.click();
    })(arguments[0])
  JS
end

When "I retry the errored upload in {string}" do |field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  element_id = element[:id]
  page.execute_script(<<~JS, element_id)
    ((elementId) => {
      const host = document.getElementById(elementId);
      const attachmentFile = host.querySelector('attachment-file[state="error"]');
      const retryLink = attachmentFile.shadowRoot.querySelector('a.retry-media');
      retryLink.click();
    })(arguments[0])
  JS
  # Wait for state to leave "error" before calling wait_for_upload,
  # which treats "error" as a terminal state. The form may auto-submit
  # after retry completes, navigating away before we can check.
  start = Process.clock_gettime(Process::CLOCK_MONOTONIC)
  begin
    loop do
      states = page.evaluate_script(<<~JS)
        (() => {
          const el = document.getElementById('#{element_id}');
          if (!el) return null;
          const files = el.querySelectorAll('attachment-file');
          return Array.from(files).map(e => e.getAttribute('state'));
        })()
      JS
      break if states.nil? || states.none? { |s| s == "error" }
      elapsed = Process.clock_gettime(Process::CLOCK_MONOTONIC) - start
      raise "Retry did not clear error state after 10s" if elapsed > 10
      sleep 0.1
    end
    Bard::AttachmentField::TestHelper.wait_for_upload(page, element_id)
  rescue Ferrum::JavaScriptError
    # Page navigated due to auto-submit — upload succeeded
  end
end
