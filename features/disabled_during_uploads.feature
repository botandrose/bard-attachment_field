Feature: Attachment field disabled state during uploads
  Attachment fields should remain interactive after individual file uploads
  complete. Fields are only temporarily disabled while upload processing
  is actively in progress.

  Background:
    Given I am on the homepage

  # Class 1: Uploading files without submitting the form

  Scenario: Field is disabled during upload
    Given uploads are held
    When I begin attaching the file "image.jpg" to "Image"
    Then the "Image" attachment field should be disabled

  Scenario: Field is re-enabled after upload completes
    Given uploads are held
    When I begin attaching the file "image.jpg" to "Image"
    And uploads are released
    And the upload completes for "Image"
    Then the "Image" attachment field should not be disabled

  Scenario: Other fields are not disabled after uploading to one field
    When I attach the file "image.jpg" to "Image"
    Then the "Images" attachment field should not be disabled

  # Class 2: Submitting the form while uploads are in progress

  Scenario: Form waits for in-progress uploads then submits
    Given uploads are held
    When I begin attaching the file "image.jpg" to "Image"
    And I begin attaching the file "image2.jpg" to "Images"
    And I press "Submit"
    Then the "Image" attachment field should be disabled
    And the "Images" attachment field should be disabled
    When uploads are released
    Then I should see "Post created!"

  Scenario: Form waits for in-progress uploads then submits (with Turbo)
    Given I am on "/?turbo=1"
    And uploads are held
    When I begin attaching the file "image.jpg" to "Image"
    And I begin attaching the file "image2.jpg" to "Images"
    And I press "Submit"
    Then the "Image" attachment field should be disabled
    And the "Images" attachment field should be disabled
    When uploads are released
    Then I should see "Post created!"
