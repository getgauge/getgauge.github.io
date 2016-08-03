---
title: Expressing Tests Better
date: 03 August 2016
tags: test automation, best practices
author: Soumya
summary: A discussion on how to write expressive tests using Gauge
published: false
summary_image: https://images.unsplash.com/photo-1463003416389-296a1ad37ca0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=1bed2a6743851633b655ae774c15ac07
---

Automated tests should aim to increase the effectiveness, be a source of truth and be the best line of defence against change.

More people have begun to appreciate this, and tools such as Cucumber, Concordion, Twist etc, have gained traction over the last few years. Each tool has offered more when it comes to writing test cases fairly agnostic of the language used to mechanise the tests, and so is it with Gauge.

Gauge chooses to be different in allowing a user to describe the test case in a free-flowing manner and the emphasis is on **"readability"** and **"expression of intent"**.

Test cases written in a free-flowing manner helps the user to write prerequisites, assumptions, steps, verifications, postconditions and more catering to the growing need of the test cases being readable. Consider the following example:

```markdown
Payment process
===============
* Add "Toy Story 1" to the shopping cart
* Add "Toy Story 2" to the shopping cart
* Verify there are "2" items in the shopping cart


Proceed to checkout
-------------------
* Verify total is displayed correctly


Make payment
-------------
* Verify payment occurred


_______________________________________
* User logs out
* Verify that home page is displayed
```

Unlike stating a series of assumptions up front and verifying multiple expectations at the end, the whole test takes the manner of a journey, and in such scenarios, tests written in this fashion read cleanly.

Gauge supports wording of the same functionality in different ways to enable the user express the intent better. Consider the following example.

```markdown
User flows
===========
Create a new account
--------------------
* User creates a new account
* A "welcome" email is sent to the user

Shop with saved items
---------------------
* User logs in
* User reopens the cart and proceeds to payment
* Payment is successfully received
* An email confirming the "order" is sent
```

In this case, the underlying functionality of the last step (sending an email) in both the scenarios is the same. But the way it is worded is different helps conveying the intent and the functionality more clearly. When it comes to expressing intent, the adage that a picture is worth a thousand words can't be beaten. Gauge also has the ability to insert other media to make a point.

The ability to write tests in a free flowing manner in order to express broad ranging journeys has become vital, and Gauge helps in addressing this aspect of test automation.
