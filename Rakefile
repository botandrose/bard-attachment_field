# frozen_string_literal: true

require "bundler/gem_tasks"

desc "Run tests"
task :test do
  sh "bundle exec cucumber features/"
end

task default: %i[test]

task :compile do
  sh <<~BASH.split("\n").join(" && ")
    cd input-attachment
    bun run build
    cp dist/input-attachment.esm.js ../app/assets/javascripts/input-attachment.js
  BASH
end

task :restart do
  touch "tmp/restart.txt"
end
