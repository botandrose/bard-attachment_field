require "bard/attachment_field/cucumber"

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

# Test-specific: attaches a file by extension (creates empty file if needed)
When "I attach a file of type {string} to {string}" do |extension, field|
  path = Pathname.new(__dir__).join("../fixtures/empty.#{extension}").expand_path
  FileUtils.touch(path) if !path.exist?

  element = Bard::AttachmentField::TestHelper.find_field(page, field)

  Bard::AttachmentField::TestHelper.attach_files(page, element[:id], [path.to_s])

  page.document.synchronize(15, errors: [Capybara::ElementNotFound]) do
    element.find("attachment-file")
  end

  Bard::AttachmentField::TestHelper.wait_for_upload(page, element[:id])
end

When "I follow {string}" do |link|
  click_link link
end

When "I press {string}" do |button|
  click_button button
end

Then "I should see {string} filled in with {string}" do |field, value|
  expect(find_field(field).value).to eq(value)
end

Then /^I should see "(.*?)"$/ do |text|
  expect(page).to have_content(text)
end

Then /^I should not see "(.*?)"$/ do |text|
  expect(page).to have_no_content(text)
end

Then "I should see the {string} image" do |filename|
  expect(page).to have_css("img[src$='/#{filename}']")
end

Then "I should not see the {string} image" do |filename|
  expect(page).to have_no_css("img[src$='/#{filename}']")
end

# Debug helpers
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
