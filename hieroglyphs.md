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
  src: url(/assets/NewGardinerSMP.ttf) format('truetype');
	}
input {margin: 0;}
#latin {font-size: 24px; width: 100%;}
#egypt {font-family: 'Noto Sans Egyptian Hieroglyphs';
	font-size: 72px; line-height: 120px;
	overflow-wrap: break-word;
	border: 1px solid #aaa; margin: 0;
	border-radius: 12px; padding: 0 12px;
	min-height: 120px; min-width: 1em;
	float: right; margin-bottom: 12px;
	transform: scaleX(-1);
	writing-mode: vertical-rl;}
#egypt+* {clear: both;}
del {color: #f88; text-decoration: none;}
.indent {margin-left: 2em;}
.warning {color: #a00;}
#english {min-height: 1em; width: 40em; border: 1px solid #aaa; padding: 4px;
	max-height: 6.5em; overflow-y: auto; margin: 0 0 1em 0;}
hr {margin: 2px 0;}
h3 {margin: 0;}
</style>

<p><label for="latin">Hieroglyphs, Gardiner codes and <em>Manuel de Codage</em> mnemonics:</label><br/>
<input type="text" id="latin" autofocus autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/></p>

<div id="egypt"></div>

### Description
<div id="english"></div>

### Direction
<p class="indent">
<label for="dirltr"><input type="radio" id="dirltr" name="dir" onclick="flip(false)" checked>Left to right</label>&nbsp;
<label for="dirrtl"><input type="radio" id="dirrtl" name="dir" onclick="flip(true)">Right to left</label><br/>
<label for="dirvert"><input type="checkbox" id="dirvert" name="dirvert" onclick="vert(this)">Vertical</label>
</p>

### Font
<p class="indent">
<label for="fontn"><input type="radio" id="fontn" name="font" checked onclick="font(true)">Noto Sans</label>&nbsp;
<label for="fontg"><input type="radio" id="fontg" name="font" onclick="font(false)">New Gardiner</label>
</p>

### Information
This page converts any mixture of Unicode hieroglyphs (like 𓄿), Gardiner codes (like A1) and <em>Manuel de Codage</em> mnemonics (like pA) to Unicode hieroglyphs.

All the available codes and hieroglyphs are listed here: [The 1071 hieroglyphs from Unicode 5.2](https://mjn.host.cs.st-andrews.ac.uk/egyptian/unicode/tablemain.html) The 330 mnemonics are the phonetic codes described here: [Manuel de Codage Appendix B](http://www.catchpenny.org/codage/#app2).

Around 4,000 additional hieroglyphs exist, but they are not available here because they are not in Unicode. Groups of vertically stacked hieroglyphs and other formatting are not currently possible here.

Type spaces between codes and mnemonics. Spaces between hieroglyphs are optional.

Type a slash, `/` , to start a new line of hieroglyphs. Type a hyphen, `-` , to insert a space between hieroglyphs. These formatting symbols may sometimes require spaces around them (this is a bug). No other formatting symbols are currently supported, but further formatting options are planned.

In the hieroglyphs, if you see the symbol <big><del>&#9674;</del></big>, it means you typed something that cannot be interpreted.

You can copy hieroglyphs from here and paste them in other places, but they will only look right on a computer that has an appropriate font installed in it, and they might only display left-to-right.

The hieroglyphic fonts on this page are [Noto Sans Egyptian Hieroglyphs](https://www.google.com/get/noto/#sans-egyp) and [New Gardiner SMP](https://mjn.host.cs.st-andrews.ac.uk/egyptian/fonts/newgardiner.html).

This page is partly based on the [Egyptology software](https://mjn.host.cs.st-andrews.ac.uk/egyptian/) by Mark-Jan Nederhof at the University of St. Andrews.

<script>
latin = document.getElementById('latin')
egypt = document.getElementById('egypt')
warning = document.getElementById('warning')
english = document.getElementById('english')
pending = null

addEventListener('keyup', () => {
	if (pending) clearTimeout(pending)
	pending = setTimeout(() => {
		english.innerHTML = ''
		var h = '', e = ''
		latin.value.split(/(?=[ \/-])/).forEach((p) => {
			p = p.replace(/\s/, '')
			var c
			while ((c = p.codePointAt(0)) >127) {
				p = p.substr(1)
				if (c < 77824) continue
				h += String.fromCodePoint(c)
				if (e) e += '<br/>'
				e += getdesc(codemap[c - 77824], true)
				}
			if (p == '/') h += '<br/>', p = p.substr(1), e += '<br/>— — —'
			else if (p == '-') h += '\u2002', p = p.substr(1), e += '<br/>·'
			if (p == '') return
			else {
				if (p in mnemmap) p = mnemmap[p]
				var i = codemap.indexOf(p)
				if (i >= 0) {
					h += String.fromCodePoint(77824 + i)
					if (e) e += '<br/>'
					e += getdesc(p, true)
					}
				else {
					h += '<del>\u25ca</del>'
					if (e) e += '<br/>'
					e += '<span class="warning">' + p + ': unknown</span>'
					}
				}
			}) // foreach p
		egypt.innerHTML = h
		english.innerHTML = e
		english.scrollTop = english.scrollHeight
		}, 600) // timeout
	}) // keypress
	
flip = function (rtl) {
	var s = egypt.style
	s.float = rtl? 'right' : 'left'
	s.transform = rtl? 'scaleX(-1)' : 'none'
	}
flip(false)
	
font = function (noto) {
	var s = egypt.style 
	s.fontFamily = noto? 'Noto Sans Egyptian Hieroglyphs' : 'NewGardiner'
	s.letterSpacing = noto? '0' : '6px'
	}
font(true)
	
getdesc = function (p, sentence) {
	var t = descmap[p]
	if (t.indexOf('[') >= 0) {
		var ff = t.split('['), t = ''
		ff.forEach(f => {
			if (f.indexOf(']') > 0) {
				var p = f.replace(/\].*/, '')
				var r = f.replace(/.+]/, '')
				t += getdesc(p, false) + ' (' + p + ') ' + r
				}
			else t += f
			})
		}
	if (sentence) t = p + ': ' + t.charAt(0).toUpperCase() + t.substr(1)
	return t
	}
</script>
