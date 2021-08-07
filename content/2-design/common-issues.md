---
title: 2.1. Common Issues with Dynamic Questions
---

Listed below are some problems with dynamic questions that I've seen and made myself before. They all stem from randomisation in code, but the nature of these issues can be rather different; some are directly involved with the code, while others are due to the design of the question and which values are randomised. 

Either way, it can be helpful to take these considerations into account as you write your own code! 


## 1. INFs and unrounded answers

When questions involve division, trigonometric functions, irrational numbers and generally anything 'messy', make sure to check how the values end up being displayed! You might otherwise end up with something like this: 

<img src="https://i.imgur.com/DYm97LY.png" width="400px"/>

> The answer in the image above was probably not the intended solution - unfortunately, PHP will not automatically return the results of calculations as fractions or expressions of pi.

Unrounded numbers will be given up to 16 or so decimal places, while dividing by 0 (or taking the tangent of 90˚, etc.) will give you an `INF` value that works as you might expect with other numbers. 

This is generally unwanted behaviour - you'd want to explicitly ask for rounded values, or even better, design the question to only deal with values that don't need to be rounded. In the above case, asking for the answer in terms of `π`, and dealing properly with cases where radius is not divisible by 3!

> Another note with rounding - when dealing with currency, make sure that the values you get in the question are appropriate with the denominations of the currency! You typically can't have 0.001 of a US dollar, or 0.5 Japanese Yen, for example.

---

## 2. Floating-point errors

This is a general problem with most computing languages, and you can replicate this one yourself with the following code:
```php
echo 3.14159265 - 3.14;
```
You'll find that PHP does something strange here and returns the value `0.0015926500000001`. 

Why it does this is explained at length here: \
https://floating-point-gui.de/

But, in a nutshell, arithmetic in computers done in base 2 rather than base 10, which can lead to some rounding errors on decimals like these ones.

Generally, this issue only arises occasionally when dealing with decimals - however, it's always important to be aware of this possibility. Once again, consider rounding your values or designing the question to avoid this situation entirely.

---

## 3. Randomised values don't make sense

When writing a static question, the numbers chosen generally follow a number of implicit assumptions, such as: 

- If a question involves finding GCD/LCM of 2 numbers, the values given should be different
- When calculating an answer in currency, the final answer should be in the proper denominations (i.e. not having 0.001 USD, or 0.5 JPY).
- Extra formatting is required for some contexts - for example, if you're randomising the minutes on a clock, make sure to display the time as 15:08, rather than 15:8!

Some of these are harder to deal with - such as picking 3 random points on a grid and making sure they form a triangle, not a line. I'll attempt to cover some similar scenarios in [Section 3](/3-coding-techniques), and how you can get around this.

If you forget to check for these conditions when randomising your values, then often you end up with a question that either sounds weird, or no longer assesses what was originally intended:

<img src="https://i.imgur.com/wKbLF75.png" width="400px"/>

> The aim in the above question is for students learn how to calculate distance when several speeds are given - but this does not apply if the speeds given are the same!

---

## 4. Not enough Randomisation

Questions should involve enough randomisation so that the questions generated don't look all the same. 

The second time a student sees the same dynamic question, we want to be confident that the calculations used last time cannot be used to solve the question.

> **Note:** As said in section 1, the order of solutions is randomised by default; this does not count as 'randomisation' in a dynamic question. 

As a rule of thumb, it would be good to have at least 10 possible variations of your question. More randomisation is better, but be careful of the next issue:  

---

## 5. Questions varying too much in difficulty

When randomising your numbers, some values might lead to a question that requires much harder calculations or even an entirely different solving method.

For example, consider finding the roots of `f(x) = x^2 + 2x + 1`, compared to `f(x) = x^2 + 2x + 2`!

The former can be factorised and solved immediately, whereas the other requires the quadratic formula and also has complex roots - overall much harder to solve.

This ties in with the above point about 'implicit assumptions' as well. If you're giving side lengths and angles of a triangle for a question about the cosine rule, make sure you avoid angles like 90˚ - this would mean they could use Pythagoareas' Theorem instead! 

---

## 6. (MCQs) Issues with Answer Options

Multiple-choice questions have additional considerations due to the fact that you need to provide random wrong answers.

On one hand, the answers you give for multiple-choice questions can't be *completely* random - otherwise the correct answer can be plainly obvious:

<img src="https://i.imgur.com/LWDdHwU.png" width="300px">

On the other hand, care is also needed when giving wrong answers that relate to the question - otherwise your wrong answers might be duplicates of each other, or even a correct solution themselves! 

<img src="https://i.imgur.com/X3F6wXP.png" width="300px"/>

As thousands of students are going to be seeing these questions, you should always make sure that there is no chance that a question will end up having this issue. 

A few techniques in [3.1. Introducing 'Randomness'](/3-coding-techniques/introducing-randomness) can help you avoid getting duplicate values, but once again, the best option is to design your question such that it never comes across this issue in the first place.
  