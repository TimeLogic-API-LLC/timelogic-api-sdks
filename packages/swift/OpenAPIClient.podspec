Pod::Spec.new do |s|
  s.name = 'TimeLogicAPI'
  s.ios.deployment_target = '11.0'
  s.osx.deployment_target = '10.13'
  s.tvos.deployment_target = '11.0'
  s.watchos.deployment_target = '4.0'
  s.version = '2.0.0'
  s.source = { :git => 'https://github.com/TimeLogic-API-LLC/timelogic-api-sdks.git', :tag => 'packages/swift/v2.0.0' }
  s.authors = 'TimeLogic API LLC'
  s.license = { :type => 'Unlicense', :text => 'This software is released into the public domain under the Unlicense.' }
  s.homepage = 'https://api.timelogicapi.com'
  s.summary = 'TimeLogic API | A World Time API'
  s.description = 'Official Swift SDK for TimeLogic API, providing world time, timezone, calendar, duration, and signed response operations.'
  s.source_files = 'OpenAPIClient/Classes/**/*.swift'
  s.dependency 'AnyCodable-FlightSchool', '~> 0.6'
end
