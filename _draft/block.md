---
---
<html>
<head>
<meta charset="UTF-8">
<title>Draft block dialog</title>
<script src="https://code.jquery.com/jquery-3.2.1.min.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://www.7cups.com/css/bootstrap.min.css?v=5.1">
<style>
@import url("https://fonts.googleapis.com/css?family=Work+Sans:300,400,700");
body {font-family: "Work Sans", sans-serif; padding-top: 0;}
#blue {background: #2960ba; width: 100vw; height: 100vh;}
#dialog {
	width: 520px; height: auto;
	margin: 60px auto 0 auto; border-radius: 20px;
	padding: 20px; text-align: center;
	background: #fff;
	}
h4, label, select, textarea {display: block; width: 100%; margin-bottom: 12px;}
h4, label, #go, p {float: left;}
h4 {position: relative; text-align: left;}
button.close {position: absolute; right: 0;}
label, p {text-align: left;}
#go {width: auto;}
#go:disabled {color: #d99;}
#reason, option.placeholder {color: #888;}
option.placeholder, #reason.disabled, #explainshot.disabled, #nodetail.disabled, #problem.disabled {opacity: .25;}
option {color: #000;}
#explain1 {display: none;}
#success {font-size: 200%; text-align: center; margin-top: 30%; display: none;}
</style>
<script>
$(() => {
	var wait = null
	var detailed = () => {
		var p = $('#problem').val().trim()
		return p && p.split(' ').length > 3
		} 
	var enableGo = () => {
		var ok = !$('#dorep').prop('checked')
			|| ($('#reason').val() != 'none' && detailed())
		$('#go').prop('disabled', !ok)
		$('#go').attr('title', ok? 'Click to submit the form' : 'Please complete the form to enable this button')
		$('#go span').toggle($('#dorep').prop('checked'))
		return ok
		}
	var reset = () => {
		$('#success').hide()
		$('#dorep').prop('checked', true)
		$('#reason').prop('disabled', false).val('none').css('color', '#888')
		$('#problem').prop('disabled', false).val('').attr('placeholder', 'Describe what happened in detail. If possible, include the screenshot URL.')
		$('#explainshot, #nodetail').removeClass('disabled')
		$('#explain0').show(), $('#explain1').hide()
		enableGo()
		$('#blue').fadeIn(800)
		}
	$('#dorep').on('click', function () {
		$('#explain0').toggle()
		$('#explain1').toggle()
		$('#explainshot, #nodetail').toggleClass('disabled')
		
		$('#reason').prop('disabled', !this.checked)
		$('#reason #problem').css('color', this.checked? ($('#reason').val() == 'none'? '#888' : '#000') : 'transparent')
		
		$('#problem').prop('disabled', !this.checked)
		$('#problem').attr('placeholder', this.checked? 'Describe what happened in detail. If possible, include the screenshot URL.' : '')
		$('#problem').attr('spellcheck', this.checked)
		
		enableGo()
		})
	$('#reason').on('change', function () {
		$(this).css('color', $(this).val() == 'none'? '#888' : '#000')
		enableGo()
		})
	$('#problem').on('keyup', function () {
		if (wait) wait = clearTimeout(wait)
		wait = setTimeout(enableGo, 600)
		})
	$('#go').on('click', function () {
		if (!enableGo()) return
		$('#success').text($('#dorep').prop('checked')?
			'The listener was blocked and reported.' : 'The listener was blocked.').show()
		$('#blue').fadeOut(50)
		setTimeout(reset, 2500)
		})
	$('#close').on('click', function () {
		$('#success').text('The dialog was canceled.').show()
		$('#blue').fadeOut(50)
		setTimeout(reset, 2500)
		})
	})
</script>
</head>
<body>
<div id="blue">
<div id="dialog" class="clearfix">
<h4>
<span>Block and Report the Listener</span>
<button id="close" class="close" title="Cancel and close">×</button>
</h4>
<label><input type="checkbox" id="dorep" checked> Report this listener, in addition to blocking</label>
<p id="explain0">The listener will be blocked and reported.</p>
<p id="explain1">The listener will be blocked. No report will be sent.</p>
<p id="explainshot">If possible, screenshot the chat <em>before</em> using this form. Upload the screenshot anonymously to <a href="https://imgur.com/">imgur.com</a> or another image sharing site. Copy its URL from there.</p>
<select id="reason" class="form-control">
            <option class="placeholder" selected="selected" value="none">Select a reason...</option>         
                <option value="rumor">Spreading rumor or gossip</option>
                <option value="contact">Asking for or sharing personal contact info</option>
                <option value="confidential">Sharing confidential information</option>
                <option value="threatening">Harassing or threatening behavior</option>
                <option value="inappropriate">Sexting, flirting or other inappropriate chat</option>
                <option value="drugs">Appearing to be under the influence of drugs or alcohol</option>
                <option value="harm">Appearing to be suicidal, homicidal or an abuser</option>
                <option value="other">Other, specified in detail below...</option>
        </select>
<textarea id="problem" class="form-control" rows="6" placeholder="Describe what happened in detail. If possible, include the screenshot URL."></textarea>
<p id="nodetail">If you do not include enough detail, the report will be ignored.</p>
<button id="go" class="btn btn-block btn-danger btn-lg" disabled title="Please complete the form to enable this button">Block <span>and report </span>badListener1234</button>
</div>
</div>
<p id="success"></p>
</body>
</html>
