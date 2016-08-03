---
title: Authoring a new Language Runner for Gauge
date: 02 August 2016
tags: test automation, plugins
author: Kashish
summary: Extensibility is one of the core features of Gauge. It is built from the ground up with plugin support in mind. In this post I'll show how to write a new language runner for Gauge.
published: false
summary_image: https://images.unsplash.com/photo-1463003416389-296a1ad37ca0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=1bed2a6743851633b655ae774c15ac07
---

Extensibility is one of the core features of Gauge. It is built from the ground up with plugin support in mind. In this post I'll show how to write a new language runner for Gauge.

## What is a Language Runner?

Language Runner is a plugin which lets you write test code implementations in a specific programming language. There are two phases in the life cycle of a language runner:

**Initialization**:

- Initialize the project with the language-specific skeleton file.

**Execution**:

 - Execute hooks (when requested by Gauge core).
 - Execute method corresponding to a step and send execution response back to Gauge.
 - Send custom report messages to Gauge.
 - Read/write to datastore (currently, datastore is intra process, hence parallel processes cannot use a shared datastore).

This post will help you write a basic Python language runner which supports initialization and step execution. Let's call it `mypython`, so that our tutorial code does not conflict with [Gauge's Python language runner](https://github.com/kashishm/gauge-python). By the end of this article, will be able to use it through Gauge to create a new project and run specifications, like this:

```sh
gauge --init mypython
gauge specs
```

## Configuring your project

### Requirements

For writing a language runner, you will need:

- Gauge installed and available on the PATH
- A version control system. Preferably, git.
- A text editor or IDE of your choice.
- Familiarity with the programming language that you writing the language runner in.

### Getting Started

Create a directory in called `mypython` and create these files and sub-directories in it:

```text
mypython
  | -- mypython.json
  | -- README.md
  | -- step_impl/
       | -- step_impl.py
  | -- start.py
```

We recommend you use a version control system, preferably git, so that we can track changes and add dependencies from other repositories as we go ahead.

### Runner's metadata file

Every language runner needs to have a `<runner_id>.json` file, which contains the metadata for the language runner. For an example, see the [python.json](https://github.com/kashishm/gauge-python/blob/master/python.json) file in the Python language runner.

`<runner_name>.json` file serves three primary functions:

- Plugin name, description, version are specified in this file.
- The properties `init` and `run` in this file are used to specify initialize and run commands for different platforms. For example: while initializing a Gauge project, Gauge will execute the command present in `init` section of the json file.
- Minimum and maximum Gauge version support are specified here..

### README.md

`README.md` file in the root of this project contains the user and technical documentation, although this is not a requirement.

For an example, see [README.md](https://github.com/getgauge-contrib/gauge-js/blob/master/README.md) from the JavaScript language runner and [README.md](https://github.com/kashishm/gauge-python/blob/master/README.md) from the Python language runner.

## Skeleton files

Each language runner should come with a sample implementation file that can be used as a quick-start for creating a new project.

Put the following content in `step_impl/step_impl.py`:

```python
from getgauge.python import step

vowels = ["a", "e", "i", "o", "u"]

def number_of_vowels(word):
    return len(filter(lambda elem: elem in vowels, list(word)))

@step("The word <word> has <number> vowels.")
def assert_no_of_vowels_in(word, number):
    assert str(number) == str(number_of_vowels(word))


@step("Vowels in English language are <vowels>.")
def assert_default_vowels(given_vowels):
    assert given_vowels == "".join(vowels)


@step("Almost all words have vowels <table>")
def assert_words_vowel_count(table):
    assert 1 == 1
```

## Initializing project

```sh
gauge --init mypython
```

When you run this command, Gauge will ask the language runner to copy implementation specific skeleton files in the project directory. Gauge will run the command which is present in the init section in `mypython.json` file.

Put the following content in the `start.py`. This will copy the skeleton files to the user's project directory which is present in an environment variable `GAUGE_PROJECT_ROOT`.

```python
#! /usr/bin/env python

import sys
import shutil
import os

PROJECT_ROOT_ENV = 'GAUGE_PROJECT_ROOT'
STEP_IMPL_DIR = "step_impl"
project_root = os.environ[PROJECT_ROOT_ENV]
impl_dir = os.path.join(project_root, STEP_IMPL_DIR)

def main():
    if sys.argv[1] == "--init":
        try:
            print("Initialising Gauge Python project")
            print("create  {}".format(impl_dir))
            shutil.copytree(STEP_IMPL_DIR, impl_dir)
        except Exception as e:
            print('Skipped copying implementation: {}.'.format(e))
    else:
        s = connection.connect()
        processor.dispatch_messages(s)

if __name__ == '__main__':
    main()
```

## Protocol Buffers

Communication between Gauge and Language Runner happens via TCP using Protocol Buffers.

To communicate with Gauge, there are different request/response messages are configured in the [`gauge-proto`](https://github.com/getgauge/gauge-proto) repository. Let's add the `gauge-proto` repository as a git submodule to our language runner.

```sh
git submodule add https://github.com/getgauge/gauge-proto.git
```

Create `getgauge/messages` directory. In this directory we will put the Python code which is generated from the proto files present in the submodule.

```sh
protoc --python_out=../getgauge/messages/ spec.proto
protoc --python_out=../getgauge/messages/ messages.proto
```

## Execution

```sh
gauge specs/
```

Let's define a step function which will be used as decorator in the step implementation.

Defining:

```python
def step(step_text):
    def _step(func):
        # Storing function in registry, so that it can be called when Gauge requests
        registry.add_step_definition(step_text, func)
        return func
    return _step
```

Usage:

```python
@step("The word <word> has <number> vowels.")
def assert_no_of_vowels_in(word, number):
    assert str(number) == str(number_of_vowels(word))
```

See [registry.py](https://github.com/kashishm/gauge-python/blob/master/getgauge/registry.py) for more information on storing the implementation and step text.

Gauge opens up a port for protobuf communication and runner connects to the socket by reading the environment variable `GAUGE_INTERNAL_PORT`.

Now, the language runner needs to send response to the requests send by Gauge. To read the request and send the response, language runner needs to use socket. (See [connection.py](https://github.com/kashishm/gauge-python/blob/master/getgauge/connection.py) for socket communication code). The detailed documentation for every request/response is explained [here](http://getgauge.io/documentation/technical/current/language_plugin_api.html).

Create `getgauge/processor.py` and put the following code in it. This will wait for requests and sends respective responses till kill request is received:

```python
import os
import sys
import traceback
import time
from connection import read_message, send_message
from getgauge.registry import registry
from messages.messages_pb2 import Message, StepValidateResponse
from messages.spec_pb2 import ProtoExecutionResult

PROJECT_ROOT_ENV = 'GAUGE_PROJECT_ROOT'
STEP_IMPL_DIR = "step_impl"
project_root = os.environ[PROJECT_ROOT_ENV]
impl_dir = os.path.join(project_root, STEP_IMPL_DIR)

def _current_time(): return int(round(time.time() * 1000))

processors = {
    Message.ExecutionStarting: set_response_values,
    Message.ExecutionEnding: set_response_values,
    Message.SpecExecutionStarting: set_response_values,
    Message.SpecExecutionEnding: set_response_values,
    Message.ScenarioExecutionStarting: set_response_values,
    Message.ScenarioExecutionEnding: set_response_values,
    Message.StepExecutionStarting: set_response_values,
    Message.StepExecutionEnding: set_response_values,
    Message.ExecuteStep: _execute_step,
    Message.StepValidateRequest: _validate_step,
    Message.StepNamesRequest: set_response_values,
    Message.ScenarioDataStoreInit: set_response_values,
    Message.SpecDataStoreInit: set_response_values,
    Message.SuiteDataStoreInit: set_response_values,
    Message.StepNameRequest: set_response_values,
    Message.RefactorRequest: set_response_values,
    Message.KillProcessRequest: _kill_runner,
}

def dispatch_messages(socket):
    sys.path.append(impl_dir)
    map(__import__, ['step_impl'])
    while True:
        request = read_message(socket)
        response = Message()
        processors[request.messageType](request, response, socket)
        send_message(response, request, socket)
```

Before executing steps, Gauge sends a request to check if the implementation for the given steps are present or not. `_validate_step` will check in the registry, it will set is_valid to True if present otherwise False.

```python
def _validate_step(req, res, socket):
    res.messageType = Message.StepValidateResponse
    res.stepValidateResponse.isValid = registry.is_step_implemented(req.stepValidateRequest.stepText)
    if res.stepValidateResponse.isValid is False:
        res.stepValidateResponse.errorType = StepValidateResponse.STEP_IMPLEMENTATION_NOT_FOUND
```

After validating steps, Gauge will send request to execute a step, request will contains parameters and implementation function is called with those parameters. It will send the response back with the result(failed, error, stack trace, type, execution time).

```python
def _execute_step(req, res, socket):
    params = []
    for param in req.executeStepRequest.parameters:
        params.append(param.value)
    set_response_values(req, res)
    execute_method(params, registry.get_info(req.executeStepRequest.parsedStepText).impl, res)

def set_response_values(request, response, s=None):
    response.messageType = Message.ExecutionStatusResponse
    response.executionStatusResponse.executionResult.failed = False
    response.executionStatusResponse.executionResult.executionTime = 0

def execute_method(params, func, response):
    start = _current_time()
    try:
        func(*params)
    except Exception as e:
        _add_exception(e, response)
    response.executionStatusResponse.executionResult.executionTime = _current_time() - start

def _add_exception(e, response):
    response.executionStatusResponse.executionResult.failed = True
    response.executionStatusResponse.executionResult.errorMessage = e.__str__()
    response.executionStatusResponse.executionResult.stackTrace = traceback.format_exc()
    response.executionStatusResponse.executionResult.errorType = ProtoExecutionResult.ASSERTION
```

After execution is complete Gauge will send a kill request to language runner and runner needs to close the socket and end the program.

```python
def _kill_runner(req, res, socket):
    socket.close()
    sys.exit()
```

## Install & Test

There are two ways to install the plugin

- Copy the content of your project to Gauge plugins path i.e  `%APPDATA%\gauge\plugins\mypython\0.0.1` for Windows and `~/.gauge/plugins/mypython/0.0.1` for OSX and Linux.
- Create a zip file of your project and install it using: `gauge --install mypython`.

The output of `gauge -v` will contain `mypython` plugin with version `0.0.1`.

After this, you should be able to initialize and execute a Python Gauge project.

## Next Steps

In this article, you have seen how to write a basic language runner for Gauge and start executing steps. A language runner can do a lot more. Take a look at the feature matrix of language runners for an overall idea of the current state of language runners for Gauge.

Gauge is an open-source project, and is driven by contributions from its growing community. If you do not find a language runner in your favourite language, start writing one!

## Resources

- [Source code of the Python language runner](https://github.com/kashishm/gauge-python)
- [Source code of the JavaScript language runner](https://github.com/getgauge-contrib/gauge-js)
- [Technical documentation on Language Runners.](http://getgauge.io/documentation/technical/current)
