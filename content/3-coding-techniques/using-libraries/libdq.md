---
title: 3.1.1 LibDQ

katex: true
---

The LibDQ library (as of the moment) has only a few main use cases: 

1. Rounding numbers to significant figures (`sigfig`)
2. Simplifying square roots (`simplify_sqrt`)
3. Formatting algebraic expressions and equations properly (`gen_expr`, and `gen_eq`)
4. Simplifying fractions (`gen_frac`)

Below, I'll explain the relevant functions that provide the above functionality:

{{<toc>}}

{{<hint warning>}}
**Important: Unfortunately, the below example usage code will only work if you use them inside the QBM.** \
This is because the LibDQ library is a custom library that's been loaded in a specific manner on the website.

If you'd like to try using these functions in a separate editor, I've found a solution that sort-of works? \
You can try following the steps below:

1. Make a [replit.com](https://replit.com/) account.

2. After you've made an account, follow the link below and 'fork' the project. \
   https://replit.com/@canpake/LibDQ#main.php \
   (This puts a copy of the project in your account that you can edit.)

3. To use the library, edit the `main.php` file, and press the 'run' button to test your code.

If things don't seem to work, or if you'd like to use this in an IDE of your own, please feel free to [contact me](/other/contact).
{{</hint>}}

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

## `simplify_sqrt`

```php
function simplify_sqrt($sqrt_value)
```

A function that displays the simplified square root of a number properly.

Useful for cases where you'd like to display random square roots in their simplest form - e.g. \\( sqrt(27) \\) as \\( 3 sqrt(3) \\).

The values taken in are as follows: 
- `$sqrt_value` - Integer. The number to take the square root of. 
  - Can take a nonnegative value. 

The function can either return an **integer** or a **string**: \
An integer is returned if the fraction evaluates to a whole number; \
A string is returned otherwise, representing the most simplified version of the fraction.

### Example Usage

```php
$lib = _MD('lib_dq');

echo $lib::simplify_sqrt(25);   // returns 5
echo $lib::simplify_sqrt(26);   // returns "sqrt(26)"
echo $lib::simplify_sqrt(27);   // returns "3 sqrt(3)"
echo $lib::simplify_sqrt(-27);  // returns "3i sqrt(3)"

// Using it in a sentence - note the use of backticks to include AsciiMath
$simplified = $lib::simplify_sqrt(40)
echo "The square root of 40 can be simplified: `sqrt(40) = $simplified`"; 
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
$lib = _MD('lib_dq')

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
- `$backticks` - Boolean; defaults to `false`. Controls whether the result is returned with or without backticks - generally used for convenience.

The function returns a string of the equation that will be displayed properly with AsciiMath.

### Example Usage

```php
$lib = _MD('lib_dq')

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
$lib = _MD('lib_dq')

// Directly display an inequality, Asin(x) + Bcos(x) < C
$A = mt_rand(-9, 9);
$B = mt_rand(-9, 9);
$C = mt_rand(-9, 9);

echo $lib::gen_expr(["sin(x)" => $A, "cos(x)" => $B],  ["" => $C], $operator="<", $backticks=true);
```

---

## `gen_frac`

```php
function gen_frac($numer, $denom, $include_plus=false)
```

A function that displays a fraction properly, given its numerator and denominator (as integers). 

The values taken in are as follows: 
- `$numer` - Integer. Numerator of the fraction.
- `$denom` - Integer. Denominator of the fraction. Can't be 0 (will return improper values otherwise).
- `$include_plus` - Boolean; defaults to `false`. Whether to include an initial '+' if the coefficient is positive.
  - This is useful for cases where the fraction will not be the first term in an expression. 

The function can either return an **integer** or a **string**: \
An integer is returned if the fraction evaluates to a whole number; \
A string is returned otherwise, representing the most simplified version of the fraction.

### Example Usage

```php
// Question: Volume of sphere with random radius
$radius = mt_rand(3, 12);
$question_text = "What is the volume of a sphere with radius $radius?";
echo $question_text;

$rad_cubed = pow($var1, 3);

// Use the LibDQ library and generate fractions
$lib = _MD('lib_dq');

$answer_frac = $lib::gen_frac(4 * $rad_cubed, 3);   // 4r^3/3, simplified
$answer = "`$answer_frac pi`";

$solution = "Given radius `r`, volume of sphere is `4/3*pi*r^3` </br>"
          . "So `4/3*pi*($var1)^3 = $answer_frac pi`";

$wrong = ["`" . $lib::gen_frac(  $rad_cubed, 3) . " pi`",
          "`" . $lib::gen_frac(2*$rad_cubed, 3) . " pi`",
          "`" . $lib::gen_frac(  $rad_cubed, 2) . " pi`",
          "`" . $lib::gen_frac(3*$rad_cubed, 2) . " pi`"];
```
