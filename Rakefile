# frozen_string_literal: true

require "bundler/gem_tasks"

desc "Run tests"
task :test do
  sh "bundle exec cucumber features/"
end

task default: %i[test]
