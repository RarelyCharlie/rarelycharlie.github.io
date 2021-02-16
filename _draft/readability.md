---
title: Measure readability
layout: howto
---
This page measures the readability of a passage of English text as an estimated US grade level.

Note that most people in the US read below their grade level, and over half of US adults read at the level of 6th grade or below.

<script src="/assets/coffeescript.js"></script>
<script src="/assets/readability.js"></script>

<style>
textarea {width: 100%; min-width: 100%; max-width: 100%; min-height: 16em; border: 1px solid #000;
  margin: 0 0 1ex 0; padding: 1ex;}
button {display: inline-block; margin: 0 1em 0 0; padding: 4px 12px; background: #cfc; color: #000;
  border: 1px solid #4a4; border-radius: 4px;}
button:hover {background: #beb; color: #000;}
button:disabled {background: #eee; color: #aaa; border-color: #aaa;}
#notes {margin: 8em 0 0 0; font-size: 75%; color: #aaa;}
</style>

<textarea id="text" spellcheck="false"></textarea>
<p>
<button id="score" disabled>Score</button>
<button id="clear" disabled>Clear</button>
<span id="result"></span>
</p>

<p id="notes">Readability calculation by <a href="https://github.com/sahava?tab=repositories">Simo Ahava</a><br>
CoffeeScript by <a href="https://github.com/jashkenas">Jeremy Ashkenas</a>.</p>

<script type="text/coffeescript">
UI = {}

class Grader
	constructor: ->
		document.querySelectorAll('[id]').forEach (e) -> UI[e.id] = e
		UI.score.onclick = @score
		UI.clear.onclick = @clear
		UI.text.onkeyup = @enable
		UI.text.onpaste = @enable
		do UI.text.focus

	clear: ->
		UI.text.value = UI.result.textContent = ''
		UI.score.disabled = UI.clear.disabled = true
		do UI.text.focus

	enable: ->
		UI.score.disabled = UI.clear.disabled = UI.text.value.trim() is ''
		UI.result.textContent = ''
		
	score: ->
		t = do UI.text.value.trim
		if t is ''
			do @clear
			return
		s = getScores t
		s.medianGrade = 0 if s.medianGrade < 0
		s.medianGrade = 24 if s.medianGrade > 24
		if 10 < s.medianGrade < 14 then th = 'th'
		else switch s.medianGrade % 10
			when 1 then th = 'st'
			when 2 then th = 'nd'
			when 3 then th = 'rd'
			else th = 'th'
		n = Math.round s.readingTime * 4.17
		if n is 1 then w = '1 word' else w = n.toLocaleString() + ' words'
		
		UI.result.textContent = "Estimated #{w} at #{s.medianGrade + th} grade."
		do UI.text.focus

new Grader
</script>
