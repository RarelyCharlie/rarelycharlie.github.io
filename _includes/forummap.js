$(function () {
  const base = 'https://www.7cups.com'
  let h = ''
  for (let c of data) {
    h += '<h3><a href="' + base + c.url + '">' + c.title + '</a></h3>'
    if (c.strap) h += '<p>' + c.strap + '</p>'
    }
  $('#map').html(h)
  })
