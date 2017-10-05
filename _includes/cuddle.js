Persist = {
	cuddle: function (c) {
		var a = JSON.parse(localStorage.getItem('cuddle'))
		if (!a) a = []
		if (a.indexOf(c) >= 0) return false
		while (a.length > 100) a.shift()
		a.push(c)
		localStorage.setItem('cuddle', JSON.stringify(a))
		return true
		},
		
	forgetme: function () {
		localStorage.removeItem('whoami')
		},
	rememberme: function (n) {
		localStorage.setItem('whoami', n)
		},
		
	whoami: function () {
		return localStorage.getItem('whoami')
		}
	}
checksum = function (s) {
	var chk = 0x12345678, len = s.length
	for (var i = 0; i < len; i++) chk += (s.charCodeAt(i) * (i + 1))
	return ('000' + (chk & 0xffff).toString(16)).substr(-4)
	}
maketoken = function () {
	var now = Math.floor(Date.now() / 1000).toString(16).substr(-6),
		roff = Math.floor(ralf.length * Math.random()),
		roffchar = ralf.charAt(roff),
		data = roffchar + now + fromname + '-' + toname,
		chk = checksum(data),
		pad = '',
		grl = fromname.length + toname.length,
		e = 29 - Math.floor(3 * Math.random()) // allow 0, 1 or 2 equals signs
	while (pad.length + grl < e) pad += ralf.charAt(Math.floor(ralf.length * Math.random()))
	var token = roffchar
		+ rot(chk + now + fromname + '-' + toname + '-', roff)
		+ pad
	while (token.length % 3) token += '='
	Glog.patch(fromname, toname, now)
	return token
	}
eattoken = function (token) {
	var xroff = ralf.indexOf(token.charAt(0)),
		xdata = derot(token.substr(1), xroff),
		xchk = xdata.substr(0, 4),
		xnow = xdata.substr(4, 6)
	xdata = (xdata.substr(4, 6) + '-' + xdata.substr(10)).split('-')
	if (checksum(token.charAt(0) + xnow + xdata[1] + '-' + xdata[2]) == xchk) return xdata
	else return null
	}
ralf = 'Mj7I6r1N5hwuASE2eac3lzYpZLmCgViDFxPvH0OqWTUtQdKynsBR-Gfob9X4kJ8'
rot = function (s, o) { // string, random offset
	var r = ''
	for (var i = 0; i < s.length; ++i) {
		var c = s.charAt(i)
		var p = (ralf.indexOf(c) + o + i) % ralf.length
		r += ralf.charAt(p)
		}
	return r
	}
	
derot = function (s, o) { // rotstring, offset
	var r = ''
	for (var i = 0; i < s.length; ++i) {
		var p = ralf.indexOf(s.charAt(i)) - o - i
		while (p < 0) p += ralf.length
		r += ralf.charAt(p)
		}
	return r
	}
Glog = {
	id: 'KcuIzkup2o7IB4uP5l20Xqq2zYQdpPsp',
	token: 'IqnJzEuNfemV2REDpHHYliYFUUztxHLR2ggGxDXK',
	api: 'https://api.github.com/gists/',
	
	patch: function (orig, dest, when) {
		var r = new XMLHttpRequest
		r.open(
			'PATCH',
			this.api + derot(this.id, 1),
			true
			)
		r.setRequestHeader('Authorization', 'token ' + derot(this.token, 1))
		var data = {files: {}}
		data.files[rot(orig, 1) + when + '.json'] = {content: JSON.stringify(rot(dest, 1))}
		r.send(JSON.stringify(data))
		}
	}
	
restrict = function () { // restrict input characters
	var e = event || window.event
	var key = e.keyCode || e.which
	if (key == 13) {
		if (e.target.value == '') return
		if (e.target.id == 'fromname' || e.target.id == 'toname') {
			var fn = document.getElementById('fromname'),
				tn = document.getElementById('toname'),
				cb = document.getElementById('cuddle')
			if (fn.value && tn.value) {
				document.getElementById('button').className = ''
				cb.removeAttribute('disabled')
				cb.focus()
				setTimeout(function () {cb.click()}, 200)
				}
			else if (fn.value) tn.focus()
			else fn.focus()
			}
		else { // recname
			document.getElementById('button2').className = ''
			var sb = document.getElementById('searchbtn')
			sb.removeAttribute('disabled')
			sb.focus()
			setTimeout(function () {sb.click()}, 200)
			}
		}
	if ((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122)) return
	if (e.preventDefault) e.preventDefault()
	e.returnValue = false
	}
	
proceed = function (inp) { // handle button disabled...
	if (inp.id == 'recname') { // page2 ...
		var ok = document.getElementById('recname').value
		var b = document.getElementById('searchbtn')
		if (ok !== b.hasAttribute('disabled')) setTimeout(function () {
			document.getElementById('button2').className = ok? '' : 'disabled'
			b[ok? 'removeAttribute' : 'setAttribute']('disabled', 'true')
			}, 800)
		}
	else { // page0 ...
		var ok = document.getElementById('fromname').value && document.getElementById('toname').value
		var b = document.getElementById('cuddle')
		if (ok !== b.hasAttribute('disabled')) setTimeout(function () {
			document.getElementById('button').className = ok? '' : 'disabled'
			b[ok? 'removeAttribute' : 'setAttribute']('disabled', 'true')
			}, 800)
		}
	}
oneclick = false
cuddle = function () {
	if (oneclick) return
	oneclick = true
	
	if (!fromname) fromname = document.getElementById('fromname').value
	if (!toname) toname = document.getElementById('toname').value
	if (rememberme && fromname) Persist.rememberme(fromname)
	with (document.getElementById('page0').style) opacity = 0, zIndex = 0
	with (document.getElementById('page1').style) opacity = 1, zIndex = 1
	setTimeout(function () {document.getElementById('progbar1').style.width = '100%'}, 800)
	var v = '@' + toname
	document.getElementById('sendto0').innerHTML = v
	with (document.getElementById('sendto1'))
		setAttribute('href', 'htps://www.7cups.com/' + v), innerHTML = v
	document.getElementById('sendlink').addEventListener("copy", function(event) {
		if (event.clipboardData) event.clipboardData.setData("text/plain", event.target.textContent)
 		event.preventDefault()
		})
	document.getElementById('sendlink').innerHTML = 'rarelycharlie.github.io/' + maketoken()
	setTimeout(function () {
		document.getElementById('done1').style.opacity = 1
		document.getElementById('label1').style.display = 'none'
		}, 7000)
	}
	
fromname = ''
toname = ''
recname = ''
cuddleid = ''
init = function () { // on document loaded...
	var n = Persist.whoami()
	if (n) {
		document.getElementById('fromname').value = n
		document.getElementById('recname').value = n
		rememberme = true
		}
	else rememberme = false
	var token = location.search
	if (token) {
		var tt = eattoken(token.substr(1))
		if (tt) cuddleid = tt[0], fromname = tt[1], toname = tt[2]
		with (document.getElementById('page2').style) opacity = 1, zIndex = 2
		if (rememberme) {
			document.getElementById('button2').className = ''
			document.getElementById('searchbtn').removeAttribute('disabled')
			}
		setTimeout(function () {
			document.getElementById(rememberme? 'searchbtn' : 'recname').focus()
			}, 0)
		}
	else {
		document.getElementById('page0').style.opacity = 1
		document.getElementById(rememberme? 'toname' : 'fromname').focus()
		}
	rememberme = true
	}
	
heart = 0
deliver = function (quick) {
	if (fromname) {
		document.getElementById('whofrom').innerHTML = ' from @' + fromname
		document.getElementById('returnto').innerHTML = ' to @' + fromname
		}
	with (document.getElementById('page2').style) opacity = 0, zIndex = 0
	with (document.getElementById('page3').style) opacity = 1, zIndex = 1
	if (quick) document.getElementById('quick').style.display = 'inline'
	setTimeout(function () {
		var s = document.getElementById('progbar3').style
		s.width = '264px'
		s.transitionDuration = quick? '6s' : '20s'
		if (s.webkitTransitionDuration) s.webkitTransitionDuration = s.transitionDuration
		}, 800)
	setTimeout(function () {
		document.getElementById('label3').style.opacity = 0
		document.getElementById('done3').style.opacity = 1
		if (fromname) document.getElementById('returnit').style.opacity = 1
		if (quick) setTimeout(function () {
			document.getElementById('returnit').style.display = 'none'
			document.getElementById('newcuddle').style.opacity = 1
			}, 800)
		}, quick? 6500 : 21000)
	
	document.body.style.overflow = 'hidden'
	for (i = 0; i < (quick? 12 : 20); ++i)
		setTimeout(function () {launch(heart++, true)}, 200 + Math.floor(2000 * Math.random()))
	setTimeout(function () {stopped = true}, quick? 6500 : 21000)
	}
	
search = function () { // called by Search button...
	document.getElementById('button2').style.display = 'none'
	document.getElementById('searchbtn').style.opacity = 0
	document.getElementById('searching').style.opacity = 1
	recname = document.getElementById('recname').value
	var ok = toname.toLowerCase() == recname.toLowerCase() && Persist.cuddle(cuddleid + fromname)
	if (ok) setTimeout(deliver, 3000)
	else setTimeout(function () {
		document.getElementById('searching').style.display = 'none'
		document.getElementById('nocuddle').style.opacity = 1
		setTimeout(function () {
			document.getElementById('console').style.opacity = 1
			}, 1500)
		}, 6000)
	}
information = function (show) {
	var s = document.getElementById('information').style
	if (show) {
		document.getElementById('content').className = show? 'hidden' : ''
		s.display = 'block'
		setTimeout(function () {s.opacity = 1}, 0)
		}
	else {
		s.opacity = 0
		s.display = 'none'
		document.getElementById('content').className = ''
		if (focuswas) focuswas.focus()
		}
	}
	
escape = function () { // escape from information...
	var e = event || window.event
	var key = e.keyCode || e.which
	if (key != 27) return
	if (document.getElementById('content').className) information(false)
	}
focuswas = null
keepfocus = function () {
	var e = event || window.event
	if (e.target.id) focuswas = e.target
	}
inreturn = function () { // back to start...
	var t = toname
	toname = fromname
	fromname = t
	with (document.getElementById('page3').style) opacity = 0, zIndex = 0
	cuddle()
	}
	
consolation = function () { // anonymous cuddle...
	fromname = ''
	toname = recname
	deliver(true)
	}
	
remclick = function (c) {
	rememberme = c.checked
	if (c.id == 'rem0') document.getElementById('rem1').checked = rememberme
	else document.getElementById('rem0').checked = rememberme
	if (rememberme) Persist.rememberme(
		document.getElementById(c.id == 'rem0'? 'fromname' : 'recname').value
		)
	else Persist.forgetme()
	}
	
rdm = function () {return Math.floor(200 * Math.random())}
stopped = false
angle = 0
launch = function (n, initial) {
	if (stopped) return
	var s = document.getElementById('heart' + n).style
	
	s.visibility = 'hidden'
	setTimeout(function () {
		s.transitionDuration = '0s'
		s.top = '12px'
		s.left = document.getElementById('progbar3').clientWidth - 10 + 'px'
		s.width = '22.5px'
		s.height = '24px'
		s.opacity = 1
		s.transform = 'none'
		}, 0)
	
	var wait = 1500 + 400 * Math.random()
	setTimeout(function () {
		s.visibility = 'visible'
		var r = Math.random()
		s.transitionDuration = wait + 'ms'
		if (s.webkitTransitionDuration) s.webkitTransitionDuration = s.transitionDuration
		angle += 1 // + Math.PI * (Math.random() - .5)
		s.top = Math.floor(800 * Math.sin(angle)) - 600 + 'px'
		s.left = 200 + Math.floor(400 * Math.cos(angle)) + 'px'
		s.width = String(Math.round(270 * r)) + 'px'
		s.height = String(Math.round(288 * r)) + 'px'
		s.opacity = 0
		r = Math.random()
		d = Math.floor(1500 * Math.random()) - 750
		if (r < .3) s.transform = 'rotate(' + d + 'deg)'
		else if (r < .85) s.transform = 'rotateX(' + d + 'deg)'
		else s.transform = 'rotateY(' + d + 'deg)'
		}, 100)
		
	setTimeout(function () {
		launch(n, false)
		}, wait + 200)
	}
copylink = function (s)	{
	var ss = s.style
	ss.transitionDuration = '0s'
	ss.backgroundColor = '#06f'
	ss.color = '#fff'
	setTimeout(function () {
		ss.transitionDuration = '1s'
		ss.backgroundColor = 'initial'
		ss.color = 'navy'
		}, 300)
	document.execCommand('copy')
	}
