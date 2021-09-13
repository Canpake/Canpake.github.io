---
title: 3.2. Introducing 'Randomness'

katex: true
markup: "mmark"
geekdocCollapseSection: true
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

{{<hint info>}}
As you might expect, the `shuffle()` function takes longer the more values there are in an array. \
Try to **avoid using them on big arrays** when other options are available - like `range(0, 10000)`!
{{</hint>}}

---

These two methods of randomisation, in conjunction with some PHP code, can already give you a lot of flexibility over the kinds of random values you can generate.

Over the course of creating questions, you'll find yourself needing to generate values under many sorts of conditions. Here are just a few, in terms of increasing complexity - see if you can figure out how to randomly generate these! 

When you think you've figured out the answer, click on the box to expand them and see my thoughts.

1. {{<expand "A number between -10 and 10.">}}
Use `mt_rand` directly: 
```php
$random = mt_rand(-10, 10);
```
{{</expand>}}

2. {{<expand "An even number between -10 and 10.">}}
An even number can be achieved by multiplying a random value by 2: 
```php
$random = 2 * mt_rand(-5, 5);
```
You can apply this idea to many other cases where the numbers follow a certain formula. For example: \
`3x + 1`: Numbers with a remainder of 1 when divided by 3 \
`2**x - 1`: Numbers that, in binary (base 2), are all 1s
{{</expand>}}

3. {{<expand "A non-zero, even number between -10 and 10.">}}
There are a few ways of doing this, but I recommend a do-while loop that randomises again if you get 0:
```php
do { $random = 2 * mt_rand(-5, 5); } while ($random == 0);
```
Technically, you could use this method for any combination of conditions, like this: 
```php
do { $random = mt_rand(-10, 10); } while ($random % 2 == 1 || $random == 0);
// $random % 2 == 1  causes $random to be randomised again if odd
// $random == 0  causes $random to be randomised again if 0
```
However, this is **not** a good practice - with too many conditions, your code might end up taking forever to generate a number!
> In general, `do-while` loops should be used to **catch exceptions**, rather than impose a rule.
{{</expand>}}


4. {{<expand "5 non-zero even numbers between -10 and 10.">}}
Take the previous solution, but now use a for loop to do it several times. \
Store the values in an array so that you can access them.
```php
$randoms = array();

for ($i = 0; $i < 5; $i++) {
    do { $random = 2 * mt_rand(-5, 5); } while ($random == 0);
    $randoms[] = $random;
}
```
Note that `$randoms[] = $random` means that we take the value of `$random`, and add it to the end of the array `$randoms`. \
Note that there's no need to `shuffle()` the array - values are already random!
{{</expand>}}


5. {{<expand "5 distinct even numbers between -10 and 10.">}}
Since you want distinct numbers, using `shuffle()` on a list of the numbers we want would be the best solution. The `range()` function works well for this:
```php
$randoms = `range(-10, 10, 2)`;
shuffle($randoms);   // use $randoms[0], $randoms[1], $randoms[2], ...
```
{{</expand>}}


6. {{<expand "5 distinct, non-zero even numbers between -10 and 10.">}}
Again, you want 5 distinct numbers, but this time they all have to satisfy a special condition (being nonzero). 

In this case, we can generate an array of values we want, like the previous solution:
```php
$randoms = array_merge(range(-10, -2, 2), range(2, 10, 2));
shuffle($randoms);   // use $randoms[0], $randoms[1], $randoms[2], ...
```

Note here that `array_merge` combines the two `range()` results together: `[-10, -8, ..., -2]` with `[2, 4, ..., 10]`.

Other ways of generating that array are valid too - in this case, `array_diff` would work as well: \
`array_diff(range(-10, 10, 2), [0]);` \
(note that this approach has limitations of its own, though)
{{</expand>}}


---

In actual questions, it's often best to place restrictions on the random numbers that can be generated, in order to keep the calculations in the question simple (e.g. always integer answers). There are a lot of benefits to doing this - it helps keep questions consistent in difficulty, while making them less tedious for students; and perhaps most importantly, **it makes the question much easier to code!**

However, note that the above exercises are very simple cases associated with random generation - in practice, you'll often find that the 'conditions' behind the random values aren't as obvious. This is particularly the case when the values are used in other contexts like coordinates, or the coefficients for a polynomial!

In the following pages, I'll look at some common scenarios you might come across in various contexts: 

<!-- TODO: Link for each one of these -->
<!-- Perhaps first 3 should be in the next page, and then the other 3 should be separate pages? -->

- 3.1.1. Arithmetic \
  \> Generating integers X, Y that are not coprime \
  \> Generating integers X, Y such that X% of Y is always a whole number

- 3.1.2. Algebra and Graphs \
  \> Generating two linear lines (in the form $$y = mx + c$$) that intersect at **integer** coordinates \
  \> Generating a polynomial that has 2 easy-to-find (i.e. integer) roots

- 3.1.3. Geometry \
  \> Generating integers that form Pythagorean triples \
  \> Generating 3 coordinates that form a **non-right-angled** triangle

<!-- TODO: 3.2 should be formatting -->