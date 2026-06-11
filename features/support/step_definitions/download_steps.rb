Then "I should download a file named {string}" do |filename|
  download_path = Pathname.new(Capybara.save_path).join(filename)
  Timeout.timeout(10) do
    sleep 0.1 until download_path.exist?
  end
  expect(download_path).to exist
end

Then "the downloaded file {string} should have the same contents as the fixture {string}" do |filename, fixture|
  download_path = Pathname.new(Capybara.save_path).join(filename)
  fixture_path = Bard::AttachmentField::TestHelper.resolve_fixture_path(fixture)
  expect(Digest::SHA256.file(download_path).hexdigest).to eq Digest::SHA256.file(fixture_path).hexdigest
end
