---
title: 5. More Coding Examples

jsxg: true
---

In this section, I'll go over some more complex examples of questions. These ones will make use of JavaScript (JS) and the [JSXGraph](https://jsxgraph.org/) library in order to form dynamic diagrams/graphs for the question and/or solution. 

{{<hint info>}}
Just a note for **prerequisites:** 

The following examples will additionally require understanding of the JavaScript language. 

There are quite a few guides out there for learning about JS, but if you want to dive straight into making questions, I recommend trying to go through this guide first and searching up things along the way. While PHP and JS are by no means similar, programming concepts (like conditionals and loops) translate fairly well; in general, it'll be easier to pick up the language once you've seen a few examples of how it's used.

I'll try to explain the lines that appear in the code line-by-line, but if there are things that really don't seem clear, please feel free to [send me a message](/other/contact).
{{</hint>}}

**Contents** 
{{<toc>}}

The bit below provides a high-level kind of overview on how you can include JS code and libraries in PHP, with a short example JSXGraph demo. It'll give you a better understanding of how the code actually does what it does, and might help you with debugging. 

---

## Including JS

As noted in the intro about [how `echo` works with tags](/1-intro/formatting-text/#more-on-echo-ing-tags), PHP is overall... kinda jank. You can use `echo` on whatever you want, and it'll come out on the other end treated as HTML by a browser. 

Separately, another thing to note is that in order to include a JS script in a webpage, you place the script inside `<script>` tags in the page's HTML. 

For example:

```html
<script>
alert("Hello!");
</script>
```

If you put the above code into the HTML of a website, the page would load the JS script inside those tags, and then display a browser alert. 

I've included that exact script on [this page](example.html) to demonstrate how it would work. 

---

So now, combining the two things we've learnt together: What if we do the following in PHP? 

```php
$script = "<script> alert('Hello!'); </script>"
echo $script;
```

Yep - the same thing happens. The PHP runs on the server-side, and puts this into the HTML. Your browser then receives this HTML, finds the `<script>` tags, and runs whatever JS code is inside them. 

{{<hint info>}}
While this seems like a bit of a security issue, there are a few safety features in how your browser runs this code - enough so that it *generally* won't be able to do much harm. 

[This thread on StackExchange](https://security.stackexchange.com/questions/198780/why-is-javascript-safe-to-run-in-the-browser) does a much more thorough job of explaining how it works, if you're interested in reading more about why this is safe.
{{</hint>}}

---

## JS Libraries

HTML `<script>` tags aren't limited to including code within the tags. You can specify an argument `src` inside the tag to pull code off the internet, and run that instead. 

This is exactly what we do to include the JS code (as well as the CSS) of the JSXGraph library - the specific HTML that's used is:

```html
<script type="text/javascript" charset="UTF-8" src="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraph.css" />
```

If you try going to the site in the script's `src` attribute, you'll see the actual library code that's being referenced: \
https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js

{{<hint info>}}
As you can see, the code on that site is basically unreadable. That's because it's been "minified" - all the comments and extra spacing have been removed, while variables have been shortened as much as possible. This isn't for security, but rather so that sites using it load quicker. 

Again, [here's a site](https://www.imperva.com/learn/performance/minification/) that better explains JS minification, if you're interested.
{{</hint>}}

{{<hint warning>}}
Another thing to note: A script can contain either an src reference or your own code, **but not both**. This means that the following will **not** work as intended:

```html
<script type="text/javascript" charset="UTF-8" src="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js">
alert("Hello!");
</script>
```
{{</hint>}}

---

## A Simple JSXGraph Example

Finally, let's go through a simple example of including a JSXGraph diagram on a question. I'll use the example of including a drawing panel at this link: \
https://jsxgraph.org/wiki/index.php?title=Howto_include_JSXGraph_into_web_pages#Include_a_drawing_panel_into_the_HTML

And then I'll use the example of creating a circle on the drawing panel: \
https://jsxgraph.org/wiki/index.php/Circle

Let's first begin by including the scripts required to load the JSXGraph library (this will be needed for every question that uses the library): 

```html
<script type="text/javascript" charset="UTF-8" src="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraph.css" />
```

Next, we'll make an actual `<div>` element where the drawing box will be contained, and we'll give it an `id` attribute `"box"`: 

```html
<div id="box" class="jxgbox" style="width:500px; height:500px;"></div>
```

Finally, we'll include a similar script to the one shown in the circle example - remember to surround it with script tags! 

```html
<script>
// initialise board
var b = JXG.JSXGraph.initBoard('box', {boundingbox: [-5, 5, 5, -5]});

// create two points
var p1 = b.create('point', [0,0], {name: 'A', size: 4, face: 'o'});
var p2 = b.create('point', [2,-1], {name: 'B', size: 4, face: 'o'});

// create a circle passing through the two points above
// note that instead of ['A', 'B'], you could instead use the variable names [p1, p2]
var circle = b.create('circle', [p1, p2], {strokeColor:'#00ff00',strokeWidth:2});
</script>
```

The first line sets `b` (for board) to a plane with top-left coordinate (-5, 5) and bottom-right coordinate (5, -5). The argument `box` means that it'll look for a `<div>` element with the `id` attribute `box` - in other words, the element we made earlier.

The following lines then call the `b.create()` function to draw things on the board: 
- The first argument is the type (e.g. `'point'` or `'circle'`)
- The second argument contains parameters specific to the shape, e.g. coordinates of a point, or the points for a circle to pass through
- The third argument contains general parameters, such as labels or colours - these are all optional and will have default values if not provided.

{{<hint info>}}
A few things in the example circle script on the website are... outdated. A few things to note when using the library: 

- When doing geometry, for best results, make a **square** `<div>` (where width and height are equal), and use a bounding box with equal x/y-ranges. 
- `createElement` is no different from `create` - in fact, you'll get a warning if you use the former.
- For elements like circles that require other points/shapes to be constructed, you can either use the variable (`p1`, `p2`), or name given to the shape ("A", "B"). I recommend using the variable rather than the name, mainly because it's much clearer.
{{</hint>}}

If we call all of that, this is what we end up with - similar to the example!

<div id="box" class="jxgbox" style="width:500px; height:500px;"></div>

<script>
// initialise board
var box = JXG.JSXGraph.initBoard('box', {boundingbox: [-5, 5, 5, -5]});

// create two points
var p1 = box.create('point', [0,0], {name: 'A', size: 4, face: 'o'});
var p2 = box.create('point', [2,-1], {name: 'B', size: 4, face: 'o'});

// create a circle passing through the two points above
// note that instead of ['A', 'B'], you could instead use the variable names [p1, p2]
var circle = box.create('circle', [p1, p2], {strokeColor:'#00ff00',strokeWidth:2});
</script>

---

## Using JSXGraph Through PHP

Okay, but how do we add all of this in PHP? There's a bunch of quotation marks in the code that might accidentally end the string early. 

To include all this HTML and JavaScript code in a single PHP string, one thing we can use is something called a [Heredoc](https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc). 

It's basically a string that, instead of uses quotation marks, uses `<<<something` to signify the start, and `something;` to signify the end (substitute whatever you want for that `something`). This allows us to put all of the code in quite easily and cleanly - in the case above, we would do this: 

```php
$example_script = <<<DIAGRAM
<script type="text/javascript" charset="UTF-8" src="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraph.css" />

<div id="box" class="jxgbox" style="width:500px; height:500px;"></div>

<script>
// initialise board
var box = JXG.JSXGraph.initBoard('box', {boundingbox: [-5, 5, 5, -5]});

// create two points
var p1 = box.create('point', [0,0], {name: 'A', size: 4, face: 'o'});
var p2 = box.create('point', [2,-1], {name: 'B', size: 4, face: 'o'});

// create a circle passing through the two points above
// note that instead of ['A', 'B'], you could instead use the variable names [p1, p2]
var circle = box.create('circle', [p1, p2], {strokeColor:'#00ff00',strokeWidth:2});
</script>
DIAGRAM;

echo $example_script;
```

And there you go - your first JSXGraph through PHP!
