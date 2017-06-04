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
h4 {font-weight: 400; margin: 0; line-height: 1.35em; color: #aaa;}
h4.section {margin-left: 2em;}
h4.chapter {font-weight: 500; margin-top: 1ex;}
h4 a {text-decoration: none;}
h4 a:hover {text-decoration: underline;}
</style>

{% for section in site.listen %}
  {% case section.class %}
    {% when 'chapter' %}
#### {{ section.title }}
{: .chapter data-serial="{{ section.serial }}" data-url="{{ section.url | remove: '.html' }}" data-title="Go to "}
    {% when 'section' %}
#### {{ section.title }}
{: .section data-serial="{{ section.serial }}" data-url="{{ section.url | remove: '.html' }}" data-title="Go to the section: "}
    {% else %}
      {% continue %}
  {% endcase %}
{% endfor %}

<script>
document.addEventListener('DOMContentLoaded', function () {
  var s = Persist.section
  var q = location.search
  if (q.indexOf('?section=') === 0) {
    s = Persist.section = parseInt(q.substr(9)) || 0
    Persist.save
    alert(s)
    }
  $('h4').each(function () {
    var h = $(this), t = h.text()
    if (s >= parseInt(h.attr('data-serial')))
      h.html('<a href="' + h.attr('data-url') + '" title="' + h.attr('data-title') + t + '">' + t + '</a>')
    })
  })
</script>
