require 'active_support/core_ext/numeric/time'

activate :automatic_image_sizes
activate :directory_indexes
activate :asset_host

configure :development do
  activate :livereload
  set :asset_host, "//localhost:4567"
end

set :fonts_dir, 'assets/fonts'
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'

config[:file_watcher_ignore] += [ /.idea\// ]

configure :build do
  activate :minify_css
  activate :minify_javascript

  abort "ENV['ASSET_HOST'] not specified, bailing!" if ENV['ASSET_HOST'].blank?
  set :asset_host, "//" + ENV['ASSET_HOST']
end
