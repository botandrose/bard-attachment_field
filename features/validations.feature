Feature: Attachment field validations
  The attachment field supports HTML5 form validations including required,
  file type restrictions, and file size limits.

  Scenario: Required validation
    Given I am on "/validations/required_file"
    When I press "Submit"
    Then I should not see "Post created!"
    And the "Required file" bard-attachment should have a validation error containing "Please select a file."
    When I attach the file "image.jpg" to "Required file"
    And I press "Submit"
    Then I should see "Post created!"

  Scenario: File type validation
    Given I am on "/validations/optional_image"
    When I attach the file "video.mp4" to "Optional image"
    Then the "Optional image" bard-attachment should have a validation error containing "Must be a image."
    And I should not see a preview within the "Optional image" bard-attachment
    When I press "Submit"
    Then I should not see "Post created!"
    And I should not see "video.mp4"
    When I attach the file "image.jpg" to "Optional image"
    And I press "Submit"
    Then I should see "Post created!"

  Scenario: File size validation
    Given I am on "/validations/optional_file_with_max_size"
    When I attach the file "video.mp4" to "File"
    Then the "File" bard-attachment should have a validation error containing "Must be smaller than 100KB, and \"video.mp4\" is 119.59KB. Please attach a smaller file."
    And I should not see a preview within the "File" bard-attachment
    When I press "Submit"
    Then I should not see "Post created!"
    And I should not see "video.mp4"
    When I attach the file "image.jpg" to "File"
    And I press "Submit"
    Then I should see "Post created!"

  Scenario Outline: Supported media file extensions
    Given I am on "/validations/required_media"
    When I attach a file of type "<extension>" to "Required media"
    Then the "Required media" bard-attachment should have no validation errors

    Examples: Image formats
      | extension |
      | JPEG      |
      | jpeg      |
      | jpg       |
      | png       |
      | gif       |
      | bmp       |
      | tiff      |
      | heic      |

    Examples: Video formats
      | extension |
      | mp4       |
      | avi       |
      | mov       |
      | wmv       |
      | 3gpp      |
      | webm      |
      | m4v       |
      | mkv       |
      | flv       |
