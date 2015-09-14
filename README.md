# The Gauge website - http://gauge-redesign.azurewebsites.net/

# Initial setup

The new redesigned website resides in `redesign` branch.

```
$ git clone -b redesign git@github.com:getgauge/getgauge.github.io.git
$ cd getgauge.github.io
$ ./.init.sh
```


# Development

```
$ ./.init.sh
$ bundle exec middleman server
$ open http://localhost:4567/
```

Open http://localhost:4567 in your browser.

# What goes where

* assets - `source/assets`

# Generating Documentation

Documentation is generated using [gitbook](https://www.gitbook.com/) from the [documentation repository](https://github.com/getgauge/documentation)

The user documentation is generated to `documentation/user/<version>`, similarly technical documentation is generated to `documentation/technical/<version>`.

In order to have a seamless navigation between the docs and the website, we have to inject the navigation header into the gitbook generated. To do this, here are the steps:

- Make a local copy of the gitbook default theme, to a location, say `./gauge_theme`.
- Edit the `layout.html` page to add the below to it's headers:
```
<link href="//getgauge.io/assets/stylesheets/application.css" rel="stylesheet" type="text/css" />
<script async src="//getgauge.io/assets/javascripts/application.js" type="text/javascript"></script>
```
This would now allow the styles and responsive javascript to kick-in to the header nav.

- Add the below snippet to the body:

```
<header class='light'>
  <nav class='nav-wrapper'>
    <a class="logo" href="/"></a>
    <a class='navigation-menu-button' href='javascript:void(0)'>
      <i class='fa fa-bars fa-2x'></i>
    </a>
    <ul class='header-nav'>
      <li class='nav-link'><a href="/#features">Features</a></li>
      <li class='nav-link'><a href="/download">Download</a></li>
      <li class='nav-link'><a href="http://getgauge.io/documentation/user/current/">Documentation</a></li>
      <li class='nav-link'><a href="/team">Team</a></li>
      <li class='nav-link-short'>
        <a href='https://twitter.com/getgauge' target='_blank'>
          <i class='fa fa-twitter'></i>
        </a>
      </li>
      <li class='nav-link-short'>
        <a href='https://github.com/getgauge/gauge' target='_blank'>
          <i class='fa fa-github'></i>
        </a>
      </li>
    </ul>
  </nav>
</header>
```

Add more `li`s as needed, to add menu items to the nav.

