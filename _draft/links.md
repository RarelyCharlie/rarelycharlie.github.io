---
layout: howto
title: Use Smart Links
linkas: false
feedback: "https://www.7cups.com/@RarelyCharlie"
---
<style>i.fa {display: inline-block; margin-right: 1ex; color: #07d;} .fa-plus {color: #0a0;} .fa-minus {color: #a00;} .fa-thumb-tack {color: #fa0; transform: rotate(17deg);} .fa-star {color: #f44; transform: rotate(-7deg);} .fa-pencil {color: #07d;} .fa-cog {color: #667;} .fa-quote-left {color: #fff; text-shadow: 1px 0 0 #07d, 0 1px 0 #07d, -1px 0 0 #07d, 0 -1px 0 #07d;}</style>
Smart Links is an additional menu for the 7 Cups website. The Smart Links menu continuously learns which 7 Cups webpages you use most often, and provides upiu with 1-click access to them. As your use of the 7 Cups website changes, the Smart Links menu continuously adapts.

Some Smart Links features are experimental, and some might not work. Smart Links is only supported on a best efforts basis without any guarantees. The current version is 0.1.

### Who can use Smart Links

You can probably use Smart Links if you use 7 Cups in a web browser on a computer.

You might be able to use Smart Links on an Android device, but some features might not work.

You cannot use Smart Links on an Apple iOS device.

You cannot use Smart Links if you use the 7 Cups App on any kind of device.

### What you need
To use Smart Links, you need to install two things in this order: 

1. First install [Tampermonkey](http://tampermonkey.net/) in your web browser.

   If your web browser is not compatible with Tampermonkey, then you cannot proceed with the next step.

2. Next, install the [7 Cups - Smart Links](https://greasyfork.org/en/scripts/zzzzzzzzzzz) script.

To install each of these in turn, click the relevant link and follow the instructions.

### Using Smart Links

To use Smart Links on the 7 Cups website, move your mouse pointer over the teacup icon at the top left. The Smart Links menu pops up. When you move your mouse pointer out of the Smart Links menu, it disappears.

You do not need to do anything to set up the menu. It continuously learns which 7 Cups pages you use most often. Initially the Smart Links menu is empty. As you use 7 Cups normally, it gradually fills.

If you stop visiting certain pages, Smart Links eventually forgets them and the they disappear from the Smart Links menu, making room for other pages that you use more often.

### Customizing Smart Links

To customize Smart Links, use the toolbar at the bottom of the Smart Links menu.

### <i class="fa fa-thumb-tack"></i> Pin this page

A pin indicates a page that is fixed in the menu, overriding the learning algorithm.

To pin a 7 Cups page to the top of the menu, go to the page and press the thumb tack icon in the toolbar. Optionally change the page title.

To unpin a pinned page, go to the page and press the thumb tack icon again. The page remains in the menu if it's a page you often visit. Otherwise the page disappears from the menu.

### <i class="fa fa-star"></i> Star this page

A star indicates a temporary reminder to visit a 7 Cups page and do something.

To star a page at the top of the menu, go to the page and press the star icon in the toolbar. Optionally type a reminder of your reason for starring the page.

When you visit the page it loses its star. The page remains in the menu if it's a page you often visit, or if it's pinned. Otherwise the page disappears from the menu. You can star it again if you need another reminder to visit the page.

### <i class="fa fa-pencil"></i> Edit page title

Page titles at 7 Cups are inconsistent. At 7 Cups the text of a link, the title of the page it links to, and the main heading on that page might all be different. Smart Links generally uses the page title, but it can sometimes be useful to change the title.

To change a 7 Cups page's title, go to the page and press the pencil icon in the toolbar. Smart Links might eventually forget the new title, unless the page is pinned to the menu.

### <i class="fa fa-plus"></i> Add a link

To add any link to the menu, copy the URL from the page itself or from a link. Press the plus button in the Smart Links toolbar. Type a title for the link, and paste the URL that you copied.

You can add links to external pages in this way. They are pinned to the menu until you manually remove them.

If you add a link to a 7 Cups page in this way, it is no different from any other pinned 7 Cups page.

### <i class="fa fa-minus"></i> Remove a link

To remove any link from the menu, press the minus button in the Smart Links toolbar. Then click the icon at the left of the link you want to remove.

Removing a link to a 7 Cups page does not prevent it from reappearing if you continue visit the page often.

### <i class="fa fa-cog"></i> Settings

To adjust Smart Links' behavior, press the cog wheel button in the Smart Links toolbar.

You can change the maximum number of smart links shown in the menu. This number does not include starred and pinned links at the top.

You can make Smart Links more forgetful, so that links to pages you do not visit often disappear from the menu more quickly, allowing new links to take their place.

If you make the forgetfulness zero, then Smart Links never forgets, and when the menu is full it never changes. If you make it too large, then the menu might be unstable, making it difficult to use reliably.

### Link type

Smart Links uses icons to indicate links to certain types of page. These icons are only for information.

<i class="fa fa-external-link"></i> External link (not at 7 Cups)\\
<i class="fa fa-quote-left"></i> Forum\\
<i class="fa fa-comment-o"></i> Chat\\
<i class="fa fa-comments-o"></i> Room\\


### Further information

Chats and chatrooms all use a page with the title Connect. Smart Links changes the page title to match the name of the person or room. 

