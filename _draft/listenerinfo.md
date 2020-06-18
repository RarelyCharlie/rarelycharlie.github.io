---
title: Listener information
layout: default
feedback: https://www.7cups.com/@RarelyCharlie
---
<style>
#res p {margin: 0 0 .5ex 0; font-weight: bold; letter-spacing: .75px;}
a {text-decoration: none;}
small {margin-left: 2em; font-weight: normal; letter-spacing: 0;}
button {padding: 2px 4px; border: 1px solid #000; border-radius: 2px; margin-left: 2em;
	color: #ccc; border-color: #ccc;}
input {width: 20em;}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/elasticlunr/0.9.6/elasticlunr.min.js"></script>

This experimental and unofficial search engine searches all threads in the *Listener Learning & Journey* and *Safety & Knowledge at 7 Cups* communities, excluding some recent threads, archived threads and many checkins.

Threads with the most upvotes are displayed first, no matter how old they are. Beware outdated information. Some threads date back to 2014.

You can't search for tags.

Results that link to listener-only threads only work if you are logged in to a listener account at 7 Cups.

The Options button doesn't work yet. Some additional search options may be added later.

<p>Search for all of these words (more words for fewer results):<br>
<input type="text" id="words" onkeydown="searchkey(this)" placeholder="…words…" autocomplete="off" autofocus> <i class="fa fa-search"></i> <button title="Sorry, not implemented yet!">Options <i class="fa fa-caret-down"></i></button></p>
<p><span id="count"><i class="fa fa-spinner fa-spin"></i></span> <span id="display"></span></p>
<div id="res"></div>
<script>
acfi = null
idx = null

count = null
results = null
display = null

config = {
	fields: {
		head: {boost: 2},
		body: {boost: 1},
		},
	bool: 'AND'
	}

months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
urlfrag = (elem, id) => (elem? acfi[elem][id] : acfi.corpus[id].head).replace(/\W/g, '') + '_' + id

initsearch = async function () {
	count = document.getElementById('count')
	
	var r = await fetch('https://rarelycharlie.github.io/assets/info/acfi.json')
	acfi = await r.json()
	
	count.textContent = ''
		
	acfi.cat = {
		149: 'Listener Learning & Journey',
		181: 'Safety & Knowledge at 7 Cups'
		}
	
	idx = elasticlunr.Index.load(acfi.index)

	display = document.getElementById('display')
	results = document.getElementById('res')
	}
initsearch()
		
wait = 0
searchkey = () => {
	if (wait) clearTimeout(wait)
	wait = setTimeout(search, 600)
	}

search = () => {
	var w = document.getElementById('words').value.trim()
	if (w == '') {
		count.hidden = true
		display.hidden = true
		results.innerHTML = ''
		return
		}
	var res = idx.search(w, config)

	var hit = []
	for (let r of res) hit.push(acfi.corpus[r.ref])
	hit = hit.filter(t => t.forum != 1886 && t.forum != 1682) // exclude archive, checkin
	hit = hit.sort((a, b) => b.up - a.up)
		
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
		if (++n == 100) break
		}

	count.hidden = false
	count.textContent = hit.length == 0? 'No threads found.' : ('hit.length == 1? '1 thread found.' : hit.length + ' threads found.')
	
	display.hidden = hit.length < 100
	display.textContent = hit.length > 100? 'Displaying first 100.' : ''
	 	
	results.innerHTML = list
	}
</script>
