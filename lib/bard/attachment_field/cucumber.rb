# Cucumber integration for bard-attachment_field
#
# Usage: require "bard/attachment_field/cucumber" in your features/support/env.rb
#
# Provides step definitions and helpers for testing attachment fields.
#
# Note: CDP's DOM.setFileInputFiles silently fails for file inputs inside shadow DOM.
# This integration uses a workaround that creates a temporary regular DOM input to
# receive files via CDP, then transfers them to the component via its addFiles() method.

require "chop"
require "rspec/expectations"

module Bard::AttachmentField::TestHelper
  module_function

  def find_field(session, label)
    label_element = session.find("label", text: /^#{Regexp.escape(label)}$/)
    element_id = label_element[:for]
    session.find("input-attachment##{element_id}")
  end

  # CDP's setFileInputFiles fails silently for file inputs inside shadow DOM,
  # so we use a temp regular DOM input and transfer files via JavaScript.
  def attach_files(session, element_id, file_paths)
    session.execute_script("document.body.insertAdjacentHTML('beforeend', '<input type=\"file\" id=\"_cdp_file_helper\" multiple style=\"display:none\">')")

    temp_input = session.find("#_cdp_file_helper", visible: :all)
    temp_input.native.node.select_file(file_paths)

    session.execute_script(<<~JS)
      (() => {
        const temp = document.getElementById('_cdp_file_helper');
        const host = document.getElementById('#{element_id}');
        host.addFiles(temp.files);
        temp.remove();
      })()
    JS
  end

  def wait_for_upload(session, element_id, timeout: 30)
    session.document.synchronize(timeout, errors: [RuntimeError]) do
      states = session.evaluate_script(<<~JS)
        Array.from(document.getElementById('#{element_id}').querySelectorAll('attachment-file')).map(e => e.getAttribute('state'))
      JS
      raise "Uploads not complete (states=#{states})" unless states.all? { |s| s == "complete" || s == "error" }
    end
  end

  def get_files(field)
    field.all("attachment-file").map { |e| e[:filename] }
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
    Bard::AttachmentField::TestHelper.wait_for_upload(session, field[:id])
  end
end

# Step definitions

When "I attach the file {string} to {string}" do |path, field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  file_path_full = File.expand_path(path, Rails.root.join("features/fixtures"))

  Bard::AttachmentField::TestHelper.attach_files(page, element[:id], [file_path_full])

  # Wait for the component to react and show the attachment-file preview
  page.document.synchronize(15, errors: [Capybara::ElementNotFound]) do
    element.find("attachment-file")
  end

  Bard::AttachmentField::TestHelper.wait_for_upload(page, element[:id])
end

When "I attach the following files to {string}:" do |field, table|
  files = table.raw.map(&:first).map { |filename| File.expand_path(filename, Rails.root.join("features/fixtures")) }

  element = Bard::AttachmentField::TestHelper.find_field(page, field)

  Bard::AttachmentField::TestHelper.attach_files(page, element[:id], files)

  # Wait for the component to react
  page.document.synchronize(15, errors: [Capybara::ElementNotFound]) do
    element.all("attachment-file", minimum: files.length)
  end

  Bard::AttachmentField::TestHelper.wait_for_upload(page, element[:id], timeout: 60)
end

When "I remove the file from {string}" do |field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  within element.find("attachment-file").shadow_root do
    find("a", text: "Remove media").click
  end
end

When "I remove {string} from {string}" do |filename, field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  within element.find("attachment-file[filename='#{filename}']").shadow_root do
    find("a", text: "Remove media").click
  end
end

Then "I should see the following {string} attachment field:" do |field, table|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  files = Bard::AttachmentField::TestHelper.get_files(element)
  table.diff! [files]
end

Then "I should see an empty {string} attachment field" do |field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  expect(element).to have_no_css("attachment-file")
end

Then "I should see a preview of {string}" do |filename|
  expect(find("attachment-file")[:filename]).to eq(filename)
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

  raise "Expected '#{field}' attachment field to be disabled" unless is_disabled
end

Then "the {string} attachment field should have a validation error containing {string}" do |field, message|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)

  messages = []
  messages << element.evaluate_script("this.validationMessage")
  element.all("attachment-file").each do |e|
    messages << e.evaluate_script("this.validationError")
  end
  messages = messages.select { |m| m && !m.empty? }

  raise "Expected validation message '#{message}' but got #{messages.inspect}" unless messages.any? { |m| m.include?(message) }
end

Then "the {string} attachment field should have no validation errors" do |field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)

  messages = []
  messages << element.evaluate_script("this.validationMessage")
  element.all("attachment-file").each do |e|
    messages << e.evaluate_script("this.validationError")
  end
  messages = messages.select { |m| m && !m.empty? }

  raise "Expected no validation errors but got #{messages.inspect}" unless messages.empty?
end

When "I drag the file {string} onto the {string} attachment field" do |path, field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  file_path_full = File.expand_path(path, Rails.root.join("features/fixtures"))

  # Drag-drop can't be fully simulated via CDP, so we use the same workaround as attach_file
  Bard::AttachmentField::TestHelper.attach_files(page, element[:id], [file_path_full])

  page.document.synchronize(15, errors: [Capybara::ElementNotFound]) do
    element.find("attachment-file")
  end

  Bard::AttachmentField::TestHelper.wait_for_upload(page, element[:id])
end

Then "I should see an upload progress bar at 100%" do
  page.document.synchronize 10, errors: [RuntimeError] do
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

Then "I should not see a preview" do
  raise "Expected not to see a preview (figure) element" if page.has_css?("figure")
end

Then "I should not be able to attach a file to {string}" do |field|
  element = Bard::AttachmentField::TestHelper.find_field(page, field)
  shadow_root = element.shadow_root
  file_input = shadow_root.find("input[type='file']", visible: :all)
  raise "Expected file input to be disabled" unless file_input.disabled?
end

Then "I should see the input-attachment component" do
  raise "Expected to see hydrated input-attachment component" unless page.has_css?("input-attachment.hydrated")
end
