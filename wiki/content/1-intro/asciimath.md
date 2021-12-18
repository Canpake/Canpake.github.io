---
title: 1.4. Mathematical Expressions with AsciiMath
---

We also have support for displaying mathematical expressions using the [AsciiMath](http://asciimath.org/) markup language - this was used to display the quadratic equation in the example dynamic question displayed in [Section 1.1](/1-intro/dynamic-questions).

Any bit of text can be rendered as an AsciiMath expression by simply encasing it in backticks (the \` character). 

{{<hint warning>}}
> Note that this character (`) is not the same as an apostrophe (')! You'd typically find this symbol on the top-left of a QWERTY keyboard. 
{{</hint>}}

For instance, the example expression on the AsciiMath site can be included by writing the following directly in the <b>plain</b> text box itself: 

<img src="https://i.imgur.com/lRNYpGq.png" width="400px"/>

Equivalently, we could do this with the following PHP code: 

```php
<?php
echo "Sum of sequence of cubes: `sum_(i=1)^n i^3=((n(n+1))/2)^2`";
?>
```

In both cases, we'd get the same output: 

<img src="https://i.imgur.com/7CJzVMW.png" width="400px"/>

When you're making questions, encasing any expressions or equations in AsciiMath should become a pretty common practice. Your questions will look more consistent and polished, while making them easier to read and understand!

{{<hint info>}}
**Note:** You may need to split very long AsciiMath expressions into muliple parts so that they are rendered on different lines if required. Otherwise, the expresion will render entirely on one line and go off-screen.

Consider a case where we show how to fully expand the above expression step-by-step, and use the following code: 
```php
echo "Sum of sequence of cubes: `sum_(i=1)^n i^3 = ((n(n+1))/2)^2 = (n(n+1))^2/4 = (n^2 (n+1)^2)/4 = (n^2(n^2 + 2n + 1))/4 = (n^4 + 2n^3 + n^2)/4`";
```
Unfortunately, if we render the entire thing in a single expression, it'll be put all on one line. If the page isn't wide enough, it'll be cut-off halfway through:

<img src="https://i.imgur.com/e2UENtN.png" width="400px"/>

The best way to deal with this is to split out the expression into multiple AsciMath expressions. While doing this, you can also use multiple strings and join them together with the dot (`.`) operator; this tends to make the expression a lot easier to read for yourself as well.
```php
echo "Sum of sequence of cubes: " . 
"`sum_(i=1)^n i^3`" .
"`= ((n(n+1))/2)^2`" .
"`= (n(n+1))^2/4`" .
"`= (n^2 (n+1)^2)/4`" .
"`= (n^2(n^2 + 2n + 1))/4`" . 
"`= (n^4 + 2n^3 + n^2)/4`";
```
<img src="https://i.imgur.com/8MX1GA2.png" width="400px"/>
{{</hint>}}