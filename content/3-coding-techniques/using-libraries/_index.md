---
title: 3.1. Using Libraries
---

'Using' a library, in short, refers to calling its functions in order to do convenient things. 

{{<hint info>}}
It should be noted that the MathPHP and LibDQ libraries are organised differently; moreover, they've been set up for use on the website in different ways. As a result, the code required to use the functions in these libraries are not the same. 
{{</hint>}}

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

## Calling Functions from LibDQ

The LibDQ functions are a bit more convoluted; these are stored in a 'global static class' that's loaded by the site. 

{{<hint info>}}
Okay, so what is a 'global static class'? 

For the scope of dynamic questions, you could consider a 'static class' as essentially a collection of variables and/or functions, and being 'global' just means you can access it from anywhere.

The more important thing to know is that the following syntax is used in PHP to call either a variable or function from a class: 

```php
className->variableOrFunction 
```
{{</hint>}}

The class is referred to by using `_MD('lib_dq')`. To use a function from this class, follow the PHP function to call functions from classes. For example: 

```php
// Round 429.972 to 3 significant figures
echo _MD('lib_dq')->sigfig(429.972, 3);     // returns '430.', with the dot
```

For brevity in code, you can also first set this class somewhere in a variable, like this: 

```php
$lib = _MD('lib_dq');
echo $lib->sigfig(429.972, 3);     // returns '430.', with the dot
```

