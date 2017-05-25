---
layout: listen
title: Index
class: index
---
# Index

This is the index to the unofficial listener training course.

It lists the sections you have completed, so that you can revisit them.

You can also reset the course from here and start again from the beginning.

<button onclick="nextpage()">Begin the Course</button>

{% for section in site.listen %}
  {% if section.class == 'index' %}
    {% continue %}
  {% else %}
    <h3 data-serial="{{ section.serial }}">{{ section.title }}</h3>
  {% endif %}
{% endfor %}

