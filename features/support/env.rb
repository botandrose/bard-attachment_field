require_relative "app"

require "capybara"

# Configure Capybara early so that cuprite-downloads can use it
Capybara.app = BardAttachmentTest::Application
Capybara.server = :puma, { Silent: true }
Capybara.save_path = Pathname.new(__dir__).join('../../tmp/capybara')

require "capybara/cuprite"
require "cuprite/downloads/cucumber"
require "capybara/shadowdom"
require "capybara-screenshot/cucumber" unless ENV["CI"]

# Include Capybara DSL methods in the World
require "capybara/dsl"
World(Capybara::DSL)

# Simple expect implementation for Cucumber without RSpec
class SimpleExpectation
  def initialize(subject)
    @subject = subject
  end

  def to(matcher)
    matcher.matches?(@subject)
  end

  def to_not(matcher)
    !matcher.matches?(@subject)
  end

  def have_content(text)
    HaveContentMatcher.new(text)
  end

  def have_css(selector)
    HaveCssMatcher.new(selector)
  end

  def eq(value)
    EqualMatcher.new(value)
  end
end

class HaveContentMatcher
  def initialize(text)
    @text = text
  end

  def matches?(page)
    page.has_content?(@text)
  end
end

class HaveCssMatcher
  def initialize(selector)
    @selector = selector
  end

  def matches?(page)
    page.has_css?(@selector)
  end
end

class EqualMatcher
  def initialize(expected)
    @expected = expected
  end

  def matches?(actual)
    actual == @expected
  end
end

def expect(subject)
  SimpleExpectation.new(subject)
end

Capybara.register_driver(:cuprite) do |app|
  options = {
    window_size: [1920, 2160],
    timeout: 600,
    process_timeout: 60,
    js_errors: true,
    headless: true,
  }

  if ENV["BROWSER_PATH"] && !ENV["BROWSER_PATH"].empty?
    options[:browser_path] = ENV["BROWSER_PATH"]
  elsif ENV["CI"]
    options[:browser_path] = "/usr/bin/google-chrome"
  end

  Capybara::Cuprite::Driver.new(app, **options)
end

Capybara.default_driver = :cuprite
Capybara.default_normalize_ws = true
Capybara.default_max_wait_time = ENV["CI"] ? 10 : 2

# Setup DatabaseCleaner
require "database_cleaner"
DatabaseCleaner.strategy = :truncation

Before do
  DatabaseCleaner.clean
end

After do
  DatabaseCleaner.clean
end
