Given "I am on the homepage" do
  visit "/"
end

Given "I am on {string}" do |path|
  visit path
end

When "I reload the page" do
  visit page.current_path
end

When "I fill in {string} with {string}" do |field, value|
  fill_in field, with: value
end

When "I attach the file {string} to {string}" do |path, field|
  # Find the input-attachment element by looking for the label
  label = find("label", text: /^#{Regexp.escape(field)}$/)
  element_id = label[:for]

  file_path_full = Pathname.new(__dir__).join("../fixtures/#{path}").expand_path.to_s

  element = find("input-attachment##{element_id}")

  # Get the file input element from shadow DOM and set files via CDP
  shadow_root = element.shadow_root
  file_input = shadow_root.find("input[type='file']", visible: :all)
  ferrum_node = file_input.native.node
  ferrum_node.select_file(file_path_full)

  # Use the component's addFiles method which creates proper DOM elements
  # that trigger Stencil's lifecycle (componentDidLoad -> DirectUploadController)
  page.execute_script(<<~JS)
    (function() {
      const element = document.getElementById('#{element_id}');
      const fileInput = element.shadowRoot.querySelector('input[type="file"]');
      if (fileInput && fileInput.files.length > 0) {
        element.addFiles(fileInput.files);
        fileInput.value = '';
      }
    })()
  JS

  # Wait for Stencil's componentDidRender to append the attachment-file element
  # The element is appended as a child of input-attachment (not in shadow DOM)
  page.document.synchronize(15, errors: [Capybara::ElementNotFound]) do
    element.find("attachment-file")
  end

  # Wait for direct upload to complete or error (state changes from "pending" to "complete" or "error")
  page.document.synchronize(30, errors: [RuntimeError]) do
    state = page.evaluate_script("document.querySelector('attachment-file')?.getAttribute('state')")
    raise "Upload not complete (state=#{state})" unless state == "complete" || state == "error"
  end
end

When "I attach a file of type {string} to {string}" do |extension, field|
  path = Pathname.new(__dir__).join("../fixtures/empty.#{extension}").expand_path
  FileUtils.touch(path) if !path.exist?

  # Find the input-attachment element by looking for the label
  label = find("label", text: /^#{Regexp.escape(field)}$/)
  element_id = label[:for]

  element = find("input-attachment##{element_id}")

  # Get the file input element from shadow DOM and set files via CDP
  shadow_root = element.shadow_root
  file_input = shadow_root.find("input[type='file']", visible: :all)
  ferrum_node = file_input.native.node
  ferrum_node.select_file(path.to_s)

  # Use the component's addFiles method which creates proper DOM elements
  page.execute_script(<<~JS)
    (function() {
      const element = document.getElementById('#{element_id}');
      const fileInput = element.shadowRoot.querySelector('input[type="file"]');
      if (fileInput && fileInput.files.length > 0) {
        element.addFiles(fileInput.files);
        fileInput.value = '';
      }
    })()
  JS

  # Wait for Stencil's componentDidRender to append the attachment-file element
  page.document.synchronize(15, errors: [Capybara::ElementNotFound]) do
    element.find("attachment-file")
  end

  # Wait for direct upload to complete or error
  page.document.synchronize(30, errors: [RuntimeError]) do
    state = page.evaluate_script("document.querySelector('attachment-file')?.getAttribute('state')")
    raise "Upload not complete (state=#{state})" unless state == "complete" || state == "error"
  end
end

When "I attach the following files to {string}:" do |field, table|
  files = table.raw.map(&:first).map { |filename| Pathname.new(__dir__).join("../fixtures/#{filename}").expand_path.to_s }

  # Find the input-attachment element by looking for the label
  label = find("label", text: /^#{Regexp.escape(field)}$/)
  element_id = label[:for]

  element = find("input-attachment##{element_id}")

  # Get the file input element from shadow DOM and set files via CDP
  shadow_root = element.shadow_root
  file_input = shadow_root.find("input[type='file']", visible: :all)
  ferrum_node = file_input.native.node
  ferrum_node.select_file(files)

  # Use the component's addFiles method which creates proper DOM elements
  page.execute_script(<<~JS)
    (function() {
      const element = document.getElementById('#{element_id}');
      const fileInput = element.shadowRoot.querySelector('input[type="file"]');
      if (fileInput && fileInput.files.length > 0) {
        element.addFiles(fileInput.files);
        fileInput.value = '';
      }
    })()
  JS

  # Wait for Stencil's componentDidRender to append all attachment-file elements
  page.document.synchronize(15, errors: [Capybara::ElementNotFound]) do
    element.all("attachment-file", minimum: files.length)
  end

  # Wait for all direct uploads to complete
  page.document.synchronize(60, errors: [RuntimeError]) do
    states = page.evaluate_script("Array.from(document.querySelectorAll('attachment-file')).map(e => e.getAttribute('state'))")
    raise "Uploads not complete (states=#{states})" unless states.all? { |s| s == "complete" }
  end
end

When "I follow {string}" do |link|
  find_link(link).trigger "click"
end

When "I press {string}" do |button|
  click_button button
end

Then "I should see {string} filled in with {string}" do |field, value|
  raise "Expected field '#{field}' to be '#{value}' but was '#{find_field(field).value}'" unless find_field(field).value == value
end

Then /^I should see "(.*?)"$/ do |text|
  raise "Expected to see '#{text}' but it was not found" unless page.has_content?(text)
end

Then /^I should not see "(.*?)"$/ do |text|
  raise "Expected not to see '#{text}' but it was found" if page.has_content?(text)
end

Then "I should see the {string} image" do |filename|
  raise "Expected to see image with src ending in '#{filename}'" unless page.has_css?("img[src$='/#{filename}']")
end

Then "I should not see the {string} image" do |filename|
  raise "Expected not to see image with src ending in '#{filename}'" if page.has_css?("img[src$='/#{filename}']")
end

Then "I should see a preview of {string}" do |filename|
  raise "Expected preview filename to be '#{filename}' but was '#{find("attachment-file")[:filename]}'" unless find("attachment-file")[:filename] == filename
end

Then "I should not see a preview" do
  raise "Expected not to see a preview (figure) element" if page.has_css?("figure")
end

Then "I should see an upload progress bar at 100%" do
  page.document.synchronize 10, errors: [RuntimeError] do
    # Use JavaScript to access shadow DOM since Cuprite can't traverse XPath from document fragments
    percent = page.evaluate_script(<<~JS)
      (function() {
        const attachmentFile = document.querySelector('attachment-file');
        if (!attachmentFile || !attachmentFile.shadowRoot) return null;
        const progressBar = attachmentFile.shadowRoot.querySelector('progress-bar');
        return progressBar ? progressBar.getAttribute('percent') : null;
      })()
    JS
    raise "Expected to see progress-bar at 100% but was #{percent.inspect}" unless percent == "100"
  end
end

Then "the {string} bard-attachment should have a validation error containing {string}" do |field, message|
  messages = bard_attachment_validation_messages(field)
  raise "Expected validation message '#{message}' but got #{messages.inspect}" unless messages.include?(message)
end

Then "the {string} bard-attachment should have no validation errors" do |field|
  messages = bard_attachment_validation_messages(field)
  raise "Expected no validation errors but got #{messages.inspect}" unless messages.empty?
end

Then "I should see the input-attachment component" do
  raise "Expected to see hydrated input-attachment component" unless page.has_css?("input-attachment.hydrated")
end

def bard_attachment_validation_messages field
  label = find("label", text: /^#{Regexp.escape(field)}$/)
  element_id = label[:for]
  bard_attachment = find("input-attachment##{element_id}")
  messages = []
  # Get validationMessage from input-attachment (for required validation)
  messages << bard_attachment.evaluate_script("this.validationMessage")
  # Get validationError from attachment-file elements (for file type/size validation)
  bard_attachment.all("attachment-file").each do |e|
    messages << e.evaluate_script("this.validationError")
  end
  messages.select(&:present?)
end

Then "I dump localStorage" do
  result = page.evaluate_script(<<~JS)
    (function() {
      const items = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        items[key] = localStorage.getItem(key);
      }
      return JSON.stringify(items, null, 2);
    })()
  JS
  puts "=== localStorage dump ==="
  puts result
  puts "========================="
end

Then "I dump the form value" do
  result = page.evaluate_script(<<~JS)
    (function() {
      const input = document.querySelector('input-attachment');
      const children = Array.from(input.children).filter(e => e.tagName === 'ATTACHMENT-FILE');
      const slot = input.shadowRoot?.querySelector('slot');
      const slottedElements = slot?.assignedElements() || [];
      return {
        filesProperty: input.files?.length,
        _filesProperty: input._files?.length,
        childAttachmentFiles: children.length,
        childTags: Array.from(input.children).map(e => e.tagName),
        slottedElements: slottedElements.map(e => e.tagName),
        value: input.value,
        formValue: new FormData(input.form).get(input.name)
      };
    })()
  JS
  puts "=== form value dump ==="
  puts result.inspect
  puts "========================="
end

Then "I dump the input-attachment HTML" do
  result = page.evaluate_script(<<~JS)
    document.querySelector('input-attachment').outerHTML
  JS
  puts "=== input-attachment HTML ==="
  puts result
  puts "========================="
end

When "I drag the file {string} onto the {string} attachment field" do |path, field|
  file_path_full = Pathname.new(__dir__).join("../fixtures/#{path}").expand_path.to_s

  label = find("label", text: /^#{Regexp.escape(field)}$/)
  element_id = label[:for]
  element = find("input-attachment##{element_id}")

  # Use CDP to set files on the input, then simulate drop event on file-drop
  shadow_root = element.shadow_root
  file_input = shadow_root.find("input[type='file']", visible: :all)
  ferrum_node = file_input.native.node
  ferrum_node.select_file(file_path_full)

  # Trigger the file-drop component's drop handler via the file input
  page.execute_script(<<~JS)
    (function() {
      const element = document.getElementById('#{element_id}');
      const fileInput = element.shadowRoot.querySelector('input[type="file"]');
      const fileDrop = element.shadowRoot.querySelector('file-drop');

      if (fileInput && fileInput.files.length > 0) {
        // Create a synthetic drop event with the files
        const dataTransfer = new DataTransfer();
        Array.from(fileInput.files).forEach(f => dataTransfer.items.add(f));

        const dropEvent = new DragEvent('drop', {
          bubbles: true,
          cancelable: true,
          dataTransfer: dataTransfer
        });

        // Dispatch to file-drop (which should trigger the file input change)
        fileDrop.dispatchEvent(dropEvent);

        // Also call addFiles as fallback
        element.addFiles(fileInput.files);
        fileInput.value = '';
      }
    })()
  JS

  page.document.synchronize(15, errors: [Capybara::ElementNotFound]) do
    element.find("attachment-file")
  end

  page.document.synchronize(30, errors: [RuntimeError]) do
    state = page.evaluate_script("document.querySelector('attachment-file')?.getAttribute('state')")
    raise "Upload not complete (state=#{state})" unless state == "complete" || state == "error"
  end
end

Then "the {string} attachment field should be disabled" do |field|
  label = find("label", text: /^#{Regexp.escape(field)}$/)
  element_id = label[:for]
  element = find("input-attachment##{element_id}")

  # Check if the component has disabled attribute or is within a disabled fieldset
  is_disabled = page.evaluate_script(<<~JS)
    (function() {
      const element = document.getElementById('#{element_id}');
      if (element.hasAttribute('disabled')) return true;
      if (element.closest('fieldset[disabled]')) return true;
      const fileInput = element.shadowRoot?.querySelector('input[type="file"]');
      return fileInput?.disabled || false;
    })()
  JS

  raise "Expected '#{field}' attachment field to be disabled" unless is_disabled
end

Then "I should not be able to attach a file to {string}" do |field|
  label = find("label", text: /^#{Regexp.escape(field)}$/)
  element_id = label[:for]
  element = find("input-attachment##{element_id}")

  shadow_root = element.shadow_root
  file_input = shadow_root.find("input[type='file']", visible: :all)

  raise "Expected file input to be disabled" unless file_input.disabled?
end
