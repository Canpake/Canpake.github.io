---
title: 4.1. Introducing 'Randomness'
---

Suppose you want a random number between 2 and 7 - with PHP, there are 2 main ways you could do this:

1.  **Generating a random number directly** \
    To do this, use the `mt_rand()` function. It takes in two numbers, and generates a random number between them (inclusive). For example: 

    ```php
    $two_to_seven = mt_rand(2, 7);
    ```

2.  **Shuffling an array of values**\
    This is like shuffling a pack of cards and choosing the value of the topmost card. \
    To do this, you can use the `shuffle()` operation on a list and pick the first few values you see:

    ```php
    $values = range(2, 7);   // equivalent to [2, 3, 4, ..., 7]
    shuffle($values);

    $two_to_seven = $values[0];
    ```
    > If you're unsure what the `range()` function does, try searching online!

So uh - at this point you might be asking why the second method even exists. It's quite a bit more work than the first case, after all. However, this method has a few other benefits: 
- The range of values you're choosing from are a **lot** more flexible - they don't even have to be numbers!
- You can choose more than 1 value from the shuffled array, **without replacement** - this is very useful for making sure MCQ options are different. 

> **Important Note**: As you might expect, the `shuffle()` function takes longer the more values there are in an array. **Avoid** using it on arrays that are really big - like `range(0, 10000)`!

---

These two methods of randomisation, in conjunction with some PHP code, can already give you a lot of flexibility over the kinds of random values you can generate.

Over the course of creating questions, you'll find yourself needing to generate values under many sorts of conditions. Here are just a few, in terms of increasing complexity - see if you can figure out how to randomly generate these! 

1. A number between -10 and 10.
2. An even number between -10 and 10.
3. An even number between -10 and 10 that isn't 0.
4. 5 even numbers between -10 and 10 that aren't 0.
5. 5 **distinct** even numbers between -10 and 10.
6. 5 **distinct** even numbers between -10 and 10 that aren't 0.

To avoid clutter, I've put my answers in a separate gist here: \
https://gist.github.com/Canpake/5114ab7212b9bc511089e92fa7c8f149