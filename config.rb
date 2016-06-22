require 'active_support/core_ext/numeric/time'
require 'bootstrap-sass'

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
set :layouts_dir, 'layouts'

redirect 'download/index.html', to: '../get-started/index.html'

activate :blog do |blog|
  blog.prefix = "blog/posts"
  blog.tag_template = "blog/tag.html"
  blog.new_article_template = "source/blog/template.tt"
  blog.default_extension = ".haml"
  blog.paginate = true
  blog.page_link = "page{num}"
  blog.per_page = 6
end

helpers do
	def is_home_page()
		return current_page.url == '/'
	end

  def is_blog_article()
    return current_page.url.start_with? "/blog/posts"
  end

	def nav_bar_link(text, url, opts={})
		if current_page.url == '/'
			link_to(text, url, opts)
    elsif current_page.url.start_with? "/blog/posts"
      link_to(text, '../../../../../' + url, opts)
		else
			link_to(text, '../' + url, opts)
		end
	end
end

config[:file_watcher_ignore] += [ /.idea\// ]

configure :build do
  set :relative_links, true
  activate :minify_css
  activate :minify_javascript
  activate :relative_assets
  
  #abort "ENV['ASSET_HOST'] not specified, bailing!" if ENV['ASSET_HOST'].blank?
  #set :asset_host, "//" + ENV['ASSET_HOST']
end
