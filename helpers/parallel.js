const queue = require('async/queue')

const taskQueue = queue(async (task, done) => {
  await task()
  done()
}, 10)

module.exports = { taskQueue }