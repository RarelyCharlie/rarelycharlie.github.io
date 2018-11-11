---
layout: default
title: EMDR
feedback: https://www.7cups.com/@RarelyCharlie
---
<style>
body {font-family: sans-serif;}
#container {width: 400px; margin: 0 auto; padding-top: 40px;}
#lightbox {border: 1px solid #ddd; margin: 0 0 1em 0;}
#lights {width: 400px; height: 40px; position: relative;}
#light {
	width: 36px; height: 36px; background: #4cf; border-radius: 50%; margin: 0 2px;
	box-shadow: 0 0 2px 2px #4cf; opacity: 0; transition: opacity 800ms ease-out;
	position: absolute; right: 0;
	top: 50%;
	-ms-transform: translateY(-50%);
	transform: translateY(-50%);
	}
p {margin: 0;}
input[type=range] {width: 400px; display: block; margin: 0 0 1em 0;}
</style>
<script>
Light = {
	flash: function (left) {
		var s = document.getElementById('light').style
		s.left = left? '0' : 'auto'
		s.right = left? 'auto' : '0'
		s.transitionDuration = '0ms'
		s.opacity = '1'
		setTimeout(() => {
			s.transitionDuration = '800ms'
			s.opacity = '0'
			}, 200)
		}
	}

Pinger = {
	init: function () {
		AudioContext = AudioContext || webkitAudioContext
    	this.ctx = new AudioContext()
    	
    	this.oscL = this.ctx.createOscillator()
    	this.oscL.frequency.value = 580
    	this.oscL.start(0)

    	this.oscR = this.ctx.createOscillator()
    	this.oscR.frequency.value = 580
    	this.oscR.start(0)
    
    	this.volL = this.ctx.createGain()
		  this.volL.gain.value = 0
		
    	this.volR = this.ctx.createGain()
		  this.volR.gain.value = 0
    	
    	this.panL = this.ctx.createStereoPanner()
    	this.panL.pan.value = -1
    	this.panR = this.ctx.createStereoPanner()
    	this.panR.pan.value = 1

		  this.volM = this.ctx.createGain() // master volume
		  this.volM.gain.value = 0.8
		
    	this.oscL.connect(this.volL)
    	this.oscR.connect(this.volR)
    	this.volL.connect(this.panL)
    	this.volR.connect(this.panR)
    	this.panL.connect(this.volM)
    	this.panR.connect(this.volM)
    	this.volM.connect(this.ctx.destination)
    	
    	this.left = true
    	this.speed = 800
		},

	fullscreen: function () {
		var d = document.getElementById('lights'),
			r = d.requestFullscreen || d.webkitRequestFullscreen
		if (!r) return
		r.call(d)
		},
	
	ping: function () {
		Light.flash(this.left)

		var v = this.left? this.volL : this.volR, now = this.ctx.currentTime
    	v.gain.exponentialRampToValueAtTime(1, now + .025)
    	v.gain.exponentialRampToValueAtTime(.125, now + .1)
    	v.gain.linearRampToValueAtTime(0, now + this.speed / 750)

		this.left = !this.left
		if (this.running) this.timer = setTimeout(() => Pinger.ping(), this.speed)    	
		},

	run: function () {
		if (this.timer) this.timer = clearTimeout(this.timer)
		this.running = true
		Pinger.ping()
		},

	stop: function () {
		if (this.timer) this.timer = clearTimeout(this.timer)
		this.running = false
		},

	toggle: function () {
		this[this.running? 'stop' : 'run']()
		document.getElementById('fullscreen').disabled = !this.running
		},
		
	vary: function (name, control) {
		var v = control.value
		switch (name) {
			case 'pitch':
				this.oscL.frequency.value = v
				this.oscR.frequency.value = v
				break
			case 'volume':
				this.volM.gain.value = v
				break
			case 'speed':
				this.speed = Math.round(60000 / v)
			}
		}
	}

document.addEventListener('DOMContentLoaded', function () {Pinger.init()})
</script>
<div id="container">
<div id="lightbox">
<div id="lights">
<div id="light"></div>
</div>
</div>
<p>Speed:</p>
<input type="range" min="30" max="150" value="90" step="10" onchange="Pinger.vary('speed', this)">
<p>Pitch:</p>
<input type="range" min="200" max="1200" value="580" step="10" onchange="Pinger.vary('pitch', this)">
<p>Volume:</p>
<input type="range" min="0" max="1" value=".8" step=".05" onchange="Pinger.vary('volume', this)">
<button onclick="Pinger.toggle()">Start/Stop</button>
<button id="fullscreen" disabled onclick="Pinger.fullscreen()">Full Screen</button>
</div>
