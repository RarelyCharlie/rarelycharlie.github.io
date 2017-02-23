---
title: How-to guides
layout: default
---
Here's a list of the how-to guides:

<p style="margin-left: 2em;">
{% for how in site.howto %}
<a href="{{ how.url }}">{{ how.title }}</a><br/>
{% endfor %}
</p>
