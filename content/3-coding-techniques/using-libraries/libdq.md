---
title: 3.1.1 LibDQ

katex: true
markup: "mmark"
---

The LibDQ library (as of the moment) has two main use cases: 

1. Rounding numbers to significant figures (`sigfig`)
2. Displaying algebraic expressions and equations properly (`gen_expr`, and `gen_eq`)

Below, I'll explain the relevant functions that provide the above functionality:

- [`sigfig`](#sigfig)
  - [Example Usage](#example-usage)
- [`gen_expr`](#gen_expr)
  - [Example Usage](#example-usage-1)
- [`gen_eq`](#gen_eq)
  - [Example Usage](#example-usage-2)

---

## `sigfig`

```php
function sigfig($value, $digits)
```

This function was introduced as an example in the previous page, but I'll formally define it here for clarity: 

This function takes in two parameters:
- `$value` - a number to round
- `$digits` - the number of significant figures to round to

It returns a String that represents the rounded number.

{{<hint info>}}
Note that this function returns a string, as some rounded values will end with a period to indicate the units digit is also a significant figure. 
{{</hint>}}

### Example Usage

```php
$lib = _MD('lib_dq');   // this sets the variable $lib to the static class holding all LibDQ functions

echo $lib::sigfig(429.972, 2);     // returns '430'
echo $lib::sigfig(429.972, 3);     // returns '430.'
echo $lib::sigfig(429.972, 4);     // returns '430.0'
```

---

## `gen_expr`

```php
function gen_expr($term_array)
```

A function that generates an algebraic expression neatly, for use in AsciiMath. 

For example, suppose you have some random numbers $$A, B, C, D$$ and want to use them in the expression below: 

$$Ax + By + Cz + D$$

Displaying this properly in AsciiMath for any random coefficients/constants is difficult - you have to consider how to format the positive, zero and negative coefficients properly. 

One simple option is to simply stick the numbers in front of the variables with appropriate brackets - however, you can end up with some messy and difficult-to-understand expressions, like this: 

$$(3)x + (0)y + (-1)z + (1)$$

What `gen_expr` does is remove all the unnecessary brackets, terms that evaluate to 0, and coefficients that are 1; essentially it could be used to transform the above expression into the one below: 

$$3x - z + 1$$

To use the function, you'll need to know about how [associative arrays](https://www.php.net/manual/en/language.types.array.php) work. The important thing to note is that keys and values can be defined; each key points to a particular value, and the keys must be unique. 

The function takes in one argument as an associative array that has keys and values:
- `$term_array` - An array with (terms) => (coefficients); \
  Coefficient-term pairs will be displayed in order given.
  - The terms, as keys, should be strings; they can be anything valid for AsciiMath. Some valid terms include:
      - `"x"` - used for the term $$x$$
      - `"log(y^2)"` - used for the term $$\log(y^2)$$
      - `""` - used for the constant term
  - The coefficients, as values, should either be a string or number: 
      - If a number, its value will be parsed and displayed appropriately - 0s removed, 1s removed if term is not `""`, etc.
      - If a string, its value will be placed directly in front of the term, no matter what it is \
        (useful for where you want to display something more complex like a fraction)

The function returns a string that you can encase in backticks to display properly with AsciiMath.

### Example Usage

```php
$lib = _MD('lib_DQ')

// Display a random expression Ax + By + Cz + D, as shown above
$A = mt_rand(-9, 9);
$B = mt_rand(-9, 9);
$C = mt_rand(-9, 9);
$D = mt_rand(-9, 9);

// Generate an equation for use in AsciiMath
$equation = $lib::gen_expr(["x" => $A, 
                            "y" => $B, 
                            "z" => $C, 
                            "" => $D]);

// Use the equation in a question
echo "If `x = y = z = 4`, what is the value of `$equation`?";
```

---

## `gen_eq`

> -- Incomplete Section

```php
/**
 * A function that generates a simple linear equation and returns an appropriate string.
 * @param $lhs - Array, (terms => coefficients); displayed in order given, left of =.
 * @param $rhs - Array, (terms => coefficients); displayed in order given, right of =.
 * @param $backticks - Boolean. Whether to encase the result in backticks. False by default.
 * @return string - A string representing the function.
 */
function gen_eq($lhs, $rhs, $backticks=false)
```

### Example Usage


