Pinger = {
	settings: false, // settings pane open

	init: function () {
		UI.init()

		this.audio = window.AudioContext || window.webkitAudioContext
    	if (this.audio) {
	    	this.ctx = new this.audio

			this.osc = this.ctx.createOscillator()
			this.osc.frequency.value = 440

			this.shapeL = this.ctx.createGain()
			this.shapeL.gain.value = 0
			this.osc.connect(this.shapeL)
		
			this.shapeR = this.ctx.createGain()
			this.shapeR.gain.value = 0
			this.osc.connect(this.shapeR)
		
			this.merge = this.ctx.createChannelMerger(2)
			this.shapeL.connect(this.merge, 0, 0)
			this.shapeR.connect(this.merge, 0, 1)
		
			this.volume = this.ctx.createGain()
			this.volume.gain.value = 0.8
			this.merge.connect(this.volume)
		
			this.volume.connect(this.ctx.destination)
			}
		else {
			UI.unavailable('sound', this.audio)
			this.mute(true)
			UI.toggle('mute', true)
			UI.disable('mute', true)
			}
    	
    	this.left = true
    	this.speed = 1000
    	
    	if (UI.fullscreenrequest) this.movement(true)
    	else {
    		UI.toggle(UI.full)
    		UI.disable('full', true)
    		this.movement(false)
    		}

		addEventListener('keypress', function (evt) {
			if (Pinger.debounce) return
			if (!(UI.fullscreenrequest || Pinger.running || Remote.mode == 2)) return
			if (UI['settings-button'].className) return
			if ([32, 37, 39].indexOf(evt.keyCode) < 0) return
			if (evt.keyCode == 32) Pinger.toggle()
			else {
				var s = UI.speed, v = parseInt(s.value)
				if (evt.keyCode == 37) s.value = v - 5
				else if (evt.keyCode == 39) s.value = v + 5
				Pinger.vary('speed', s)
				}
			evt.stopPropagation()
			evt.preventDefault()
			Pinger.debounce = true
			setTimeout(() => Pinger.debounce = false, 200)
			})

		document.addEventListener('webkitfullscreenchange', function(evt) {
			Light.customize(document.webkitIsFullScreen)
			})
		document.addEventListener('mozfullscreenchange', function(evt) {
			Light.customize(document.fullScreen || document.mozFullScreen || document.fullscreenElement)
			})
		document.addEventListener('fullscreenchange', function(evt) {
			Light.customize(document.fullScreen || document.fullscreenElement)
			})

		Persist.init()
		Remote.init()
		},
	
	fullscreen: function () {
		var r = UI.fullscreenrequest
		if (r) r.call(UI.lights)
		},
		
	movement: function (ok) {
		UI.disable('size', !ok)
		UI.disable('hue', !ok)
		Light.canmove = ok
		},
	
	mute: function (mute) {
		var r = UI.volume
		if (mute) this.volumewas = r.value, r.value = 0
		else r.value = this.volumewas
		this.vary('volume', r)
		UI.disable('volume', mute)
		UI.disable('pitch', mute)
		this.muted = mute
		},

	ping: function () {
		Light.flash(this.left)

		if (this.ctx) {
			this.ctx.resume()

			var s = this.left? this.shapeL : this.shapeR, now = this.ctx.currentTime,
				d = now + this.speed / 750
			s.gain.value = .01
	 		s.gain.exponentialRampToValueAtTime(1, now + .05)
    		s.gain.exponentialRampToValueAtTime(.125, now + .15)
    		s.gain.linearRampToValueAtTime(.01, d)
    		s.gain.setValueAtTime(.000000001, d + .1)
    		}

		this.left = !this.left
		if (this.running) this.timer = setTimeout(() => Pinger.ping(), this.speed)
		Remote.poll(false)
		},

	run: function () {
		if (this.running) return

		var set = UI['settings-button'].className == 'open',
			full = UI.full.isDown
		
		if (full && !set) this.fullscreen()

		UI.speed.focus()

		if (this.timer) this.timer = clearTimeout(this.timer)
		if (this.ctx) this.ctx.resume()
		try {this.osc.start(0)} catch (e) {}
		this.running = true
		Light.control(false)
		Light.customize(full)
		Pinger.ping()
		Remote.update(this.speed)
		Remote.start()
		},

	stop: function () {
		if (!this.running) return
		if (this.timer) this.timer = clearTimeout(this.timer)
		this.running = false
		Light.control(true)
		Light.customize(false)
		Remote.update(0)
		},

	toggle: function () {
		this[this.running? 'stop' : 'run']()
		},

	togglesettings: function (btn) {
		if (!btn) btn = UI['settings-button']
		var c = btn.className, div = btn.parentNode.nextElementSibling
		if (c == 'open') { // so now close it...
			div.style.paddingTop = '0'
			div.style.height = '0'
			btn.className = ''
			if (Remote.mode != 1) this.stop()			
			btn.blur()
			Light.customize(Light.canmove)
			this.settings = false
			}
		else { // open it...
			div.style.paddingTop = '8px'
			div.style.height = (div.scrollHeight + 8) + 'px'
			btn.className = 'open'
			btn.parentNode.className = 'open'
			if (Remote.mode != 2) this.run()
			Light.customize(Light.canmove)
			this.settings = true
			}
		setTimeout(() => {
			btn.lastElementChild.className = c == 'open'? 'fa fa-caret-down' : 'fa fa-caret-up'
			btn.parentNode.className = btn.className
			}, 350)
		},
		
	vary: function (name, control) {
		if (!control) control = document.getElementById(name)
		var v = control.value 
		switch (name) {
			case 'pitch':
				var p = Math.round(440 * Math.pow(2, v / 12))
				if (this.osc.frequency.value == p) break
				
				var rising = this.osc.frequency.value < p 
				this.osc.frequency.value = p

				var n = parseInt(v) + 21, a = n % 12, octave = (n - a) / 12, // note 0 to 36, actual 0 to 11
					notes, h, accidental // notes list, Helmholtz name, ♯ or ♭
				if (rising) {
					notes = 'ccddeffggaab'
					h = notes[a]
					accidental = notes[a - 1] == h? '♯' : ''
					}
				else {
					notes = 'cddeefggaabb'
					h = notes[a]
					accidental = notes[a + 1] == h? '<b>♭</b>' : ''
					}
				if (h == 'f') h = h + '\u200A' // fix kerning
				h = h + accidental + '\u2032'.repeat(octave) 
				
				UI['pitch-value'].innerHTML = h
				break
			case 'volume':
				UI['volume-value'].textContent = Math.round(100 * v)
				if (this.volume) this.volume.gain.value = v
				break
			case 'speed':
				UI['speed-value'].textContent = v
				this.speed = Math.round(60000 / v)
				if (this.running) Remote.update(this.speed)
				break
			case 'size':
				UI['size-value'].textContent = Math.round(v / 2)
				r = UI.light
				r.style.width = r.style.height = v + 'px'
				break
			case 'hue':
				var r = UI.light,
					h = 'hsl(' + v + ', 100%, 63%)'
				r.style.backgroundColor = h
				r.style.boxShadow = '0 0 2px 2px ' + h
				UI.hueValue.style.backgroundColor = h
				UI.hueValue.textContent = v + '°'
				break				
			}
		}

	}

Light = {
	canmove: true, 
	
	control: function (play) {
		var p = UI.playpause
		p.className = 'fa fa3x fa-' + (play? 'play' : 'pause')
		p.title = play? 'Start' : 'Pause'
		},
		
	customize: function (custom) {
		var s = UI.light.style
		var v = custom? UI.size.value : UI.size.defaultValue
		s.width = s.height = v + 'px'
		v = 'hsl(' + (custom? UI.hue.value : UI.hue.defaultValue) + ', 100%, 63%)'
		s.backgroundColor = v
		s.boxShadow = '0 0 2px 2px ' + v
		},

	flash: function (left) {
		var s = UI.light.style
		s.left = left? '0' : 'auto'
		s.right = left? 'auto' : '2px'
		s.transitionDuration = '0ms'
		s.opacity = '1'
		setTimeout(() => {
			s.transitionDuration = '800ms'
			s.opacity = '0'
			}, 200)
		}

	}

Remote = {
	url: 'https://rarelycharlie.herokuapp.com/emdr/',
	mode: 0, // 0 = local, 1 = client, 2 = therapist
	id: '', // ID of this browser
	pin: '',
	speed: 0,

	init: async function () {
		if (!this.url) return
		UI['allow-remote'].style.display = 'block'
		var [status, data] = await this.api('ping', null) // wake up the server :(
		},
	
	alert: function (t, fade) {
		var d = UI.alert, s = d.style
		d.innerHTML = '<i class="fa fa-lg fa-exclamation-triangle"></i>' + t
		if (!fade) return
		
		s.transitionDelay = '4s'
		s.transitionDuration = '1s'
		s.opacity = '0'
		setTimeout(function () {
			d.innerHTML = ''
			s.opacity = '1'
			s.transitionDelay = '0s'
			s.transitionDuration = '0s'
			}, 5000)
		},

	api: async function (action, data) {
		console.log('api: ' + action + ' ' + JSON.stringify(data))
		if (!action) return
		if (!data) data = {}
		data.action = action
		var response
		try {
			response = await fetch(this.url, {
				method: 'POST',
				headers: {'Content-Type': 'application/json; charset=utf-8'}, 
				body: JSON.stringify(data),
				cache: 'no-cache'
				})
			}
		catch (e) {
			console.log('+++ ERROR ' + e)
			return [0, 'No connection']
			}
		if (response) {
			var body = await response.text()
			console.log('  +api: ' + response.status + ' ' + body)
			return [response.status, body]
			}
		else return [404, 'Not found']
		},

	connect: async function () { // client connecting...
		this.speed = 0, Pinger.stop()

		var [status, data] = await this.api('notify', {id: this.id, mode: this.mode})
		console.log('connect: ' + status + ' ' + data)
		var [status, data] = await this.api('read', {pin: this.pin})
		console.log('  initial read: ' + data)
		if (status == 200 ) {
			UI['client-connected'].className = ''
			var s = parseInt(data)
			this.speed = s
			if (s == 0) { // stop...
				console.log('connected, stopped')
				this.idle(true)
				Pinger.stop()
				}
			else { // set speed...
				console.log('connected, speed ' + s)
				UI.speed.value = Math.round(60000 / s)
				Pinger.vary('speed', UI.speed)
				this.idle(false)
				Pinger.run()
				}
			}
		else if (status == 0) {
			this.alert('Connection failed.', true)
			this.reset()
			}
		else { // status 404 Not found
			this.alert(this.pin + ' is not a valid PIN.', true)
			var r = UI.pin
			r.value = ''
			r.focus()
			}
		},

	idle: function (idle) { // free-running poll while stopped...
		console.log('>>> idle ' + idle) 
		if (idle && !this.idler) this.idler = setInterval(function () {Remote.poll(true)}, 2000)
		else if (!idle && this.idler) this.idler = clearInterval(this.idler), 0
		},

	poll: async function (insist) { // get latest speed...
		if (this.mode != 1) return
		if (!insist) {
			if (this.throttle) return
			this.throttle = true
			setTimeout(function () {Remote.throttle = false}, 2000)
			}
		
		var [status, data] = await this.api('read', {pin: this.pin})
		console.log('poll: ' + data)
		if (status == 200 ) {
			var swas = this.speed, s = parseInt(data)
			this.speed = s
			if (s == 0) { // stop...
				console.log('poll: stopped, idling...' + swas)
				if (swas) this.idle(true), Pinger.stop()
				}
			else { // set speed...
				if (s != swas) {
					this.idle(false)
					UI.speed.value = Math.round(60000 / s)
					Pinger.vary('speed', UI.speed)
					console.log('connected, speed ' + s)
					}
				}
			}
		},

	reset: function () {
		setTimeout(function () {
			UI.pin.value = ''
			UI['mode-single'].checked = true
			Remote.setmode(0)
			}, 5000)
		},

	setmode: async function (m) {
		console.log('setmode ' + m)
		this.mode = m // 0 = single, 1 = client, 2 = therapist
		
		var pin = UI.pin
		pin.value = ''
		
		UI['client-connected'].className = 'hidden'
		
		UI.disable('pin', m == 0)
		pin.readOnly = m == 2
		
		UI.disable('mute', m == 2 || !Pinger.audio)
		UI.disable('full', m == 2 || !Light.canmove)

		Pinger.mute(m == 2)
		Pinger.movement(m != 2)
		
		if (m == 1) pin.focus()
		
		if (m == 2) { // therapist connect...
			Pinger.stop()
			UI.toggle('full', false)
			UI.toggle('mute', true)
			var [status, data] = await this.api('notify', {id: this.id, mode: this.mode})
			console.log('connect: ' + status + ' ' + data)
			if (status == 200) {
				this.pin = data
				pin.value = data
				UI.status.textContent = 'Paired therapist ' + this.pin
				}
			else {
				this.alert('No PIN available.', true)
				this.reset()
				}
			}
		},

	setpin: function (v) { // client entered pin...
		var ok = v.match(/\d{4}/)
		if (ok) {
			this.pin = v
			this.connect()
		 	}
		},

	start: function () {
		if (this.mode != 1) return
		UI.disable('speed', true)
		UI.status.textContent = 'Paired client ' + this.pin
		if (this.speed) Pinger.run()
		},

	update: function (v) {
		if (this.mode != 2) return // only therapist sends updates		
		console.log('Remote update: ' + v)
		this.api('update', {pin: this.pin, value: v})
		}
	
	}

Persist = {
	init: function () {
		var data = JSON.parse(localStorage.getItem('emdr') || '{}'), now = (new Date).valueOf()
		if (data.at && now - data.at > 3600000) Pinger.pin = '' // expires after 1 hour
		else Remote.pin = data.pin || ''
		Remote.id = data.id || now + '-' + ('0'.repeat(11) + Math.round(1e12 * Math.random())).slice(-12)
		window.onunload = this.save
		},

	save: function () {
		localStorage.setItem('emdr', JSON.stringify(
			{id: Remote.id, pin: Remote.pin, at: (new Date).valueOf()}
			))
		}
	}
	
UI = {
	init: function () {
		for (let e of document.querySelectorAll('[id]')) this[e.id] = e
		
		for (let e of document.querySelectorAll('input[type=range]'))
			e.value = e.getAttribute('value')
		
		this.fullscreenrequest = this.lights.requestFullscreen
		  || this.lights.webkitRequestFullscreen
		  || this.lights.mozRequestFullScreen
		  || this.lights.msRequestFullscreen
		  || null
		//this.fullscreenrequest = null // TEST <<<<<<<<<<<<<
		this.unavailable('movement', this.fullscreenrequest)
		
		this.toggle(this.mute, false)
		this.toggle(this.full, false)
		},

	disable: function (id, disable) { // disable label and control
		var r = this[id]
		if (!r) console.log('disable ' + id + ' failed')
		r.disabled = disable
		if (r.parentNode.tagName == 'LABEL') {
			r.parentNode.className = (disable? 'disabled' : '')
			r.parentNode.setAttribute('foo', 'bqar')
			}
		},

	hide: function (id, hide) { // hide label and control
		var r = this[id]
		r.parentNode.style.display = hide? 'none' : 'block'
		},
		
	toggle: function (btn, force) {
		if (typeof(btn) == 'string') btn = this[btn]
		var down = typeof(force) == 'boolean'? force : !btn.className
		btn.className = down? 'down' : ''
		btn.isDown = down
		if (btn.id == 'mute') Pinger.mute(down)
		else if (btn.id = 'full') Pinger.movement(down), Light.customize(down && Pinger.settings)
		},

	unavailable: function (id, obj) {
		if (!obj) this[id].textContent += ' (not available)'
		}
 
	}
