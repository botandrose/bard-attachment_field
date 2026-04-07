Feature: Object value bug reproduction
  When attachment-file.value is set to a JavaScript Object instead of
  a string, the form submission should filter it out rather than
  sending "[object Object]" as the signed blob ID.

  Scenario: Object value is filtered out of form submission
    Given I am on "/edge_cases/upload_dialog_false"
    When I attach the file "image.jpg" to "Image"
    Then I should see a preview of "image.jpg" for the "Image" field
    When I corrupt the attachment-file value to a JS Object
    Then the form data should not contain "[object Object]"

  Scenario: Normal upload has string values
    Given I am on "/edge_cases/upload_dialog_false"
    When I attach the file "image.jpg" to "Image"
    Then I should see a preview of "image.jpg" for the "Image" field
    Then all attachment-file values should be strings
    And the form data should be a valid signed ID
