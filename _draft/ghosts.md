---
title: Ghosts
layout: default
feedback: https://www.7cups.com/@RarelyCharlie
---
<style>
#content {counter-reset: prop;}
strong {display: inline-block;}
strong::after {content: counter(prop) ": ";}
</style>
Here are some practical proposals to mitigate the problem of ghosting in chats.

Ghosting means when someone stops communication without warning. I'll call chats where this happens *abandoned*.

There are two separate sets of issues: when members ghost listeners, and when listeners ghost members. They require different solutions.

This is a complex problem that requires a complex solution, unfortunately. I've split the solution up into many separate numbered proposals that can be implemented independently one at a time. I don't think the order of implementing the proposals matters.

### When members ghost listeners

It's OK for a member to request a chat but say nothing. The member might be too nervous, or too upset, or they don't really have anything to say and they just wanted reassurance that 7 Cups really does connect them with a listener. They might try again another time.

It's also OK if a member chats for a while and then abandons the chat. We can't penalize members when we don't know anything about their circumstances.

---

*Problem*: When a chat is abandoned the listener is left waiting indefinitely. The proposed solution is:

**Proposal** A live chat times out after 8 minutes if no one has sent a message in that time. The system warns both chatters after 5 minutes. After a further 3 minutes the chat becomes an offline chat. The system notifies both chatters that the chat is now an offline chat.

If the listener sent the last message, the member must have abandoned the chat. This is OK. (The other scenario is discussed below.)

**Proposal** A timer displays the time since the last message in the chat, so that chatters don't have to keep track of the time for themselves. There is further information available for new members.

---

*Problem*: It's not clear to chatters whether a chat is live or offline. Members frequently send "Are you there?" messages to listeners who are offline or logged out. The proposed solution is:

**Proposal** The status of a chat, live or offline, is shown at the top of the chat, together with further explanation for new members.

---

*Problem*: It's not clear what the listener and member status indicators mean, and they're completely meaningless to people who have the most common (red-green) form of colour vision deficiency. The proposed solution is:

**Proposal** Change the status indicators so they use shape in addition to colour. Add information for new members explaining what they mean.

---

*Problem*: The system doesn't reliably know whether a chat is live or offline. The proposed solution is:

**Proposal** A chat is live if both chatters' status is Online or Busy and either the chat is new or both chatters have sent messages in the last 8 minutes.

As soon as an offline chat satisfies this condition, it immediately goes live. There is no need to interrupt the chat by notifying the chatters.

However if a chatter goes offline, nothing changes. This is because people sometimes get disconnected for short periods and soon return. The 8-minute timeout described above applies.

---

*Problem*: A member can make multiple chat requests, abandoning them all and leaving many listeners waiting. The proposed solution is:

**Proposal** When a chat is currently live, the member cannot make a chat request (general or personal). Attempting to make a chat request just returns the member to the current live chat, and notifies the member what happened.

Note that this does not prevent a member from chatting to many listeners at the same time, if they are listeners the member has chatted to previously.

---

*Problem*: A member can end a chat or block it immediately, without ever saying anything, then go on to make further chat requests and end or block them too.

Note that blocking a chat is genuinely necessary if the listener's first messages are inappropriate. This makes a neat solution impossible.

To approach a solution, let's assume that only weak listeners are likely to make inappropriate remarks, and only new members are likely to end or block chats inappropriately. The proposed solution, admittedly messy, is:

**Proposal** When a member ends or blocks a chat without saying anything in the chat, the listener is automatically reported, and the report quotes the listener's messages.

**Proposal** An Embraced-level member who ends or blocks a chat with a 4+-star listener after sending fewer than 10 messages in the chat has a 20-minute waiting period before they can make another chat request.

Note that this does not prevent the member from chatting with any listeners they've chatted to previously.

---

*Problem*: There have been reports that giving a listener a bad rating doesn't always affect the listener's stars, so that some listeners who behave inappropriately continue to have 4 or 5 stars. The proposed solution is:

**Proposal** Weight the calculation of listeners' star ratings so that recent bad ratings have a visible effect.

The details might depend on what data is stored by the system, which I don't know. For example, if the system only knows the listener's current star rating (to the nearest ½-star), and the total number of ratings, then an appropriate algorithm would be that the new star rating is the average of 6 of the old rating plus 1 of the new rating, rounded up to the nearest ½-star.

---

*Problem*: Listeners whose star ratings are poor, or become poor, can still be verified.

**Proposal** Make a 4-star or 5-star rating a requirement for becoming verified. If a listeners rating drops below 4-stars, they become unverified and must reapply when they meet the requirement again.

---

*Problem*: Some listeners might not care much about their star ratings. The proposed solution is:

**Proposal** Notify listeners of changes to their star rating.

---


### When listeners ghost members

*Problem*: It is not OK for a listener to take a chat and then say nothing. The proposed solution is:

**Proposal** When a new live chat times out (becoming offline), and there is at least one message from the member but none from the listener, the system asks the member whether they want to report the listener.

---

*Problem*: It is not OK for a listener to stop responding unexpectedly in the middle of a live chat.

Note that the system currently has no way of "expecting" the listener to stop responding, therefore it has no way to determine whether the listener stopped "unexpectedly" or not. The proposed solution is:

**Proposal** Change way the the End Live Chat button works. It now informs the system and both chatters that the chat is expected to end within an ending period of 8 minutes.

The *other* chatter (the one who *didn't* press the End Live Chat button) must send at least one further message within the 8 minutes. Otherwise the system will mark the chat abandoned by that other chatter.

If the person who pressed the End Live Chat button sends a message during the ending period, the ending period is cancelled and the chat is resumed.

When the chat ends it becomes an offline chat, as usual.

If neither chatter ends the chat this way, and they both simply stop, then the system considers the chat abandoned and notifies both chatters. The chatter whose last message was longest ago is then considered to have abandoned the chat. If this was the listener, the system asks the member whether they want to report the listener.
