---
layout: howto
title: Enhance the editor
linkas: false
feedback: "https://www.7cups.com/@RarelyCharlie"
---
<script>
  WebFontConfig = {
    google: {families: ['Source Serif Pro', 'Source Code Pro', 'Italianno','Shadows Into Light']}
    },
   (function (d) {
      var wf = d.createElement('script'), s = d.scripts[0]
      wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'
      wf.async = true
      s.parentNode.insertBefore(wf, s)
      })(document)
</script>
<style>
.serif {font-family: 'Source Serif Pro'; font-size: 105%;}
.typewriter {font-family: 'Source Code Pro';}
.cursive {font-family: Italianno; font-size: 180%;}
.novelty {font-family: 'Shadows Into Light'; font-size: 105%;}
.sample {display: none;}
.wf-italianno-n4-active .sample,
.wf-shadowsintolight-n4-active .sample,
.wf-sourceserifpro-n4-active .sample,
.wf-sourcecodepro-n4-active wf-active .sample {display: block;}
img[src*=twemoji] {width: 24px; height: 24px;}
.twemoji em {font-style: normal; color: #d8f;}
</style>
The editor is the part of 7 Cups where you type posts in the forums.

This page describes how you might be able to enhance the editor with more features. The features include lists, quotes, tables, and extra smileys.

Some of the other features in the enhanced editor are permanently experimental, and some of them might not work. The enhanced editor is only supported on a best efforts basis without any guarantees. The current version is 4.0.

<p style="color: #a00; border: 1px solid #a00; padding: 1ex; margin-left: -1ex;">In May 2021, 7 Cups suddenly banned some formatting possibilities in the forum. As a result, many features of the enhanced editor that rely on formatting no longer work.</p>


### Who can enhance the editor

You can probably enhance the editor if you use 7 Cups in a web browser on a computer.

You might be able to enhance the editor if you use 7 Cups in a web browser on an Android device.

You can enhance the editor on an Apple iOS device, but it's more awkward. This method might also work on some other devices.

You cannot enhance the editor if you use the 7 Cups App on any kind of device.

### What you need
To enhance the editor (except on Apple iOS), you need to install two things in this order: 

1. First install [Tampermonkey](http://tampermonkey.net/) in your web browser.

   If your web browser is not compatible with Tampermonkey, then you cannot proceed with the next step (but you might be able to use the method for Apple iOS instead).

2. Next, install the [7 Cups - Forum inline editor](https://greasyfork.org/en/scripts/36395-7-cups-forum-inline-editor) script.

To install each of these in turn, click the relevant link and follow the instructions.

### Apple iOS
Apple iOS browsers and some others do not support Tampermonkey or similar features. This means you cannot configure these browsers to activate the enhanced editor automatically. This is a limitation imposed by Apple or the browser manufacturer.

However, you can activate the enhanced editor manually each time you want to use it.

These instructions are for the Safari browser. Similar methods are likely to work in some other browsers.

To set up the enhanced editor, create a bookmarklet as follows:

 1. First copy this very long line of code, making sure you get all of it:
 
<div style="font-family: monospace; font-size: 10px; line-height: 12px; overflow-wrap: break-word; width: 100%; background: #eee; border: 1px solid #aaa; margin-bottom: 1em; padding: 1ex;">javascript:with(document)void(head.appendChild(createElement('script')).src='https://greasyfork.org/scripts/36395-7-cups-forum-inline-editor/code/7%20Cups%20-%20forum%20inline%20editor.user.js')</div>

 2. Bookmark any page, for example, this page.

 3. Go to your list of bookmarks and find the bookmark you just made.

 4. Tap Edit at the bottom right of the list, and then tap the new bookmark to edit it.

 5. Optionally change the title, perhaps to something like "Load 7 Cups editor"

 6. Long-tap the URL and choose Select All.

 7. Paste the line of code you copied, completely replacing the URL.

 8. On the keyboard, tap Done, and then Done in the list to cancel edit mode.

To use the enhanced editor in a 7 Cups webpage, go to the webpage and tap the bookmarklet's icon. A message in the webpage tells you the enhanced editor is active. Then you can use the enhanced editor in that web page. If you reload the page, or if you go to a different page, then the enhanced editor is no longer active. To make it active again you must use the bookmarklet again.

You do not need to load the enhanced editor in every page, of course. Only load it before creating a new thread or replying.

### Using the enhancement

The enhanced editor replaces the normal editor in the forums in new threads, replies to threads, replies to posts, and when editing existing posts.

It does not replace the profile (About You or "bio") editor in your My Settings page.

When replying in a forum thread, you can scroll up and down the thread, and you can copy text from the thread to paste in your reply. If you lose your place, the Post to Thread button at the top and any Reply button anywhere in the thread link directly to the reply you are typing.

However, if you switch to another page in a long thread you lose the reply you are typing. To copy text from another page, open it in a new browser tab or window.

### Signature

To add a plain text signature to your posts, go to your My Settings page in 7 Cups. Specify your signature below your screen name (for listeners) or in the Display Settings section (for members). Your signature is saved automatically as you type. There is no need to save all of your settings.

You can edit or remove the signature in each post individually.

If more than one 7 Cups account uses the computer, then each account has a separate signature—for example, if you are a listener with a member account, or if more than one person shares a computer.

To turn the signature off, go back to your My Settings page and remove the signature.

### Known issues

- Some formatting is blocked by 7 Cups.

### Removing the enhancement
If you want to remove the enhancement, you can temporarily disable the script or you can delete it. You can also disable or delete Tampermonkey.

### Feedback
To provide feedback, please use the forum thread: [An enhanced editor](https://www.7cups.com/forum/KitchenTable_133/SuggestionsandProblemSolving_383/Anenhancededitor_190066/)

Alternatively go to [@RarelyCharlie](https://www.7cups.com/@RarelyCharlie) and send a message.

7 Cups does not provide any support for the enhanced editor. Please do not contact 7 Cups support about it, because no one at 7 Cups can help. Instead, provide feedback to the author.

