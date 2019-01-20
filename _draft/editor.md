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
The editor is the part of 7 Cups where you type posts in the forums and entries in your feed.

This page describes how you might be able to enhance the editor with more features. The features include lists, quotes, tables, and extra smileys.

Some of the other features in the enhanced editor are experimental, and some of them might not work. The enhanced editor is only supported on a best efforts basis without any guarantees.

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
Apple iOS browsers and some others do not support Tampermonkey or similar features. This means you cannot configure these browsers to activate the ehnanced editor automatically. This is a limitation imposed by Apple or the browser manufacturer.

However, you can activate the ehnanced editor manually each time you want to use it.

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

The enhanced editor replaces the normal editor in the forums in new threads, replies to threads, and replies to posts. Ideally, it should replace the editor used when moderating posts, but this is uncertain at the time of writing.

It replaces the feed editor.

It does not replace the profile (About You or "bio") editor in your My Settings page.

When replying in a forum thread, you can scroll up and down the thread, and you can copy text from the thread to paste in your reply. If you lose your place, the Post to Thread button at the top and any Reply button anywhere in the thread link directly to the reply you are typing.

However, if you switch to another page in a long thread you lose the reply you are typing. To copy text from another page, open it in a new browser tab or window.

### Example
This example shows a reply in a forum:

![Editor example](/assets/editor.png){:style="width:616px;height:299px;"}

To create a table like this press the Table button (on the bottom row, 4th from the right). In the dialog that pops up the number of rows is already 3. Change the number of columns to 8, the width to 100%, and press OK.

Type the text in the table now or leave it for later.

Select the top row and press the Bold button.

Select the bottom two rows, right-click to get a context menu, choose Cell – Cell Properties, and set the background color (to `#ffddbb` in this example—[color names](https://www.w3schools.com/colors/colors_names.asp) and all the other standard ways to specify colors also work).

### Emoji
A button in the toolbar provides more than 120 built-in emoji. You can also copy and paste emoji from various web pages. The built-in emoji are from a set of 2,841 emoji you can copy and paste from [Twem*❤️*ji](https://twemoji.maxcdn.com/2/test/preview.html).
{:.twemoji}

In chats 7 Cups supports 15 smileys. You type them as text, like `:)` and they are converted to images later. For convenience most of the same text smileys are also supported in the editor, although the resulting emoji are not identical. Here's the list:

|`:D`|![Grinning](https://twemoji.maxcdn.com/2/72x72/1f600.png)|`;)`|![Winking](https://twemoji.maxcdn.com/2/72x72/1f609.png)|

### Fonts
The enhanced editor supports five font choices, but limitations in web browsers mean that many other forum users will not see your choice of font. Do not rely on font effects to convey important information.

**7 Cups** is the normal font used in 7 Cups forums (and on the page you are reading now). This normally appears identical on every device.

<table><tbody>
<tr><td>On this device:</td><td style="font-family:Raleway,sans-serif;">Fix problem quickly with galvanized jets!</td></tr>
</tbody></table>

All the other font choices may appear slightly different on different devices. The shape of the characters is the important feature, not the size or weight.

**Serif** is the default serif font on the device displaying the forum. A serif font has slightly fancier letter shapes that are sometimes said to be faster to read.

<table><tbody>
<tr><td>Similar to:</td><td class="serif sample">Fix problem quickly with galvanized jets!</td></tr>
<tr><td>On this device:</td><td style="font-family:serif;">Fix problem quickly with galvanized jets!</td></tr>
</tbody></table>

**Typewriter** is the default monospaced font on the device displaying the forum. In a monospaced font every character is the same width, like typewritten text.

<table><tbody>
<tr><td>Similar to:</td><td class="typewriter sample">Fix problem quickly with galvanized jets!</td></tr>
<tr><td>On this device:</td><td style="font-family:monospace;">Fix problem quickly with galvanized jets!</td></tr>
</tbody></table>

**Cursive** is the default cursive font on the device displaying the forum. In a cursive font the letters join up, like formal joined-up handwriting.

<table><tbody>
<tr><td>Similar to:</td><td class="cursive sample">Fix problem quickly with galvanized jets!</td></tr>
<tr><td>On this device:</td><td style="font-family:cursive;">Fix problem quickly with galvanized jets!</td></tr>
</tbody></table>

**Novelty** is the default fantasy font on the device displaying the forum. It is often an informal handwriting font with separated characters.

<table><tbody>
<tr><td>Similar to:</td><td class="novelty sample">Fix problem quickly with galvanized jets!</td></tr>
<tr><td>On this device:</td><td style="font-family:fantasy;">Fix problem quickly with galvanized jets!</td></tr>
</tbody></table>

If serif and typewriter don't work on your device, you can almost always fix this by changing the font settings in your web browser or in your operating system.

If cursive and novelty don't work on your device, you might sometimes be able to fix this by changing the font settings in your web browser or in your operating system.

If you cannot fix the cursive and novelty fonts by changing font settings, then you can use the enhanced editor to fix them. Log in to 7 Cups and go to your My Settings page. In the Display Preferences section, check the box: Load extra fonts in forums  There is no need to save the settings, because the change takes effect immediately. If you have member and listener accounts, it affects both.

### Removing the enhancement
If you want to remove the enhancement, you can temporarily disable the script or you can delete it. You can also disable or delete Tampermonkey.

### Feedback
To provide feedback, please use the forum thread: [An enhanced editor](https://www.7cups.com/forum/KitchenTable_133/SuggestionsandProblemSolving_383/Anenhancededitor_190066/)

Alternatively go to [@RarelyCharlie](https://www.7cups.com/@RarelyCharlie) and send a message.

7 Cups does not provide any support for the enhanced editor. Please do not contact 7 Cups support about it, because no one at 7 Cups can help. Instead, provide feedback to the author.

### Acknowledgments
The smiley icons are provided by [Twem<span style="color:red">❤</span>ji](https://twemoji.maxcdn.com/) and delivered by [StackPath](https://www.stackpath.com/)

The fonts on this page are provided by [Google Fonts](https://fonts.google.com/): Raleway ("7 Cups"), Source Serif Pro ("serif"), Source Code Pro ("typewriter") and Shadows Into Light ("novelty"). Source Code Pro and Shadows Into Light are also loaded by the enhanced editor when required.
