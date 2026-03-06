# Minimal Rails application for testing bard-attachment_field
ENV['RAILS_ENV'] = 'test'

require 'rails'
require 'action_controller/railtie'
require 'action_view/railtie'
require 'active_record'
require 'active_storage/engine'
require 'sprockets/rails'
require 'turbo-rails'

# Load the gem we're testing
$LOAD_PATH.unshift(File.expand_path('../../lib', __dir__))
require 'bard-attachment_field'

# Store the test root - MUST be defined before Application class
TEST_APP_ROOT = Pathname.new(__dir__).join('../../tmp/test_app').expand_path
SUPPORT_ROOT = Pathname.new(__dir__).expand_path

module BardAttachmentTest
  class Application < Rails::Application
    config.root = SUPPORT_ROOT
    config.paths['config/database'] = SUPPORT_ROOT.join('config/database.yml')
    config.paths['app/views'] = SUPPORT_ROOT.join('views')

    config.load_defaults 7.0
    config.secret_key_base = 'test_secret_key_base'
    config.eager_load = false
    config.consider_all_requests_local = false
    config.action_controller.perform_caching = false
    config.action_dispatch.show_exceptions = false

    # Configure ActiveStorage
    config.active_storage.service = :test
    config.active_storage.service_configurations = {
      test: {
        service: 'Disk',
        root: ::TEST_APP_ROOT.join('tmp/storage')
      }
    }

    # Configure Sprockets for assets
    config.assets.enabled = true
    config.assets.paths = [
      File.expand_path('../../app/assets/javascripts', __dir__),
      File.expand_path('../../app/assets', __dir__),
      SUPPORT_ROOT.join('javascripts'),
    ]
    config.assets.precompile += ['input-attachment.js', 'form-persistence.min.js', 'turbo.js']
    config.assets.digest = false
    config.assets.debug = true

    # Middleware
    config.middleware.use Rack::MethodOverride
    # Remove exception handling middleware so errors bubble up
    config.middleware.delete ActionDispatch::ExceptionWrapper
    config.middleware.delete ActionDispatch::ShowExceptions

    # Disable CSRF for testing
    config.action_controller.allow_forgery_protection = false
  end
end

# Create app structure
FileUtils.mkdir_p(TEST_APP_ROOT.join('tmp/storage'))
FileUtils.mkdir_p(TEST_APP_ROOT.join('tmp'))

# Initialize the application
Rails.application.initialize!

# Set Active Storage host for Disk service URL generation
ActiveStorage::Current.url_options = { host: 'http://127.0.0.1:3000' }

# Make sure views can be found
ActionController::Base.prepend_view_path(SUPPORT_ROOT.join('views'))

# Configure ActiveRecord
ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: TEST_APP_ROOT.join('tmp/test.db').to_s
)

# Create schema
schema_path = TEST_APP_ROOT.join('tmp/schema.rb')
unless schema_path.exist?
  # Create database tables
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
      t.index [:record_type, :record_id, :name, :blob_id], name: 'index_active_storage_attachments_uniqueness', unique: true
      t.index [:blob_id], name: 'index_active_storage_attachments_on_blob_id'
      t.foreign_key :active_storage_blobs, column: :blob_id
    end

    create_table :active_storage_variant_records, force: true do |t|
      t.bigint :blob_id, null: false
      t.string :variation_digest, null: false
      t.index [:blob_id, :variation_digest], name: 'index_active_storage_variant_records_uniqueness', unique: true
      t.foreign_key :active_storage_blobs, column: :blob_id
    end
  end

  File.write(schema_path, '')
end

# Define models
class Post < ActiveRecord::Base
  has_one_attached :image
  has_many_attached :images
  has_one_attached :file
  has_many_attached :files
  has_many_attached :media

  validates :number, numericality: { only_integer: true }, allow_nil: true
end

# Define controllers
class ApplicationController < ActionController::Base
  skip_forgery_protection
end

class PostsController < ApplicationController
  include Rails.application.routes.url_helpers

  layout 'application'

  def index
    @post = Post.new
    render 'posts/index'
  end

  def create
    @post = Post.create(post_params)
    if @post.persisted?
      flash[:notice] = 'Post created!'
      redirect_to post_path(@post)
    else
      render 'posts/index'
    end
  end

  def show
    @post = Post.find(params[:id])
    render 'posts/show'
  end

  def edit
    @post = Post.find(params[:id])
    render 'posts/edit'
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      flash[:notice] = 'Post updated!'
      redirect_to post_path(@post)
    else
      render 'posts/edit'
    end
  end

  def disabled
    @post = Post.new
    render 'posts/disabled'
  end

  def disabled_fieldset
    @post = Post.new
    render 'posts/disabled_fieldset'
  end

  private

  def post_params
    params.require(:post).permit(:name, :number, :image, :file, :media, images: [], files: [])
  end
end

class ValidationsController < ApplicationController
  include Rails.application.routes.url_helpers

  layout 'application'

  def required_file
    @post = Post.new
    render 'validations/required_file'
  end

  def optional_file
    @post = Post.new
    render 'validations/optional_file'
  end

  def optional_file_with_max_size
    @post = Post.new
    render 'validations/optional_file_with_max_size'
  end

  def optional_image
    @post = Post.new
    render 'validations/optional_image'
  end

  def required_media
    @post = Post.new
    render 'validations/required_media'
  end

  def create_required_file
    @post = Post.create(post_params)
    if @post.persisted?
      flash[:notice] = 'Post created!'
      redirect_to validations_required_file_path
    else
      render 'validations/required_file'
    end
  end

  def create_optional_file
    @post = Post.create(post_params)
    if @post.persisted?
      flash[:notice] = 'Post created!'
      redirect_to validations_optional_file_path
    else
      render 'validations/optional_file'
    end
  end

  def create_optional_file_with_max_size
    @post = Post.create(post_params)
    if @post.persisted?
      flash[:notice] = 'Post created!'
      redirect_to validations_optional_file_with_max_size_path
    else
      render 'validations/optional_file_with_max_size'
    end
  end

  def create_optional_image
    @post = Post.create(post_params)
    if @post.persisted?
      flash[:notice] = 'Post created!'
      redirect_to validations_optional_image_path
    else
      render 'validations/optional_image'
    end
  end

  def create_required_media
    @post = Post.create(post_params)
    if @post.persisted?
      flash[:notice] = 'Post created!'
      redirect_to validations_required_media_path
    else
      render 'validations/required_media'
    end
  end

  private

  def post_params
    params.require(:post).permit(:name, :number, :image, :file, :media, images: [], files: [])
  end
end

class EdgeCasesController < ApplicationController
  include Rails.application.routes.url_helpers

  layout 'application'

  def rails_validation_error
    @post = Post.new
    render 'edge_cases/rails_validation_error'
  end

  def create_rails_validation_error
    @post = Post.new(post_params)
    if @post.save
      flash[:notice] = 'Post created!'
      redirect_to edge_cases_rails_validation_error_path
    else
      render 'edge_cases/rails_validation_error'
    end
  end

  private

  def post_params
    params.require(:post).permit(:name, :number, :image, :file, :media, images: [], files: [])
  end
end

# Configure routing
Rails.application.routes.draw do
  # Suppress favicon errors
  get '/favicon.ico', to: ->(env) { [204, {}, []] }

  # Simulate upload failure for testing
  post "/fail_upload", to: ->(_env) { [422, { "Content-Type" => "text/plain" }, ["Upload failed"]] }

  # Mount full Active Storage routes - required for direct uploads and disk service
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

  root 'posts#index'
  resources :posts do
    collection do
      get :disabled
      get :disabled_fieldset
    end
  end

  namespace :validations do
    get :required_file
    patch :required_file, action: :create_required_file

    get :optional_file
    patch :optional_file, action: :create_optional_file

    get :optional_file_with_max_size
    patch :optional_file_with_max_size, action: :create_optional_file_with_max_size

    get :optional_image
    patch :optional_image, action: :create_optional_image

    get :required_media
    patch :required_media, action: :create_required_media
  end

  namespace :edge_cases do
    get :rails_validation_error
    patch :rails_validation_error, action: :create_rails_validation_error
  end
end
