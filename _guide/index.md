---
title: General guides
layout: default
class: index
---
Here's a list of the general guides:
{:style="margin-top: 1em;"}

<p style="margin-left: 2em;">
{% for g in site.guide %}{% if g.class != 'index' %}
<a href="{{ g.url }}">{{ g.title }}</a><br/>
{% endif %}{% endfor %}
</p>
