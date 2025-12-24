# frozen_string_literal: true

require_relative "attachment_field/version"
require_relative "attachment_field/form_builder"

module Bard
  module AttachmentField
    class Engine < ::Rails::Engine
      initializer "bard-attachment_field.assets" do
        if Rails.application.config.respond_to?(:assets)
          Rails.application.config.assets.precompile += ["input-attachment.js"]
        end
      end

      config.after_initialize do
        ActionView::Base.default_form_builder.include FormBuilder
      end
    end
  end
end
