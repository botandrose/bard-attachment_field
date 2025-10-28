# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Note: This project uses Bun instead of npm for package management and script execution.**

- **Build**: `bun run build` - Compiles Stencil components with docs generation
- **Development server**: `bun start` - Watch mode with live reload 
- **Tests**: `bun run test` - Run unit tests (Jest via Stencil)
- **E2E tests**: `bun run test:e2e` - Run unit + e2e
- **Spec tests only**: `bun run spec` - Run unit tests without e2e
- **Watch tests**: `bun run test.watch` - Run tests in watch mode
- **Generate component**: `bun run generate` - Create new Stencil component

## Architecture Overview

This is a Stencil-based Web Components library for advanced file upload functionality, specifically designed to work with Rails Active Storage direct uploads.

### Core Components Structure

- **`<input-attachment>`** - Main file upload component with drag/drop support
  - Acts as form field replacement with validation API compatibility
  - Manages file state and coordinates with Rails Active Storage
  - Uses `FormController` for upload orchestration and progress tracking

- **`<attachment-file>`** - Individual file representation component
  - Handles direct upload via `DirectUploadController`
  - Manages file preview, validation, and removal
  - Supports both existing files (via signed IDs) and new uploads

- **`<file-drop>`** - Drag and drop interface component (provided by `@botandrose/file-drop` package)
- **`<attachment-preview>`** - File preview display component
- **`<progress-bar>`** - Upload progress indicator (provided by `@botandrose/progress-bar` package)

### Key Integration Points

- **Rails Active Storage**: Uses `@rails/activestorage` for direct uploads
- **Form Integration**: Components integrate with standard HTML forms via `FormController`
- **Validation**: Implements HTML5 form validation APIs (`checkValidity`, `setCustomValidity`, etc.)

### Component Communication

- Uses Stencil's event system for component communication
- Key events: `direct-upload:*`, `attachment-file:remove`, `change`
- `FormController` coordinates upload queue and progress display
- Components maintain form field compatibility for seamless integration

### File Upload Flow

1. User selects/drops files into `<input-attachment>`
2. Files become `<attachment-file>` components with validation
3. On form submit, `FormController` manages upload queue
4. `DirectUploadController` handles Rails Active Storage uploads
5. Progress tracked via `<progress-bar>` components
6. Completed uploads provide signed IDs for form submission

## Testing Configuration

- Uses Jest with ts-jest for TypeScript support
- Puppeteer for e2e testing (headless Chrome)
- ESM modules enabled via `NODE_OPTIONS=--experimental-vm-modules`
