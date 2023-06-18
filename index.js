import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { findJobs, clickApply, determinePageType, evaluateInputs } from "./libs/funcs.js"
import 'dotenv/config'

(async () => {

    // add stealth plugin and use defaults (all evasion techniques)
    puppeteer.use(StealthPlugin())
    let count = 0
    const browserURL = 'http://127.0.0.1:21222';
    const query = process.env.search_query
    const locality = process.env.locality
    const queryString = 'https://www.indeed.com/jobs?q=' + query + '&l=' + locality + '&filter=0'
    const browser = await puppeteer.connect({ browserURL: browserURL })
    //const browser = await puppeteer.connect({ browserURL: browserURL });
    var page = await browser.newPage()
    //var page = await browser.pages()
    //await evaluateInputs(browser, null, page[1], 1, page[1].title)
    await page.goto(queryString)
    console.log("Initiating search...")
    await page.waitForSelector('li')

    // easy apply
    await findJobs(page, browser, count)
})();