const cheerio = require('cheerio')

const { taskQueue } = require('../helpers/parallel')
const getContent = require('../helpers/puppeteer')
const { searchInput } = require('../helpers/common')
const { addItem } = require('./saver')

module.exports = async function parsePage (pageUrl, baseUrl) {
  const content = await getContent(pageUrl)
  const $ = cheerio.load(content)
  const bookLinks = []

  $('.book__image-link').each((i, value) => {
    const link = $(value).attr('href')
    bookLinks.push(`${baseUrl}${link}`)
  })


  bookLinks.forEach(item => {
    taskQueue.push(async () => {
      await parsePageItem(item)
    })
  })
}

async function parsePageItem (pageLink) {
  const content = await getContent(pageLink)
  const $ = cheerio.load(content)

  const author = searchInput($, 'Автор')
  const name = $('.item-detail__title').text()
  const price = $($('.item-actions__price').get(1)).text()
  const yearPublishing = searchInput($, 'Год издания')
  const img = $('.item-cover__item').attr('href')

  const priceList = $('td').find('b').toArray().map(item => $(item).text().match(/\d+/)[0])
  const minPrice = Math.min(...priceList)

  console.log({
    author,
    name,
    price,
    yearPublishing,
    img,
    minPrice
  })

  addItem({
    author,
    name,
    price,
    yearPublishing,
    img,
    minPrice
  })
}