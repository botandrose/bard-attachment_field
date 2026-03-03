# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`bard-attachment_field` is a Ruby gem that provides an enhanced file upload field for Rails forms, powered by Stencil web components. It adds `form.attachment_field :avatar` to Rails form builders, rendering `<input-attachment>` web components with drag-and-drop uploads, image/video previews, and ActiveStorage direct upload integration.

## Development Commands

### Ruby/Rails (gem)

- **Run all tests**: `bundle exec cucumber features/`
- **Run a single feature**: `bundle exec cucumber features/validations.feature`
- **Run a specific scenario**: `bundle exec cucumber features/validations.feature:42`
- **Default rake task** (runs cucumber): `rake`

### JavaScript (web components)

The web components live in `input-attachment/` and use **Bun** (not npm).

- **Install deps**: `cd input-attachment && bun install`
- **Build**: `cd input-attachment && bun run build`
- **Run JS tests**: `cd input-attachment && bun run test`
- **Dev server with watch**: `cd input-attachment && bun start`

JavaScript must be built before running Cucumber tests — the built bundle at `app/assets/javascripts/input-attachment.js` is served by Sprockets in the test app.

### Multi-Rails testing

Uses Appraisal with gemfiles in `gemfiles/` for Rails 7.1, 7.2, 8.0, and 8.1. CI runs the matrix against Ruby 3.2/3.3/3.4.

## Architecture

### Two-part project

1. **Ruby gem** (`lib/bard/attachment_field/`) — Rails Engine that adds `attachment_field` to form builders
2. **Stencil web components** (`input-attachment/`) — TypeScript components compiled to a JS bundle

### Ruby side

- `Engine` (`lib/bard/attachment_field.rb`) — mixes `FormBuilder` into the default form builder on `after_initialize`
- `FormBuilder` (`lib/bard/attachment_field/form_builder.rb`) — adds `attachment_field` method
- `Field` (`lib/bard/attachment_field/field.rb`) — inherits from `ActionView::Helpers::Tags::TextField`, renders `<input-attachment>` element with existing `<attachment-file>` children for persisted attachments

### Web components side (`input-attachment/src/components/`)

- `<input-attachment>` — main component, manages file state, drag/drop, validation
- `<attachment-file>` — individual file with preview, upload state, removal
- `<attachment-preview>` — preview display
- `FormController` — coordinates upload queue on form submit
- `DirectUploadController` — handles Rails ActiveStorage direct uploads

### Upload flow

1. User selects/drops files → `<attachment-file>` components created
2. On form submit, `FormController` queues uploads
3. `DirectUploadController` uploads each file to ActiveStorage
4. Completed uploads provide signed IDs for form submission

### Test app

The Cucumber test suite uses a self-contained Rails app defined in `features/support/app.rb` with:
- SQLite database at `tmp/test_app/tmp/test.db`
- `Post` model with `has_one_attached :image`, `has_many_attached :images`, etc.
- Controllers/views in `features/support/`
- Capybara with Cuprite (headless Chrome) driver
- `capybara-shadowdom` for interacting with shadow DOM elements

### Cucumber test helpers

`lib/bard/attachment_field/cucumber.rb` provides:
- Step definitions for attaching, removing, dragging files and checking previews/validation
- `Bard::AttachmentField::TestHelper` with `attach_files`, `wait_for_upload`, `find_field`
- Chop integration (`Chop::Form::AttachmentField`) for form table diffing/filling
- CDP workaround for shadow DOM file inputs (creates temp regular DOM input, transfers files via JS)

Consumer apps can `require "bard/attachment_field/cucumber"` and configure `TestHelper.fixtures_path`.
