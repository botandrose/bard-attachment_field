Feature: Attachment field form helper
  The `form.attachment_field` helper provides an enhanced file input with
  drag-and-drop support, previews, and direct upload to Active Storage.

  Background:
    Given I am on the homepage

  Scenario: The component renders
    Then I should see "Image"

  Scenario: Attaching a file to a form
    When I attach the file "image.jpg" to "Image"
    And I press "Submit"
    Then I should see "Post created!"
    And I should see "image.jpg"
    And I should see the "image.jpg" image

  Scenario: Displaying a preview
    When I attach the file "image.jpg" to "Image"
    Then I should see a preview of "image.jpg" for the "Image" field

  Scenario: Displaying an existing file
    When I attach the file "image.jpg" to "Image"
    And I press "Submit"
    Then I should see "Post created!"
    When I follow "Edit"
    Then I should see a preview of "image.jpg" for the "Image" field

  Scenario: Filename links to downloadable file
    When I fill in "Name" with "Image"
    And I attach the file "image.jpg" to "Image"
    And I press "Submit"
    Then I should see "Post created!"
    And I should see "image.jpg"
    And I should see the "image.jpg" image
    When I follow "Edit"
    And I follow the "image.jpg" download link for "Image"
    Then I should download a file named "image.jpg"

  Scenario: Removing a not-yet-submitted file
    When I fill in "Name" with "No Image"
    And I attach the file "image.jpg" to "Image"
    Then I should see a preview of "image.jpg" for the "Image" field
    When I remove the file from "Image"
    And I press "Submit"
    Then I should see "Post created!"
    And I should see "No Image"
    And I should not see "image.jpg"
    And I should not see the "image.jpg" image

  Scenario: Removing an existing file
    When I fill in "Name" with "Image"
    And I attach the file "image.jpg" to "Image"
    And I press "Submit"
    Then I should see "Post created!"
    And I should see "image.jpg"
    And I should see the "image.jpg" image
    When I follow "Edit"
    And I remove the file from "Image"
    And I press "Submit"
    Then I should see "Post updated!"
    And I should not see "image.jpg"
    And I should not see the "image.jpg" image

  Scenario: Updating an existing file
    When I fill in "Name" with "Image"
    And I attach the file "image.jpg" to "Image"
    And I press "Submit"
    Then I should see "Post created!"
    And I should see "image.jpg"
    And I should see the "image.jpg" image
    When I follow "Edit"
    And I attach the file "image2.jpg" to "Image"
    And I press "Submit"
    Then I should see "Post updated!"
    And I should see "image2.jpg"
    And I should see the "image2.jpg" image

  Scenario: Attaching multiple files
    When I attach the following files to "Images":
      | image.jpg  |
      | image2.jpg |
    And I press "Submit"
    Then I should see "Post created!"
    And I should see "image.jpg"
    And I should see the "image.jpg" image
    And I should see "image2.jpg"
    And I should see the "image2.jpg" image

  Scenario: Drag and drop file attachment
    When I drag the file "image.jpg" onto the "Image" attachment field
    Then I should see a preview of "image.jpg" for the "Image" field

  Scenario: Disabled with the disabled attribute
    Given I am on "/posts/disabled"
    Then the "Image" attachment field should be disabled
    And I should not be able to attach a file to "Image"

  Scenario: Disabled within a disabled fieldset
    Given I am on "/posts/disabled_fieldset"
    Then the "Image" attachment field should be disabled
    And I should not be able to attach a file to "Image"
