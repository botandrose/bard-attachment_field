Feature: form.attachment_field has validation options
  Scenario: It supports required validation
    Given I am on "/validations/required_file"

    When I press "Submit"
    Then I should not see "Post created!"
    And the "Required file" bard-attachment should have a validation error containing "Please select a file."

    When I attach the file "image.jpg" to "Required file"
    And I press "Submit"
    Then I should see "Post created!"
    And I should see a preview of "image.jpg" within the "Required file" bard-attachment

  Scenario: It supports file type validation
    Given I am on "/validations/optional_image"

    When I attach the file "video.mp4" to "Optional image"
    Then the "Optional image" bard-attachment should have a validation error containing "Must be a image."
    Then I should not see a preview within the "Optional image" bard-attachment

    When I press "Submit"
    Then I should not see "Post created!"
    And I should not see "video.mp4"

    When I attach the file "image.jpg" to "Optional image"
    And I press "Submit"
    Then I should see "Post created!"
    And I should see a preview of "image.jpg" within the "Optional image" bard-attachment

  Scenario: It supports file size validation
    Given I am on "/validations/optional_file_with_max_size"
    When I attach the file "video.mp4" to "File"
    Then the "File" bard-attachment should have a validation error containing "Must be smaller than 100KB, and \"video.mp4\" is 119.59KB. Please attach a smaller file."
    Then I should not see a preview within the "File" bard-attachment

    When I press "Submit"
    Then I should not see "Post created!"
    And I should not see "video.mp4"

    When I attach the file "image.jpg" to "File"
    And I press "Submit"
    Then I should see "Post created!"
    And I should see a preview of "image.jpg" within the "File" bard-attachment

  Scenario Outline: It supports many file extensions
    Given I am on "/validations/required_media"
    When I attach a file of type "<extension>" to "Required media"
    Then the "Required media" bard-attachment should have no validation errors

    Examples:
      | extension |
      # Images
      | JPEG      |
      | jpeg      |
      | jpg       |
      | png       |
      | gif       |
      | bmp       |
      | tiff      |
      | heic      |
      # Videos
      | mp4       |
      | avi       |
      | mov       |
      | wmv       |
      | 3gpp      |
      | webm      |
      | m4v       |
      | mkv       |
      | flv       |

