---
title: Egyptian hieroglyphs
layout: default
feedback: https://www.7cups.com/@RarelyCharlie
---
This page displays Egyptian hieroglyphs.

<style>
@import url(//fonts.googleapis.com/earlyaccess/notosansegyptianhieroglyphs.css);
@font-face {
  font-family: 'NewGardiner';
  font-style: normal;
  font-weight: 400;
  src: url(NewGardinerSMP.ttf) format('truetype');
	}

body {width: 800px; margin: 0 auto;}
#latin {font-size: 24px; width: 800px;}
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

<h3>Description</h3>
<div id="english"></div>

<h3>Direction</h3>
<p class="indent">
<label for="dirltr"><input type="radio" id="dirltr" name="dir" onclick="flip(false)">Left to right</label>&nbsp;
<label for="dirrtl"><input type="radio" id="dirrtl" name="dir" checked onclick="flip(true)">Right to left</label>
</p>

<h3>Font</h3>
<p class="indent">
<label for="fontn"><input type="radio" id="fontn" name="font" checked onclick="font(true)">Noto Sans</label>&nbsp;
<label for="fontg"><input type="radio" id="fontg" name="font" onclick="font(false)">New Gardiner</label>
</p>
