---
layout: howto
title: Use Smart Links
linkas: false
feedback: "https://www.7cups.com/@RarelyCharlie"
---
<style>.fa {display: inline-block; margin-right: 4px; color: #07d;} .fa-plus {color: #0a0;} .fa-minus {color: #a00;} .fa-thumb-tack {color: #fa0; transform: rotate(17deg);} .fa-star {color: #f44; transform: rotate(-7deg);} .fa-pencil {color: #830;} .fa-cog {color: #667;} .fa-quote-left {color: #fff; text-shadow: 1px 0 0 #07d, 0 1px 0 #07d, -1px 0 0 #07d, 0 -1px 0 #07d;} .blue {color: #07d;}</style>

Smart Links is an additional menu for the 7 Cups website. It pops up when you move your mouse pointer over the teacup icon at the top left.

The Smart Links menu continuously learns which 7 Cups webpages you use most often, and provides you with 1-click access to them. As your use of the 7 Cups website changes, the Smart Links menu continuously adapts.

![screenshot](/assets/smartlinks1.png){:style="width: 358px; height: 328px;"}

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

If you stop visiting certain pages, Smart Links eventually forgets them and they disappear from the Smart Links menu, making room for other pages that you use more often.

### Customizing Smart Links

To customize Smart Links, use the toolbar at the bottom of the Smart Links menu.

### <i class="fa fa-thumb-tack"></i> Pin this page

A pin indicates a page that is fixed in the menu, overriding the learning algorithm.

To pin a link to the top of the menu, go to the page you want to link and press the thumb tack icon in the Smart Links toolbar. Optionally change the page title.

To unpin a pinned page, go to the page and press the thumb tack icon again. The unpinned page remains in the menu if it's a page you often visit. Otherwise the page disappears from the menu.

If you find you need to pin many pages, a better way to manage them might be to use your web browser's bookmarks feature, perhaps in combination with an extension,

### <i class="fa fa-star"></i> Star this page

A star indicates a temporary reminder to visit a 7 Cups page and do something.

To star a link, go to the page you want to link and press the star icon in the Smart Links toolbar. Optionally type a reminder of your reason for starring the link.

When you hover your mouse pointer over a starred link, you see the reminder.

When you next visit the page it automatically loses its star. The page remains in the menu if it's a page you often visit, or if it's pinned. Otherwise the page disappears from the menu. You can star it again if you need another reminder to visit the page.

### <i class="fa fa-pencil"></i> Edit this page's title

It can sometimes be useful to change the title, because page titles at 7 Cups are inconsistent.

To change a 7 Cups page's title, go to the page and press the pencil icon in the toolbar. Smart Links might forget the new title if the page is one you don't often visit, unless the link is pinned to the menu.

### <i class="fa fa-link"></i> Capture a link in this page

You can capture any link that you see in a 7 Cups page and pin it to the Smart Links menu. This is particularly useful for external links. For example, you could capture a link from 7 Cups to a Google form.

To capture a link, press the link button in the Smart Links toolbar. Then click the link in the page. It can be in the body of the page or in a menu. It must be a link to another page, not a link to another part of the same page.

After capturing the title and URL, optionally edit the title and provide a reminder. If you provide a reminder, then the link will be starred. Otherwise it will be pinned.

### <i class="fa fa-plus"></i> Add any link

To add any link to the menu, copy the URL from the page itself or from a link to the page. Press the plus button in the Smart Links toolbar. Type a title for the link, and paste the URL that you copied.

You can add links to external pages in this way. They are pinned to the menu until you manually remove them. You cannot star these links.

If you add a link to a 7 Cups page in this way, it is no different from any other pinned 7 Cups page.

### <i class="fa fa-minus"></i> Remove any link

To remove any link from the menu, press the minus button in the Smart Links toolbar. Then click the link you want to remove.

To remove another link from the menu, you must press the minus button again.

Removing a link to a 7 Cups page does not prevent it from reappearing if you continue visit the page often.

### <i class="fa fa-cog"></i> Settings

To adjust Smart Links' behavior, press the cog wheel button in the Smart Links toolbar.

You can change the maximum number of smart links shown in the menu. This number does not include starred and pinned links at the top.

You can make Smart Links more forgetful, so that links to pages you do not visit often disappear from the menu more quickly, allowing new links to take their place.

If you make the forgetfulness zero, then Smart Links never forgets, and once the menu is full it never changes. If you make it too large, then the menu might be unstable, making it difficult to use reliably.

### Link types

Smart Links uses these icons to indicate the type of link:

<i class="fa fa-star"></i> Starred link (temporary reminder)\\
<i class="fa fa-thumb-tack blue"></i> Pinned link, unaffected by the learning algorithm\\
<i class="fa fa-link"></i> Smart link added by the learning algorithm

It uses these icons to indicate links to certain types of page:

<i class="fa fa-external-link"></i> External page (that is, not at 7 Cups)\\
<i class="fa fa-quote-left"></i> Forum\\
<i class="fa fa-comment-o"></i> 1-to-1 chat\\
<i class="fa fa-comments-o"></i> Chatroom

### Further information

Note that page titles at 7 Cups are not consistent.

For example, if you click on the link [About 7 Cups](https://www.7cups.com/about/) you see a page with the top-level heading, "7 Cups is an on-demand emotional health service and online therapy provider" where the page title is "About Us - Online Therapy Provider". Smart Links uses the page title, and you have the option to change it.

Chats and chatrooms all use a page with the title "Connect". If you switch person or room within the Connect page, 7 Cups does not change the URL.

Smart Links changes the page title from Connect to the name of the person or room that loads first, but if you switch person or room within the page, Smart Links is not aware of the switch.

This means that to pin or star a chat, you must go to that chat directly from another page so it's the first chat that loads.

The main Forums page has the title "Online Therapy & Suppost Forum". It has four tabs: Popular, New, Top and Needs Reply. Smart Links recognizes the four tabs as separate URLs, but they all have the same page title. You can change the page title manually. It's possible a future version of Smart Links will change these page titles automatically.

The [Browse Listeners](https://www.7cups.com/BrowseListeners/) link in the Chat menu links to a page with the title and heading, "Need to talk to someone?" You can customize the search on this page, and 7 Cups reflects the customized search in the URL. Therefore Smart Links recognizes each customized search as a separate page. However, these pages all have the same title. You can change the title manually.

The [Our Team](https://www.7cups.com/about/ourteam.php) page has nine tabs, but 7 Cups does not distinquish between them either in the URL or in the page title. Therefore Smart Links cannot tell them apart, and it is not possible to link to a particular tab.

### Known issues
Known issues in version 0.1:

- On the main Forums page, the four tabs all have the same page title.
- On the Connect page, Smart Links is not aware if you change the person or room.
- When capturing a link from a menu, the title is sometimes weird.
- It's not possible to star an external link (unless you capture it from a 7 Cups page).
- On the Browse Listeners page, the title does not reflect the search parameters.
- It's not possible to link to a particular tab on the Our Team page.

### Removing Smart Links
If you want to remove Smart Links, you can temporarily disable the script in Tampermonkey's menu. Or you can delete it from Tampermonkey's dashboard. You can also disable or delete Tampermonkey as a whole.

### Feedback
To provide feedback, please use the forum thread: [Smart Links]()

Alternatively go to [@RarelyCharlie](https://www.7cups.com/@RarelyCharlie) and send a message.

7 Cups does not provide any support for Smart Links. Please do not contact 7 Cups support about it, because no one at 7 Cups can help. Instead, provide feedback to the author.

### Acknowledgments

Smart Links was inspired by an idea posted in the forums by @DanaMH.
