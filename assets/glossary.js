// framed glossary support, runs in parent window
rc_wait = null
rc_cleanup = null

rc_keypress = function () {
	if (rc_wait) clearTimeout(rc_wait)
	rc_wait = setTimeout(rc_gloss, 850)
	if (rc_cleanup) {
		clearTimeout(rc_cleanup)
		rc_cleanup = null
		}
	return event.keyCode != 13
	}
 
rc_gloss = function () {
  console.log('rc_gloss')
  }
  
addEventListener('message', function (event) {
	var d = event.data.split(' ')
	if (d[0] == 'height') document.getElementById('rc-glossary').height = d[1] + 40
	})
