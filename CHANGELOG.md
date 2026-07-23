# Changelog

## [0.6.2] - 2026-07-23

### Bug Fixes

- Clicking a `<video>` preview to play/pause no longer opens the file picker.
  The click handler now stops propagation so it doesn't bubble to the
  `<file-drop>` wrapper, which opens the upload dialog on click.

## [0.6.1] - 2026-06-24

### Bug Fixes

- Bump `@botandrose/progress-bar` to 0.6.1, which moves the `progressbar` role
  off the host onto the inner fill/ring and names it from its slotted content.
  This resolves the `aria-progressbar-name` and `nested-interactive` axe
  violations on `<attachment-file>`, whose download link is slotted as the
  progress bar's content.

## [0.6.0] - 2026-06-11

### Features

- `<attachment-file>` accepts optional `href` and `download` attributes for its
  download link, falling back to `src` and `filename`. Lets block-rendered
  fields point the preview at a small image while the download link fetches
  the original file.

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
