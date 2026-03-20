Then "I should download a file named {string}" do |filename|
  download_path = Pathname.new(Capybara.save_path).join(filename)
  Timeout.timeout(10) do
    sleep 0.1 until download_path.exist?
  end
  expect(download_path).to exist
end
