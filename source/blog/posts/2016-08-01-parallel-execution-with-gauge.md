---
title: Parallel Execution with Gauge
date: 01 August 2016
tags: Parallel execution, test automation
author: Mahendra
summary: Gauge has first class parallel execution support out of the box. In this post, we take a look at how Gauge does parallel execution.
published: true
draft: true
summary_image: blog/parallel_execution.jpg
---

Gauge has first class parallel execution support out of the box. It is exactly what we intended it to be: simple, zero configuration.

In this post, we take a look at how Gauge does parallel execution.

First, let's see how to run Gauge specs in parallel. With Gauge, parallel execution is as simple as running the command

```sh
gauge -p specs
```

This distributes the tests into multiple streams and all the streams are executed in parallel. By default, the number of streams is the number of CPU cores. So if you're on a 4 core machine, your specs run in 4 parallel streams.

However, more often than not, you may want to control the number of parallel streams. Maybe you only want to use 2 cores and not all 4. Gauge allows you to do this with the -n flag

```sh
gauge -p -n=2 specs
```

This command will distribute the tests in n streams, which in this case is 2.

You can even filter your specs with tags and run them in parallel.

```sh
gauge -p -n=2 --tags="login" specs
```

Parallel execution works the same way irrespective of the filter criteria.

## Parallel execution strategies

Gauge supports two different strategies for distributing the specs across parallel streams.

**Lazy:** Lazy strategy is the default. With this strategy, Gauge starts n parallel streams and assigns a spec to each, as and when they finish executing the one it was already assigned. Gauge keeps accumulating the results from each stream.

**Eager:** With this strategy, Gauge takes all the specs and distributes them equally across all streams, upfront. Each stream gets the same number of specs to execute. As a result, if there is a slow running spec in one of the streams, it delays the execution of all the other specs assigned to it, in spite of the fact that there may be some other stream available. This still means that the test execution is as fast as the slowest stream.


To indicate which strategy Gauge should use, run the command:

```sh
gauge -p -n=2 --strategy="eager" specs
```

Irrespective of the strategy, Gauge consolidates the execution results from all the streams and generates a consolidated report. So, the execution report looks the same, whether the specs were run in parallel or not.

## Why would one use Eager Strategy?

With the above definitions, it might seem apparent that lazy execution strategy for parallel execution is more efficient. This brings a question: why does Gauge even have an eager strategy?

Lazy strategy's distribution is dynamic, and two subsequent parallel runs may have different distribution of specs, depending on the execution time of every spec. In some use cases it makes sense to control the grouping of specs. In such cases, eager strategy allows one to do something like:	

```sh
gauge -p -n=2 -g=2 --strategy="eager" specs
```

Note the use of `-g` flag to select the group for the test run.

If you have any questions or suggestions, we'd love to hear them. Talk to us on our [public forum](https://groups.google.com/forum/#!forum/getgauge) or on our [dev chat](https://gitter.im/getgauge/chat).
