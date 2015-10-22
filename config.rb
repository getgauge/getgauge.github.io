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

helpers do
	def is_home_page()
		return current_page.url == '/'
	end

	def nav_bar_link(text, url)
		if current_page.url == '/'
			link_to(text, url)
		else
			link_to(text, '../' + url)
		end
	end
end

config[:file_watcher_ignore] += [ /.idea\// ]

configure :build do
  set :relative_links, true
  activate :minify_css
  activate :minify_javascript
  activate :asset_hash
  activate :relative_assets
  
  #abort "ENV['ASSET_HOST'] not specified, bailing!" if ENV['ASSET_HOST'].blank?
  #set :asset_host, "//" + ENV['ASSET_HOST']
end
