require "bard/attachment_field/cucumber"

Given "an ActiveStorage blob exists for {string}" do |filename|
  path = Pathname.new(__dir__).join("../fixtures/#{filename}").expand_path
  @blobs ||= []
  @blobs << ActiveStorage::Blob.create_and_upload!(
    io: File.open(path),
    filename: filename,
    content_type: "image/jpeg",
  )
end

When "I set the {string} attachment field value to the blob" do |label|
  field = Bard::AttachmentField::TestHelper.find_field(page, label)
  blob = @blobs.first
  value = JSON.generate([{ value: blob.signed_id, filename: blob.filename.to_s }])
  page.execute_script(<<~JS, field[:id], value)
    document.getElementById(arguments[0]).value = arguments[1]
  JS
end

When "I set the {string} attachment field value to all blobs" do |label|
  field = Bard::AttachmentField::TestHelper.find_field(page, label)
  data = @blobs.map { |b| { value: b.signed_id, filename: b.filename.to_s } }
  value = JSON.generate(data)
  page.execute_script(<<~JS, field[:id], value)
    document.getElementById(arguments[0]).value = arguments[1]
  JS
end
