const puppeteer = require('puppeteer')

const PAGE_PUPPETEER_OPTS = {
  waitUntil: 'networkidle2',
  timeout: 3000000
}

const LAUNCH_PUPPETEER_OPTS = {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920x1080'
  ]
}

// module.exports = class PuppeteerHandler {
//   constructor () {
//     this.browser = null
//   }
//   async initBrowser () {
//     this.browser = await puppeteer.launch()
//   }
//   closeBrowser () {
//     this.browser.close()
//   }
//   async getPageContent (url) {
//     if (!this.browser) {
//       await this.initBrowser()
//     }

//     try {
//       const page = await this.browser.newPage()
//       await page.goto(url, PAGE_PUPPETEER_OPTS)
//       const content = await page.content()
//       return content
//     } catch (err) {
//       throw err
//     }
//   }
// }

module.exports = async function getContent (url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, PAGE_PUPPETEER_OPTS);
  const content = await page.content()
  await browser.close();
  return content
}