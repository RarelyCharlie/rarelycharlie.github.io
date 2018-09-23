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

To search 7 Cups' public forums you can use this custom Google search. It is faster than 7 Cups' own search.

These results are sometimes slightly out of date because Google takes some time to notice changes. Some new material in the forums might not show up, but equally some material recently deleted from the forums might still appear.

<input id="query" size="40" onchange="gsearch()" autofocus> <button onclick="gsearch()">Search</button>

### 7 Cups' own search

For 7 Cups' own search, go to: [Forum Search](https://www.7cups.com/forum/search.php).

There you can search for threads you started and threads you subscribe to. If you are a listener or a therapist, the search results include the private listener and therapist areas of the forums.

You can also search 7 Cups forums from here. Searching from here can provide slightly different results.

### Community searches

It would be possible for the custom search to search within a single community. If you would find this feature useful, please send a message (PM) to [@RarelyCharlie](https://www.7cups.com/@RarelyCharlie) specifying the community or communities.

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
