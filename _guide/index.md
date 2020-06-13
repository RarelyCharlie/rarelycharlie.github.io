---
title: General guides
layout: default
class: index
---
<style>#content h4 {margin-bottom: 0;}</style>
Here's a list of the general guides:
{:style="margin-top: 1em;"}

{% for g in site.guide %}{% if g.class != 'index' %}
#### [{{ g.title }}]({{ g.url | remove: '.html' }} '{{ g.title }}')

{{ g.info }}
{% endif %}{% endfor %}
