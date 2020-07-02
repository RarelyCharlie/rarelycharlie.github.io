---
title: Ghosts
layout: default
feedback: https://www.7cups.com/@RarelyCharlie
---
<style>
#content {counter-reset: prop;}
strong {display: inline-block; margin-right: 1ex;}
strong::after {counter-increment: prop; content: " " counter(prop) " ";}
img {display: block; margin: 0 auto;}
.caption {text-align: center;}
</style>
Here are some practical proposals to mitigate the problem of ghosting in chats.

Ghosting means when someone stops communication without warning. I'll call chats where this happens *abandoned*.

This is a complex problem, unfortunately, and my proposal is complex too. I don't believe it is possible to prevent abandoned chats entirely, but I do believe they can be managed better.

### Analysis

It's OK for a member to request a chat but say nothing. The member might be too nervous, or too upset, or they don't really have anything to say and they just wanted reassurance that 7 Cups really does connect them with a listener. They might try again another time, and this is OK too.

It's also OK if a member chats for a while and then abandons the chat. We can't penalize members when we don't know anything about their circumstances.

Because it's not possible to prevent members from abandoning chats, I suggest taking steps to limit the impact on listeners.

It is not OK for a listener to take a chat and then say nothing.

I suggest taking steps to limit the impact on members, encourage reporting of listeners, and to make reporting more effective.

To handle these situations appropriately, the system needs to be able to determine when a chat is abandoned. This requires greater clarity in the system about when a chat is live and when it's offline, and greater clarity about the meaning of listener status (Online/Busy/Offline).

### Proposals

In summary, I propose one big change and a bunch of simpler supporting changes. The big change provides a way for the system to know when a chat has been abandoned. This involves a change in the way the End Live Chat button works.

Seven of the supporting changes are designed to limit the impact of unwanted behaviour.

Six more supporting changes are designed to provide members and listeners with clearer information, helping to set expectations more clearly.

I think these proposals can be implemented pretty much independently one at a time. The order of implemention probably doesn't matter a whole lot.

### Proposal to identify abandoned chats

*Problem:* It is not OK for a listener to stop responding unexpectedly in the middle of a live chat.

Note that the system currently has no way of "expecting" the listener to stop responding, therefore it has no way to determine whether the listener stopped "unexpectedly" or not.

To help set expectations, the proposed solution is:

**Proposal** Change way the the End Live Chat button works. It will now inform the system and both chatters that the live chat is *expected* to end within an ending period of 8 minutes.

The *other* chatter (the one who *didn't* press the End Live Chat button) must send at least one further message within the 8 minutes. Otherwise the system will mark the chat abandoned by that other chatter.

![Screenshot](/assets/ghosts/filler.png)
Listener ending live chat normally
{:.caption}

If the person who pressed the End Live Chat button sends a message more than 5 minutes into the ending period, the ending period is cancelled and the chat is resumed.

![Screenshot](/assets/ghosts/filler.png)
Live chat resumed
{:.caption}

When the live chat ends it becomes an offline chat. The messages are not cleared, because either chatter might want to continue sending messages in offline mode.


### Supporting proposals to limit impact

*Problem:* A member can end a chat or block it immediately, without ever saying anything, then go on to make further chat requests and end or block them too.

A neat solution is impossible. Blocking a chat is genuinely necessary if the listener's first messages are inappropriate, but the system doesn't understand what bad things the listener might have said.

To approach a solution, let's assume that only weak (less than 4-star) listeners are likely to make inappropriate remarks, and only new (Embraced-level) members are likely to end or block chats inappropriately.

To limit the impact on members when listeners say inappropriate things, and to encourage effective reporting, the proposed solution is:

**Proposal** When a member ends or blocks a chat without saying anything in the chat, but the listener did say something, then if the member agrees, the chat is automatically reported, and the report automatically quotes the listener's messages.

Note that the member said nothing, so there is nothing confidential in the listener's messages.

![Screenshot](/assets/ghosts/filler.png)
Confirmation that a chat will be reported automatically
{:.caption}

*Problem:* When a member abandons a chat, the listener is left waiting indefinitely. To provide clarity and limit the impact, the proposed solution is:

**Proposal** A live chat times out after 8 minutes if no one has sent a message in that time. The system warns both chatters after 5 minutes. After a further 3 minutes the chat becomes an offline chat and the system notifies both chatters. The messages are not cleared.

If the listener sent the last message, it's the member who must have abandoned the chat. This is OK.

![Screenshot](/assets/ghosts/filler.png)
Chat timing out
{:.caption}

**Proposal** If the member sent the last message, it's the listener who must have abandoned the chat. To encourage effective reporting, the system asks the member whether they want to report the listener.

![Screenshot](/assets/ghosts/filler.png)
Chat abandoned by listener
{:.caption}

*Problem:* A member can make multiple chat requests, abandoning them all and leaving many listeners waiting. To limit the impact on listeners, the proposed solution is:

**Proposal** When a chat is currently live, the member cannot make a chat request (general or personal). Attempting to make a chat request just returns the member to the current live chat (or one of them), and notifies the member what happened.

Note that this does not prevent a member from chatting to many listeners at the same time, if they are listeners the member has chatted to previously. It would be possible to limit the number of simultaneous live chats, but I'm not proposing that here.

![Screenshot](/assets/ghosts/filler.png)
Notification that new chats are not possible when a chat is live
{:.caption}

To limit the impact on listeners when a member ends or blocks multiple chats, the proposed solution is:

**Proposal** A new (Embraced-level) member who ends or blocks a chat with a 4-star or better listener after sending fewer than 10 messages in the chat has a 20-minute waiting period before they can make another chat request.

This reflects the assumption if the member is experienced or the listener is weak, the block is more likely to be genuine.

Note that this does not prevent the member from chatting with any listeners they've chatted to previously.

![Screenshot](/assets/ghosts/filler.png)
Confirmation of 20-minute waiting period
{:.caption}

*Problem:* Giving a listener a bad rating doesn't always affect the listener's stars, so that some listeners who have 4 or 5 stars behave inappropriately, and members abandon chats with them.

Inaccurate star ratings would unfairly affect new (Embraced-level) members under the proposal above, because they'd be vulnerable to weak listeners who have many stars but nevertheless say inappropriate things.

To limit the impact on new members, the proposed solution is:

**Proposal** Weight the calculation of listeners' star ratings so that recent bad ratings have a visible effect. Notify listeners of changes to their star rating.

For example, an appropriate algorithm would be that the new star rating is the average of 6 of the old rating plus 1 of the new rating, rounded up to the nearest ½-star.

Note that this will probably mean that even the very best listeners' 5-star ratings will be less stable.

![Screenshot](/assets/ghosts/filler.png)
Notification of star rating changes
{:.caption}

*Problem:* It is not OK for a listener to take a chat and then say nothing. To limit the impact on members and to encourage effective reporting, the proposed solution is:

**Proposal** When a new live chat times out (becoming an offline chat after 8 muinutes), and there is at least one message from the member but none from the listener, the system asks the member whether they want to report the listener.

![Screenshot](/assets/ghosts/filler.png)
Asking a member whether they want to report a listener.
{:.caption}


### Supporting proposals to provide clarity and set expectations

*Problem:* It's not easy for chatters to keep track of time, and they might not always realize that they have taken a long time to respond. To help set expectations, the proposed solution is:

**Proposal** A timer displays the time since the last message in the chat. There is information about what it's for.

![Screenshot](/assets/ghosts/filler.png)
Each chat has its own independent timer
{:.caption}

*Problem:* It's not clear to chatters whether a chat is live or offline. Members sometimes send "Are you there?" messages to listeners who are offline or logged out. To help set expectations, the proposed solution is:

**Proposal** The chat mode (live or offline) is shown at the top of the chat, together with further explanation.

![Screenshot](/assets/ghosts/filler.png)
Top of chat showing the mode
{:.caption}

*Problem:* It's not clear to everyone what the listener and member status indicators mean, and they're completely meaningless to people who have the most common (red-green) form of colour vision deficiency. To help set expectations, the proposed solution is:

**Proposal** Change the status indicators so they use either text (if possible), or shape, in addition to colour. Improve the colour contrast. Add information explaining what the status means.

![Screenshot](/assets/ghosts/filler.png)
Status indicator in Browse Listeners, using text
{:.caption}

![Screenshot](/assets/ghosts/filler.png)
Status indicator in forum, using text
{:.caption}

![Screenshot](/assets/ghosts/filler.png)
Status indicators in chat list, using shape
{:.caption}

*Problem:* The system doesn't reliably know whether a chat is live or offline. As a result, chatters don't reliably know what's expected of them. To help set expectations, the proposed solution is:

**Proposal** A chat is live if both chatters' status is Online or Busy and either the chat is new (no messages at all) or both chatters have sent messages in the last 8 minutes. The chat's current mode (live or offline) is clearly dispplayed to the chatters.

![Screenshot](/assets/ghosts/filler.png)
Top of live chat showing the mode
{:.caption}

As soon as an offline chat satisfies this condition, it immediately goes live and the chatters are notified.

![Screenshot](/assets/ghosts/filler.png)
Chat just went live
{:.caption}

However if a chatter goes offline, nothing changes immediately. This is because people sometimes get disconnected for short periods and soon return. The 8-minute timeout described above still applies.

*Problem:* Listeners whose star ratings are poor, or become poor, can still be verified. This gives a misleading impression to members. To help set members' expectations, the proposed solution is:

**Proposal** Make a 4-star or better rating a requirement for becoming and remaining verified. If a listener's rating drops below 4-stars, they become unverified and must reapply when they meet the requirement again.

![Screenshot](/assets/ghosts/filler.png)
Requirements to become and remain verified
{:.caption}

![Screenshot](/assets/ghosts/filler.png)
Notification of star rating change and becoming unverified
{:.caption}

*Problem:* When a member starts a chat with a listener who is busy or offline, the chat is an offline chat, but the member doesn't always know what this means. Members sometimes feel abandoned when there was in fact no live chat. To help set members' expectations, the proposed solution is:

**Proposal** After a member sends the first message in a new offline chat, the system reminds the member that the chat is offline and the listener might not be able to respond quickly.

(In fact the listener might be on a long break or have left 7 Cups altogether, and it might be good to adjust the wording of the reminder to reflect this.)

![Screenshot](/assets/ghosts/filler.png)
Notification in new offline chat
{:.caption}

### Notes

 - Chatrooms should not be affected by any of this.

 - Listener-listener chats are proposed to be always in offline mode.

 - Listeners sometimes abandon offline chats. The member should report the listener in the normal way. No change to this is being proposed.
