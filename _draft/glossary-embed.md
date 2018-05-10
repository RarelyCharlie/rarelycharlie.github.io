---
title: Embedding the 7 Cups Glossary
layout: default
feedback: https://www.7cups.com/@RarelyCharlie
class: index
---
# Embedding the 7 Cups Glossary

Here's how to embed the 7 Cups Glossary in a page at 7cups.com.

Make a page that's a copy of the [7 Cups Community Calendar](https://www.7cups.com/home/communityCalendar.php).

Change its title to: `7 Cups Glossary`

In the page, replace what's inside `DIV.container` with this:

~~~ html
<style id="rc-style">
#rc-header {position: fixed; top: 54px; width: 100%; background: #f4f4f4;}
#rc-h1 {width: 100%; height: 60px; margin: 40px 0 0 0; padding: 0 8px;}
#rc-form {height: 40px; width: 100%; margin: 0; padding: 0 8px;}
#rc-warning {display: inline-block; margin-left: 1ex; color: #a00;}
#rc-glossary {width: 100%; padding-top: 100px; border: none;}
</style>
<div id="rc-header">
  <h1 id="rc-h1">Glossary</h1>
  <form id="rc-form" action="javascript:void(0)">
    <p>Find: 
      <input id="rc-find" type="search" size="24" autofocus autocapitalize="none"
             onkeypress="return Glossary.keypress(event)">
      <span id="rc-warning"></span>
      </p>
    </form>
  </div>
<iframe id="rc-glossary" src="https://rarelycharlie.github.io/glossary-framed"></iframe>
<script id="rc-script" src="https://rarelycharlie.github.io/assets/glossary.js"></script>
~~~

**Notes:**

- The stylesheet can be moved to somewhere else, as long as it precedes the rest of the HTML.
- This HTML supplies the **Glossary** heading (unlike the Tockify calendar).
- The script must follow the rest of the HTML (unlike the Tockify calendar's script).
- The script can be copied inline or stored somewhere else, but this might make debugging harder.
