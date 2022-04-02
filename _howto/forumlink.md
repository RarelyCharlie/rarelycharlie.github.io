---
layout: howto
title: Link to forums
linkas: false
feedback: "https://www.7cups.com/@RarelyCharlie"
---
7 Cups does not provide an easy and reliable way to link to threads or posts in the forum.

### First page links

To link to the first page of a thread, go there and copy the URL from your browser's addresss bar.

If it has a question mark near the end, remove the question mark and everything after it.

### Specific page links

To link to a specific page of a thread, go there and copy the URL from your browser's addresss bar.

The URL will end with a page number, like `/?p=5`, unless it's the only page.

### Last page links

There is no way to link to the last page of a thread. You can link to the specific page number, but if more pages are added your link will no longer go to the last page.

### Post links

You might be able to link to a particular post if your web browser supports it. First copy the URL
from your browser's address bar.

If it has a question mark near the end, remove the question mark and everything after it.

Go to the post and right-click the top part of it to get a context menu. Choose Inspect from the menu.
In the list of elements, scroll up a few lines until you see something like `<div id="forum-post-1234567"`.
Copy the number part of the id that you see between the quotes. At the end of the URL, type '?post=` and paste the number.

*Example:*

A complete post link URL looks like:

`https://www.7cups.com/forum/Subcommunity_123/Subforum_456/Thread_789012/?post=1234567`

Test the URL before you put it in a link.

Note that the URL does not specify the page number. This is because the post might not remain on the same page as more replies are added to the thread.

