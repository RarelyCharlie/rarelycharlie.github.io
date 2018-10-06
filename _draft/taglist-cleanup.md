---
title: Clean up a taglist
layout: howto
feedback: https://www.7cups.com/@RarelyCharlie
---
<style>
#list, #list2 {width: 100%; min-height: 4em; border: 1px solid #000; padding: 1ex; font-size: 10px; line-height: 12px;
	box-shadow: inset #ccc 0 0 1ex 2px; resize: none; font-family: inherit; user-select: text;}
.bad {background: #6df;}
p[disabled] {color: #aaa;}
#problem-tags {width: 32em;}
#problem-report {height: 20px;}
#copied {transform: opacity 2s;}
button {min-width: 6em; padding: 2px; background: #7fb;}
button[disabled] {background: #ddd;}
progress {width: 100%;}
</style>
To clean up a taglist, paste it here. If a problem is reported below, fix the problem to continue.

Taglist:

<div id="list" contenteditable="true" spellcheck="false" onkeyup="Cleanup.trigger(this)" onpaste="Cleanup.trigger(this)"></div>

<button id="copy" onclick="Cleanup.copy()" disabled>Copy</button> <span id="copied"></span>

Problem: <input type="text" id="problem-tags" onkeyup="Cleanup.tagskey()" disabled>
{:#problem .disabled}

<button id="problem-fix" onclick="Cleanup.fix()" disabled>OK</button>

<p id="problem-report"></p>



**Notes:**

 - Some web browsers do not detect the paste operation, so you might have to press the Clean up button.

 - Each tag must begin with an @-sign. A word with no @-sign is ambiguous. For example, if the list contains `@Donald Duck` it is not possible to tell whether this is intended to be single tag, `@DonaldDuck`, or two tags, `@Donald @Duck`.
 
 - Extra characters are removed. For example, `@It'sTuesday!` becomes `@ItsTuesday`.
 
 - The resulting taglist is in alphabetical order.
 
### Merge
To merge more tags into the list, type or paste the additional tags here, and press the Merge button:

<div id="list2" contenteditable="true" spellcheck="false" onkeyup="Cleanup.trigger(this)" onpaste="Cleanup.trigger(this)"></div>

<button id="merge" onclick="Cleanup.merge()" disabled>Merge</button>
