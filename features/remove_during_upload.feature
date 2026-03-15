Feature: Removing files during upload
  When a file is removed while its upload is in progress, the form should
  recover gracefully without broken requests or stuck state.

  Background:
    Given I am on the homepage

  Scenario: Removing a file mid-upload allows form submission
    Given uploads are held
    When I begin attaching the file "image.jpg" to "Image"
    And I remove "image.jpg" from "Image"
    And I press "Submit"
    Then I should see "Post created!"

  Scenario: Removing a file mid-upload does not POST to a null URL
    Given checksums are held
    When I begin attaching the file "image.jpg" to "Image"
    And I remove "image.jpg" from "Image"
    And checksums are released
    And I press "Submit"
    Then I should see "Post created!"
