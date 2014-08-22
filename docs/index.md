---
layout: documentation
title: Getting started with Gauge
---

# So what are Specifications ?

Specifications are your business layer test cases which can also act as your feature documentation. Typically a spec or specification will be about a particular feature on the app under test. They are written in a .spec file. Gauge also support .md file format.

A spec contains the following parts:

## Spec Heading:

This is name of the specification. It is the first/topmost line of the spec. It is written as a Markdown H1 which can be written in 2 forms:

{% highlight text %}
# Specification heading

       or 

 Specification heading
 =====================
{% endhighlight %} 


## Scenarios:

Every scenario represents a single flow for the specification. The scope of a scenario starts after a scenario heading/name. The scenario heading or scenario name is a Markdown H2 which can be written as:

{% highlight text %}
## Scenario heading

       or 

 Scenario heading
 ----------------
{% endhighlight %} 

