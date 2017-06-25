n = 0
showmessage = function () {
	var p = $('#content > ul > li').eq(n)
	if (!p.length) { // end of chat...
		var c = $('#content'), u = $('#content>ul')
		c.append('<p>The chat has ended.</p>', remarks)
		if (remarks.length) setTimeout(function () {
			remarks.show()
			showbase()
			}, 2000)
		showbase()
		return
		}

	var t = p.contents().get(0).nodeValue // text
	if (t == '') return // just in case

	var d = Math.max(1200, 2500 * parseInt(t)) // delay
	t = t.replace(/^\d*/, '')

	var c = t.charAt(0) // class
	if (c == 'L') c = 'listener'
	else if (c == 'M') c = 'member'
	else if (c == 'Q') c = 'quiz'
	else c = 'info'
	t = t.substr(1).trim() // text

	var q = $('li', p) // quiz choices
	if (c == 'quiz' && q.length) { // show quiz
		t = '<p class="lede">' + t + '</p><p class="radios">'
		q.each(function (i, e) {
			var id = 'q' + n + 'r' + i
			var r = $(this).text()
			var v = parseInt(r) // value
			r = r.replace(/^\d*\s*/, '')
			t += '<label for="' + id + '">' +
				'<input type="radio" name="q' + n + '" id="' + id + '" data-help="' + v + '">' +
				r +
				'</label><br>'
			})
		t += '</p>'
		}

	if (c == 'member') setTimeout(function () {
		$('#content').append('<p class="typing">The member is typing&hellip;</p>')
		showbase()
		}, d / 2)

	setTimeout(function () {
		if (c == 'listener') slowtype(t)
		else if (c == 'member') {
			$('.typing').replaceWith('<p style="opacity: 0;" class="' + c + '">' + t + '</p>')
			showbase()
			$('#content p:last-child').fadeTo(400, 1, showmessage)
			}
		else if (c == 'info') {
			$('#content').append('<p class="' + c + '">' + t + '</p>')
			showbase()
			showmessage()
			}
		else if (c == 'quiz') {
			$('#content').append(t)
			showbase()
			}
		}, d)

	showbase()
	++n
	}
	
slowtype = function (t) {
	showbase()
	if (t == '') {
		setTimeout(function () {$('#send').removeAttr('disabled')}, 400)
		return
		}
	var c = t.charAt(0), m = $('#msgtext')
	setTimeout(function () {
		m.text(m.text() + c)
		slowtype(t.substr(1))
		}, 40 + 40 * Math.random())
	}
	
sendmessage = function () {
	showbase()
	if ($(this).attr('disabled')) return
	$('#content').append('<p class="listener">' + $('#msgtext').text() + '</p>')
	$('#send')[0].scrollIntoView()
	$('#msgtext').text('')
	$(this).attr('disabled', true)
	showmessage()
	}
	
radioclick = function (evt) {
	var i = evt.target, v = i.getAttribute('data-help') % 43
	$('#content p.hint').remove()
	$('#content').append('<p class="hint">' +
		(v < 20? 'Yes. ' : 'No. ') + cheat[v] +
		(v < 20? '' : ' You lost a star.') + '</p>')
	if (v < 20) { // OK
		$('#content input').prop('disabled', true)
		slowtype(i.nextSibling.nodeValue)
		}
	else { // bad choice...
		var s = $('#stars .fa-star')
		s.last().attr('class', 'fa fa-star-o')
		if (s.length == 1) { // out of stars...
			$('#content input').prop('disabled', true)
			$('#content').append('<p class="info">You have no more stars. The member blocked you.</p>')
			}
		}
	showbase()
	}
	
showbase = function () {
	$('#stars')[0].scrollIntoView()
	}

var remarks
document.addEventListener('DOMContentLoaded', function () {
	$('#send').on('click', sendmessage)
	remarks = $('#content>ul').nextAll()
	if (remarks.length) remarks.first().prepend('<strong>Reflection: </strong>')
	remarks.hide()
	$('#content').on('change', radioclick)
	$('#content').show()
	if ($('ul ul').length) $('#stars i').show()
	showmessage()
	})
