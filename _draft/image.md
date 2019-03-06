---
layout: howto
title: Add an image to a post
---
At 7 Cups you cannot upload images. This guide describes how to add an image to a post in a 7 Cups forum or feed.

7 Cups does not support audio or video in forums and feeds, but animated images work normally.

### An image on a secure public website

If the image is on a secure public website, where you do not have to log in, then you can drag the image and drop it into 7 Cups:
<style>
html {display: block;}
figure {opacity: 0; transition: opacity .5s; position: absolute; top: 0; left: 0;}
.show {opacity: 1;}
img {width: 406px; height: 259px;}
#shell {width: 406px; margin: 80px auto;}
#container {width: 480px; height: 340px; position: relative; overflow: hidden;}
#next {position: absolute; bottom: 20px; right: 0; transform: translateX(-50%); border: 1px solid transparent;
    background: transparent; padding: 0 1px; height: 16px; 3em; line-height: 16px; outline: none;}
#next:hover {border: 1px solid #ccc;}
code {font-size: 80%;}
</style>
<script>
init = function () {
    document.getElementById('img0').className = 'show'
    }
showing = 0
next = function () {
    document.getElementById('img' + showing).className = ''
    if (++showing > 6) showing = 0
    document.getElementById('img' + showing).className = 'show'
    }
</script>
<div id="container">
<figure id="img0"><img src="/assets/post/Post0.png">
    <figcaption>Start in 7 Cups by opening the editor.</figcaption>
    </figure>
<figure id="img1"><img src="/assets/post/Post1.png">
    <figcaption>In a new browser tab, find the image.</figcaption>
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
<button id="next" onclick="next()">Next &gt;</button>
</div>

You can also drag an image from one browser window to another.

### No mouse button?

When using a mousepad, double-tap the image but don't release the second tap. Then move your mouse pointer to drag the image. If you run out of mousepad, you might be able to move things around so there is less distance to travel.

On some touch screens you can tap and hold to drag the image.

### Device can't drag-and-drop?

If your device doesn't support drag-and-drop, try right-clicking the image to get a context menu. Choose Copy image. Then go to 7 Cups, right-click in the editor and choose Paste.

In some web browsers Paste uses a popup window where you have to right-click and choose Paste a second time.

If you can't right-click because you have no mouse, or your mouse doesn't have a second button, you can probably find an equivalent for your device. It might be a long tap, a two-fingered tap, hold down the Control key and click, or something else.

### You only get a URL?

If you don't end up with an image, only a URL like `https://classroomclipart.com/images/...clipart.jpg` undo the paste operation or delete the URL, and press the editor's Image button. Paste the URL in the popup Image Properties dialog.

### Not even a URL?

Some images on websites can't be dragged, and can't be copied. For example, profile images at 7 Cups are like this.

Depending on your web browser, you might be able to right-click the image and choose Inspect. This reveals the images's URL embedded in other code. You can copy the URL alone and use it as above.

![Inspect example](/assets/post/Post7.png)

In this example the URL is: `//7cupstearesources.s3.amazonaws.com/listenerImages/lGVjdnyYjpedlLBpVlqTxg!!.jpg`

However, some URLs obtained in this way do not work, and some things that look like images do not have URLs at all.

### Image in the wrong place?

If the image is not on a secure public website, then you must place it on a secure public website before you can use it in 7 Cups. For example, you will have to do this if the image is on your own device or in your private blog.

Many people use [imgur](https://imgur.com) for this. Ensure that you are *not* signed in to imgur. Press the New Post button, then copy the image to imgur using any of the techniques described above. When the image is on imgur, use any of the techniques described above to copy it into a post on 7 Cups.

Instead of imgur, you can use any kind of cloud storage that allows anonymous public access to images.

### Why a secure public website?

If an image is on your device, then you can see it but no one else can.

If an image is on a website where you have to log in, then you and other logged in users can see it but other people might not be able to. Also, a hacker might be able to trace the image to your account. This depends on the website.

If an image is on a public website that's not secure, then most people can see it but people who have strict security settings will not be able to see it. This is because images from unsecured websites can be hacked.

This means the only good place to store images for use on 7 Cups is a secure public website.

