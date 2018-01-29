---
title: Egyptian hieroglyphs
layout: default
feedback: https://www.7cups.com/@RarelyCharlie
---
T E S T: This page displays Egyptian hieroglyphs.
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
span {position: relative; display: inline-block; margin: 0; padding: 0;}
span.top, span.bot {text-align: center;}
del {color: #f88; text-decoration: none;}
.indent {margin-left: 2em;}
.warning {color: #a00;}
#english {min-height: 1em; width: 40em; border: 1px solid #aaa; padding: 4px;
	max-height: 6.5em; overflow-y: auto; margin: 0 0 1em 0;}
hr {margin: 2px 0;}
h3 {margin: 0;}
#demo {padding: 6px 12px; border-radius: 6px; background: #afa;}
canvas {width: 120px; height: 200px; position: absolute; top: -220px;
	font-size: 72px; font-family: 'Noto Sans Egyptian Hieroglyphs';}
</style>

<p><label for="latin">Hieroglyphs, Gardiner codes and <em>Manuel de Codage</em> mnemonics:</label><br/>
<input type="text" id="latin" autofocus autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/></p>

<div id="egypt"></div>

### Hieroglyphs and their descriptions
<div id="english"></div>

### Direction
<p class="indent">
<label for="dirltr"><input type="radio" id="dirltr" name="dir" onclick="flip(false)" checked> Left to right</label>&nbsp;
<label for="dirrtl"><input type="radio" id="dirrtl" name="dir" onclick="flip(true)"> Right to left</label><br/>
<label for="dirvert"><input type="checkbox" id="dirvert" name="dirvert" onclick="vert(this)"> Vertical</label>
</p>

### Font
<p class="indent">
<label for="fontn"><input type="radio" id="fontn" name="font" checked onclick="font(true)"> Noto Sans</label>&nbsp;
<label for="fontg"><input type="radio" id="fontg" name="font" onclick="font(false)"> New Gardiner</label>
</p>

### Demonstration
For a demonstration, press the Demo button. It displays this coded text:

`M17 G43 [D21/D36] N5 G17 [Q3 X1/N1]`

The conventional modern pronounciation is something like, "*yew rgh em pet *" (but no one really knows what ancient Egyptian sounded like). The English translation is, "*The Sun is in the sky.*"

<button id="demo" onclick="demo()">Demo</button>

### Information
This page converts any mixture of Unicode hieroglyphs (like 𓄿), Gardiner codes (like `A1`) and <em>Manuel de Codage</em> mnemonics (like `pA`) to Unicode hieroglyphs. It can create an approximate representation of some some simple hieroglyphic texts.

All the available codes and hieroglyphs are listed here: [The 1071 hieroglyphs from Unicode 5.2](https://mjn.host.cs.st-andrews.ac.uk/egyptian/unicode/tablemain.html) The 330 mnemonics are the phonetic codes described here: [Manuel de Codage Appendix B](http://www.catchpenny.org/codage/#app2).

Around 4,000 additional hieroglyphs exist, but they are not available here because they are not in Unicode.

### How to use this page
Type any mixture of hieroglyphs, codes and mnemonics. Codes and mnemonics require spaces or punctuation between them, but hieroglyphs don't.

Type a slash, `/` , to start a new line of hieroglyphs.

Type a hyphen, `-` , to insert a space between hieroglyphs.

Type square brackets, `[]`, around vertically-stacked groups, with a slash, `/`, separating the top and bottom. Vertically stacked groups can only have two levels.

In the hieroglyphs, if you see the symbol <big><del>&#9674;</del></big>, it means you typed something that cannot be interpreted.

You can copy hieroglyphs from here and paste them in other places, but they will only look right on a computer that has an appropriate font installed in it, and they might only display correctly left-to-right.

### Known problems
There are currently many known problems with layout. Some individual glyphs are badly positioned, and this depends on the font. Vertically-stacked groups don't work at all when the overall layout is vertical. Some of these problems might be fixed in future versions.

### Sources
The hieroglyphic fonts on this page are [Noto Sans Egyptian Hieroglyphs](https://www.google.com/get/noto/#sans-egyp) and [New Gardiner SMP](https://mjn.host.cs.st-andrews.ac.uk/egyptian/fonts/newgardiner.html).

This page is partly based on the [Egyptology software](https://mjn.host.cs.st-andrews.ac.uk/egyptian/) pages by Mark-Jan Nederhof at the University of St. Andrews.

<script>
latin = document.getElementById('latin')
warning = document.getElementById('warning')
english = document.getElementById('english')
pending = null
egypt = '' // eventual output
topoffset = 0 // font-dependent
currentfont = 'Noto Sans Egyptian Hieroglyphs'

convert = function () { // this is the converter!
	input = latin.value.replace(/([-\/\[\]\(\)])/g, '$1 ')
	egypt = '', e = ''
	var cc = input.split(/(?=[ -\/\[\]\(\)])/)
	level = 0 // 0 = normal, 1 = bottom, 2 = middle, 3 = top
	for (let c of cc) {
		c = c.trim()
		switch (c) {
			case '': continue
			case '[': // switch to top
				addspan(level = 3)
				break
			case ']': // switch to normal
				addspan(level = 0)
				break
			case '/':
				if (level == 3) addspan(level = 1) // switch to bottom
				else egypt += '<br/>'
				break
			case '-':
				egypt += '&nbsp;'
				break
			default:
				if (c in mnemmap) c = mnemmap[c]
				var i = codemap.indexOf(c)
				if (i >= 0) {
					let g = String.fromCodePoint(77824 + i)
					if (level == 0) egypt += '<span class="midline">' + g + '</span>'
					else egypt += '<span class="baseline">' + g + '</span>'
					if (e) e += '<br/>'
					e += (level > 0? '| &nbsp;' : '') + getdesc(c, true)
					}
				else {
					egypt += '<del>\u25ca</del>'
					if (e) e += '<br/>'
					e += (level > 0? '| &nbsp;' : '') + '<span class="warning">' + c + ' — unknown</span>'
					}				
			}
		}
	document.getElementById('egypt').innerHTML = egypt
	stack()
	english.innerHTML = e
	english.scrollTop = english.scrollHeight
	}
	
addspan = function (level) {
	switch (level) {
		case 3:
			egypt += '<span class="stack"><span class="top">'
			break
		case 2:
			egypt += '</span><span class="mid">'
			break
		case 1:
			egypt += '</span><span class="bot">'
			break
		case 0:
			egypt += '</span></span>'
			break			
		}
	}
	
stack = function () {
	var ss = document.getElementsByClassName('stack')
	for (let s of ss) {
		let s0 = s.firstElementChild, s1 = s.lastElementChild
		let w = Math.max(s0.offsetWidth, s1.offsetWidth)
		s0.style.position = 'absolute'
		s0.style.top = '-' + topoffset + 'px'
		s.style.width = s0.style.width = s1.style.width = w + 'px'
		}
	ss = document.getElementsByClassName('midline')
	for (let s of ss) {
		let m = metrics(s.textContent)
		if (m.height < 68) s.style.top = '' + ((m.height + m.base - 72) / 2) + 'px'
		}
	ss = document.getElementsByClassName('baseline')
	for (let s of ss) {
		let m = metrics(s.textContent)
		if (Math.abs(m.base) > 2) s.style.top = '' + m.base + 'px'
		}
	}

addEventListener('keyup', () => {
	if (pending) clearTimeout(pending)
	pending = setTimeout(convert, 600)
	})

flip = function (rtl) {
	var s = document.getElementById('egypt').style
	s.float = rtl? 'right' : 'left'
	s.transform = rtl? 'scaleX(-1)' : 'none'
	}
flip(false)

vert = function (box) {
	document.getElementById('egypt').style.writingMode = box.checked? 'vertical-rl' : 'initial'
	}
vert({checked: false})
	
font = function (noto) {
	currentfont = noto? 'Noto Sans Egyptian Hieroglyphs' : 'NewGardiner'
	var s = document.getElementById('egypt').style
	s.fontFamily = currentfont
	s.letterSpacing = noto? '0' : '6px'
	topoffset = noto? 48 : 34
	stack()
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

demo = function () {
	flip(true), document.getElementById('dirrtl').checked = true
	vert(false), document.getElementById('dirvert').checked = false
	font(false), document.getElementById('fontg').checked = true
	latin.value = 'M17 G43 [D21/D36] N5 G17 [Q3 X1/N1]'
	convert()
	}

metrics = function (char) {
	var width = 120, height = 200, canvas = document.getElementById('canvas')
	canvas.width = width, canvas.height = height
	var ctx = canvas.getContext('2d')
	ctx.save()
	ctx.font = '72px ' + currentfont
	ctx.clearRect(0, 0, width, height)
	ctx.fillText(char, 20, 150)
	ctx.restore()
	var data = ctx.getImageData(0, 0, width, height).data
	var y0 = false, y1 = false
	for (let y = 0; y < height; ++y)
		for (let x = 0; (x < width) && (!y1); ++x) if (data[dataindex(x,y,width,height)] != 0) y1 = y
	for (let y = height - 1; y >= 0; --y)
		for(let x = width - 1; (x >= 0) && (!y0); --x) if (data[dataindex(x, y, width, height)] != 0) y0 = y
	return ({base: 150 - y0, height: y0 - y1})
	}

dataindex = (x, y, width, height) => width * 4 * y + 4 * x + 3  
</script>
<canvas id="canvas"></canvas>
