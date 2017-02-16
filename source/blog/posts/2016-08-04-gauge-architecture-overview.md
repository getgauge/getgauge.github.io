---
title: Gauge Architecture Overview
date: 04 August 2016
tags: test automation, plugins
author: Apoorva
summary: An overview of the extensible plugin architecture of Gauge
draft: true
summary_image: blog/architecture_overview.jpg
---

Gauge exposes a plugin architecture which allows extending Gauge with features without bloating the core of Gauge. Gauge's features (e.g. like language support, IDE integration, execution reports and documentation generators) are all implemented as plugins.

Here is an overview of Gauge's plugin architecture:

![Gauge Architecture Overview](blog/gauge-architecture-overview.png)

Gauge's architecture consists of Gauge Core and its plugins. Plugins can be a variety of types: language runners, reporting plugins, IDE plugins and documentation plugins. This list of plugin types is not exhaustive. Gauge's architecture is very flexible enough to allow new types of plugins to be added as needed.

## Gauge Core

Gauge Core is the center of delegation. It is responsible for parsing specifications and orchestrating execution. It does not understand any language specific test implementations.

Gauge Core communicates with all plugins to perform various actions via messaging API defined through Protocol Buffers. Gauge Core and any of the plugin are two independent processes talking to each other over TCP.

![Gauge plugins communication with core](blog/gauge-architecture-overview_plugin.png)

## Language Runners

Language runners are plugins which enable users to write Gauge test implementations in different programming languages. Currently, Gauge supports Java, Ruby, C# and [a few others](http://getgauge.io/plugins/index.html). These plugins are responsible for running test implementations written in the target programming language, depending on the step that Gauge Core asks them to execute.

## Reporting Plugins

Reporting plugins generate reports about tests run by Gauge. Once test suite execution is complete, Gauge Core sends aggregated data about the execution to these plugins. These plugins convert that test data to meaningful reports based on their purpose.Currently, Gauge has HTML and XML reporting plugins. The HTML reporting plugin produces a static HTML execution report, while the XML report produces JUnit-style XML.

Gauge can produce multiple types of reports by simply including the different plugins in a Gauge project.

## IDE Plugins

IDE plugins integrate Gauge closely with IDEs, allowing test authors to use their favorite IDEs to author and execute Gauge tests. These plugins use the Gauge API to talk with Gauge Core. Currently Gauge has IDE plugins for IntelliJ and Visual Studio. These provide navigation, auto complete and a number of [other usability features](http://getgauge.io/documentation/user/current/ide_support/other_usability_features.html) by integrating with the IDE.

There are a number of other types of plugins like documentation generator, plugins to build and manage project dependencies etc.

## What happens when you run `gauge specs` from the command line?

This invokes Gauge Core which loads the environment, checks for parse errors in specs and validates them. It then calls the language runner to execute them. Gauge Core knows which language runner the execution should be delegated to and langauge runner knows to execute the language specific implementations. Gauge Core consolidates the entire test result and delegates it to a report plugin to generate reports.

## How does this architecture help Gauge?

The functionalities which are common across all the language implementations are handled by Gauge Core. This makes the langauge runners and other plugins very light weight. As a result, writing a test runner is fairly straightforward and can be easily plugged in to Gauge Core. This also makes Gauge more extensible.

With the Plugin based architecture, Gauge has a lot more to offer to you. We are just getting warmed up. If you have a cool idea for a new plugin or if you just want to say "hi", we would [love to talk](https://groups.google.com/forum/#!forum/getgauge) to you! :)
