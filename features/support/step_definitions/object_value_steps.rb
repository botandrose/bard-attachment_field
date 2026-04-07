When "I corrupt the attachment-file value to a JS Object" do
  page.evaluate_script(<<~JS)
    (() => {
      const ia = document.querySelector('input-attachment');
      const af = ia.files?.[0];
      if (af) {
        af.value = { signed_id: af.value };
      }
      ia.files = ia._files;
    })()
  JS
  sleep 0.5
end

Then "the form data should not contain {string}" do |unexpected|
  result = page.evaluate_script(<<~JS)
    (() => {
      const form = document.querySelector('form');
      const fd = new FormData(form);
      const entries = [];
      for (const [name, value] of fd.entries()) {
        entries.push({ name, value: String(value), type: typeof value });
      }
      return entries;
    })()
  JS

  attachment_entries = result.select { |e| e["name"].include?("image") }
  values = attachment_entries.map { |e| e["value"] }
  expect(values).not_to include(unexpected), "FormData contains '#{unexpected}'! Entries: #{result.inspect}"
end

Then "all attachment-file values should be strings" do
  result = page.evaluate_script(<<~JS)
    (() => {
      const ia = document.querySelector('input-attachment');
      return ia.files.map(f => ({
        value: f.value,
        type: typeof f.value,
        isString: typeof f.value === 'string',
      }));
    })()
  JS

  result.each_with_index do |file, i|
    expect(file["isString"]).to be(true),
      "attachment-file[#{i}].value is #{file['type']} (#{file['value'].inspect})"
  end
end

Then "the form data should be a valid signed ID" do
  result = page.evaluate_script(<<~JS)
    (() => {
      const form = document.querySelector('form');
      const fd = new FormData(form);
      const entries = [];
      for (const [name, value] of fd.entries()) {
        entries.push({ name, value: String(value), type: typeof value });
      }
      return entries;
    })()
  JS

  attachment_entry = result.find { |e| e["name"].include?("image") && e["value"] != "" }
  expect(attachment_entry).to be_present, "No attachment entry found. Entries: #{result.inspect}"
  expect(attachment_entry["value"]).not_to eq("[object Object]")
  expect(attachment_entry["value"]).to match(/\Aey/)
end
