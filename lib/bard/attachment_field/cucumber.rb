# Cucumber integration for bard-attachment_field
#
# Usage: require "bard/attachment_field/cucumber" in your features/support/env.rb
#
# Provides step definitions and helpers for testing attachment fields.
#
# Note: Browser automation APIs can't reliably set files on inputs inside shadow DOM.
# This integration uses a workaround that creates a temporary regular DOM input,
# sets files on it, then transfers them to the component via its addFiles() method.

require "active_support/core_ext/module/attribute_accessors"
require "chop"
require "rspec/expectations"

module Bard::AttachmentField::TestHelper
  mattr_accessor :fixtures_path do
    -> { Rails.root.join("features/support/fixtures") }
  end

  module_function

  def resolve_fixture_path(filename)
    File.expand_path(filename, fixtures_path.call)
  end

  def find_field(session, label)
    label_element = begin
      session.find("label", exact_text: label, visible: :all, match: :first)
    rescue Capybara::ElementNotFound
      session.find("label", text: /^#{Regexp.escape(label)}/, visible: :all, match: :first)
    end
    element_id = label_element[:for]
    session.find("input-attachment##{element_id}")
  end

  # File inputs inside shadow DOM can't be set directly by browser automation,
  # so we use a temp regular DOM input and transfer files via JavaScript.
  def attach_files(session, element_id, file_paths)
    session.execute_script("document.body.insertAdjacentHTML('beforeend', '<input type=\"file\" id=\"_pw_file_helper\" multiple style=\"opacity:0;position:absolute;pointer-events:none\">')")

    temp_input = session.document.find("#_pw_file_helper", visible: :all)
    temp_input.set(file_paths)

    session.execute_script(<<~JS)
      (() => {
        const temp = document.getElementById('_pw_file_helper');
        const host = document.getElementById('#{element_id}');
        host.addFiles(temp.files);
        temp.remove();
      })()
    JS
  end

  def wait_for_files(session, element_id, minimum, timeout: 15)
    start = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    loop do
      count = session.evaluate_script("document.getElementById(`#{element_id}`).querySelectorAll('attachment-file').length")
      break if count >= minimum
      elapsed = Process.clock_gettime(Process::CLOCK_MONOTONIC) - start
      raise "Expected at least #{minimum} attachment-file(s) in ##{element_id}, found #{count} after #{timeout}s" if elapsed > timeout
      sleep 0.1
    end
  end

  def wait_for_no_files(session, element_id, selector = "attachment-file", timeout: 10)
    start = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    loop do
      count = session.evaluate_script("document.getElementById(`#{element_id}`).querySelectorAll(`#{selector}`).length")
      break if count == 0
      elapsed = Process.clock_gettime(Process::CLOCK_MONOTONIC) - start
      raise "Expected no #{selector} in ##{element_id}, found #{count} after #{timeout}s" if elapsed > timeout
      sleep 0.1
    end
  end

  def wait_for_upload(session, element_id, timeout: 30)
    start = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    loop do
      result = session.evaluate_script(<<~JS)
        (() => {
          const files = document.getElementById('#{element_id}').querySelectorAll('attachment-file');
          return Array.from(files).map(e => ({ state: e.getAttribute('state'), value: e.value }));
        })()
      JS
      states_done = result.all? { |f| f["state"] == "complete" || f["state"] == "error" }
      values_set = result.all? { |f| f["state"] == "error" || (f["value"] && !f["value"].empty?) }
      break if states_done && values_set
      elapsed = Process.clock_gettime(Process::CLOCK_MONOTONIC) - start
      raise "Uploads not complete after #{timeout}s (files=#{result})" if elapsed > timeout
      sleep 0.1
    end
  end

  def get_files(field)
    field.all("attachment-file", minimum: 0).map { |e| e[:filename] }
  end

  def validation_messages(session, element)
    messages = []
    messages << element.evaluate_script("this.validationMessage")
    # Get validation errors from attachment-file elements' shadow DOM
    child_errors = session.evaluate_script(<<~JS, element[:id])
      ((elementId) => {
        const host = document.getElementById(elementId);
        const files = host.querySelectorAll('attachment-file');
        return Array.from(files).map(f => {
          const errorEl = f.shadowRoot?.querySelector('.validation-error');
          return errorEl?.textContent || '';
        }).filter(e => e);
      })(arguments[0])
    JS
    messages.concat(child_errors)
    messages.select { |m| m && !m.empty? }
  end
end

# Chop integration for form diffing and filling
class Chop::Form::AttachmentField < Chop::Form::Field
  def self.css_selector
    "input-attachment"
  end

  def matches?
    field.tag_name == "input-attachment"
  end

  def get_value
    Bard::AttachmentField::TestHelper.get_files(field)
  end

  def diff_value
    get_value.join(", ")
  end

  def set_value
    filenames = if field[:multiple]
      value.to_s.split(", ").map(&:strip)
    else
      [value.to_s.strip]
    end
    filenames.reject(&:empty?)
  end

  def fill_in!
    return if set_value.empty?

    file_paths = set_value.map do |filename|
      ::File.expand_path(::File.join(path, filename)).tap do |full_path|
        ::File.open(full_path) {} # raise Errno::ENOENT if file doesn't exist
      end
    end

    Bard::AttachmentField::TestHelper.attach_files(session, field[:id], file_paths)
    Bard::AttachmentField::TestHelper.wait_for_files(session, field[:id], file_paths.length)
    Bard::AttachmentField::TestHelper.wait_for_upload(session, field[:id])
  end
end

# Step definitions

When "I attach the file {string} to {string}" do |path, field|
  file_path_full = Bard::AttachmentField::TestHelper.resolve_fixture_path(path)

  begin
    element = Bard::AttachmentField::TestHelper.find_field(page, field)
  rescue Capybara::ElementNotFound
    attach_file field, file_path_full
    next
  end

  Bard::AttachmentField::TestHelper.attach_files(page, element[:id], [file_path_full])
  Bard::AttachmentField::TestHelper.wait_for_files(page, element[:id], 1)
  Bard::AttachmentField::TestHelper.wait_for_upload(page, element[:id])
end

When "I attach the following files to {string}:" do |field, table|
  files = table.raw.map(&:first).map { |filename| Bard::AttachmentField::TestHelper.resolve_fixture_path(filename) }

  begin
    element = Bard::AttachmentField::TestHelper.find_field(page, field)
  rescue Capybara::ElementNotFound
    attach_file field, files
    next
  end

  Bard::AttachmentField::TestHelper.attach_files(page, element[:id], files)
  Bard::AttachmentField::TestHelper.wait_for_files(page, element[:id], files.length)
  Bard::AttachmentField::TestHelper.wait_for_upload(page, element[:id], timeout: 60)
end

When "I remove the file from {string}" do |field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  element_id = element[:id]
  # Use JavaScript to click the remove link since Cuprite has issues with shadow DOM paths
  page.execute_script(<<~JS, element_id)
    ((elementId) => {
      const host = document.getElementById(elementId);
      const attachmentFile = host.querySelector('attachment-file');
      const removeLink = attachmentFile.shadowRoot.querySelector('a.remove-media');
      removeLink.click();
    })(arguments[0])
  JS
  Bard::AttachmentField::TestHelper.wait_for_no_files(page, element_id)
end

When "I remove {string} from {string}" do |filename, field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  element_id = element[:id]
  # Use JavaScript to click the remove link since Cuprite has issues with shadow DOM paths
  page.execute_script(<<~JS, element_id, filename)
    ((elementId, filename) => {
      const host = document.getElementById(elementId);
      const attachmentFile = host.querySelector(`attachment-file[filename='${filename}']`);
      const removeLink = attachmentFile.shadowRoot.querySelector('a.remove-media');
      removeLink.click();
    })(arguments[0], arguments[1])
  JS
  Bard::AttachmentField::TestHelper.wait_for_no_files(page, element_id, "attachment-file[filename='#{filename}']")
end

When "I remove {string} from the {string} field" do |filename, field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  element_id = element[:id]
  page.execute_script(<<~JS, element_id, filename)
    ((elementId, filename) => {
      const host = document.getElementById(elementId);
      const attachmentFile = host.querySelector(`attachment-file[filename='${filename}']`);
      const removeLink = attachmentFile.shadowRoot.querySelector('a.remove-media');
      removeLink.click();
    })(arguments[0], arguments[1])
  JS
  Bard::AttachmentField::TestHelper.wait_for_no_files(page, element_id, "attachment-file[filename='#{filename}']")
end

When "I drag the file {string} onto the {string} attachment field" do |path, field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  file_path_full = Bard::AttachmentField::TestHelper.resolve_fixture_path(path)

  # Create temp input to get File objects, then dispatch drop event on file-drop
  page.execute_script("document.body.insertAdjacentHTML('beforeend', '<input type=\"file\" id=\"_pw_file_helper\" multiple style=\"opacity:0;position:absolute;pointer-events:none\">')")
  temp_input = page.find("#_pw_file_helper", visible: :all)
  temp_input.set([file_path_full])

  page.execute_script(<<~JS, element[:id])
    ((elementId) => {
      const temp = document.getElementById('_pw_file_helper');
      const host = document.getElementById(elementId);
      const fileDrop = host.shadowRoot.querySelector('file-drop');

      const dt = new DataTransfer();
      Array.from(temp.files).forEach(f => dt.items.add(f));

      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        dataTransfer: dt
      });
      fileDrop.dispatchEvent(dropEvent);
      temp.remove();
    })(arguments[0])
  JS

  page.document.synchronize(15, errors: [Capybara::ElementNotFound]) do
    element.find("attachment-file")
  end

  Bard::AttachmentField::TestHelper.wait_for_upload(page, element[:id])
end

Then "I should see a preview of {string} for the {string} field" do |filename, field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  expect(element.find("attachment-file")[:filename]).to eq(filename)
end

Then "I should see the following media previews for the {string} field:" do |field, table|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  element.assert_selector("attachment-file", minimum: table.raw.length)
  actual = Bard::AttachmentField::TestHelper.get_files(element).map { |f| [f] }
  table.diff! actual
end

When "I follow the {string} download link for {string}" do |filename, field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  # Click the download link inside attachment-file's shadow DOM
  page.execute_script(<<~JS, element[:id], filename)
    ((elementId, filename) => {
      const host = document.getElementById(elementId);
      const attachmentFile = host.querySelector(`attachment-file[filename='${filename}']`) ||
                             host.querySelector('attachment-file');
      const downloadLink = attachmentFile.shadowRoot.querySelector('a.download-link');
      downloadLink.click();
    })(arguments[0], arguments[1])
  JS
end

Then "the {string} attachment field should be disabled" do |field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)

  is_disabled = page.evaluate_script(<<~JS)
    (function() {
      const element = document.getElementById('#{element[:id]}');
      if (element.hasAttribute('disabled')) return true;
      if (element.closest('fieldset[disabled]')) return true;
      const fileInput = element.shadowRoot?.querySelector('input[type="file"]');
      return fileInput?.disabled || false;
    })()
  JS

  expect(is_disabled).to be true
end

Then "the {string} attachment field should not be disabled" do |field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)

  is_disabled = page.evaluate_script(<<~JS)
    (function() {
      const element = document.getElementById('#{element[:id]}');
      if (element.hasAttribute('disabled')) return true;
      if (element.closest('fieldset[disabled]')) return true;
      const fileInput = element.shadowRoot?.querySelector('input[type="file"]');
      return fileInput?.disabled || false;
    })()
  JS

  expect(is_disabled).to be false
end

Then "the {string} attachment field should have a validation error containing {string}" do |field, message|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  messages = Bard::AttachmentField::TestHelper.validation_messages(page, element)
  expect(messages).to include(a_string_including(message))
end

Then "the {string} attachment field should have no validation errors" do |field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  messages = Bard::AttachmentField::TestHelper.validation_messages(page, element)
  expect(messages).to be_empty
end

Then "I should not be able to attach a file to {string}" do |field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  shadow_root = element.shadow_root
  file_input = shadow_root.find("input[type='file']", visible: :all)
  expect(file_input).to be_disabled
end
