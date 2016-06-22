---
title: Overview of Gauge's plugin based architecture
date: 26 October 2015
tags: Plugins
author: Apoorva M
summary: Gauge has a plugin based architecture. This post gives a high level overview of what are Gauge plugins and how Gauge core communicates with them.
published: false
summary_image: https://images.unsplash.com/photo-1463003416389-296a1ad37ca0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=1bed2a6743851633b655ae774c15ac07
---

# Overview of Gauge's plugin based architecture

A good point to start talking of plugins in Gauge is the Architecture of Gauge. Gauge has a plugin based architecture. What does it mean? How does it work?

The Gauge architecture basically contains three major components namely

- Gauge Core
- Language Runners
- Other plugins

## Gauge Core

The core is the heart of Gauge and takes care of the entire spec execution lifecycle. We have designed the core to be language agnostic. So support for a new language can be easily added without modifying the core.

Things that are central to Gauge like setting up environment, parsing specifications, parallel execution, etc. are completely handled by the core. While language specific things are delegated to respective language runners. The core orchestrates the entire delegation with various langauge runners (and other plugins).
     
Gauge core communicates with the plugins via [Protocol Buffers](https://developers.google.com/protocol-buffers/?hl=en) over TCP.
      
## Language Runners

Language runners are also Gauge plugins. They handle the language specific parts of the execution life cycle. 
    
## Other plugins

Gauge has a bunch of other [plugins](/plugins) like HTML-report and XML-report that generates the execution reports as well as a Maven plugin that helps you create and manage a Gauge project with Maven.

There are even IDE plugins for IntelliJ, Visual Studio and Eclipse which integrates Gauge specific functionality into the IDE.

## Overview of Gauge execution lifecycle

Let’s take a look at the Gauge execution lifecycle at a high level. Gauge specs can be executed in console by running the command

```
gauge specs
```

This invokes Gauge core which performs operations like loading environment, parsing the specs, etc. The core then invokes a language runner to delegate the langauge specific tasks. The language runner sends back the results to the core which then consolidates the results and sends them to report plugins to generate reports.