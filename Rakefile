#!/usr/bin/env rake -f

desc "build the entire website"
task :build do
  sh("bundle exec middleman build --verbose --clean")
end

desc "deploy the website"
task :deploy => [:build] do
  puts "## Deploying redesign branch to master"
  cp_r ".nojekyll", "build/.nojekyll"
  cp_r "build/404/index.html", "build/404.html"
  sh("rm -rf build/404")
  system "git checkout -f master"
  system "cp -r build/ ."
  system "rm -rf build"
  system "git add ."
  system "git add -u"
  puts "\n## Commiting: Site updated at #{Time.now.utc}"
  message = "Site updated at #{Time.now.utc}"
  system "git commit -m \"#{message}\""
  # puts "\n## Pushing generated website"
  # system "git push origin master"
  # puts "\n## Website deployed successfully"
end

desc 'find ununsed images'
task :unused_images do
  require 'pathname'
  images = %x[git ls-files source/assets/images].lines.collect(&:strip)

  excludes = %w(
    source/assets/images/favicon.ico
  )
  images -= excludes

  if images.any?
    $stdout.puts "Run with CLEAR=true to remove all of these"
  end

  images.each do |i|
    img_name = Pathname.new(i).basename.sub_ext('').to_s.gsub('@2x', '')
    sh("git grep #{img_name} > /dev/null", :verbose => false) do |ok, res|
      unless ok
        puts "Could not find usages of resource #{i}"
        if ENV['CLEAR'] == 'true'
          rm_rf i
        end
      end

    end
  end
end
