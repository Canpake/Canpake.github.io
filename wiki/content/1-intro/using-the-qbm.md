--- 
title: 1.2. Using the QBM
---

In our system, dynamic questions are created through directly writing PHP code in place of the usual text. To do so, after you've selected a round and level for your question, click on the "PHP" button in the editor: 

<img src="https://i.imgur.com/lyuBJnT.png" width="400px"/>

The following text editor should appear, with automatically generated PHP tags (`<?php` and `?>`) where PHP code should be written. Note that the closing `?>` tag is important, and should not be removed to avoid any potential problems with how the code is run. 

<img src="https://i.imgur.com/YE69Wan.png" width="400px"/>

{{<hint danger>}}
There currently appears to be a bug where the first time this window is loaded (or whenever you reset your browser cache), the editor might be stuck loading; simply re-opening the editor window will fix this.

Also, there's been an update to the editor - there are now 2 ways of previewing your question, each with a few weird thing: 

1. The blue 'live preview' button above the text editor (with an eye symbol)
   * This button only works **after** you've selected a round and level for your question - otherwise the preview will appear blank. 
2. The 'CHECK/RUN' button in the code editor pop-up
   * Note that there are 2 parts of the output - 'ERROR' and 'RESULT'. The 'ERROR' text is **not** a warning message - it is just header text for where the error output goes.

{{</hint>}}

PHP code typed in the editor is saved after pressing the ‘update’ button. Note that the code (or its output) won’t be visible in the editor itself, but the output of the code can still be checked using the ‘preview’ button.

PHP code must also be inserted into **each answer box, as well as the solution**; their sections will have a PHP editor of their own. For a more concrete idea of this, see the examples in [Section 4](/4-general-examples).

Note that the order of solutions in MCQs are **always randomised** - it is fine to set answer 'A' as the correct solution each time. 