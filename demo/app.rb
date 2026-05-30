# Self-contained demo Rails application for bard-attachment_field.
#
# Unlike the Cucumber test app (features/support/app.rb), this one is meant to be
# poked at by a human: friendly error pages, a landing page that links to every
# capability, and fully transient state that resets on every boot.
ENV["RAILS_ENV"] ||= "development"

require "rails"
require "action_controller/railtie"
require "action_view/railtie"
require "active_record"
require "active_storage/engine"
require "sprockets/rails"

# Load the gem we're demoing.
$LOAD_PATH.unshift(File.expand_path("../lib", __dir__))
require "bard-attachment_field"

# Everything transient lives here. The repo's root tmp/ is gitignored, so this
# never dirties the working tree, and wiping it on boot gives us a clean slate.
DEMO_ROOT = Pathname.new(File.expand_path("../tmp/demo", __dir__))
DEMO_VIEWS = Pathname.new(File.expand_path("views", __dir__))

FileUtils.rm_rf(DEMO_ROOT)
FileUtils.mkdir_p(DEMO_ROOT.join("storage"))

# Point config/database.yml at the freshly-wiped transient SQLite file.
ENV["DEMO_DATABASE"] = DEMO_ROOT.join("demo.db").to_s

module Bard
  module AttachmentDemo
    class Application < Rails::Application
      config.root = __dir__
      config.paths["app/views"] = DEMO_VIEWS.to_s
      config.paths["config/database"] = File.expand_path("config/database.yml", __dir__)

      config.load_defaults 7.1
      config.secret_key_base = "bard_attachment_field_demo_secret_key_base"
      config.eager_load = false

      # Demo-friendly: show real error pages and reload-free behaviour.
      config.consider_all_requests_local = true
      # Serve under any hostname (e.g. bard-attachment_field.localhost, whose
      # underscore Rails' host authorization would otherwise reject).
      config.hosts.clear
      config.action_controller.perform_caching = false
      config.action_controller.allow_forgery_protection = false

      # Transient Disk storage under tmp/demo.
      config.active_storage.service = :demo_disk
      config.active_storage.service_configurations = {
        demo_disk: {
          "service" => "Disk",
          "root" => DEMO_ROOT.join("storage").to_s,
        },
      }

      # Serve the prebuilt input-attachment.js bundle (and any other assets)
      # straight out of Sprockets — no precompile step needed. Fingerprint the
      # URLs (digest = true) so that whenever the bundle is rebuilt its asset
      # URL changes and browsers never serve a stale copy from the long-lived
      # immutable cache Sprockets sets on /assets/*.
      config.assets.enabled = true
      config.assets.compile = true
      config.assets.digest = true
      config.assets.debug = false
      config.assets.paths = [
        File.expand_path("../app/assets/javascripts", __dir__),
        File.expand_path("../app/assets", __dir__),
      ]
      config.assets.precompile += ["input-attachment.js"]
      config.public_file_server.enabled = true

      config.middleware.use Rack::MethodOverride
    end
  end
end

Rails.application.initialize!

ActionController::Base.prepend_view_path(DEMO_VIEWS)

# Fresh SQLite database (connection comes from config/database.yml), rebuilt
# from scratch on every boot.
ActiveRecord::Schema.define(version: 0) do
  create_table :posts, force: true do |t|
    t.string :name
    t.integer :number
    t.timestamps
  end

  create_table :active_storage_blobs, force: true do |t|
    t.string :key, null: false
    t.string :filename, null: false
    t.string :content_type
    t.text :metadata
    t.string :service_name, null: false
    t.bigint :byte_size, null: false
    t.string :checksum, null: false
    t.datetime :created_at, null: false
    t.index [:key], unique: true
  end

  create_table :active_storage_attachments, force: true do |t|
    t.string :name, null: false
    t.string :record_type, null: false
    t.bigint :record_id, null: false
    t.bigint :blob_id, null: false
    t.datetime :created_at, null: false
    t.index [:record_type, :record_id, :name, :blob_id], name: "index_active_storage_attachments_uniqueness", unique: true
    t.index [:blob_id], name: "index_active_storage_attachments_on_blob_id"
    t.foreign_key :active_storage_blobs, column: :blob_id
  end

  create_table :active_storage_variant_records, force: true do |t|
    t.bigint :blob_id, null: false
    t.string :variation_digest, null: false
    t.index [:blob_id, :variation_digest], name: "index_active_storage_variant_records_uniqueness", unique: true
    t.foreign_key :active_storage_blobs, column: :blob_id
  end
end

class Post < ActiveRecord::Base
  has_one_attached :image
  has_many_attached :images
  has_one_attached :file
  has_many_attached :files
  has_many_attached :media

  validates :number, numericality: { only_integer: true }, allow_nil: true
end

# Each demo is a single attachment_field invocation plus a blurb. The shared
# views iterate over this list, so adding a capability is a one-line change.
DEMOS = [
  { slug: "single-image",     attribute: :image,  title: "Single image",
    desc: "Basic single-file image upload with drag-and-drop and preview.",
    options: { accepts: "image" } },

  { slug: "multiple-images",  attribute: :images, title: "Multiple images",
    desc: "has_many_attached with multiple: true — queue and preview several images.",
    options: { multiple: true, accepts: "image" } },

  { slug: "any-file",         attribute: :file,   title: "Any file",
    desc: "No type restriction — upload a document, archive, anything.",
    options: {} },

  { slug: "multiple-files",   attribute: :files,  title: "Multiple files",
    desc: "Multiple uploads of any type.",
    options: { multiple: true } },

  { slug: "image-or-video",   attribute: :media,  title: "Image or video",
    desc: %(accepts: "image,video" — restrict to a comma-separated set of type prefixes.),
    options: { multiple: true, accepts: "image,video" } },

  { slug: "max-size",         attribute: :file,   title: "Max file size",
    desc: "max: 100.kilobytes — client-side size validation rejects larger files.",
    options: { max: 100.kilobytes } },

  { slug: "required",         attribute: :file,   title: "Required",
    desc: "required: true — the form won't submit without at least one file.",
    options: { required: true } },

  { slug: "no-preview",       attribute: :image,  title: "Preview disabled",
    desc: "preview: false — list files without rendering image/video thumbnails.",
    options: { accepts: "image", preview: false } },

  { slug: "disabled",         attribute: :image,  title: "Disabled field",
    desc: "disabled: true — a non-interactive field.",
    options: { accepts: "image", disabled: true } },

  { slug: "disabled-fieldset", attribute: :image, title: "Disabled fieldset",
    desc: "The field correctly inherits disabled state from a wrapping <fieldset disabled>.",
    options: { accepts: "image" }, fieldset: true },

  { slug: "no-upload-dialog", attribute: :image,  title: "Upload dialog disabled",
    desc: "upload_dialog: false — suppress the progress dialog shown during direct uploads.",
    options: { accepts: "image", upload_dialog: false } },

  { slug: "server-validation", attribute: :image, title: "Survives a server error",
    desc: "Enter a non-integer number to force a Rails validation error — your uploaded image is preserved across the re-render.",
    options: { accepts: "image" }, validation: true },
].freeze

DEMOS_BY_SLUG = DEMOS.index_by { |d| d[:slug] }.freeze

class ApplicationController < ActionController::Base
  skip_forgery_protection

  before_action :keep_component_watcher_alive
  before_action :set_active_storage_url_options

  private

  # Each page view keeps the rebuild watcher warm (and starts it if it has been
  # idle-reaped). See the ComponentWatcher module at the bottom of this file.
  def keep_component_watcher_alive
    ComponentWatcher.beat!
  end

  def set_active_storage_url_options
    ActiveStorage::Current.url_options = {
      protocol: request.protocol,
      host: request.host,
      port: request.optional_port,
    }
  end
end

class DemoController < ApplicationController
  layout "application"

  helper_method :demos, :demo, :form_url, :field_source, :saved_blobs, :blob_path

  def index
    render "demo/index"
  end

  def show
    @post = current_post
    render "demo/show"
  end

  def save
    @post = current_post || Post.new
    if @post.update(post_params)
      flash[:notice] = "Saved! Your attachments are persisted below."
      redirect_to demo_path(demo[:slug], post_id: @post.id)
    else
      render "demo/show"
    end
  end

  private

  def demos
    DEMOS
  end

  def demo
    @demo ||= DEMOS_BY_SLUG.fetch(params[:slug])
  end

  def current_post
    params[:post_id].present? ? Post.find(params[:post_id]) : Post.new
  end

  def form_url
    demo_path(demo[:slug], post_id: @post.persisted? ? @post.id : nil)
  end

  def saved_blobs(post, attribute)
    return [] unless post&.persisted?
    attached = post.public_send(attribute)
    records = attached.is_a?(ActiveStorage::Attached::Many) ? attached.attachments : Array(attached.attachment)
    records.map(&:blob)
  end

  def blob_path(blob)
    "/rails/active_storage/blobs/redirect/#{blob.signed_id}/#{blob.filename}"
  end

  def field_source(demo)
    parts = [":#{demo[:attribute]}"]
    parts += demo[:options].map { |key, value| "#{key}: #{format_option(key, value)}" }
    line = "<%= form.attachment_field #{parts.join(", ")} %>"
    demo[:fieldset] ? "<fieldset disabled>\n  #{line}\n</fieldset>" : line
  end

  def format_option(key, value)
    case value
    when String
      value.inspect
    when Integer
      key == :max && (value % 1.kilobyte).zero? ? "#{value / 1.kilobyte}.kilobytes" : value.to_s
    else
      value.to_s
    end
  end

  def post_params
    params.require(:post).permit(:name, :number, :image, :file, :media, images: [], files: [])
  end
end

Rails.application.routes.draw do
  get "/favicon.ico", to: ->(_env) { [204, {}, []] }

  scope ActiveStorage.routes_prefix do
    post "/direct_uploads" => "active_storage/direct_uploads#create", as: :rails_direct_uploads
    get  "/disk/:encoded_key/*filename" => "active_storage/disk#show", as: :rails_disk_service
    put  "/disk/:encoded_token" => "active_storage/disk#update", as: :update_rails_disk_service
    get  "/blobs/redirect/:signed_id/*filename" => "active_storage/blobs/redirect#show", as: :rails_service_blob
    get  "/blobs/proxy/:signed_id/*filename" => "active_storage/blobs/proxy#show", as: :rails_service_blob_proxy
    get  "/representations/redirect/:signed_blob_id/:variation_key/*filename" => "active_storage/representations/redirect#show", as: :rails_blob_representation
    get  "/representations/proxy/:signed_blob_id/:variation_key/*filename" => "active_storage/representations/proxy#show", as: :rails_blob_representation_proxy
    get  "/blobs/info/:signed_id" => "bard/attachment_field/blobs#show"
  end

  root "demo#index"
  get "/demos/:slug", to: "demo#show", as: :demo
  match "/demos/:slug", to: "demo#save", via: [:post, :patch]
end

# Rebuild-on-edit, tied to the demo's usage — not to a manually-run process.
#
# So that editing input-attachment/src and reloading "just works" with no extra
# command, the app keeps a background watcher (bin/dev) alive that recompiles the
# bundle on every save. Lifecycle, mirroring how Passenger auto-creates/reaps the
# app itself:
#   * Auto-create: every request touches a heartbeat and (re)spawns the watcher
#     if it isn't running. So the watcher exists whenever the demo is being used.
#   * Auto-reap: the watcher watches that heartbeat and exits once the demo has
#     been idle (no requests) for IDLE_SECONDS — so it never lingers as an orphan.
# The watcher is spawned detached, so it survives Passenger recycling individual
# worker processes; usage keeps it alive, idleness reaps it.
module ComponentWatcher
  REPO_ROOT     = Pathname.new(File.expand_path("..", __dir__))
  SRC           = REPO_ROOT.join("input-attachment/src")
  BIN_DEV       = REPO_ROOT.join("bin/dev")
  TMP           = REPO_ROOT.join("tmp")
  PIDFILE       = TMP.join("component-watcher.pid")
  LOGFILE       = TMP.join("component-watcher.log")
  LOCKFILE      = TMP.join("component-watcher.lock")
  HEARTBEAT     = TMP.join("component-watcher.heartbeat")
  IDLE_SECONDS  = 300

  # Called on every request: record activity and make sure the watcher is up.
  def self.beat!
    return unless SRC.directory? && BIN_DEV.exist?
    FileUtils.mkdir_p(TMP)
    FileUtils.touch(HEARTBEAT)
    spawn_unless_running
  end

  def self.spawn_unless_running
    return if running?
    lock = File.open(LOCKFILE, File::CREAT | File::RDWR, 0o644)
    lock.flock(File::LOCK_EX)
    begin
      return if running? # re-check inside the lock
      pid = Process.spawn(
        { "COMPONENT_WATCHER_HEARTBEAT" => HEARTBEAT.to_s,
          "COMPONENT_WATCHER_IDLE" => IDLE_SECONDS.to_s },
        BIN_DEV.to_s,
        pgroup: true,                       # own process group, not the app's
        in: File::NULL,
        [:out, :err] => [LOGFILE.to_s, "a"],
      )
      Process.detach(pid)                   # no zombie; watcher outlives this worker
      PIDFILE.write(pid.to_s)
    ensure
      lock.flock(File::LOCK_UN)
      lock.close
    end
  end

  def self.running?
    pid = (PIDFILE.read.to_i rescue 0)
    return false unless pid > 0
    Process.kill(0, pid)
    true
  rescue Errno::ESRCH, Errno::ENOENT
    false
  end
end
