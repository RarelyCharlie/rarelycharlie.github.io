---
layout: chat
title: Chat Index
class: index
---
This page lists the chats on this unofficial site.

Most of the chats are fictional chats between an active listener called Morinda and a member or guest. In all of these chats Morinda types messages and you, the reader, press the Send button to send them. In some of the chats that is all you have to do.

In many of the chats you have to choose the correct messages to send. You start these chats with five stars, and every time you make an incorrect choice you lose a star. If you lose all five of your stars the chat immediately ends.

The chats are designed to illustrate some aspects of active listening. Not all active listeners listen in the same way, and the style of listening in these chats is just one of several styles. However, all the chats on this unofficial site illustrate the same active listening style consistently.

{% for chat in site.chat %}{% if chat.class != 'index' %}
#### [{{ chat.title }}]({{ chat.url | remove: '.html' }} 'Start the chat: {{ chat.title }}')

{{ chat.info }}
{% endif %}{% endfor %}

## Boris
Boris is a feeble listener bot that you can chat to. But when you chat to Boris, he ignores everything you say:
#### [A Chat with Boris](http://philome.la/RarelyCharlie/a-chat-with-boris/play 'A Chat with Boris')
