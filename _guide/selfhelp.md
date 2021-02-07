---
title: Self help guides
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
#content summary + p {margin-top: 1em;}

#results p.hit {color: #999; font-size: 14px; font-weight: normal; margin-left: 2em; text-indent: -2em; line-height:1.2em; margin-bottom: 1.2ex;}
#results p.hit a {font-weight: bold; text-indent: 0;}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/elasticlunr/0.9.6/elasticlunr.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js"></script>

<details onclick="UI.words.focus()">
<summary>About this search engine…</summary>
<p>This fast but unofficial search engine searches self help guides, including some guides that are available for listeners only.</p>
</details>

<hr />

<table>
  <tbody>
    <tr>
      <td>Search for:</td>
      <td><label for="forall" onclick="search()"><input type="radio" name="searchfor" id="forall" value="0" checked="" /> All of the words (more words for fewer results)</label></td>
    </tr>
    <tr>
      <td> </td>
      <td><label for="forany" onclick="search()"><input type="radio" name="searchfor" id="forany" value="0" /> <em>Any</em> of the words (more words for more results)</label></td>
    </tr>
  </tbody>
</table>

<p><label for="listen" onclick="search()"><input type="checkbox" id="listen" checked="" /> Include listener-only guides: <span class="listener">L</span></label><br />
</p>

<hr />

<p><span id="logic">Search for all of these words (more words for fewer results):</span><br />
<span id="atsign" hidden="">@</span><input type="text" id="words" onkeydown="searchkey(this)" placeholder="…words…" autocomplete="off" autofocus="" /> <i class="fa fa-search"></i></p>
<p><span id="count"></span> <span id="display"></span><span id="build"></span></p>
<div id="results"></div>
<p><button hidden id="more" onclick="more()">Show More Results</button></p>

<script>
build = 0

data = null
idx = null

chunk = 100
limit = 100

config = {
	fields: {
		head: {boost: 1},
		body: {boost: 1},
		},
	bool: 'AND'
	}
	
urlfrag = (elem, id) => { return '#' + id
	try {
		return (elem? data[elem][id] : data.corpus[id].head).replace(/\W/g, '') + '_' + id
		} catch (e) {console.log('>>> ' + id + ' ' + e)}
	}

UI = {}
document.querySelectorAll('[id]').forEach(elem => UI[elem.id] = elem)

initsearch = async function () {
	UI.results.innerHTML = '<div id="loading">Initializing… <i class="fa fa-spinner fa-spin"></i></div>'
	await (new Promise(i => setTimeout(i, 0)))

	var r = await fetch('/assets/info/guide.jslz?build=' + build)
	r = await r.text()
	data = JSON.parse(LZString.decompressFromEncodedURIComponent(r))
	
	date = (new Date(data.on)).toDateString()
	idx = elasticlunr.Index.load(data.index)

	UI.results.innerHTML = ''
	UI.build.textContent = date? 'Indexed on ' + date : 'Custom index'
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

	var w = document.getElementById('words').value.trim()
	if (w == '') {
		UI.count.hidden = true
		UI.display.hidden = true
		UI.results.innerHTML = ''
		UI.more.hidden = true
		return
		}

	var res = idx.search(w, config)

	hit = []
	for (let r of res) hit.push(data.corpus[r.ref])
	
	if (!UI.listen.checked) hit = hit.filter(item => !data.guide[item.g].listener) // exclude listener-only
	hit = hit.filter(t => t.forum != 1682) // always exclude checkins
	
	hit = hit.sort()

	UI.count.hidden = false
	UI.count.textContent = hit.length == 0? 'No pages found.' : (hit.length == 1? '1 page found.' : hit.length + ' pages found.')

	UI.results.innerHTML = ''
	limit = chunk
	display()
	}

display = () => {
	var list = '', n = 0
	for (let item of hit) {
		let guide = data.guide[item.g]
		let url = 'https://www.7cups.com/' + guide.slug
		  + (item.p == 0? '/' : '/lesson' + item.p + '.html')
		list += '<p class="hit">'
		  + guide.title + ': '
		  + '<a href="' + url + '" target="_blank" rel="noreferrer noopener"'
		    + (guide.listener? ' class="onlyL" title="Listener-only"' : '')
		  + '>' + item.t + '</a> '
		  + '</p>\n'
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
	
prepare = async () => {
	var ww = document.getElementById('words').value.trim().split(' ')
	for (let w of ww) {
		if (w == '') continue
		let c = w.charAt(0).toLowerCase()
		if (!'0123456789abcdefghijklmnopqrstuvwxyz'.includes(c)) continue
		if (data.index.index.body.root[c] === null) {
			data.index.index.body.root[c] = {}
			let r = await fetch('/assets/info/i_' + c + '.jslz?build=' + build)
			r = await r.text()
			r = JSON.parse(LZString.decompressFromEncodedURIComponent(r))
			data.index.index.head.root[c] = r.head
			data.index.index.body.root[c] = r.body
			}
		}
	}
</script>
