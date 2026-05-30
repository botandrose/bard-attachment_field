# Rack entry point for the bard-attachment_field demo app.
#
# Point nginx + Passenger at the repo root (this file). All state is transient:
# the SQLite database and ActiveStorage files live under the gitignored
# tmp/demo/ directory and are wiped + recreated every time the app boots, so a
# restart resets the demo back to its default empty state.
#
# To run it standalone:
#   bundle exec puma config.ru -p 9292
# then open http://localhost:9292

require_relative "demo/app"

run Bard::AttachmentDemo::Application
