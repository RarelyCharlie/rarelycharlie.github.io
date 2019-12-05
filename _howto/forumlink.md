---
layout: howto
title: Link to forums
linkas: false
feedback: "https://www.7cups.com/@RarelyCharlie"
---
7 Cups does not provide an easy and reliable way to link to threads or posts in the forum.

### First page links

To link to the first page of a thread, go there and copy the URL from your browser's addresss bar.
If the URL does not end in `1/` then you should add `1/` to the end of the URL. This ensures that the 
link always points to page 1 of the thread, even in the future when it has more than one page.

Example:

If the URL looks like this:

`https://www.7cups.com/forum/Subcommunity_123/Subforum_456/Thread_789012/`

Add the page number like this:

`https://www.7cups.com/forum/Subcommunity_123/Subforum_456/Thread_789012/1/`

Test the URL before you put it in a link.

### Last page links

To link to the last page of a thread, go there and copy the URL from your browser's addresss bar.
If the URL ends with a page number, like `1/` then remove the page number. This ensures that the 
link always points to the last page of the thread, even in the future when it has more pages than now.

Example:

If the URL looks like this:
`https://www.7cups.com/forum/Subcommunity_123/Subforum_456/Thread_789012/`

Add the page number like this:
`https://www.7cups.com/forum/Subcommunity_123/Subforum_456/Thread_789012/1/`

Test the URL before you put it in a link.

### Post links

You might be able to link to a particular post if your web browser supports it. First copy the URL
from your browser's address bar and add a page number if necessary, as described above.

Go to the post and right-click the top part of it to get a context menu. Choose Inspect from the menu.
In the list of elements, scroll up a few lines until you see something like id="forum-post-1234567".
Copy this. At the end of the URL, type a #-sign and paste the id. The complete URL looks like:

`https://www.7cups.com/forum/Subcommunity_123/Subforum_456/Thread_789012/1/#forum-post-1234567`

Test the URL before you put it in a link.

*Note:* When you click on a link to a particular post, 7 Cups hides the top part of the post underneath the
navigation bar at the top of the screen. This is a bug in 7 Cups.
