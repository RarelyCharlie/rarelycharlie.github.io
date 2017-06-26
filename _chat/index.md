---
layout: chat
title: Chat Index
class: index
---
This page lists the chats on this unofficial site.

All the chats are fictional chats between an active listener called Morinda and an unnamed member. In every chat Morinda types messages and you, the reader, press the Send button to send them. In some of the chats that is all you have to do.

In many of the chats you have to choose the correct messages to send. You start these chats with five stars, and every time you make an incorrect choice you lose a star. If you lose all five of your stars the chat immediately ends.

The chats are designed to illustrate some aspects of active listening. Not all active listeners listen in the same way, and the style of listening in these chats is just one of several styles. However, all the chats on this unofficial site illustrate the same active listening style consistently.

{% for chat in site.chat %}
  {% if chat.class != 'index' %}
#### [{{ chat.title }}]({{ chat.url | remove: '.html' }} 'Go to the chat: {{ chat.title }}')
  {% endif %}
{% endfor %}
