# Monkey-patch playwright-ruby-client to handle unknown types gracefully.
# Newer Playwright browser builds send a "Debugger" type that
# playwright-ruby-client 1.58.1 doesn't recognize.
module Playwright
  class Connection
    private

    alias_method :original_create_remote_object, :create_remote_object
    alias_method :original_dispatch, :dispatch

    def create_remote_object(parent_guid:, type:, guid:, initializer:)
      original_create_remote_object(parent_guid:, type:, guid:, initializer:)
    rescue RuntimeError => e
      raise unless e.message.start_with?("Missing type")
      nil
    end

    def dispatch(msg)
      original_dispatch(msg)
    rescue RuntimeError => e
      raise unless e.message.include?("Cannot find object to") || e.message.include?("Unknown new child")
    end
  end
end
