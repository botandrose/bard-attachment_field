Feature: Upload errors
  When a direct upload fails, the form should not submit and the user
  should be able to retry or remove the errored file.

  Background:
    Given I am on the homepage

  Scenario: Form does not submit when upload fails
    When the direct upload URL is set to fail
    And I attach the file "image.jpg" to "Image"
    And I press "Submit"
    Then I should not see "Post created!"

  Scenario: Removing an errored file allows form submission
    When the direct upload URL is set to fail
    And I attach the file "image.jpg" to "Image"
    And I press "Submit"
    Then I should not see "Post created!"
    When I click remove for the errored upload in "Image"
    Then I should see "Post created!"

  Scenario: Retrying an errored upload
    When the direct upload URL is set to fail
    And I attach the file "image.jpg" to "Image"
    And I press "Submit"
    Then I should not see "Post created!"
    When the direct upload URL is restored
    And I retry the errored upload in "Image"
    Then I should see "Post created!"
    And I should see "image.jpg"
