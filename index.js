import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { findJobs, clickApply, determinePageType } from "./libs/funcs.js"



(async () => {

    // add stealth plugin and use defaults (all evasion techniques)
    puppeteer.use(StealthPlugin())

    let count = 0
    const browserURL = 'http://127.0.0.1:21222';
    const query = 'javascript'
    const queryString = 'https://www.indeed.com/jobs?q=' + query + '&filter=0'
    const browser = await puppeteer.connect({ browserURL })
    //const browser = await puppeteer.connect({ browserURL: browserURL });
    var page = await browser.newPage()

    await page.goto(queryString)
    
    /* for (let i = 0; i < 30; i++) {
        where.press('Delete')
    }
    //    const locality = "boston"
    //    await where.type(locality)
    await where.press('Enter')
    */
    console.log("Initiating search...")
    await page.waitForSelector('li')

    // easy apply
        await findJobs(page, browser, count)
})();