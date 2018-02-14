---
title: How-to guides
layout: default
class: index
---
Here's a list of the how-to guides:
{:style="margin-top: 1em;"}

<p style="margin-left: 2em;">
{% for how in site.howto %}{% if how.class != 'index' %}
<a href="{{ how.url }}">{{ how.title }}</a><br/>
{% endif %}{% endfor %}
</p>
