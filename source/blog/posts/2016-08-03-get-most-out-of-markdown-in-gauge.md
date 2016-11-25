---
title: Get most out of Markdown in Gauge
date: 03 August 2016
tags: test automation, best practices
author: Soumya
summary: A discussion on how to write expressive tests using Gauge
published: true
draft: true
summary_image: blog/expressing_tests_better.jpg
---
The[benefits of using Markdown](https://www.quora.com/What-are-the-benefits-to-using-Markdown/answer/Eric-Lauritzen?srid=umwAo)are that it is platform-independent, intuitive, easy to learn, human-readable, and uses plain text while providing basic formatting and easy conversion to HTML, the language of the Web.

Gauge allows a user to describe test cases in a free-flowing manner using Markdown. This helps to enhance *"readability"* and *"expression of intent"*.

Better readability: Semantics over Syntax
-----------------------------------------
Test cases written in a free-flowing manner are easy to read. This also helps writing pre/post requisites, assumptions, steps, verifications and more catering to the growing need of the test cases being readable. Consider the following example:

```markdown
Payment process
===============
* Add “Toy Story 1” to the shopping cart
* Add “Toy Story 2” to the shopping cart
* Verify there are “2” items in the shopping cart

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

As the above example shows, tests in Gauge can take the manner of a user journey. The description in natural language makes it easy to understand.

Being effective: expressing intent
----------------------------------
Sometimes given a context we would like to word the same functionality differently. This gives more clarity and helps us express our intent better. Consider the following example.

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
* An email confirming the “order” is sent
```

Steps `A "welcome" email is sent to the user` and `An email confirming the “order” is sent` of sending email have the same underlying functionality. Gauge allows wording them differently without having to repeat the implementation. Thus effectively catering to the user’s need to express the intent better.

Convey more: with images
------------------------
When it comes to expressing intent, the proverb that a picture is worth a thousand words can't be beaten. Ability to insert media, for e.g. an image, helps to make a point. Consider the following example.

```markdown
UI patterns
===========
This is the representation of an upcoming implementation
![image](image_url_here).
Verify styling
--------------
* Verify “8” icons present.
Should Verify the UI positioning manually.
```
The generated html report on implementing and executing the above spec will contain the specified image. These  images can be used to indicate manual verifications, upcoming implementations etc. This feature of Gauge helps a user convey the essence more effectively than a description.

The ability to write tests in the Markdown format to express broad ranging journeys has become vital, and Gauge helps in addressing this aspect of test automation.
