const cheerio = require('cheerio')

function arrayFromLength (number) {
  return Array.from(new Array(number).keys()).map(item => ++item)
}

function searchInput ($, text) {
  let response = null

  $('.item-tab__chars-item').each((i, value) => {
    let keyName = $(value).find('.item-tab__chars-key').text()
    if (keyName.indexOf(text) >= 0 && !!keyName && keyName.length) {
      response = $(value).find('.item-tab__chars-value').text().trim()
    }
  })

  return response
}

module.exports = {
  arrayFromLength,
  searchInput
}