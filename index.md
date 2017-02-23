---
title: Just testing
layout: default
---
<style>
  #content {padding-top: 1em;}
</style>
This site is an unofficial companion to [7 Cups](https://www.7cups.com/), providing
7 Cups users with information and other resources.

{% for how in site.howto %}
 - <a href="{{ how.url }}">{{ how.title }}</a>
{% endfor %}
