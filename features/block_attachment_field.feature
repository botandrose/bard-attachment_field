Feature: Attachment field with a block
  `form.attachment_field :image do |options| ... end` lets the app render its own
  <attachment-file> markup (e.g. to control the preview src). The block's markup
  must be captured as the <input-attachment> element's content, not leaked to the
  surrounding output buffer.

  Background:
    Given I am on the homepage

  Scenario: Displaying an existing file rendered via a block
    When I fill in "Name" with "Image"
    And I attach the file "image.jpg" to "Image"
    And I press "Submit"
    Then I should see "Post created!"
    When I follow "Block Edit"
    Then I should see a preview of "image.jpg" for the "Image" field

  # BARD #262849: editing other fields and saving WITHOUT touching the image used
  # to submit an empty value (the block markup leaked outside <input-attachment>,
  # so the component had no file), silently purging the attachment.
  Scenario: Saving a block-rendered form without touching the existing file keeps it
    When I fill in "Name" with "Image"
    And I attach the file "image.jpg" to "Image"
    And I press "Submit"
    Then I should see "Post created!"
    And I should see "image.jpg"
    And I should see the "image.jpg" image
    When I follow "Block Edit"
    And I fill in "Name" with "Renamed"
    And I press "Submit"
    Then I should see "Post updated!"
    And I should see "Renamed"
    And I should see "image.jpg"
    And I should see the "image.jpg" image

  Scenario: Replacing a block-rendered existing file
    When I fill in "Name" with "Image"
    And I attach the file "image.jpg" to "Image"
    And I press "Submit"
    Then I should see "Post created!"
    When I follow "Block Edit"
    And I attach the file "image2.jpg" to "Image"
    And I press "Submit"
    Then I should see "Post updated!"
    And I should see "image2.jpg"
    And I should see the "image2.jpg" image

  Scenario: Removing a block-rendered existing file
    When I fill in "Name" with "Image"
    And I attach the file "image.jpg" to "Image"
    And I press "Submit"
    Then I should see "Post created!"
    When I follow "Block Edit"
    And I remove the file from "Image"
    And I press "Submit"
    Then I should see "Post updated!"
    And I should not see "image.jpg"
    And I should not see the "image.jpg" image
