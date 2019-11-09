$(function () {
  const base = 'https://www.7cups.com'
  let h = ''
  data = datam.concat(datal)
  data.sort((a, b) => a.name.localeCompare(b.name))
  for (let c of data) {
    let acc = c.id.charAt(0)
    h += '<tr>'
      + '<td><span class="' + acc + '">' + c.name + '</span><span class="d"> </span></td>'
      + '<td><span class="d">' + c.desc + '</span>&nbsp;<span class="n">('
        + (acc == 'l'? '<a href="' + base + '/BrowseListeners/?badge=' + c.id.substring(1)
          + '" title="Browse these listeners">' : '')
        + (acc == 'm'? 'Members' : 'Listeners')	
        + ':&nbsp;' + c.n.toLocaleString()
        + (acc == 'l'? '</a>' : '')
        + ')</span></td>'
      + '</tr>'
    }
  $('#map').html(h)

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
      $('#map tr').each(function () {
        var t = $('td span', $(this)).not('.n').text()
        if (t.toLowerCase().includes(s)) {
          r.append($(this).clone())
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
