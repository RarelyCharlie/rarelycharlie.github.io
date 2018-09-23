---
title: Search forums
layout: howto
feedback: https://www.7cups.com/@RarelyCharlie
---

<script>
gsearch = function () {
  var q = document.getElementById('query').value.trim()
  if (!q) return
  
  var s = google.search.cse.element.getElement('g0')
  s.execute(q)
  }
</script>

To search forums at 7 Cups, go to: [Forum Search](https://www.7cups.com/forum/search.php)

You can also search 7 Cups forums from here. Searching from here can provide slightly different results.

This is a custom Google search. These results are sometimes slightly out of date because Google takes some time to notice changes. Some new material in the forums might not show up here, but some material deleted from the forums might still be here.

<input id="query" size="40" onchange="gsearch()" autofocus> <button onclick="gsearch()">Search</button>

<script>
  (function() {
    var cx = '000798228100868610755:mwroieuxmvs';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
</script>
<gcse:searchresults-only gname="g0"></gcse:searchresults-only>
