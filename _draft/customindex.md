---
title: Create a custom index
layout: howto
feedback: https://www.7cups.com/@RarelyCharlie
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/elasticlunr/0.9.6/elasticlunr.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js"></script>
<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
#catlist {border: 1px solid #000; min-height: 6em; width: 40em; margin: 0 0 .5ex 0; font-size: 12px;}
#catlist tr {height: 18px;}
#catlist th, #catlist td {border-bottom: 1px dotted #ccc; text-align: right;}
#catlist th:first-child, #catlist td:first-child {text-align: left; min-width: 12em;}
#threadcount {font-size: 12px; width: 40em; text-align: right; margin: 0;}
button, #file {font-size: 14px; font-family: inherit; display: block; margin: 0 0 1ex 0; background: #6fc; border: 1px solid #4da;
  border-radius: 2px; padding: 2px 6px; cursor: pointer;}
button:hover, #file:hover {background: #4da;}
button:disabled, #file[disabled] {background: #e4e4e4; color: #b4b4b4; border-color: #ccc; cursor: default;}
button:disabled:hover, #file:hover {background: #cec;}
#file {display: inline-block;}
progress {display: block; width: 400px; margin-top: -1ex;}
</style>

This page builds a custom index for the [Listener information](/guide/listenerinfo) search engine.

A custom index can be useful if you want to index more forum categories, if you need a more up-to-date index than the one provided, or if your Internet connection is slow.

To build a custom index it's best (but optional) to start by importing the standard index, which contains four forum categories.

To include more categories (or subcommunities) you will need index files for them. You might be able to build index files yourself, or you might be able to use an index file someone else built and you downloaded from a file-sharing site (for example, Google Drive).

### Building index files
To build index files yourself you need to install these two tools in your web browser, in this order. Not all web browsers support this:

1. [Tampermonkey](https://www.tampermonkey.net/)
2. [Forum category indexer](https://greasyfork.org/en/scripts/410169-7-cups-forum-category-indexer)

On 7 Cups, go to a forum category (or subcommunity). Press the
<span style="display: inline-block; padding: 2px 4px; color: #fff; background: #4c4; border: 1px solid #3b3; border-radius: 4px; font-size: 80%;">Build Index</span>
button near the top left of the page. This builds an index for the category. It's intentionally slow in order to prevent undue load on 7 Cups' server.

When the index is built, a download icon <i style="color: blue;" class="fa fa-download"></i> appears. Click it to download the index to your computer. Remember where you put it! Now you can import the index as described below.

### Your custom index

Your custom index contains these forum categories: &nbsp; <i id="initspin"></i>

<table id="catlist"><tbody>
<tr><th>Category</th><th>ID</th><th>Indexed on</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
</tbody></table>
<p id="threadcount">0 threads</p>
<button id="clearcustom" disabled onclick="clearcustom()">Clear custom index</button>

Importing the standard index removes all other forum categories from your custom index. Press the button to import or reimport the standard index:

<p><button id="importstandard" disabled onclick="importstandard()">Import standard index</button></p> 
<progress id="standardprogress" value="0" max="1"></progress>

Import or reimport an index file for each forum category you want to add.  To import an index file, choose the file on your computer. The file name must be like <code>acf<i>nnn</i>.jslz</code>, where <code><i>nnn</i></code> is the ID of the forum category.

<p><label id="file" disabled><input id="filechosen" type="file" accept=".jslz" hidden onchange="filechosen(this)">Choose a file</label> <span id="filename"></span></p>
<progress id="importprogress" value="0" max="1"></progress>

You can import multiple index files, but how many you're allowed might depend on your web browser's storage limits.

To update a forum category you imported previously, you don't have to start again. Just import a new index file for that category.

There's nothing else to do. The forum categories you see in the list above are automatically available in the Listener Information search engine.


<script>
UI = {}
document.querySelectorAll('[id]').forEach(e => UI[e.id] = e)

acfi = {
	author: {},
	corpus: {},
	forum: {},
	index: null
	}
idx = elasticlunr(function () {
	this.addField('head')
	this.addField('body')
	this.setRef('id')
	this.saveDocument(false)
	})

ixinit = async () => {
	var k = await idbKeyval.keys()
	if (k.includes('acfi')) {
		UI.initspin.className = 'fa fa-spinner fa-spin'
		acfi = await idbKeyval.get('acfi')
		idx = elasticlunr.Index.load(acfi.index)
		UI.initspin.className = ''
		for (let id in acfi.cat) showcat(id, acfi.cat[id])
		}
	UI.importstandard.disabled = false, UI.file.removeAttribute('disabled')
	}
ixinit()

catlist = {}
showcat = (id, cat) => {
	var ok = false,
		date = (new Date(parseInt(cat.match(/\d+$/)[0]))).toDateString(),
		tbody = UI.catlist.firstChild

	catlist[id] = cat
	var cc = Object.keys(catlist).map(k => k.padStart(4, 0) + ' ' + catlist[k])
	cc.sort()

	var body = '<tr><th>Category</th><th>ID</th><th>Indexed on</th></tr>'
	for (let c of cc) {
		let id = parseInt(c),
			name = c.replace(/^\d+|\d+$/g, '').trim(),
			date = (new Date(parseInt(c.match(/\d+$/)[0]))).toDateString()
		body += '<tr><td>' + name + '</td><td>' + id + '</td><td>' + date + '</td></tr>'
		}
	if (cc.length < 6) body += '<tr><td></td><td></td><td></td></tr>'.repeat(6 - cc.length)
	tbody.innerHTML = body

	UI.threadcount.textContent = acfi? Object.keys(acfi.corpus).length.toLocaleString() + ' threads' : '0 threads'

	UI.clearcustom.disabled = false
	}

importstandard = async () => {
	UI.importstandard.disabled = true
	var prog = UI.standardprogress
	prog.max = 40, prog.value = 0
	var r = await fetch('https://rarelycharlie.github.io/assets/info/acfi.jslz')
	r = await r.text()
	acfi = JSON.parse(LZString.decompressFromEncodedURIComponent(r))
	prog.value = 3

	var cc = '0123456789abcdefghijklmnopqrstuvwxyz'.split('')
	for (let c of cc) {
		r = await fetch('https://rarelycharlie.github.io/assets/info/i_' + c + '.jslz')
		r = await r.text()
		r = JSON.parse(LZString.decompressFromEncodedURIComponent(r))
		{++prog.value}
		acfi.index.index.head.root[c] = r.head
		acfi.index.index.body.root[c] = r.body
		}

	acfi.cat = {
		38: 'Listener Community Center ' + acfi.on,
		100: 'Site Updates ' + acfi.on,
		149: 'Listener Learning & Journey ' + acfi.on,
		181: 'Safety & Knowledge at 7 Cups ' + acfi.on,
		}

	await idbKeyval.set('acfi', acfi)
	prog.value = 40

	for (let id in acfi.cat) showcat(id, acfi.cat[id])
	}

clearcustom = () => {
	acfi = {}
	UI.catlist.firstChild.innerHTML = '<tr><th>Category</th><th>ID</th><th>Date</th></tr>' 
	  + '<tr><td></td><td></td><td></td></tr>'.repeat(6)
	UI.threadcount.textContent = '0 threads'
	idbKeyval.del('acfi')
	UI.importstandard.disabled = false
	UI.standardprogress.value = 0
	}

filechosen = input => {
	UI.importprogress.value = 0
	var f = '', path = input.value
	if (path.startsWith('C:\\fakepath\\')) f = path.substring(12)
	else {
		let x = path.lastIndexOf('/')
		if (x < 0) x = path.lastIndexOf('\\')
		f = path.substring(0, x+1)
		}
	if (!/^acf\d+\.jslz$/.test(f)) f = ''
	input.parentNode.nextElementSibling.textContent = f
	if (f) importcat()		
	}

importcat = async () => {
	var prog = UI.importprogress
	prog.removeAttribute('value')
	var r = await UI.filechosen.files[0].text()
	r = JSON.parse(LZString.decompressFromEncodedURIComponent(r))
	prog.max = Math.ceil(r.threads * 1.05), prog.value = 0
	
	for (let a in r.author) acfi.author[a] = r.author[a]
	for (let t in r.corpus) acfi.corpus[t] = r.corpus[t]
	for (let f in r.forum) acfi.forum[f] = r.forum[f]
    for (let t in r.corpus) {
    	n = 0
    	r.corpus[t].head = r.corpus[t].head.replace(/_/g, '-')
    	r.corpus[t].body = r.corpus[t].body.replace(/_/g, '-')
    	try {
    		idx.addDoc(r.corpus[t])
    		} catch (e) {console.log('>>> addDoc: ' + t + ' ' + e)}
    	++prog.value
    	if (++n % 100 == 0) await new Promise(i => setTimeout(i, 0))
    	}
    acfi.index = idx.toJSON()
    acfi.cat[r.id] = r.cat + ' ' + r.on
    await idbKeyval.set('acfi', acfi)
    prog.value = prog.max

	showcat(r.id, r.cat + ' ' + r.on)
	}
</script>
