Feature: Upload dialog attribute
  The `upload-dialog` attribute controls whether FormController creates
  the progress dialog during uploads.

  Scenario: Uploading with upload-dialog="false" skips the dialog
    Given I am on "/edge_cases/upload_dialog_false"
    Then there should be no "form-controller-dialog" element in the form
    When I attach the file "image.jpg" to "Image"
    And I press "Submit"
    Then I should see "Post created!"
