Feature: Form persistence
  The attachment field integrates with form-persistence libraries to preserve
  uploaded files across page reloads, supporting a seamless user experience.

  @requires-form-persistence
  Scenario: Persisting a not-yet-submitted file across page reload
    Given I am on the homepage
    When I fill in "Name" with "Jerry"
    And I attach the file "image.jpg" to "Image"
    Then I should see an upload progress bar at 100% within the "image.jpg" uploaded-file
    Given I am on the homepage
    Then I should see "Name" filled in with "Jerry"
    And I should see a preview of "image.jpg" within the "Image" bard-attachment
    When I press "Submit"
    Then I should see "Post created!"
    And I should see "image.jpg"
    And I should see the "image.jpg" image

  @requires-form-persistence
  Scenario: Persisting an already uploaded file across page reload
    Given I am on the homepage
    When I fill in "Name" with "Jerry"
    And I attach the file "image.jpg" to "Image"
    Then I should see an upload progress bar at 100% within the "image.jpg" uploaded-file
    And I should see a preview of "image.jpg" within the "Image" bard-attachment
    When I press "Submit"
    Then I should see "Post created!"
    When I follow "Edit"
    Then I should see "Name" filled in with "Jerry"
    And I should see an upload progress bar at 100% within the "image.jpg" uploaded-file
    And I should see a preview of "image.jpg" within the "Image" bard-attachment
    When I reload the page
    Then I should see "Name" filled in with "Jerry"
    And I should see an upload progress bar at 100% within the "image.jpg" uploaded-file
    And I should see a preview of "image.jpg" within the "Image" bard-attachment
    When I press "Submit"
    Then I should see "Post updated!"
    And I should see "image.jpg"
    And I should see the "image.jpg" image
