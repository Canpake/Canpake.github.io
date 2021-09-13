--- 
title: 1.2. Using the QBM
---

In our system, dynamic questions are created through directly writing PHP code in place of the usual text. To do so, after you've selected a round and level for your question, click on the "PHP" button in the editor: 

<img src="https://i.imgur.com/lyuBJnT.png" width="400px"/>

The following text editor should appear, with automatically generated PHP tags (`<?php` and `?>`) where PHP code should be written. Note that the closing `?>` tag is important, and should not be removed to avoid any potential problems with how the code is run. 

<img src="https://i.imgur.com/YE69Wan.png" width="400px"/>

{{<hint danger>}}
There currently appears to be a bug where the first time this window is loaded (or whenever you reset your browser cache), the editor might be stuck loading; simply re-opening the editor window will fix this.

Also, the 'preview' button only works **after** you've selected a round and level for your question! If you attempt to write something in the solution box without having selected a round or level, the question can't be loaded, and the preview will appear blank!
{{</hint>}}

PHP code typed in the editor is saved after pressing the ‘update’ button. Note that the code (or its output) won’t be visible in the editor itself, but the output of the code can still be checked using the ‘preview’ button.

PHP code must also be inserted into **each answer box, as well as the solution**; their sections will have a PHP editor of their own. 

Note that the order of solutions in MCQs are **always randomised** - it is fine to set answer 'A' as the correct solution each time. 