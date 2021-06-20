---
title: 1.3. Formatting Text
---

When PHP calls `echo` on any string, it will ultimately be rendered as HTML. Because of this, text can be formatted by inserting the appropriate HTML tags into the strings. 

You can try this yourself! As an example, enter the code below into the editor.  You'll see that the lines all apply formatting through the `<b>`, `<i>` and `<u>` markup tags. 

```php
<?php
echo "This text is normal. ";
echo "<b>This text is bolded! </b>";
echo "<i>This text is italicised! </i>";
echo "<b><u>This text is bolded <i>and</i> underlined! </u></b>";
?>
```

<img src="https://i.imgur.com/7hpth7M.png" width="700px"/>

<br>

Furthermore, to add line breaks in your code, the newline character `\n` **will not work**. For a line break, you'll need to use the break tag `<br/>` instead. For example: 

```php
<?php
echo "Line one";
echo "<br/>";
echo "Line two<br/>Line three";
?>
```

<img src="https://i.imgur.com/0SdqZlg.png" width="500px">

--- 

As an aside, note that PHP directly puts the `echo`'d string into the HTML document itself, and the document is rendered after *all* the PHP code is run. 

This means you could technically split out tags into separate strings, like this:

```php
<?php
echo "Whatever you echo will be put together and <b";
echo "> directly </";
echo "b> be rendered as HTML."
?>
```
And get this as output - with the resulting HTML that's actually being rendered as shown on the right: 

<img src="https://i.imgur.com/07324rM.png"/>

In most cases, you'd never want to do this on purpose - but this is something to look out for if your output appears to be weirdly formatted for no reason.