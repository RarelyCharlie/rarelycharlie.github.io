// framed glossary support, runs in parent window
Glossary = {
	//timers...
	wait: null,
	dirty: null,
	
	input: document.getElementById("rc-find"),
	warning: document.getElementById("rc-warning"),
	window: document.getElementById('rc-glossary').contentWindow,
	touch: 'ontouchstart' in window,
	
	init: function () { // messages from inside iframe...
		addEventListener('message', function (event) {
			var d = event.data
			if (d.indexOf('height ') === 0) {
				document.getElementById('rc-glossary').height = parseInt(d.substr(7)) + 200
				if (location.hash) Glossary.gloss(location.hash.substr(1))
				}
			else if (d.indexOf('top ') === 0) {
				document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = parseInt(d.substr(4))
				if (!Glossary.touch) Glossary.input.focus()
				}
			else if (d.indexOf('no ') === 0) {
				document.getElementById('rc-warning').textContent = d.substr(3) + ' cannot be found.'
				if (this.dirty) clearTimeout(this.dirty)
				this.dirty = setTimeout(function () {
					Glossary.warning.textContent = ''
					}, 4000)
				}
			})
		},

	gloss: function (term) { // scroll to term...
		if (this.touch) this.input.blur()
		if (!term) term = this.input.value
		if (!term) return
		this.window.postMessage('gloss ' + term, '*')
		if (this.dirty) clearTimeout(this.dirty)
		this.dirty = setTimeout(function () {
			Glossary.input.value = Glossary.warning.textContent = ''
			}, 4000)
		},

	keypress: function () { // user input...
		if (this.wait) clearTimeout(this.wait)
		this.wait = setTimeout(function () {Glossary.gloss()}, 850)
		if (this.dirty) this.dirty = clearTimeout(this.dirty)
		this.warning.textContent = ''
		return event.keyCode != 13
		}

	}

Glossary.init()
