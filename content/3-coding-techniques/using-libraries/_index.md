---
title: 3.1. Using Libraries
---

'Using' a library, in short, refers to calling its functions in order to do convenient things. 

{{<hint info>}}
It should be noted that the MathPHP and LibDQ libraries have been set up for use on the website in different ways. As a result, the code required to use functions in these libraries is not quite the same. 
{{</hint>}}

In both cases, the functions are stored in a 'static class' - which is essentially a collection of variables and/or functions stored under a particular label (so that any names don't clash). 

The following syntax is used in PHP to call either a variable or function from a static class: 

```php
className::variableOrFunction 
```

Several examples of how this is used are shown below.

## Caling Functions from MathPHP

To use MathPHP functions, simply add the relevant `use` command beforehand. You can refer to the MathPHP documentation for examples; the [usage](https://github.com/markrogoyski/math-php#algebra) section is particularly helpful.

Here's a small snippet of some code from that section to give you an idea of how MathPHP is used: 

```php
use MathPHP\Algebra;

// Greatest common divisor (GCD)
$gcd = Algebra::gcd(8, 12);

// Least common multiple (LCM)
$lcm = Algebra::lcm(5, 2);

// Factors of an integer
$factors = Algebra::factors(12); // returns [1, 2, 3, 4, 6, 12]
```

You can see that the `::` operator allows access to the functions of the `Algebra` static class, loaded by the `use` command. 

## Calling Functions from LibDQ

The LibDQ functions are a bit more convoluted; these are stored as a static class already loaded by the site itself. Rather than the `use` command, this class is accessed by using predefined function on the site: `_MD('lib_dq')`. 

An example is shown below, where the LibDQ `sigfig()` function is called several times.

```php
// Round 429.972 to some number of significant figures
echo _MD('lib_dq')::sigfig(429.972, 2);     // returns '430'
echo _MD('lib_dq')::sigfig(429.972, 3);     // returns '430.'
echo _MD('lib_dq')::sigfig(429.972, 4);     // returns '430.0'
```

Admittedly, the code above doesn't look very easy to read (or type).

To make this easier, you can first set this class as a variable instead:

```php
$lib = _MD('lib_dq');   // this sets the variable $lib to the static class holding all LibDQ functions

echo $lib::sigfig(429.972, 2);     // returns '430'
echo $lib::sigfig(429.972, 3);     // returns '430.'
echo $lib::sigfig(429.972, 4);     // returns '430.0'
```

{{<hint warning>}}
Note that using a variable to store the class (as seen in the code above) only works with the LibDQ library, because of how the class has been loaded by the site. 
 
With the MathPHP library, you should use the `use` command as shown above instead.
{{</hint>}}
