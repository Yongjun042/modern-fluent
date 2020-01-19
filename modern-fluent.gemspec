# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "modern-fluent"
  spec.version       = "0.1.1"
  spec.authors       = ["Yongjun"]
  spec.email         = ["24871665+Yongjun042@users.noreply.github.com"]

  spec.summary       = "modern-fluent inspired theme"
  spec.homepage      = "http://yongjun042.github.io"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.0"

  spec.add_development_dependency "bundler", "~> 1.16"
  spec.add_development_dependency "rake", "~> 12.0"
end
