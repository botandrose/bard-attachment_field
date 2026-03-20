require_relative "app"

require "capybara"
require "bard/attachment_field/cucumber"

# Configure fixtures path for this bespoke test app
Bard::AttachmentField::TestHelper.fixtures_path = -> { Rails.root.join("fixtures") }

# Configure Capybara early so that downloads can be saved
Capybara.app = BardAttachmentTest::Application
Capybara.server = :puma, { Silent: true }
Capybara.save_path = Pathname.new(__dir__).join("../../tmp/capybara")

require "capybara-playwright-driver"
require "capybara-screenshot/cucumber" unless ENV["CI"]

# Include Capybara DSL methods in the World
require "capybara/dsl"
World(Capybara::DSL)

browser_type = (ENV["BROWSER"] || "chromium").to_sym

Capybara.register_driver(:playwright) do |app|
  Capybara::Playwright::Driver.new(app,
    browser_type: browser_type,
    headless: true,
    viewport: { width: 1920, height: 2160 },
  )
end

Capybara.default_driver = :playwright
Capybara.default_normalize_ws = true
Capybara.default_max_wait_time = ENV["CI"] ? 10 : 2

# Setup DatabaseCleaner
require "database_cleaner"
DatabaseCleaner.strategy = :truncation

Before do
  DatabaseCleaner.clean
end

After do
  page.execute_script("localStorage.clear()") rescue Playwright::Error
  Capybara.reset_sessions!
  DatabaseCleaner.clean
end
