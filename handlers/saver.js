const fs = require('fs')
const path = require('path')

const dataList = []
const filePath = path.join(process.cwd(), 'result.json')

function cleanResult () {
  fs.writeFile(filePath, '[]', err => {
    if (err) throw err
  })
}

function addItem (data) {
  dataList.push(data)
}

function saveResult () {
  fs.writeFile(filePath, JSON.stringify(dataList), err => {
    if (err) throw err
  })
}

module.exports = {
  cleanResult,
  saveResult,
  addItem
}