---
layout: howto
title: Add an image to a post
---
<style>
html {display: block;}
img {width: 406px; height: 259px; opacity: 0; transition: opacity .5s; position: absolute; top: 0; left: 0;}
.show {opacity: 1;}
#shell {width: 406px; margin: 80px auto;}
#container {width: 406px; height: 560px; position: relative; overflow: hidden;}
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
    if (++showing > 7) showing = 0
    document.getElementById('img' + showing).className = 'show'
    }
</script>
<div id="container">
<figure id="img0"><img src="/assets/post/Post0.png">
    <figcaption>Start in 7 Cups by opening the editor.</figcaption>
    </figure>
<figure id="img1"><img src="/assets/post/Post1.png">
    <figcaption>In a new browser tab, find the image you want to use.</figcaption>
    </figure>
<figure id="img2"><img src="/assets/post/Post2.png">
    <figcaption>Hold your mouse button down and drag the image up to the tab bar...</figcaption>
    </figure>
<figure id="img3"><img src="/assets/post/Post3.png">
    <figcaption>...over the tab where 7 Cups is...</figcaption>
    </figure>
<figure id="img4"><img src="/assets/post/Post4.png">
    <figcaption>...so your browser switches back to 7 Cups.</figcaption>
    </figure>
<figure id="img5"><img src="/assets/post/Post5.png">
    <figcaption>Now drag the image down into the editor...</figcaption>
    </figure>
<figure id="img6"><img src="/assets/post/Post6.png">
    <figcaption>And finally release your mouse button to drop the image there.</figcaption>
    </figure>
<button id="next" onclick="next()">&gt;</button>
</div>
