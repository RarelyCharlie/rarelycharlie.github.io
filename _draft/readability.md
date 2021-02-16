---
title: Measure readability
layout: howto
---
This page measures the readability of a passage of English text.

It uses [Simo Ahava's](https://github.com/sahava?tab=repositories) readability score
method to generate an estimated US grade level.

Note that most people in the US read below their grade level, and over half of US adults read at 6th grade level or below.

<style>
textarea {width: 100%; min-width: 100%; max-width: 100%; min-height: 16em; border: 1px solid #000; margin: 0 0 1ex 0; padding: 1ex;}
button {display: inline-block; margin: 0 1em 0 0; padding: 4px 12px; background: #cfc;}
</style>

<textarea id="text"></textarea>
<button onclick="score()">Score</button>
<button onclick="clear()">Clear</button>
