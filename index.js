import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { findJobs, clickApply, determinePageType, evaluateInputs } from "./libs/funcs.js"
import 'dotenv/config'

let count = 0
let totalJobs = 0
let pageCount = 0

const browserURL = 'http://127.0.0.1:21222';
const query = process.env.search_query
const locality = process.env.locality
const remote = process.env.remote_only == true ? "&sc=0kf%3Aattr%28DSQF7%29%3B" : ''
const queryString = 'https://www.indeed.com/jobs?q=' + query + remote + '&l=' + locality + '&filter=0';

(async () => {

    // add stealth plugin and use defaults (all evasion techniques)
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.connect({ browserURL: browserURL })
    //const browser = await puppeteer.connect({ browserURL: browserURL });
    var page = await browser.newPage()
    //var page = await browser.pages()
    //await evaluateInputs(browser, null, page[1], 1, page[1].title)
    await page.goto(queryString)
    console.log("Initiating search...")
    await page.waitForSelector('li')

    // easy apply
    try
    {
        await findJobs(page, browser, count)
    }
    catch
    {
        count, pageCount = 0
        console.log("No more pages left to traverse; looping back...")
        await page.goto(queryString)
        await findJobs(page, browser, count)
    }
})();

export { queryString, totalJobs, pageCount }