---
title: Clean up a taglist
layout: howto
feedback: https://www.7cups.com/@RarelyCharlie
---
<style>
#list, #list2 {width: 100%; min-height: 4em; border: 1px solid #000; padding: 1ex; font-size: inherit; line-height: 1.15em;
	box-shadow: inset #ccc 0 0 1ex 2px; resize: none; font-family: inherit; user-select: text;}
.bad {background: #6df;}
p[disabled] {color: #aaa;}
#problem-tags {width: 24em; margin-right: 1ex;}
#problem-report {height: 20px;}
#copied {transition: opacity 2s;}
button {min-width: 6em; padding: 2px; background: #7fb; margin: 1em 0 0 0;}
button[disabled] {background: #ddd;}
progress {width: 100%;}
</style>
<script>
Cleanup = {
	timer: 0,
	problems: [
		'Finished.',
		'Two tags or one? Type an @-sign or delete the space.'
		],
		
	clean: function () {
		var list = document.getElementById('list')
		list.removeAttribute('contenteditable')
		
		var t = list.textContent
		t = t.replace(/<[^>]+>/g, '')
		t = t.replace(/[^A-Za-z0-9_ @]/g, '')
		t = t.replace(/@+\s+/g, '@')
		t = t.replace(/([^ ])@/g, '$1 @')
		t = t.replace(/\s+/g, ' ')
		
		var m = /@[^@ ]+\s[^@ ]+/.exec(t)
		if (m) {
			Cleanup.problem(m[0], 1)
			t = t.replace(m[0], '<span class="bad">' + m[0] + '</span>')
			list.innerHTML = t
			}
		else {
			t = t.replace(/[ @]+/g, ' ')
			t = t.split(' ')
			t.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))

			var dup = 0
			for (let i = 1; i < t.length; ++i)
				if (t[i].toLowerCase() == t[i - 1].toLowerCase()) t[i] = '', ++dup
		
			t = t.filter(n => n.trim() != '')
			t = t.map(n => '@' + n)
			list.textContent = t.join(' ')
			Cleanup.noproblem(dup, t.length)
			}
		document.getElementById('cleanup').disabled = true
		},
		
	copy: function () {
		var t = document.getElementById('list')
		if (document.body.createTextRange) {
			let r = document.body.createTextRange()
			r.moveToElementText(t)
			r.select()
			}
		else if (window.getSelection) {
			let s = window.getSelection()
			let r = document.createRange()
			r.selectNodeContents(t)
			s.removeAllRanges()
			s.addRange(r)
			}

		var ok = document.execCommand('copy')
		if (ok) setTimeout(function () {
			if (document.selection) document.selection.empty()
    		else if (window.getSelection) window.getSelection().removeAllRanges()
			}, 500)
		var c = document.getElementById('copied')
		c.textContent = ok? 'Copied' : 'Oops! Copying failed. Try copying manually.'
		c.style.transition = 'none'
		c.style.opacity = 1
		setTimeout(function () {
			c.style.transition = 'opacity 2s'
			c.style.opacity = 0
			}, ok? 1000 : 2500)
		if (!ok) document.getElementById('copy').disabled = true
		},
	
		
	fix: function () {
		var list = document.getElementById('list'),
			t = list.textContent,
			p = document.getElementById('problem-tags')
		list.textContent = t.replace(this.badtags, p.value)
		this.clean()
		},

	merge: function () {
		var list = document.getElementById('list'),
			list2 = document.getElementById('list2')
		list.textContent += ' ' + list2.textContent
		this.trigger({id: 'list'})
		list2.textContent = ''
		document.getElementById('merge').disabled = true
		},

	noproblem: function (dup, n) {
		document.getElementById('problem').setAttribute('disabled', true)
		document.getElementById('copy').focus()

		var p = document.getElementById('problem-tags')
		p.value = ''
		p.disabled = true

		document.getElementById('problem-report')
			.textContent = this.problems[0] + ' '
			+ (dup == 0? 'No duplicates.' : (dup == 1? '1 duplicate removed.' : dup + ' duplicates removed.'))
			+ ' '
			+ (n == 0? 'No tags remain.' : (n == 1? '1 tag' : n + ' tags'))
			+ ' in the list.'
		document.getElementById('problem-fix').disabled = true
		document.getElementById('copy').disabled = false
		},		
	
	problem: function (tags, type) {
		this.badtags = tags
		document.getElementById('problem').removeAttribute('disabled')
		var p = document.getElementById('problem-tags')
		p.value = tags
		p.removeAttribute('disabled')
		p.focus()
		document.getElementById('problem-report')
			.textContent = this.problems[type]
		document.getElementById('problem-fix').removeAttribute('disabled')
		},
		
	tagskey: function () {
		if (event.keyCode == 13) document.getElementById('problem-fix').click()
		},
	
	trigger: function (list) {
		if (list.id == 'list') {
			if (this.timer) this.timer = clearTimeout(this.timer)
			this.timer = setTimeout(this.clean, 800)
			}
		else { // merge...
			document.getElementById('mergelists').disabled = 
				list.textContent.replace(/[@ ]/g, '') == ''
			}
		}
	}
</script>
To clean up a taglist, paste it here. If a problem is reported below, fix the problem to continue.

Taglist:

<div id="list" contenteditable="true" spellcheck="false" onkeyup="Cleanup.trigger(this)" onpaste="Cleanup.trigger(this)"></div>

<button id="cleanup" onclick="Cleanup.trigger({id: 'list'})">Clean up</button> <button id="copy" onclick="Cleanup.copy()" disabled>Copy</button> <span id="copied"></span>

Problem: <input type="text" id="problem-tags" onkeyup="Cleanup.tagskey()" disabled><button id="problem-fix" onclick="Cleanup.fix()" disabled>OK</button>
{:#problem .disabled}

<p id="problem-report"></p>

**Notes:**

 - Most web browsers detect the paste operation, so you do not have to press the Clean up button.

 - Each tag must begin with an @-sign. A word with no @-sign is ambiguous. For example, if the list contains `@Donald Duck` it is not possible for the software to tell whether this is intended to be a single tag, `@DonaldDuck`, or two tags, `@Donald @Duck`.
 
 - Extra characters are removed. For example, `@It'sTuesday!` becomes `@ItsTuesday`.
 
 - There is no guarantee that the tags represent real users at 7 Cups. Verification might be available in a future version of this tool.
 
 - The resulting taglist is in alphabetical order.
 
### Merge
To merge more tags into the list, type or paste the additional tags here, and press the Merge button:

<div id="list2" contenteditable="true" spellcheck="false" onkeyup="Cleanup.trigger(this)" onpaste="Cleanup.trigger(this)"></div>

<button id="mergelists" onclick="Cleanup.merge()" disabled>Merge</button>
