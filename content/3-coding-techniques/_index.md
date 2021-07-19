---
title: 3. Coding Techniques
---

Right - after going all the design talk above, I should probably start talking about the actual code itself and how the design principles mentioned can be used in practice. 

In this section, I'll start talking about quite a few common scenarios that you might expect to encounter when designing a question, and how you can go about solving them in the most painless manner possible. 

Something that I'll repeatedly try to emphasise when you're coding is this: 

## Please don't torture yourself!

Try not to think of coding up a question as an additional obstacle in your way - instead, consider coding like a **toolbox** that can be used to make questions for you. 

Code isn't meant to be tedious or unreadable - if a particular task seems like it would be way too much work through code, then **step back a bit** before you start coding; try to consider what other options and approaches you have that could simplify the task for you.

{{<hint info>}}
There are two acronyms that, in my opinion, embody the general principles one should have towards coding: 

- DRY: Don't Repeat Yourself; and
- KISS: Keep It Simple, Stupid

I'd almost go as far as to say that when writing code, you should be as lazy as possible - try to come up with a way to write your question that requires the minimum amount of typing and complex thought necessary. The cleaner you keep your code, the easier it is for you to spot errors or build upon it later. 

(There's a lot more nuance to this viewpoint, but adhering to the principle of KISS, this is all I'll mention for now.)
{{</hint>}}

---

## Another Convenient Feature: PHP Libraries

One more thing to note: PHP has a *lot* of features. 

If there's something you want to do, it's likely that someone else has come across a similar issue, and has developed a solution (or even tools/functions you can use) that solves the problem for you. 

In the following sections, I'll be taking advantage of this very scenario; more specifically, I'll be makeing use of PHP **libraries**. 

A PHP 'library', in a nutshell, refers to a separate set of files that contain various pre-written PHP functions. Because they're defined in a separate file, calling upon these functions is slightly more convoluted, but these functions can do extremely helpful things for you, all in a single line.

We currently have two libraries set up for use: 
1. The [MathPHP](https://github.com/markrogoyski/math-php) library
2. LibDQ, a library specifically written for writing 'Dynamic Questions' to cover more specific use cases

You can explore the MathPHP link above if you'd like to get a feel for the kinds of functions that the library will use. 

In the subsections of 3.1, I'll also go over the usage of the LibDQ library to more specific detail; there are only a handful of functions in that library, and they cover use cases that can be applied to a very wide range of questions. 
