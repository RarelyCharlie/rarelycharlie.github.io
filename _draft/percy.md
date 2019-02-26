---
layout: default
title: percy pig
---
<style>
html {display: block;}
img {width: 648px; height: 484px; opacity: 0; transition: opacity .5s; position: absolute; top: 0; left: 0;}
.show {opacity: 1;}
#shell {width: 648px; margin: 80px auto;}
#container {width: 648px; height: 560px; position: relative; overflow: hidden;}
#next {position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); border: 1px solid transparent; background: transparent;
    padding: 0 1px; font-size: 40px; height: 40px; width: 60px; line-height: 40px; transform: scaleY(1.5); outline: none;
    border-radius: 6px;}
#next:hover {border: 1px solid #ccc;}
</style>
<script>
init = function () {
    document.getElementById('img0').className = 'show'
    }
showing = 0
next = function () {
    document.getElementById('img' + showing).className = ''
    if (++showing > 9) showing = 0
    document.getElementById('img' + showing).className = 'show'
    }
</script>
<div id="container">
<img id="img0" src="/assets/percy/P0.png">
<img id="img1" src="/assets/percy/P1.png">
<img id="img2" src="/assets/percy/P2.png">
<img id="img3" src="/assets/percy/P3.png">
<img id="img4" src="/assets/percy/P4.png">
<img id="img5" src="/assets/percy/P5.png">
<img id="img6" src="/assets/percy/P6.png">
<img id="img7" src="/assets/percy/P7.png">
<img id="img8" src="/assets/percy/P8.png">
<img id="img9" src="/assets/percy/P9.png">
<button id="next" onclick="next()">&gt;</button>
</div>
