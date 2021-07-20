---
title: 3.1.1 LibDQ
---

The LibDQ library (as of the moment) has two main use cases to be aware of: 

1. Rounding numbers to significant figures (`sigfig`)
2. Displaying algebraic expressions and equations properly (`gen_expr`, and `gen_eq`)

Below, I'll explain the relevant functions that provide the above functionality: 

{{<toc>}}

---

## `sigfig`

```php
/**
 * Returns a number rounded to a certain significant figure.
 * @param $value - The number to round
 * @param $digits - The number of significant figures
 * @return string - The rounded value.
 */
function sigfig($value, $digits)
```

### Example Usage

```php
$lib = _MD('lib_dq');   // this sets the variable $lib to the static class holding all LibDQ functions

echo $lib::sigfig(429.972, 2);     // returns '430'
echo $lib::sigfig(429.972, 3);     // returns '430.'
echo $lib::sigfig(429.972, 4);     // returns '430.0'
```

### Description 

---

## `gen_expr`

```php
/**
 * A function that generates an expression from an array of terms => coefficients and returns a string.
 * @param $coef - Integer or String. If integer, coefficient of the term;
 *                                   If string, a preformatted coefficient (e.g. fractions).
 * @param $term_array - Array, (terms => coefficients); displayed in order given.
 * @return string - The expression.
 */
function gen_expr($term_array)
```

### Example Usage


### Description


---

## `gen_eq`

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


### Description

