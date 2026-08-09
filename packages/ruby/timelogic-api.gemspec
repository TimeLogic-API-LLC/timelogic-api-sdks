# frozen_string_literal: true

$LOAD_PATH.unshift File.expand_path('lib', __dir__)
require 'timelogic-api/version'

Gem::Specification.new do |s|
  s.name        = 'timelogic-api'
  s.version     = TimeLogic::Api::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ['TimeLogic API LLC']
  s.email       = ['dev@timelogicapi.com']
  s.homepage    = 'https://github.com/TimeLogic-API-LLC/timelogic-api-sdks'
  s.summary     = 'TimeLogic API | A World Time API'
  s.description = 'Official Ruby SDK for TimeLogic API, providing world time, timezone, calendar, and signed response operations.'
  s.license     = 'Unlicense'
  s.required_ruby_version = '>= 2.7'
  s.metadata    = {
    'source_code_uri' => 'https://github.com/TimeLogic-API-LLC/timelogic-api-sdks',
    'bug_tracker_uri' => 'https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues',
    'changelog_uri' => 'https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/releases'
  }

  s.files = Dir.chdir(__dir__) do
    Dir['lib/**/*', 'docs/**/*', 'README.md'].select { |file| File.file?(file) }.sort
  end
  s.require_paths = ['lib']

  s.add_runtime_dependency 'typhoeus', '~> 1.0', '>= 1.0.1'
  s.add_development_dependency 'rspec', '~> 3.6', '>= 3.6.0'
end
