# frozen_string_literal: true

appraise "rails-7.1" do
  gem "rails", "~> 7.1.0"
end

appraise "rails-7.2" do
  gem "rails", "~> 7.2.0"
end

appraise "rails-8.0" do
  gem "rails", "~> 8.0.0"
end

appraise "rails-8.1" do
  gem "rails", "~> 8.1.0"
  gem "json", "< 3" # ActiveSupport 8.1.3.1 passes JSON.parse options positionally; fixed in 8-1-stable
end
