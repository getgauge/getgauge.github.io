---
title: Parallel Execution with Gauge
date: 25 September 2015
tags: Parallel execution, test automation
author: Deepthi
summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet porta augue. Fusce facilisis porta turpis et congue. Praesent tempor, mauris sed vestibulum aliquam, est ligula aliquet diam, placerat lacinia orci purus vitae nunc. Nullam efficitur ipsum dui, eu rhoncus dolor tincidunt ut. 
published: false
summary_image: https://images.unsplash.com/photo-1462910211773-a9847b1f0e40?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=600fdca8f6340569864d4f94f5f9dfc1

# Parallel Execution with Gauge

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet porta augue. Fusce facilisis porta turpis et congue. Praesent tempor, mauris sed vestibulum aliquam, est ligula aliquet diam, placerat lacinia orci purus vitae nunc. Nullam efficitur ipsum dui, eu rhoncus dolor tincidunt ut. Aenean porttitor, est ut fringilla auctor, odio tellus mattis turpis, eu bibendum massa tortor eget metus. Aenean euismod et justo nec hendrerit. Cras aliquet, nulla vitae semper cursus, ex massa tristique orci, et accumsan lorem orci id arcu. Nunc tristique rutrum lectus id ultrices. Nulla id varius nulla.

## A New Section

Mauris ante lectus, interdum in commodo vitae, consectetur eu risus. Nunc nec viverra mi. In eleifend tristique porttitor. Ut vitae commodo velit. Integer eget ligula aliquet, fermentum erat tincidunt, euismod arcu. Praesent pharetra nibh turpis, at vehicula mauris dictum sed. Sed vulputate, enim sit amet ornare consequat, quam magna gravida eros, vitae ornare massa velit eget urna. Maecenas dignissim lacinia dolor non cursus. Quisque porta mi ac lectus cursus, in pellentesque nulla aliquam. Integer sollicitudin nisl tincidunt neque ullamcorper tincidunt eu et diam. Praesent tempus risus et erat ullamcorper varius. Cras vitae magna in ante imperdiet ultrices et finibus quam. Etiam ac ligula quis arcu laoreet dapibus sit amet vel odio. Aliquam erat volutpat. Vestibulum vestibulum nunc nulla, ut egestas turpis mattis non. Donec et consectetur massa, ut aliquam ipsum.

## Section with lists and image

This is what we think...

- Item 2
- Item 1
- Item 3
- Item 4
- Item 5

And this is an image

![Select language](<% = asset_path(:images, 'install-lang-runner.jpg') %>)

## Section with code blocks

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

You can see the code block below...

```
import com.thoughtworks.gauge.Step;
import com.thoughtworks.gauge.Table;

import java.lang.Object;
import java.lang.String;
import java.util.List;

public class StepImplementation {
    @Step("Say &lt;greeting&gt; to &lt;product name&gt;")
    public void helloWorld(String greeting, String name) {
        System.out.println(greeting + ", " + name);
    }

    @Step("Step that takes a table &lt;table&gt;")
    public void stepWithTable(Table table) {
        for (String columns : table.getColumnNames()) {
            System.out.println(columns);
        }

        for (List<String> rows : table.getRows()) {
            System.out.println(rows);
        }
    }

    @Step("A context step which gets executed before every scenario")
    public void contextStep() {
    }
}
```

## Conclusion

A concluding line or two