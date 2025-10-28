# input-attachment

A web components library providing advanced file upload functionality for Rails Active Storage with drag-and-drop support and real-time progress tracking.

## Features

- 📁 **Multiple File Support** - Upload single or multiple files
- 🎨 **Drag & Drop** - Intuitive drag-and-drop file selection
- 📸 **File Previews** - Automatic preview generation for images and videos
- 📊 **Progress Tracking** - Real-time upload progress with visual feedback
- ✅ **Validation** - Built-in file type and size validation
- 🔐 **Rails Active Storage Integration** - Seamless direct uploads to AWS S3 or other storage backends

## Installation

```bash
npm install @botandrose/input-attachment
```

or with Bun:

```bash
bun add @botandrose/input-attachment
```

## Usage

### Basic Example

```html
<form>
  <input-attachment
    name="files"
    directupload="/rails/active_storage/direct_uploads"
    multiple
  ></input-attachment>

  <button type="submit">Upload</button>
</form>
```

### With Validation

```html
<input-attachment
  name="photos"
  directupload="/rails/active_storage/direct_uploads"
  accepts="image"
  max="5242880"
  required
></input-attachment>
```

## API Reference

### `<input-attachment>`

The main component providing file upload functionality.

#### Props

| Prop           | Type    | Default   | Description                                                |
| ------         | ------  | --------- | -------------                                              |
| `name`         | string  | -         | Form field name for form submission                        |
| `directupload` | string  | -         | Rails Active Storage direct upload endpoint URL            |
| `multiple`     | boolean | false     | Allow multiple file selection                              |
| `required`     | boolean | false     | Require at least one file                                  |
| `accepts`      | string  | -         | Comma-separated file types (e.g., "image", "video", "pdf") |
| `max`          | number  | -         | Maximum file size in bytes                                 |
| `preview`      | boolean | true      | Show file previews                                         |
| `disabled`     | boolean | false     | Disable file selection (used during form submission)       |

#### Methods

```typescript
// Get/set array of file objects
get files(): AttachmentFile[]
set files(val: AttachmentFile[])

// Get/set array of signed IDs from Active Storage
get value(): string[]
set value(val: string[])

// Clear all files
reset(): void

// Validate the component
checkValidity(): boolean
setCustomValidity(msg: string): void
reportValidity(): boolean

// Get validation error message
get validationMessage(): string
```

#### Events

| Event                      | Detail                     | Description                            |
| -------                    | --------                   | -------------                          |
| `change`                   | -                          | Fired when file list changes (bubbles) |
| `direct-upload:initialize` | `{ id, file, controller }` | Upload queue initialized               |
| `direct-upload:start`      | `{ id }`                   | Upload started                         |
| `direct-upload:progress`   | `{ id, progress }`         | Upload progress (0-100)                |
| `direct-upload:error`      | `{ id, error }`            | Upload failed                          |
| `direct-upload:end`        | `{ id }`                   | Upload completed                       |

### `<attachment-file>`

Individual file representation within the upload component.

#### Props

| Prop       | Type    | Default    | Description                             |
| ------     | ------  | ---------  | -------------                           |
| `name`     | string  | -          | Form field name                         |
| `value`    | string  | ""         | Signed ID from Rails Active Storage     |
| `filename` | string  | -          | Display filename                        |
| `src`      | string  | -          | Preview image/video URL                 |
| `filetype` | string  | -          | File category (image/video/pdf/unknown) |
| `size`     | number  | -          | File size in bytes                      |
| `state`    | string  | "complete" | Upload state (pending/complete/error)   |
| `percent`  | number  | 100        | Upload progress percentage              |
| `preview`  | boolean | true       | Show preview                            |
| `accepts`  | string  | -          | Allowed file types                      |
| `max`      | number  | -          | Maximum file size                       |

#### Methods

```typescript
// Set file to upload
set file(file: File)

// Load existing file from Active Storage
set signedId(val: string)

// Validate the file
checkValidity(): boolean
```

## Form Submission Flow

1. User selects/drops files into `<input-attachment>`
2. Files become `<attachment-file>` components with validation
3. On form submit, `FormController` intercepts and manages upload queue
4. Each file uploads to Rails Active Storage via `DirectUploadController`
5. Signed IDs are collected via `ElementInternals.setFormValue()`
6. After all uploads complete, form is actually submitted
7. Server receives signed IDs in form data

## Architecture

### Components

- **`<input-attachment>`** - Main form field replacement with drag-and-drop
- **`<attachment-file>`** - Individual file representation
- **`<attachment-preview>`** - File preview display
- **`<file-drop>`** - Drag and drop interface (from `@botandrose/file-drop`)
- **`<progress-bar>`** - Upload progress indicator (from `@botandrose/progress-bar`)

## Styling

The component uses Shadow DOM with customizable CSS custom properties:

```css
input-attachment {
  --input-attachment-text-color: #000;
}
```

Style the file-drop area using the `::part()` pseudo-element:

```css
input-attachment::part(title) {
  font-size: 16px;
  color: #333;
}
```

## Rails Integration

### Setup Active Storage Direct Uploads

In your Rails app, ensure Active Storage is configured:

```ruby
# config/storage.yml
amazon:
  service: S3
  access_key_id: ...
  secret_access_key: ...
```

The `directupload` prop should point to:
```
/rails/active_storage/direct_uploads
```

### Accessing Uploaded Files in Rails

```ruby
class Post < ApplicationRecord
  has_many_attached :attachments
end

# In controller
@post = Post.create(attachments: attachment_signed_ids)

# The signed_ids are automatically resolved to blobs
```

## Validation

### File Type Validation

```html
<input-attachment
  accepts="image,video"
></input-attachment>
```

Supported types: `image`, `video`, `pdf`, or specific MIME types

### File Size Validation

```html
<!-- Max 5MB -->
<input-attachment
  max="5242880"
></input-attachment>
```

### Custom Validation

```javascript
const attachment = document.querySelector('input-attachment');

// Check validity
if (!attachment.checkValidity()) {
  console.log(attachment.validationMessage);
}

// Set custom error
attachment.setCustomValidity('Custom error message');
```

## Development

### Prerequisites

- Node.js 18+
- Bun

### Commands

```bash
# Install dependencies
bun install

# Start development server
bun start

# Build for production
bun run build

# Run tests
bun run test

# Watch tests
bun run test.watch

# Run e2e tests only
bun run test:e2e

# Generate new component
bun run generate
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 15.1+

ElementInternals requires modern browsers with form-associated custom elements support.

## License

MIT
