---
title: 7 Cups Profile Search
layout: default
feedback: https://www.7cups.com/@RarelyCharlie
---
Testing:

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
<gcse:search gname="g0"></gcse:search>

<script>
test = function () {
  var s = google.search.cse.element.getElement('g0')
  var se = s.execute
  s.execute = function (q) {
    console.log('+++ ' + q)
    se.call(s, q)
    }
  }
</script>
<button onclick="test()">Test</button>
