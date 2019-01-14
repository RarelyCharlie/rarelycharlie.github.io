---
---
<div style="width: 1140px; margin: 0 auto;">
            
<script>
waiting = 0
show = function () {
	if (waiting) clearTimeout(waiting)
	waiting = setTimeout(function () {
		document.getElementById('result').innerHTML = document.getElementById('html').value
		}, 800)
	}
onload = show
</script>

<div id="container" style="width: 1140px; margin: 0 auto;">
            
<textarea id="html" style="width: 100%; min-height: 20em; font-family: monospace; border: 1px solid black; padding: 1ex; white-space: pre-wrap;" onkeyup="show()" spellcheck="false">
&lt;div style="background: url(https://i.imgur.com/RuRI45G.jpg) no-repeat #F4F6F7 0 35%;
font-size:17px;color:#ffffff;padding:10px;border:4px solid #ffffff;">
&lt;strong> My Involvement&lt;/strong>&lt;br/>
Community Mentory Leader for 35+ &lt;br/>
Support Team Leader for 35+&lt;br/>
Forum Mentor for 35+ and 50 plus&lt;br/>
Forum Supporter&lt;br/>
Support session leader&lt;br/>
Feed Team&lt;br/>
Peer Support&lt;br/>
Verifying Listeners&lt;br/>
&lt;/div>
</textarea>
<hr>
<div id="result"></div>
<div>

<div>
