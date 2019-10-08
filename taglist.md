---
prefix: Unofficial 7 Cups support
title: Taglist service
layout: default
feedback: https://www.7cups.com/@RarelyCharlie
---
<style>
#content>* {display: none;}
#init {display: initial;}
#running {visibility: hidden;}

span.spinner {display: inline-block; width: 24px; height:24px;
	background: no-repeat center/100% url(/assets/ajax-loader.gif);
	position: relative; top: 6px; left: 6px;}
.warning {color: #a00; background: #fee; padding: 2px 4px; margin-left: -4px; opacity: 0;}
input[type=text] {display: block; width: 24em; padding: 2px 4px; margin: 0;
	font-size: inherit;}
button {display: block; min-width: 8em; padding: 2px 4px; margin: 0 0 1em 0;}
#open-copy {display: inline-block; margin-right: 2em;}
blockquote {font-size: 80%; border: 1px solid #444; background: #f4f4f4; padding: 1ex;
	margin: 0;}
	
#open-container {position: relative; padding: 0 0 1em 0; min-height: 40px;}
#open-list {width: 100%; min-height: 4em; border: 1px solid #000; padding: 1ex; font-size: 12px; line-height: 14px;
	box-shadow: inset #ccc 0 0 1ex 2px; resize: none; position: absolute; top: 0; left: 0;}
#open-list.empty {color: #aaa; text-align: center;}
#open-spin {position: absolute; left: calc(50% - 12px); top: 1em;}

#open-searchbar {text-align: right;}
#open-searchbar img {width: 16px; height: 16px; margin: 0 0 0 8px; position: relative; top: 4px; left: -1em;}
#open-search {display: inline-block; width: 8em; padding: 2px 1em 2px 1em; font-family: inherit; font-size: inherit;}
#open-atsign {position: relative; left: 17px;}
#open-nosearch {font-weight: bold; line-height: 16px; display: inline-block; color: #777;
	position: relative; left: -1em; cursor: pointer;}
span.found {background: #5df;}

#content p {margin: 1em 0;}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
const controldomain = 'https://www.7cups.com'
const controldir = 'forum'
const serviceurl = 'https://rarelycharlie.herokuapp.com/taglist/'

Taglist = {
	key: '',
	problems: [
		'No problems found.',
		'Two tags or one? Type an @-sign or delete the space.',
		'Unexpected symbols'
		],
	service: null,

	api: async function (action, data) {
		console.log('api: ' + action)
		if (!action) return
		if (!data) data = {}
		data.action = action
		var response
		try {
			response = await fetch(serviceurl, {
				method: 'POST',
				headers: {'Content-Type': 'application/json; charset=utf-8'}, 
				body: JSON.stringify(data),
				cache: 'no-cache'
				})
			}
		catch (e) {
			console.log('+++ ERROR')
			return [0, 'No connection']
			}
		if (response) {
			var body = await response.text()
			console.log('  +api: ' + response.status + ' ' + response.statusText)
			return [response.status, body]
			}
		else return [404, 'Not found']		
		},

	clean: function () { // clean the list...
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
			this.problem(m[0], 1)
			t = t.replace(m[0], '<span class="bad">' + m[0] + '</span>')
			list.innerHTML = t
			return false
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
			if (t.length) this.noproblem(dup, t.length)
			return true
			}
		},

	control: async function () { // set the control URL...
		var v = $('#setup-url').val().trim()
		var [status, text] = await this.api('control', {key: this.key, url: v})
		if (status == 200) {
			this.section('setup', false)
			this.open()
			}
		else {
			// handle failure e.g. malformed URL!
			}
		},

	copy: function () {
		var t = $('#open-list')[0]
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
		$('#open-copied').text(ok? 'Copied' : 'Oops! Copying failed. Try copying manually.')
			.fadeIn(0)
		if (!ok) {
			$('#open-copy').prop('disabled', true)
			$('#open-copied').addClass('warning').css('opacity', 1)
			}
		setTimeout(function () {$('#open-copied').fadeOut(800)}, 1500)
		},
	
	init: async function () {
		this.section('init', true)
		this.key = location.search.substring(1)
		
		$('input[type=text]').on('keyup', function (event) {
			Taglist.keyup(event)
			})

		this.ping()
		await this.sleep(1)
		if (this.service === null) $('#start').show()
		},

	keyup: function (event) {
		var id = event.target.id, v = event.target.value.trim()
		if ($(event.target).is('[readonly]')) return
		if (id == 'register-name') {
			let b = $('#register-button') 
			b.prop('disabled', v.length < 4)
			if (event.keyCode == 13 && v.length >= 4) b.click() 
			}
		else if (id == 'setup-url') {
			let b = $('#setup-button') 
			b.prop('disabled', v = '')
			if (event.keyCode == 13 && v) b.click() 
			}
		else if (id == 'open-search') {
			let list = $('#open-list'), t = list.text() //.replace(/<[^>+]>/g, '')
			v = v.replace(/\s.*/, '')
			if (v) t = t.replace(new RegExp('@(' + v + ')', 'ig'), '<span class="found">@$1</span>')
			list.html(t)
			}
		},

	noproblem: function (dup, n) {
		document.getElementById('problem').setAttribute('disabled', true)
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
		},		
	
	nosearch: function () {
		$('#open-search').val('').focus()
		this.keyup({target: {id: 'open-search', value: ''}})
		},

	open: async function () {
		var [status, data] = await this.api('open', {key: this.key, mode: 'peek'})
		console.log('open: ' + status)
		$('#open-wait').hide()
		if (status == 200) {
			this.section('open', true)
			$('#open-warn').hide()
			data = JSON.parse(data)
			$('h2#open').text(data.name)
			document.title = data.name + ' | Taglist service'
			console.log('control: ' + data.control)
			if (!data.control) {
				this.section('open', false)
				$('h2#setup').text('Setup: ' + data.name)
				this.setup()
				}
			$('#open-control').attr('href', [controldomain, controldir, data.control].join('/')).text(data.name)
			if (data.owner) $('#open-owner')
				.attr('href', [controldomain, '@' + data.owner].join('/'))
				.text('@' + data.owner)
			if (data.delegates && data.delegates[0]) {
				let rr = [], d = data.delegates[0]
				if (d.includes('A')) rr.push('adult') 
				if (d.includes('T')) rr.push('teen') 
				if (d.includes('M')) rr.push('member') 
				if (d.includes('L')) rr.push('listener') 
				$('#open-restrict').text('Restriction: ' + rr.join(' ') + 's only.')
				}

			var [status, data] = await this.api('open', {key: this.key, mode: 'update'})
			console.log('update status: ' + status)
			if (status != 200) return // <<<<<<<<<<<<<<<<<<<<
			data = JSON.parse(data)

			var t = $('#open-list')
			$('#open-spin').hide()
			if (data.list) data.list = data.list.filter(t => t.trim() != '')
			if (data.list && data.list.length) {
				t.text(data.list.map(t => '@' + t).join(' '))
				 .removeClass('empty')
				t[0].style.height = t[0].parentNode.style.height = (t[0].scrollHeight - 10) + 'px'
				let n = data.list.length
				$('#open-count').text(n == 0? 'No tags.' : (n == 1? '1 tag.' : n + ' tags.'))
				$('#open-copy').prop('disabled', false)
				}
			else {
				t.text('\nThe list is empty')
				$('#open-copy').prop('disabled', true)
				}
			}
		else {
			this.section('notfound', true)
			}
		},
		
	ping: async function () {
		var [status, text] = await this.api('ping')
		console.log('ping status: ' + status)
		$('#start').hide()
		if (status == 200) {
			this.section('init', false)
			$('#running').css('visibility', 'visible')
			this.service = true
			if (this.key) {
				this.open()
				}
			else {
				this.section('register', true)
				$('#register-spin').css('visibility', 'hidden')
				$('#register-name').focus()
				}
			}
		else {
			this.service = false
			$('#start-warn').show().css('opacity', 1)
			}
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

	query: async function () {
		var v = $('#register-name').val().trim()
		if (v == '') return false
		$('#register-spin').css('visibility', 'visible')
		var [status, key] = await this.api('query', {name: v})
		$('#register-spin').css('visibility', 'hidden')
		var ok = status == 200
		if (!ok) {
			$('#register-warn').css('opacity', 1)
			setTimeout(function () {$('#register-warn').css('opacity', 0)}, 4000)
			$('#register-name').focus()
			}
		return ok
		},

	register: async function () {
		//if (!this.clean()) return
		
		var taml = $('[name=restrict-ta]:checked').val() + $('[name=restrict-ml]:checked').val() || ''
		var rr = []
		if (taml.includes('T')) rr.push('teen')
		if (taml.includes('A')) rr.push('adult')
		if (taml.includes('M')) rr.push('member')
		if (taml.includes('L')) rr.push('listener')
		if (rr.length) $('#rc-restrict').text('The taglist can only be used by ' + rr.join(' ') + 's.')
		
		$('#register-name').prop('readonly', true)
		$('#register-spin').css('display', 'inline-block')
		var v = $('#register-name').val().trim(),
			a = $('#list').text().trim()

		var [status, key] = await this.api('register', {name: v, restrict: taml, list: a})
		$('#register-spin').hide()
		$('#register-button').prop('disabled', true)
		if (status == 200) {
			$('#register-warn').hide()
			$('.listname').text(v).css('visibility', 'visible')
			$('a.listname').attr('href', location.href + '?' + key)
			this.section('control', true)
			}
		else {
			$('#register-warn').css('opacity', 1)
			$('#register-name').prop('readonly', false).focus()
			}
		},

	setup: function () { // set up control thread...
		this.section('setup', true)
		$('#setup-url').focus()
		},

	section: function (id, show) {
		if (show) console.log('show section: ' + id)
		$('#' + id).nextUntil('h2').addBack()[show? 'show' : 'hide']()
		},

	sleep: async function (s) {
		await new Promise(done => setTimeout(done, 1000 * s))
		}
	}

init = function () {
	document.documentElement.style.display = 'block'
	Taglist.init()
	}
</script>

## Taglist service {#init}
Welcome to the taglist service.

The service is starting. This can take around 15 seconds...<span id="start-spin" class="spinner"></span>
{:#start}

The service is not available. Please try later.
{:#start-warn .warning}

The service is running.
{:#running}

<hr>

## Register a new taglist {#register}
Use this form to create a new taglist.

For more information, see the <a href="/howto/taglist">Howto</a> guide.

First, register the name of the new taglist:

<input type="text" id="register-name" class="register"> <span id="register-spin" class="spinner" hidden></span>

That name is already registered.
{:.warning #register-warn}

<button id="register-button" disabled onclick="Taglist.register()">Register</button>

## Create the control thread {#control}

The taglist <a href="" class="listname"></a> is now registered.

In any public forum at 7 Cups, make a new thread in the normal way, using the Create New Thread button. (Do not use a listener forum or a therapist forum for this.)

Copy and paste the following instructions into the first post in the thread:

 >This thread controls an auto-updating taglist. To see the current list, go to <a  class="listname" href=""></a>.
 >
 >To add yourself to this taglist, press the Post to Thread button above and write <i>the exact words</i> "Please add me."
 >
 >To remove yourself from this taglist, press the Post to Thread button above and write <i>the exact words</i>, "Please remove me."

Add any other information you like. For example, explain how the taglist will be used.

Optionally tag some people to populate the list, by writing "Please add:" followed by the list of tags, separated by spaces in the normal way. You can populate the list later if you prefer.

Send the post in order to create the thread.

Copy the URL of the new forum thread you just created.

Open the taglist by clicking the link you just pasted in the forum (or one of the links on this page). Follow the instructions there.

## Setup {#setup}

The taglist requires a control thread in a public 7 Cups forum.

Please paste the thread's URL here and press the Setup button:

<input type="text" id="setup-url">

<button id="setup-button" disabled onclick="Taglist.control()">Setup</button>

## Taglist {#open}

This is an auto-updating taglist controlled by a forum thread. Post there to add or remove yourself: <a id="open-control" title="Control thread for this taglist" href=""></a>

<p id="open-restrict" hidden></p>

The taglist was not found.
{:.warning #open-warn}

<p id="open-searchbar"><span id="open-atsign">@</span><input id="open-search" type="text" spellcheck="false"><span id="open-nosearch" title="Clear the search" onclick="Taglist.nosearch()">&times;</span> <img src="/assets/search.png"></p>

<div id="open-container">
<div class="empty" id="open-list"></div>
<span id="open-spin" class="spinner"></span>
</div>

<button class="open" id="open-copy" onclick="Taglist.copy()" disabled>Copy</button><span id="open-copied"></span>

<span id="open-count"></span><br>List owner: <a id="open-owner" title="This taglist's owner" href=""></a>

For more information, see the <a title="Taglist service documentation" href="/howto/taglist">Howto guide</a>.

## Taglist service {#notfound}

This taglist was not found, or it is temporarily unavailable.

For more information, see the <a title="Taglist service documentation" href="/howto/taglist">Howto guide</a>.
