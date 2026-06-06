# Changelog

## [0.5.5] - 2026-06-06

### Bug Fixes

- Capture the block passed to `attachment_field` instead of using its return
  value. Previously the block's markup leaked to the surrounding output buffer,
  leaving `<input-attachment>` with no `<attachment-file>` child — so editing a
  record and saving without touching the file submitted an empty value and
  silently purged the existing attachment.

## [0.2.0] - 2026-03-03

### Features

- Prevent form submission when direct uploads fail, with retry button

### Bug Fixes

- Re-enable input-attachment after removing a file
- Fix direct upload URL race condition on disconnected Stencil elements

## [0.1.0] - 2026-01-03

Initial release of bard-attachment_field, a rewrite of bard-file_field.

### Features

- Drag-and-drop file uploads
- Image and video previews
- Direct uploads to ActiveStorage
- Multiple file support
- Form validation (required, accept, size limits)
- Persists attachments through validation errors
- Support for Rails 7.1, 7.2, 8.0, and 8.1
