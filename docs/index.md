---
layout: documentation
title: Getting started with Gauge
---

# What are Specifications ?

Specifications are your business layer test cases which can also act as your feature documentation. Typically a spec or specification will be about a particular feature on the app under test. They are written in a .spec file. Gauge also support .md file format.

A spec contains the following parts:

## Spec Heading:

This is name of the specification. It is the first/topmost line of the spec. It is written as a Markdown H1 which can be written in 2 forms:

{% highlight text %}
# Specification heading
{% endhighlight %}
       or 

{% highlight text %}
Specification heading
=====================
 {% endhighlight %}
 


## Scenarios:

Every scenario represents a single flow for the specification. The scope of a scenario starts after a scenario heading/name. The scenario heading or scenario name is a Markdown H2 which can be written as:

{% highlight text %}
## Scenario heading
{% endhighlight %} 
       or 

{% highlight text %}
Scenario heading
----------------
{% endhighlight %} 

## Steps:
These are the executable components of your specification. They are **bulleted points** that start with a "*".

{% highlight text %}
* Login into my app
* Search for "gauge"
* Search for "gauge-java"
{% endhighlight %} 

The values written in __quotes__ are parameters which are passed into the underlying step implementation as a language specific structure.

## Context-Steps:

The steps which are defined before any scenario in the specification. They are executed __before each scenario__.

{% highlight text %}
# Create project specification
Before creating a project user should be logged in. This context step will log in user before executing every scenario:

* Log in as user "admin"

Create templated project scenario
---------------------------------
* Create a new project using template.

Create project from scratch scenario
------------------------------------
* Create a new project with all details
{% endhighlight %} 

###Parameters

The parameters passed into a step can be of different types:

#### Static parameter :
  They are string or integer values passed into the steps in quotes.
 
{% highlight text %}
* Create a “gauge-java” project
* Write “100” line specification
{% endhighlight %} 


#### Table Parameter:
 Tables can be passed to steps as parameters. They will be available as a language specific table data structure in the underlying implementation.
Table parameters are written in Multi-markdown table formats. The first row contain the table headers. Following rows contains the row values. A separater between the header and the other rows is optional

{% highlight text %}
* Step that takes a table
 | id   |  name  |
 |123 |  John   |
 |456 | Mcclain|

* Another step with a table parameter
 | id   |  name  |
 |----- | ---------|
 |123 |  John   |
 |456 | Mcclain|
{% endhighlight %} 




