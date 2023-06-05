import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import date from 'date-and-time'
import { findJobs, clickApply, determinePageType } from "./libs/funcs.js"



(async () => {

    // add stealth plugin and use defaults (all evasion techniques)
    puppeteer.use(StealthPlugin())

    var count = 0
    const browserURL = 'http://127.0.0.1:21222';
    const query = 'backend developer'
    const queryString = 'https://www.indeed.com/jobs?q=' + query + '&filter=0'
    const browser = await puppeteer.connect({ browserURL: browserURL });
    var page = await browser.newPage()

    await page.goto('https://indeed.com')
    //    await page.type('#text-input-what', query)
    await page.goto(queryString)
    const where = await page.$('#text-input-where')
    for (let i = 0; i < 30; i++) {
        where.press('Delete')
    }
    //    const locality = "boston"
    //    await where.type(locality)
    await where.press('Enter')
    console.log("Initiating search...")
    await page.waitForSelector('li')

    // easy apply
        await findJobs(page, browser, count)
})();