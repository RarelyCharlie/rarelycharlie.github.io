$(function () {
  const base = 'https://www.7cups.com'
  let h = ''
  data.sort((a, b) => a.title.localeCompare(b.title))
  for (let c of data) {
    let td = 'style="transition-duration: ' + (40 * c.forums.length) + 'ms" '
    h += '<h3><button class="caret"' + td + '><i class="fas fa-caret-right" '
      + 'title="Expand: ' + c.forums.length + ' forums"></i></button>'
      + '<a href="' + base + c.url + '">' + c.title + '</a> '
      + '<i class="' + (c.url.includes('/home/')? 'fas fa-user-friends' : 'far fa-folder') + '" '
      + 'title="' + (c.url.includes('/home/')? 'Subcommunity' : 'Forum category') + '"></i>'
      + ' <span class="count">(' + c.forums.length + ' forums)</span>'
      + '</h3>'
    if (c.strap) h += '<p>' + c.strap + '</p>'
    h += '<div class="collapsed" ' + td + '>'
    c.forums.sort((a, b) => a.title.localeCompare(b.title))
    for (let f of c.forums) {
      h += '<h4><a href="' + base + f.url + '">' + f.title + '</a></h4>'
      if (f.strap) h += '<p>' + f.strap + '</p>'
      }
    h += '</div>'
    }
  $('#map').html(h)

  $('body').on('click', '.caret', function () {
    let d = $(this).parent().nextAll('div').first()
    if ($(this).hasClass('open')) {
      d.height(0)
      $(this).removeClass('open')
      $(this).attr('title', $(this).get(0).titlewas)
      }
    else {
      d.height(d.get(0).scrollHeight)
      $(this).addClass('open')
      $(this).get(0).titlewas = $(this).attr('title')
      $(this).attr('title', 'Collapse')
      }
  	})

  var filter = function () {
    var s = $('#search').val().trim().toLowerCase()
    if (s == '') {
      $('#results').html('').hide()
      $('#map').show()
      }
    else {
      $('#map').hide()
      let r = $('#results')
      r.html('')
      $('#map h4').each(function () {
        var t = $(this).text() + ' ' + $(this).next('p').text()
        if (t.toLowerCase().includes(s)) {
          let cat = $(this).parent().prevAll('h3').first().children('a').text()
          r.append($(this).clone().append(' <span class="cat"> &mdash; ' + cat + '</span>'))
          r.append($(this).next('p').clone())
          }
        })
      r.show()
      }
  	}

  $('#search').on('keyup', function () {
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(filter, 1000)
    })
  })
