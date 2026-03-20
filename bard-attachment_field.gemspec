# frozen_string_literal: true

require_relative "lib/bard/attachment_field/version"

Gem::Specification.new do |spec|
  spec.name = "bard-attachment_field"
  spec.version = Bard::AttachmentField::VERSION
  spec.authors = ["Micah Geisel"]
  spec.email = ["micah@botandrose.com"]

  spec.summary = "Enhanced file upload field for Rails forms with drag-and-drop and previews"
  spec.description = "An enhanced file upload field for Rails forms, powered by web components. Provides drag-and-drop uploads, image/video previews, and seamless ActiveStorage integration."
  spec.homepage = "https://github.com/botandrose/bard-attachment_field"
  spec.required_ruby_version = ">= 3.0.0"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/botandrose/bard-attachment_field"

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(__dir__) do
    `git ls-files -z`.split("\x0").reject do |f|
      (f == __FILE__) || f.match(%r{\A(?:(?:bin|test|spec|features)/|\.(?:git|travis|circleci)|appveyor)})
    end
  end
  spec.bindir = "exe"
  spec.executables = spec.files.grep(%r{\Aexe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_dependency "activestorage", ">=7.1.0"

  # Development dependencies
  spec.add_development_dependency "debug"
  spec.add_development_dependency "rails"
  spec.add_development_dependency "sqlite3"
  spec.add_development_dependency "cucumber"
  spec.add_development_dependency "cucumber-rails"
  spec.add_development_dependency "capybara"
  spec.add_development_dependency "capybara-playwright-driver"
  spec.add_development_dependency "chop"
  spec.add_development_dependency "rspec"
  spec.add_development_dependency "capybara-screenshot"
  spec.add_development_dependency "database_cleaner"
  spec.add_development_dependency "puma"
  spec.add_development_dependency "sprockets-rails"
  spec.add_development_dependency "importmap-rails"
  spec.add_development_dependency "turbo-rails"
  spec.add_development_dependency "stimulus-rails"
  spec.add_development_dependency "rake", "~> 13.0"
  spec.add_development_dependency "appraisal"

  # For more information and examples about making a new gem, check out our
  # guide at: https://bundler.io/guides/creating_gem.html
end
