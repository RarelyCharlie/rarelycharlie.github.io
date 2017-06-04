---
layout: listen
title: Index
class: index
---
This is the index to the unofficial listener training course.

It lists the sections you have completed, so that you can revisit them.

You can also reset the course from here and start again from the beginning.

<button onclick="nextpage()">Begin the Course</button>

<style>
h4 {font-weight: 400; margin: 0; line-height: 1.35em;}
h4.section {margin-left: 2em;}
h4.chapter {font-weight: 500; margin-top: 1ex;}
h4 a {text-decoration: none;}
h4 a:hover {text-decoration: underline;}
</style>

{% for section in site.listen %}
  {% case section.class %}
    {% when 'chapter' %}
#### {{ section.title }}
{: .chapter data-serial="{{ section.serial }}" data-url="{{ section.url | remove: '.html' }}" data-title="Go to this chapter"}
    {% when 'section' %}
#### {{ section.title }}
{: .chapter data-serial="{{ section.serial }}" data-url="{{ section.url | remove: '.html' }}" data-title="Go to this section"}
    {% else %}
      {% continue %}
  {% endcase %}
{% endfor %}
