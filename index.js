import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { findJobs, clickApply, determinePageType } from "./libs/funcs.js"



(async () => {

    // add stealth plugin and use defaults (all evasion techniques)
    puppeteer.use(StealthPlugin())

    let count = 0
    const browserURL = 'http://127.0.0.1:21222';
    const query = 'software'
    const locality = ""
    const queryString = 'https://www.indeed.com/jobs?q=' + query + '&l=' + locality + '&filter=0'
    const browser = await puppeteer.connect({ browserURL })
    //const browser = await puppeteer.connect({ browserURL: browserURL });
    var page = await browser.newPage()

    await page.goto(queryString)
    console.log("Initiating search...")
    await page.waitForSelector('li')

    // easy apply
        await findJobs(page, browser, count)
})();
