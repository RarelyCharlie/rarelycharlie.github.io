---
title: 7 Cups Profile Search
layout: default
feedback: https://www.7cups.com/@RarelyCharlie
---

<script>
gsearch = function () {
  var q = document.getElementById('query').value.trim()
  if (!q) return
  
  var m = ''
  if (document.getElementById('mem').checked) m += ' "Member Profile - Member"'
  else if (document.getElementById('lis').checked) m += ' "Listener Profile - Listener"'
  
  var s = google.search.cse.element.getElement('g0')
  s.execute(q)
  }
</script>

Search 7 Cups profiles here.

<label for="mem"><input type="radio" id="mem" name="type"> Members only</label><br/>
<label for="lis"><input type="radio" id="lis" name="type"> Listeners only</label><br/>
<label for="the"><input type="radio" id="the" name="type"> Therapists only</label><br/>
<label for="all"><input type="radio" id="all" name="type" checked> All</label><br/>

<input id="query" size="40" onchange="gsearch()"> <button onclick="gsearch()">Search</button>

<script>
  (function() {
    var cx = '000798228100868610755:vhnbwimkjc4';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
</script>
<gcse:searchresults-only gname="g0"></gcse:searchresults-only>
