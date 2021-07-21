---
title: 3.1.1 LibDQ

katex: true
---

The LibDQ library (as of the moment) has two main use cases: 

1. Rounding numbers to significant figures (`sigfig`)
2. Displaying algebraic expressions and equations properly (`gen_expr`, and `gen_eq`)

Below, I'll explain the relevant functions that provide the above functionality:

{{<toc>}}

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

For example, suppose you have some random numbers  \\(A, B, C, D\\) and want to use them in the expression below: 

$$Ax + By + Cz + D$$

Displaying this properly in AsciiMath for any random coefficients/constants is difficult - you have to consider how to format the positive, zero and negative coefficients properly. 

One simple option is to simply stick the numbers in front of the variables with appropriate brackets - however, you can end up with some messy and difficult-to-understand expressions, like this: 

$$(3)x + (0)y + (-1)z + (1)$$

What `gen_expr` does is remove all the unnecessary brackets, terms that evaluate to 0, and coefficients that are 1 - transforming the above expression into the one below: 

$$3x - z + 1$$

To use the function, you'll need to know about how [associative arrays](https://www.php.net/manual/en/language.types.array.php) work. The important thing to note is that keys and values can be defined; each key points to a particular value, and the keys must be unique. 

The function takes in one argument as an associative array that has keys and values:
- `$term_array` - An array with (terms) => (coefficients); \
  Coefficient-term pairs will be displayed in order given.
  - The terms, as keys, should be strings; they can be anything valid for AsciiMath. Some valid terms include:
      - `"x"` - used for the term \\(x\\)
      - `"log(y^2)"` - used for the term \\(\log(y^2)\\)
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

$equation = $lib::gen_expr(["x" => $A, 
                            "y" => $B, 
                            "z" => $C, 
                            "" => $D]);

// Use the equation in a question
echo "If `x = y = z = 4`, what is the value of `$equation`?";
```

---

## `gen_eq`

```php
function gen_eq($lhs, $rhs, $operator="=", $backticks=false)
```

This is essentially a convenient version of the function above for use in equations (or inequalities). 

The values taken in are as follows: 
- `$lhs` - An associative array, representing the expression on the left hand side of the operator.
- `$rhs` - An associative array, representing the expression on the right hand side of the operator. 
- `$operator` - A string; defaults to `=`. The operator to display between the expressions from `$lhs` and `$rhs`.
- `$backticks` - Can be `true`; defaults to `false`. Controls whether the result is returned with or without backticks - generally used for convenience.

The function returns a string of the equation that will be displayed properly with AsciiMath.

### Example Usage

```php
$lib = _MD('lib_DQ')

// Generate a quadratic equation y = Ax^2 + Bx + C 
$A = mt_rand(-9, 9);
$B = mt_rand(-9, 9);
$C = mt_rand(-9, 9);

$equation = $lib::gen_expr(["y" => 1], 
                           ["x^2" => $A, "x" => $B, "" => $C]);

// Use the equation in a question
echo "Which of the following lines is a graph of `$equation`?";
```

Another use case with an inequality: 

```php
$lib = _MD('lib_DQ')

// Directly display an inequality, Asin(x) + Bcos(x) < C
$A = mt_rand(-9, 9);
$B = mt_rand(-9, 9);
$C = mt_rand(-9, 9);

echo $lib::gen_expr(["sin(x)" => $A, "cos(x)" => $B],  ["" => $C], $operator="<", $backticks=true);
```
