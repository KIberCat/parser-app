const { taskQueue } = require('./helpers/parallel')
const { arrayFromLength } = require('./helpers/common')
const parsePage = require('./handlers/parsePage')
const { cleanResult, saveResult } = require('./handlers/saver')

const RESOURCE_URL = 'https://book24.ru'
const PAGE_URL = 'https://book24.ru/catalog/programmirovanie-1361/page-'
const PAGE_COUNT = 1

const START_TIME = Date.now()
console.log('Start')

cleanResult()

taskQueue.drain(() => {
  saveResult()
  console.log('End')
  console.log((Date.now() - START_TIME) / 1000 )
})

async function parseStart () {
  arrayFromLength(PAGE_COUNT).forEach(page => {
    taskQueue.push(async () => {
      await parsePage(`${PAGE_URL}${page}`, RESOURCE_URL)
    })
  })
}

parseStart()
