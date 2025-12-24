# Bard Attachment Field

An enhanced file upload field for Rails forms, powered by web components. Provides drag-and-drop uploads, image previews, and seamless ActiveStorage integration.

## Features

- Drag-and-drop file uploads
- Image and video previews
- Direct uploads to ActiveStorage
- Multiple file support
- Form validation (required, accept, size limits)
- Persists attachments through validation errors

## Installation

Add to your Gemfile:

    gem "bard-attachment_field"

## Usage

In your form:

```erb
<%= form.attachment_field :avatar %>
<%= form.attachment_field :documents, multiple: true %>
```

### Options

- `multiple: true` - Allow multiple file uploads
- `accept: "image/*"` - Restrict file types
- `required: true` - Make field required
- `preview: false` - Disable image previews
- `disabled: true` - Disable the field

## License

MIT
