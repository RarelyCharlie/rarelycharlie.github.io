---
title: Listener information
layout: default
feedback: https://www.7cups.com/@RarelyCharlie
---
<p style="color: #a00; font-size: 150%"><b>Under construction:</b><br>This page might not work at times today, June 19th.</p>

<style>
body {overflow-y: scroll;}
#res p {margin: 0 0 .5ex 0; font-weight: bold; letter-spacing: .75px;}
a {text-decoration: none;}
small {margin-left: 2em; font-weight: normal; letter-spacing: 0;}
button {padding: 2px 4px; border: 1px solid #000; border-radius: 2px; margin-left: 2em;
	color: #ccc; border-color: #ccc;}
input#words {width: 20em;}
table {border-spacing: 0 4px;}
td, label {padding-right: 1ex;}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/elasticlunr/0.9.6/elasticlunr.min.js"></script>

This experimental and unofficial search engine searches all threads in the *Listener Learning & Journey* and *Safety & Knowledge at 7 Cups* communities, excluding some recent threads, archived threads and many checkins.

Threads with the most upvotes are displayed first, no matter how old they are. Beware outdated information. Some threads date back to 2014.

You can't search for tags.

Results that link to listener-only threads only work if you are logged in to a listener account at 7 Cups.

The Options button doesn't work yet. Some additional search options may be added later.

---

|Search for:|<label for="forall" onclick="search()"><input type="radio" name="searchfor" id="forall" value="0" checked> All of the words (more words for fewer results)</label>|
||<label for="forany" onclick="search()"><input type="radio" name="searchfor" id="forany" value="0"> <em>Any</em> of the words (more words for more results)</label>|
||<label for="forauthor" onclick="search()"><input type="radio" name="searchfor" id="forauthor" value="0"> An author</label>|
|Sort by:|<label for="byupvotes" onclick="search()"><input type="radio" name="sortby" id="byupvotes" value="0" checked> Upvotes</label> <label for="bydate" onclick="search()"><input type="radio" name="sortby" id="bydate" value="1"> Date</label> <label for="byrelev" onclick="search()"><input type="radio" name="sortby" id="byrelev" value="2"> Relevance</label>|
 
<label for="archive" onclick="search()"><input type="checkbox" id="archive"> Include archived threads.
</label>

<p hidden><label for="checkins" onclick="search()"><input type="checkbox" id="checkins"> Include all checkin threads.
</label></p>

<p><span id="logic">Search for all of these words (more words for fewer results):</span><br>
<span id="atsign" hidden>@</span><input type="text" id="words" onkeydown="searchkey(this)" placeholder="…words…" autocomplete="off" autofocus> <i class="fa fa-search"></i></p>
<p><span id="count"><i class="fa fa-spinner fa-spin"></i></span> <span id="display"></span></p>
<div id="res"></div>

<script>
acfi = null
idx = null

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
	UI.count.textContent = ''

	var r = await fetch('https://rarelycharlie.github.io/assets/acfi.json')
	acfi = await r.json()	

	acfi.cat = {
		149: 'Listener Learning & Journey',
		181: 'Safety & Knowledge at 7 Cups'
		}
	
	idx = elasticlunr.Index.load(acfi.index)

	UI.display = document.getElementById('display')
	UI.results = document.getElementById('res')
	}
initsearch()
		
wait = 0
searchkey = () => {
	if (wait) clearTimeout(wait)
	wait = setTimeout(search, 600)
	}

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
		return
		}

	var res = UI.words.className == 'author'? authorsearch(w) : idx.search(w, config)

	var hit = []
	for (let r of res) hit.push(acfi.corpus[r.ref])
	
	if (!UI.archive.checked) hit = hit.filter(t => t.forum != 1886) // exclude archive
	if (!UI.checkins.checked) hit = hit.filter(t => t.forum != 1682) // exclude checkins
	
	hit = hit.sort(sorters[document.querySelector('[name=sortby]:checked').value])
		
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

		list += '<p><i class="fa fa-star outline"></i> <a href="' + url + '" target="_blank" rel="noreferrer noopener">' + thread.head + '</a> '
		  + '<br><small>'
		  + ' <i class="fa fa-arrow-up"></i> ' + thread.up.toLocaleString()
		  + ' by ' + profile 
		  + ' in ' + months[when.getMonth()] + ' ' + when.getFullYear()
		  + '</small></p>\n'
		if (++n == 100) break
		}

	UI.count.hidden = false
	UI.count.textContent = hit.length == 0? 'No threads found.' : (hit.length == 1? '1 thread found.' : hit.length + ' threads found.')
	
	UI.display.hidden = hit.length < 100
	UI.display.textContent = hit.length > 100? 'Displaying first 100.' : ''
	 	
	UI.results.innerHTML = list
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
</script>
