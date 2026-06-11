# Bard Attachment Field

An enhanced file upload field for Rails forms, powered by web components. Provides drag-and-drop uploads, image/video previews, and seamless ActiveStorage direct upload integration.

## Features

- Drag-and-drop file uploads
- Image and video previews
- Direct uploads to ActiveStorage
- Multiple file support
- Client-side validation (required, accepted types, max size)
- Upload progress dialog
- Persists attachments through server-side validation errors
- Supports Rails 7.1, 7.2, 8.0, and 8.1

## Installation

Add to your Gemfile:

```ruby
gem "bard-attachment_field"
```

The engine ships a prebuilt `input-attachment.js` bundle and adds it to the Sprockets precompile list automatically. Load it as a module script in your layout:

```erb
<script type="module" src="<%= asset_path("input-attachment.js") %>"></script>
```

The model must declare an ActiveStorage attachment:

```ruby
class Post < ApplicationRecord
  has_one_attached :image
  has_many_attached :images
end
```

## Usage

In your form, use `attachment_field` just like any other form builder field. It automatically sets the form's encoding to `multipart`:

```erb
<%= form.attachment_field :image %>
<%= form.attachment_field :images, multiple: true %>
```

### Options

| Option | Description |
| --- | --- |
| `multiple: true` | Allow multiple files (use with `has_many_attached`). |
| `accepts: "image"` | Restrict accepted file types. Comma-separated list of type prefixes, e.g. `"image,video"`. |
| `max: 5.megabytes` | Maximum file size. |
| `required: true` | Require at least one file. |
| `preview: false` | Disable image/video previews. |
| `disabled: true` | Disable the field. |
| `upload_dialog: false` | Disable the upload progress dialog shown during direct uploads. |
| `directupload: "/path"` | Override the ActiveStorage direct upload URL (defaults to `/rails/active_storage/direct_uploads`). |

```erb
<%= form.attachment_field :image, accepts: "image", max: 5.megabytes, required: true %>
<%= form.attachment_field :media, accepts: "image,video", multiple: true %>
```

### Custom rendering

Pass a block to render your own children inside the `<input-attachment>` element instead of the default persisted-attachment markup. The block receives the resolved HTML options:

```erb
<%= form.attachment_field :image do |options| %>
  <!-- custom <attachment-file> markup -->
<% end %>
```

`src` powers both the preview and the download link. When `src` points at a
smaller preview image, set `href` to point the download link at the original
file instead, and optionally `download` to control the downloaded filename:

```erb
<%= form.attachment_field :image do |options| %>
  <% if @post.image.attached? %>
    <attachment-file
      name="<%= options["name"] %>"
      src="<%= url_for @post.image.variant(:thumb) %>"
      href="<%= rails_blob_path @post.image, disposition: :attachment %>"
      download="<%= @post.image.filename %>"
      filename="<%= @post.image.filename %>"
      value="<%= @post.image.signed_id %>"
      preview="true"
      filetype="image"></attachment-file>
  <% end %>
<% end %>
```

## Development

This project has two parts: the Ruby gem and the Stencil web components in `input-attachment/`.

The web components use [Bun](https://bun.sh):

```sh
cd input-attachment
bun install
bun run build   # builds app/assets/javascripts/input-attachment.js
bun run test    # JS component tests
```

The JavaScript bundle must be built before running the Ruby test suite, which is driven by Cucumber against a self-contained Rails app:

```sh
bundle exec cucumber features/
```

Multi-Rails testing uses [Appraisal](https://github.com/thoughtbot/appraisal) with the gemfiles in `gemfiles/`.

## License

MIT
