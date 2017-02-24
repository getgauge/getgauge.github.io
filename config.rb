require 'active_support/core_ext/numeric/time'
require 'bootstrap-sass'

activate :automatic_image_sizes

configure :development do
  require 'middleman-livereload'
  activate :livereload
end

set :fonts_dir, 'assets/fonts'
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :layouts_dir, 'layouts'

set :haml, { ugly: true }

redirect 'download/index.html', to: '../get-started/index.html'

helpers do
	def is_home_page()
		return current_page.url == '/'
	end

	def nav_bar_link(text, url, opts={})
		if current_page.url == '/'
			link_to(text, url, opts)
		else
			link_to(text, '../' + url, opts)
		end
	end
end

ignore '.idea'

configure :build do
  set :relative_links, true
  activate :minify_css
  activate :minify_javascript
  activate :relative_assets
end
