---
title: Egyptian hieroglyphs
layout: default
feedback: https://www.7cups.com/@RarelyCharlie
---
This page displays Egyptian hieroglyphs.
<script src="/assets/hieromap.js"></script>
<style>
@import url(//fonts.googleapis.com/earlyaccess/notosansegyptianhieroglyphs.css);
@font-face {
  font-family: 'NewGardiner';
  font-style: normal;
  font-weight: 400;
  src: url(NewGardinerSMP.ttf) format('truetype');
	}
input {margin: 0;}
#latin {font-size: 24px; width: 100%;}
#egypt {font-family: 'Noto Sans Egyptian Hieroglyphs';
	font-size: 72px;
	overflow-wrap: break-word;
	border: 1px solid #aaa; margin: 0 0 16px 0;
	border-radius: 12px; padding: 0 6px;
	min-height: 1.65em; min-width: 1em; max-width: 800px;
	float: right; text-align: center;
	transform: scaleX(-1);}
#egypt+* {clear: both;}
del {color: #f88; text-decoration: none;}
.indent {margin-left: 2em;}
.warning {color: #a00;}
#english {min-height: 1em; width: 40em; border: 1px solid #aaa; padding: 4px;
	max-height: 6.5em; overflow-y: auto;}
hr {margin: 2px 0;}
</style>

<p>Gardiner codes and <em>Manuel de Codage</em> mnemonics:<br/>
<input type="text" id="latin" autofocus autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/></p>
<p>Hieroglyphs:<br/>
<div id="egypt"></div></p>

### Description
<div id="english"></div>

### Direction
<p class="indent">
<label for="dirltr"><input type="radio" id="dirltr" name="dir" onclick="flip(false)">Left to right</label>&nbsp;
<label for="dirrtl"><input type="radio" id="dirrtl" name="dir" checked onclick="flip(true)">Right to left</label>
</p>

### Font
<p class="indent">
<label for="fontn"><input type="radio" id="fontn" name="font" checked onclick="font(true)">Noto Sans</label>&nbsp;
<label for="fontg"><input type="radio" id="fontg" name="font" onclick="font(false)">New Gardiner</label>
</p>

### Information
This page converts Gardiner codes and <em>Manuel de Codage</em> mnemonics to Unicode hieroglyphs.

All the available codes and hieroglyphs are listed here: [The 1071 hieroglyphs from Unicode 5.2](https://mjn.host.cs.st-andrews.ac.uk/egyptian/unicode/tablemain.html) The 330 mnemonics are the phonetic codes described here: [Phonetic codes](http://www.catchpenny.org/codage/#phonetic).

Around 4,000 additional hieroglyphs exist, but they are not available here because they are not in Unicode. Groups of vertically stacked hieroglyphs are not currently possible here.

Type spaces or hyphens between the codes and mnemonics. Type an exclamation mark, !, to start a new line of hieroglyphs. Type a full stop (period), . , to insert a space between hieroglyphs.

If you see the symbol <del>&#9674;</del>, it means you typed something that cannot be interpreted.

You can copy hieroglyphs from here and paste them in other places, but they will only look right on a computer that has an appropriate font installed in it, and they might only display left-to-right.

The hieroglyphic fonts on this page are [Noto Sans Egyptian Hieroglyphs](https://www.google.com/get/noto/#sans-egyp) and [New Gardiner SMP](https://mjn.host.cs.st-andrews.ac.uk/egyptian/fonts/newgardiner.html).

This page is partly based on the [Egyptology software](https://mjn.host.cs.st-andrews.ac.uk/egyptian/) by Mark-Jan Nederhof at the University of St. Andrews.
