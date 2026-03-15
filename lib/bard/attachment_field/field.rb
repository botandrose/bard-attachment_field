module Bard
  module AttachmentField
    class Field < ActionView::Helpers::Tags::TextField
      def render &block
        options = @options.transform_keys { _1.to_s.dasherize }.reverse_merge({
          "directupload" => "/rails/active_storage/direct_uploads",
          "preview" => true,
        })
        add_default_name_and_id(options)

        content_tag("input-attachment", options) do
          next block.call(options) if block
          Array(object.try(@method_name)).map do |attachment|
            content_tag("attachment-file", nil, {
              name: options["name"],
              src: blob_path(attachment),
              filename: attachment.filename,
              value: attachment.signed_id,
              preview: options["preview"],
            })
          end.join("\n").html_safe
        end
      end

      private

      def blob_path(attachment)
        "/rails/active_storage/blobs/redirect/#{attachment.signed_id}/#{attachment.filename}"
      end
    end
  end
end

