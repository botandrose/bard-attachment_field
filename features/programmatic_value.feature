Feature: Programmatic value setter
  Setting the `value` property on an `<input-attachment>` element programmatically
  (e.g. `element.value = [signedId1, signedId2]`) should populate the form data
  after the async blob info requests resolve.

  Scenario: Setting value programmatically with a single signed ID
    Given an ActiveStorage blob exists for "image.jpg"
    And I am on the homepage
    When I set the "Image" attachment field value to the blob's signed ID
    And I press "Submit"
    Then I should see "Post created!"
    And I should see "image.jpg"
    And I should see the "image.jpg" image

  Scenario: Setting value programmatically with multiple signed IDs
    Given an ActiveStorage blob exists for "image.jpg"
    And an ActiveStorage blob exists for "image2.jpg"
    And I am on the homepage
    When I set the "Images" attachment field value to all blob signed IDs
    And I press "Submit"
    Then I should see "Post created!"
    And I should see "image.jpg"
    And I should see the "image.jpg" image
    And I should see "image2.jpg"
    And I should see the "image2.jpg" image
