Then "there should be no {string} element in the form" do |id|
  # Wait for the input-attachment component to hydrate first
  expect(page).to have_css("input-attachment.hydrated")
  # Check after hydration since the dialog is in light DOM
  has_element = page.evaluate_script("!!document.getElementById('#{id}')")
  expect(has_element).to be false
end
