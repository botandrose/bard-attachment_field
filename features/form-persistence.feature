Feature: Form persistence
  The attachment field integrates with form-persistence libraries to preserve
  uploaded files across page reloads, supporting a seamless user experience.

  Scenario: Persisting a not-yet-submitted file across page reload
    Given I am on "/?form_persistence=1"
    When I fill in "Name" with "Jerry"
    And I attach the file "image.jpg" to "Image"
    Then I should see a preview of "image.jpg" for the "Image" field
    Given I am on "/?form_persistence=1"
    Then I should see "Name" filled in with "Jerry"
    And I should see a preview of "image.jpg" for the "Image" field
    When I press "Submit"
    Then I should see "Post created!"
    And I should see "image.jpg"
    And I should see the "image.jpg" image

  Scenario: Persisting an already uploaded file across page reload
    Given I am on "/?form_persistence=1"
    When I fill in "Name" with "Jerry"
    And I attach the file "image.jpg" to "Image"
    Then I should see a preview of "image.jpg" for the "Image" field
    When I press "Submit"
    Then I should see "Post created!"
    When I follow "Edit"
    Then I should see "Name" filled in with "Jerry"
    And I should see a preview of "image.jpg" for the "Image" field
    When I reload the page
    Then I should see "Name" filled in with "Jerry"
    And I should see a preview of "image.jpg" for the "Image" field
    When I press "Submit"
    Then I should see "Post updated!"
    And I should see "image.jpg"
    And I should see the "image.jpg" image
