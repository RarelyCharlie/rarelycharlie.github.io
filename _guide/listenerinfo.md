---
title: Listener information
layout: default
class: index
feedback: https://www.7cups.com/@RarelyCharlie
---
<style>
body {overflow-y: scroll;}
#results p {margin: 0 0 .5ex 0; font-weight: bold; letter-spacing: .75px;}
a {text-decoration: none;}
small {margin-left: 2em; font-weight: normal; letter-spacing: 0;}
button {padding: 2px 4px; border: 1px solid #000; border-radius: 2px; margin-left: 2em;
	color: #ccc; border-color: #ccc;}
input {margin-left: 0;}
input#words {width: 20em;}
table {border-spacing: 0 4px;}
td, label {padding-right: 1ex;}
tr:last-child>td {padding-top: 1ex;}
#words {padding: 2px;}
#words.author {position: relative;left: -1em; padding-left: 16px;}
#atsign {position: relative; left: 2px; bottom: 2px; z-index: 1;}
div#loading {color: #aaa; font-size: 150%; margin: 1em 0 0 0;}
a[href*="/forum/Listener"]::after, span.listener {content: "L"; color: white; background: #5cb85c; padding: 4px 4px 2px 4px;margin-left: 1ex; border-radius: 25%; font-size: 12px; font-weight: bold; display: inline-block; line-height: 12px;}
span.listener {margin: 0;}
#build {color: gray; font-size: 80%; float: right;}
#more {margin: 1em 0 0 0; color: #fff; background: #29f; padding: 1ex 1em; border-radius: 4px;}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/elasticlunr/0.9.6/elasticlunr.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js"></script>

<p hidden style="color: #a00; font-size: 125%;"><b>Under construction</b><br>This experimental page might not work at times today, June 21st.</p>

This fast but unofficial search engine searches forum threads in four communities, excluding recent threads and some checkins.

Beware outdated information—some threads date back to 2014.

You can't search for tags.

Results that link to listener-only threads only work if you are logged in to a listener account at 7 Cups. Otherwise 7 Cups lies to you and tells you the item was removed.

---

|Search for:|<label for="forall" onclick="search()"><input type="radio" name="searchfor" id="forall" value="0" checked> All of the words (more words for fewer results)</label>|
||<label for="forany" onclick="search()"><input type="radio" name="searchfor" id="forany" value="0"> <em>Any</em> of the words (more words for more results)</label>|
||<label for="forauthor" onclick="search()"><input type="radio" name="searchfor" id="forauthor" value="0"> An author</label>|
|Sort by:|<label for="byupvotes" onclick="search()"><input type="radio" name="sortby" id="byupvotes" value="0" checked> Upvotes</label> <label for="bydate" onclick="search()"><input type="radio" name="sortby" id="bydate" value="1"> Date</label> <label for="byrelev" onclick="search()"><input type="radio" name="sortby" id="byrelev" value="2"> Relevance</label>|
 
<label for="archive" onclick="search()"><input type="checkbox" id="archive"> Include archived threads.
</label>\\
<label for="listen" onclick="search()"><input type="checkbox" id="listen" checked> Include listener-only threads: <span class="listener">L</span></label>

---

<p><span id="logic">Search for all of these words (more words for fewer results):</span><br>
<span id="atsign" hidden>@</span><input type="text" id="words" onkeydown="searchkey(this)" placeholder="…words…" autocomplete="off" autofocus> <i class="fa fa-search"></i></p>
<p><span id="count"></span> <span id="display"></span><span id="build"></span></p>
<div id="results"></div>
<p><button hidden id="more" onclick="more()">Show More Results</button></p>

<script>
build = 7

acfi = null
idx = null

chunk = 100
limit = 100

config = {
	fields: {
		head: {boost: 2},
		body: {boost: 1},
		},
	bool: 'AND'
	}
	
sorters = [
	(a, b) => b.up - a.up,
	(a, b) => b.at - a.at,
	(a, b) => 0
	] 

months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
urlfrag = (elem, id) => (elem? acfi[elem][id] : acfi.corpus[id].head).replace(/\W/g, '') + '_' + id

UI = {}
document.querySelectorAll('[id]').forEach(elem => UI[elem.id] = elem)

initsearch = async function () {
	UI.results.innerHTML = '<div id="loading">Initializing… <i class="fa fa-spinner fa-spin"></i></div>'
	await (new Promise(i => setTimeout(i, 0)))

	var r = await fetch('/assets/info/acfi.jslz?build=' + build)
	r = await r.text()
	acfi = JSON.parse(LZString.decompressFromEncodedURIComponent(r))

	acfi.cat = {
		38: 'ListenerCommunityCenter',
		100: 'SiteUpdates',
		149: 'ListenerLearningJourney',
		181: 'SafetyKnowledgeat7Cups'
		}
	
	idx = elasticlunr.Index.load(acfi.index)

	UI.results.innerHTML = ''
	UI.build.textContent = 'Indexed on ' + (new Date(acfi.on)).toDateString()
	UI.words.focus()
	}
addEventListener('DOMContentLoaded', initsearch)
		
wait = 0
searchkey = async () => {
	if (wait) clearTimeout(wait)
	wait = setTimeout(search, 600)
	await prepare()
	}

hit = []
search = () => {
	if (UI.forany.checked) {
		config.bool = 'OR'
		UI.logic.innerHTML = 'Search for <em>any</em> of these words (more words for more results):'
		UI.words.setAttribute('placeholder', '…words…')
		UI.words.className = ''
		UI.atsign.hidden = true
		}
	else if (UI.forall.checked) {
		config.bool = 'AND'
		UI.logic.innerHTML = 'Search for all these words (more words for fewer results):'
		UI.words.setAttribute('placeholder', '…words…')
		UI.words.className = ''
		UI.atsign.hidden = true
		}
	else {
		UI.logic.innerHTML = 'Search for an author:'
		UI.words.setAttribute('placeholder', 'authorname')
		UI.words.className = 'author'
		UI.atsign.hidden = false
		}

	var w = document.getElementById('words').value.trim()
	if (w == '') {
		UI.count.hidden = true
		UI.display.hidden = true
		UI.results.innerHTML = ''
		UI.more.hidden = true
		return
		}

	var res = UI.words.className == 'author'? authorsearch(w) : idx.search(w, config)

	hit = []
	for (let r of res) hit.push(acfi.corpus[r.ref])
	
	if (!UI.archive.checked) hit = hit.filter(t => t.forum != 1886) // exclude archive
	if (!UI.listen.checked) hit = hit.filter(t => ![38, 149].includes(t.cat)) // exclude listener-only
	hit = hit.filter(t => t.forum != 1682) // always exclude checkins
	
	hit = hit.sort(sorters[document.querySelector('[name=sortby]:checked').value])

	UI.count.hidden = false
	UI.count.textContent = hit.length == 0? 'No threads found.' : (hit.length == 1? '1 thread found.' : hit.length + ' threads found.')

	UI.results.innerHTML = ''
	limit = chunk
	display()
	}

display = () => {
	var list = '', n = 0
	for (let thread of hit) {
		let url = 'https://www.7cups.com/forum/'
		  + urlfrag('cat', thread.cat) + '/'
		  + urlfrag('forum', thread.forum) + '/'
		  + urlfrag('', thread.id) + '/1/'

		let aa = acfi.author[thread.by].split(','),
			author = aa[0],
			avatar = aa[1],
			profile = author == 'null'? 'unknown' :
				'<a href="https://www.7cups.com/@' + author + '" target="_blank" '
		    		+ 'title="' + author + (author.endsWith('s')? '\'' : '\'s')
				+ ' profile">@' + author + '</a>',
			when = new Date(thread.at * 1000)

		list += '<p><a href="' + url + '" target="_blank" rel="noreferrer noopener">' + thread.head + '</a> '
		  + '<br><small>'
		  + ' <i class="fa fa-arrow-up"></i> ' + thread.up.toLocaleString()
		  + ' by ' + profile 
		  + ' in ' + months[when.getMonth()] + ' ' + when.getFullYear()
		  + '</small></p>\n'
		if (++n == limit) break
		}

	UI.results.innerHTML += list

	UI.display.hidden = hit.length < limit
	UI.display.textContent = hit.length > limit? 'Displaying first ' + Math.min(hit.length, limit) + '.' : ''

	UI.more.hidden = hit.length <= limit
	}

more = () => {
	var y = scrollY
	limit += chunk
	UI.results.innerHTML = ''
	display()
	scrollTo(0, y)
	}
	
toggle = button => {
	var div = button.nextElementSibling
	div.className = div.className.endsWith('open')? 'panel closed' : 'panel open'
	var i = button.lastElementChild
	i.className = i.className.endsWith('down')? 'fa fa-caret-up' : 'fa fa-caret-down' 
	}
	
authorsearch = author => {
	var seek = author.split(' ')[0].replace(/[^A-Za-z0-9]/g, '').toLowerCase() + ','
	var aid = 0
	for (let a in acfi.author) {
		if (acfi.author[a].toLowerCase().startsWith(seek)) aid = a
		}

	var res = []
	for (let thread in acfi.corpus) if (acfi.corpus[thread].by == aid) res.push({ref: acfi.corpus[thread].id})
	return res
	}

prepare = async () => {
	var ww = document.getElementById('words').value.trim().split(' ')
	for (let w of ww) {
		if (w == '') continue
		let c = w.charAt(0).toLowerCase()
		if (!'0123456789abcdefghijklmnopqrstuvwxyz'.includes(c)) continue
		if (acfi.index.index.body.root[c] === null) {
			let r = await fetch('/assets/info/i_' + c + '.jslz?build=' + build)
			r = await r.text()
			r = JSON.parse(LZString.decompressFromEncodedURIComponent(r))
			acfi.index.index.head.root[c] = r.head
			acfi.index.index.body.root[c] = r.body
			}
		}
	}
</script>
