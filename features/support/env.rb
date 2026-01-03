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
