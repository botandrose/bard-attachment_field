Feature: Download link with a custom href
  The download link defaults to src, which block-rendered fields often point at
  a small preview image. An optional href attribute points the download link at
  the original file instead, with an optional download attribute to control the
  downloaded filename.

  Background:
    Given I am on the homepage

  Scenario: Downloading the original file when src is a preview image
    When I fill in "Name" with "Image"
    And I attach the file "image.jpg" to "Image"
    And I press "Submit"
    Then I should see "Post created!"
    When I follow "Download Edit"
    And I follow the "image.jpg" download link for "Image"
    Then I should download a file named "image.jpg"
    And the downloaded file "image.jpg" should have the same contents as the fixture "image.jpg"
