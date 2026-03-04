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

When "I set the {string} attachment field value to the blob's signed ID" do |label|
  field = Bard::AttachmentField::TestHelper.find_field(page, label)
  signed_id = @blobs.first.signed_id
  page.execute_script(<<~JS, field[:id], signed_id)
    const field = document.getElementById(arguments[0])
    field.value = [arguments[1]]
  JS
  # Wait for the async signedId resolution to complete
  Timeout.timeout(15) do
    loop do
      values = page.evaluate_script(<<~JS, field[:id])
        document.getElementById(arguments[0]).value
      JS
      break if values.all? { |v| v.present? }
      sleep 0.1
    end
  end
end

When "I set the {string} attachment field value to all blob signed IDs" do |label|
  field = Bard::AttachmentField::TestHelper.find_field(page, label)
  signed_ids = @blobs.map(&:signed_id)
  page.execute_script(<<~JS, field[:id], signed_ids)
    const field = document.getElementById(arguments[0])
    field.value = arguments[1]
  JS
  # Wait for all async signedId resolutions to complete
  Timeout.timeout(15) do
    loop do
      values = page.evaluate_script(<<~JS, field[:id])
        document.getElementById(arguments[0]).value
      JS
      break if values.all? { |v| v.present? }
      sleep 0.1
    end
  end
end
