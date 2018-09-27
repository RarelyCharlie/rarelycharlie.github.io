---
title: Taglist service
layout: default
feedback: https://www.7cups.com/@RarelyCharlie
---
## Taglist service {:#init}
Welcome to the taglist service.

The service is starting. This can take 10 seconds or so...<span id="start-spin" class="spinner"></span>
{:#start}

The service is not available. Please try later. {:#start-warn .warning}

The service is running. {:#running}

<hr>

## Register a new taglist {:#register}
Use this form to create a new taglist.

For more information, see the <a href="#">Howto</a> guide.

First, register the name of the new taglist:

<input type="text" id="register-name" class="register"> <span id="register-spin" class="spinner" hidden></span>>

That name is already registered. {:.warning #register-warn}

<button id="register-button" disabled onclick="Taglist.register()">Register</button>

## Create the control thread {:#control}

The taglist <a href="" class="listname"></a> is now registered.

In any public forum at 7 Cups, make a new thread in the normal way, using the Create New Thread button. (Do not use a listener forum or a therapist forum for this.)

Copy and paste the following instructions into the first post in the thread:

 >This thread controls an auto-updating taglist. To see the current list, go to <a  class="listname" href=""></a>.>
 >To add yourself to this taglist, press the Post to Thread button above and write <i>the exact words</i> "Please add me.">
 >To remove yourself from this taglist, press the Post to Thread button above and write <i>the exact words</i>, "Please remove me."

Add any other information you like. For example, explain how the taglist will be used.

Optionally tag some people to populate the list, by writing "Please add:" followed by the list of tags, separated by spaces in the normal way. You can populate the list later if you prefer.

Send the post in order to create the thread.

Copy the URL of the new forum thread you just created.

Open the taglist by clicking the link you just pasted in the forum (or one of the links on this page). Follow the instructions there.

## Setup {:#setup}

The taglist requires a control thread in a public 7 Cups forum.

Please paste the thread's URL here and press the Setup button:

<input type="text" id="setup-url">

<button id="setup-button" disabled onclick="Taglist.control()">Setup</button>

## Taglist {:#open}

This is an auto-updating taglist controlled by a forum thread. Post there to add or remove yourself: <a id="open-control" title="Control thread for this taglist" href=""></a>

The taglist was not found. {:.warning #open-warn}

<div id="open-container">
<textarea readonly class="empty" id="open-list" spellcheck="false"></textarea>
<span id="open-spin" class="spinner"></span>
</div>

<button class="open" id="open-copy" onclick="Taglist.copy()">Copy</button><span id="open-copied"></span>

Owner: <a id="open-owner" title="This taglist's owner" href=""></a>

For more information, see the <a title="Taglist service documentation" href="#">Howto guide</a>.

## Taglist service {:#notfound}

No taglist was found.

For more information, see the <a title="Taglist service documentation" href="#">Howto guide</a>.
