---
layout: howto
title: Enhance the editor
linkas: false
feedback: "https://www.7cups.com/@RarelyCharlie"
---
<!-- script>
(ff => {
  for (let f of ff) {
    let lk = document.createElement('LINK')
    lk.setAttribute('href', 'https://fonts.googleapis.com/css?family=' + f)
    lk.rel = 'stylesheet'
    document.head.append(lk)
  }})(['Noto+Serif','Noto+Sans+Mono','Italianno','Shadows+Into+Light'])
</script -->
The editor is the part of 7 Cups where you type posts in the forums and entries in your feed.

This page describes how you might be able to enhance the editor with more features. The features include lists, quotes, tables, and extra simleys.

Some of the other features in the enhanced editor are experimental, and some of them might not work. The enhanced editor is only supported on a best efforts basis without any guarantees.

### Who can enhance the editor

You can probably enhance the editor if you use 7 Cups in a web browser on a computer.

You might be able to enhance the editor if you use 7 Cups in a web browser on an Android device.

You can enhance the editor on an Apple iOS device, but it's more awkward *and the instructions are not yet available*.

You cannot enhance the editor if you use the 7 Cups App on any kind of device.

### What you need
To enhance the editor (except on Apple iOS), you need to install two things in this order: 

1. First install [Tampermonkey](http://tampermonkey.net/) in your web browser.

   If your web browser is not compatible with Tampermonkey, then you cannot proceed with the next step.

2. Next, install the [7 Cups - Forum inline editor](https://greasyfork.org/en/scripts/36395-7-cups-forum-inline-editor) script.

To install each of these in turn, click the relevant link and follow the instructions.

### Apple iOS
*Instructions for enhancing the editor in an Apple iOS web browser are not yet complete.*

Apple iOS browsers do not support Tampermonkey or similar features. This means you cannot configure Apple iOS browsers to activate the ehnanced editor automatically. This is a limitation imposed by Apple.

However, you can activate the ehnanced editor manually each time you want to use it.

These instructions are for the Safari browser. Similar methods are likely to work in other Apple iOS browsers.

To set up the enhanced editor, create a bookmarklet as follows... *[to be completed]*

To use the enhanced editor in a 7 Cups webpage, go to the webpage and tap the bookmarklet's icon. A message in the webpage tells you the enhanced editor is active. Then you can use the enhanced editor in that web page. If you reload the page, or if you go to a different page, then the enhanced editor is no longer active. To make it active again you must use the bookmarklet again.

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

Select the bottom two rows, right-click to get a context menu, choose Cell – Cell Properties, and set the background color (to #ffddbb in this example—[color names](https://www.w3schools.com/colors/colors_names.asp) and all the other standard ways to specify colors also work).

### Fonts
The enhanced editor supports five font choices:

**7 Cups** is the normal font used in 7 Cups forums (and on the page you are reading now). This normally appears identical on every device.

<table><tbody>
<tr><td>On this device:</td><td style="font-family:Raleway,sans-serif;">Fix problem quickly with galvanized jets!</td></tr>
</tbody></table>

All the other font choices may appear slightly different on different devices:

**Serif** is the default serif font on the device displaying the forum. A serif font has slightly fancier letter shapes that are sometimes said to be faster to read.

<table><tbody>
<tr><td>Similar to:</td><td><img src="/assets/editor-serif.png" height="30"></td></tr>
<tr><td>On this device:</td><td style="font-family:serif;">Fix problem quickly with galvanized jets!</td></tr>
</tbody></table>

**Typewriter** is the default monospaced font on the device displaying the forum. In a monospaced font every character is the same width, like typewritten text.

<table><tbody>
<tr><td>Similar to:</td><td><img src="/assets/editor-typewriter.png" height="30"></td></tr>
<tr><td>On this device:</td><td style="font-family:monospace;">Fix problem quickly with galvanized jets!</td></tr>
</tbody></table>

**Cursive** is the default cursive font on the device displaying the forum. In a cursive font the letters join up, like formal joined-up handwriting.

<table><tbody>
<tr><td>Similar to:</td><td><img src="/assets/editor-cursive.png" height="30"></td></tr>
<tr><td>On this device:</td><td style="font-family:cursive;">Fix problem quickly with galvanized jets!</td></tr>
</tbody></table>

**Novelty** is the default fantasy font on the device displaying the forum. It is often an informal handwriting font with separated characters.

<table><tbody>
<tr><td>Similar to:</td><td><img src="/assets/editor-novelty.png" height="30"></td></tr>
<tr><td>On this device:</td><td style="font-family:fantasy;">Fix problem quickly with galvanized jets!</td></tr>
</tbody></table>

If serif and typewriter don't work on your device, you can almost always fix this by changing the font settings in your web browser or in your operating system.

If cursive and novelty don't work on your device, you might sometimes be able to fix this by changing the font settings in your web browser or in your operating system. If not, you can use the enhanced editor to fix it. Log in to 7 Cups and go to your My Settings page. In the Display Preferences section, check the box: Load extra fonts in forums

Always be aware that other people who read your forum posts might not see the font effects the way you do. They might not see them at all. Therefore do not rely on font effects to convey important information.

### Removing the enhancement
If you want to remove the enhancement, you can temporarily disable the script or you can delete it. You can also disable or delete Tampermonkey.

### Feedback
To provide feedback, please use the forum thread: [An enhanced editor](https://www.7cups.com/forum/KitchenTable_133/SuggestionsandProblemSolving_383/Anenhancededitor_190066/)

Alternatively go to [@RarelyCharlie](https://www.7cups.com/@RarelyCharlie) and send a message.

7 Cups does not provide any support for the enhanced editor. Please do not contact 7 Cups support about it, because no one at 7 Cups can help. Instead, provide feedback to the author.

### Acknowledgment
The smiley icons are provided by [Twem<span style="color:red">❤</span>ji](https://twemoji.maxcdn.com/) and delivered by [StackPath](https://www.stackpath.com/)
