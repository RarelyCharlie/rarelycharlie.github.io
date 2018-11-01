---
title: How-to guides
layout: default
class: index
---
Here's a list of the how-to guides:
{:style="margin-top: 1em;"}

{% assign hh = site.howto | sort  %} {{ hh }}

{% for h in hh %}{% if h.class != 'index' %}
#### [{{ h.title }}]({{ h.url | remove: '.html' }} '{{ h.title }}')

{{ h.info }}
{% endif %}{% endfor %}
