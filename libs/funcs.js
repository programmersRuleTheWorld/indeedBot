import 'dotenv/config'
import { queryString } from '../index.js'

let totalJobs = 0
let pageCount = 0
async function determinePageType(browser, jobs, page, count)
    {
            await page.bringToFront()
            let title = await page.title()
            //console.log(count + "|" + title)
            setTimeout(async() => { 
                await evaluateInputs(browser, jobs, page, count, title)
            }, 7000);
    }

    async function fillInputs(inputs, page)
    {
            for(let input of inputs)
            {
            if(input != null)
            {
                //console.log(input)
                if(input.type == 'number')
                {
                    for(let i = 0; i < 4; i++)
                    {
                        await page.focus(input.id)
                        await page.keyboard.press('Backspace')
                    }
                        await page.type(input.id, process.env.num_param)
                }
                if(input.type == 'text')
                {
                    for(let i = 0; i < 4; i++)
                    {
                        await page.focus(input.id)
                        await page.keyboard.press('Backspace')
                    }
                        await page.type(input.id, process.env.text_param)
                }
                if(input.type == 'textarea')
                {
                    for(let i = 0; i < 4; i++)
                    {
                        await page.focus(input.id)
                        await page.keyboard.press('Backspace')
                    }
                    await page.type(input.id, 'I answer these questions during interviews.')
                }
                if(input.type == 'select' || input.type == 'select-one')
                {
                    await page.select(input.id, input.option)
                }
                if(input.type == 'tel')
                {
                    await page.type(input.id, '3215573344')
                }
                if(input.type == 'date')
                {
                    await page.type(input.id,'06162023')
                }
            }
        }
    }

    async function evaluateInputs(browser, jobs, page, count, title)
    {     
        switch(title)
        {
            case 'Answer screener questions from the employer | Indeed.com' : {
                        const inputs = await page.$$eval('.ia-Questions-item', (e) => {
                        let filteredInputs = e.map(e => {
                                if(e.querySelectorAll('input')[0])
                                {
                                    if(e.querySelectorAll('input')[0].type == 'radio')
                                    {
                                        e.querySelectorAll('input')[0].click()
                                        return null
                                    }
                                    else if(e.querySelectorAll('input')[0].type == 'text' ||
                                    e.querySelectorAll('input')[0].type == 'number' ||
                                    e.querySelectorAll('input')[0].type == 'checkbox' ||
                                    e.querySelectorAll('input')[0].type == 'date' ||
                                    e.querySelectorAll('input')[0].type == 'tel' ||
                                    e.querySelectorAll('input')[0].type == 'checkbox')
                                    {
                                        if(e.querySelectorAll('input')[0].type == 'checkbox' &&
                                        e.querySelectorAll('input')[0].checked == false)
                                        {
                                            e.querySelectorAll('input')[0].click()
                                        }
                                        return e = {
                                            type:e.querySelectorAll('input')[0].type,
                                            id:'#' + e.querySelectorAll('input')[0].id,
                                            value:e.querySelectorAll('input')[0].value
                                        }
                                    }
                                }
                                else if(e.querySelectorAll('select')[0])
                                {
                                    return e = {
                                        type:e.querySelectorAll('select')[0].type,
                                        id:'#' + e.querySelectorAll('select')[0].id,
                                        option:e.querySelectorAll('select')[0][1].value,
                                    }
                                }
                                else if(e.querySelectorAll('textarea')[0])
                                {
                                    return e = {
                                        type:e.querySelectorAll('textarea')[0].type,
                                        id:'#' + e.querySelectorAll('textarea')[0].id
                                    }
                                }
                                else
                                {
                                    return e = null
                                }
                            }
                        ).filter((e) => {
                            return e != null
                        })

                        // determined issue is raw value being returned, still have to debug y
                        return filteredInputs
                        })
                        
                        await fillInputs(inputs, page)
                        
                        let button = await page.waitForSelector('.ia-continueButton')
                        await button.click()
                        break
                }
            case 'Upload or build a resume for this application | Indeed.com' : {
                let button = await page.waitForSelector('.ia-continueButton')
                await button.click()
                break
            }
            case 'Review the contents of this job application | Indeed.com' : {
                let button = await page.waitForSelector('.ia-continueButton')
                await button.click()
                break
            }
            case 'Add relevant work experience information | Indeed.com' : {
                let button = await page.waitForSelector('.ia-continueButton')
                await button.click()
                break
            }
            case 'Add documents to support this application | Indeed.com' : {
                let button = await page.waitForSelector('.ia-continueButton')
                await button.click()
                break
            }
            case 'Add or update your contact information | Indeed.com' : {
                let button = await page.waitForSelector('.ia-continueButton')
                await button.click()
                break
            }
            case 'Your application has been submitted | Indeed.com' : {
                console.log("MASTER I AM HERE TO SERVE YOU")
                console.log(jobs[count].title + " at " + jobs[count].organization + " applied to successfully.")
                totalJobs++
                console.log("[" + totalJobs + "] " + " total jobs applied for so far!")
                await page.close()
                await clickApply(browser, jobs, count + 1)
                break
            }
            case 'Qualification check | Indeed.com' : {
                let button = await page.waitForSelector('.ia-continueButton')
                await button.click()
                break
            }
            case 'Indeed Apply' : {
                await page.close()
                return await clickApply(browser, jobs, count)
                break
            }
            default : {
                await page.close()
                return await clickApply(browser, jobs, count)
                break
            }
            }
            if(title != 'Your application has been submitted | Indeed.com')
            {
                setTimeout(async() => { 
                    await determinePageType(browser, jobs, page, count)
                }, 5000);
            }
    }

    async function clickApply(browser, jobs, count, page = null) {
                
                if(count < jobs.length)
                {
                let page = await browser.newPage()
                    await page.goto(jobs[count].href)
                    let button = await page.$$eval('button', e => {
                let innerButton = e.filter((e) => e.innerText == "Apply now" || e.innerText == "Applied")[0]
                return { id:"#" + innerButton.id, type:innerButton.innerText }
                })
                
                if(button.type == "Apply now")
                {                    
                    await page.click(button.id)
                    setTimeout(async() => { 
                        await determinePageType(browser, jobs, page, count)
                    }, 6000);
                }
                    else if(button.type == "Applied")
                    {
                        console.log("Already applied!")
                        await page.close()
                        await clickApply(browser, jobs, count + 1)
                    }
            }
            else
            {   
                let page = await browser.pages()
                return await gotoNextPage(page[0], browser, count)
            }
}

async function gotoNextPage(page, browser, count) {
            count = 0
            pageCount++
            if(process.env.display_page_traversal == true)
            {
                if(pageCount > 1)
                {
                    console.log("Done with this page. Moving on... | Traversed " + pageCount + " pages so far.")
                }
                else
                {
                    console.log("Done with this page. Moving on... | Traversed " + pageCount + " page so far.")
                }
            }
            setTimeout(async() => { 
                try{                    
                    const nextPage = await page.waitForSelector(('a[data-testid=pagination-page-next]'))
                    await nextPage.click()
                    }
                catch{
                    pageCount = 0
                    if(process.env.display_page_traversal == true)
                    {
                        console.log("No more pages left to traverse; looping back...")
                    }
                    await page.goto(queryString)
                }
                finally
                {
                    return await findJobs(page, browser, count)
                }
            }, 5000);
}

async function findJobs(page, browser, count) {

        await page.waitForSelector('li')
        const jobs = await page.$$eval('li', (e) => {
                var filteredJobs = e.filter(e => e.querySelectorAll('td.indeedApply').length > 0 && e.querySelectorAll('.applied-snippet').length == 0)
                .map(e => e = {
                    title: e.getElementsByClassName('jcs-JobTitle')[0].innerText,
                    organization: e.getElementsByClassName('companyName')[0].innerText,
                    href: e.getElementsByClassName('jcs-JobTitle')[0].href,
                })

                return filteredJobs
            })

            // iteratively complete applications
        /*for(let i = 0; i < jobs.length; i++)
        {
                    totalJobs++
                    console.log("[" + totalJobs + "] | " + jobs[i].title + " | " + jobs[i].organization)
        }*/
                //console.log("[" + count.easy + "]" + '[' + date.format(new Date(), 'YYYY/MM/DD HH:mm:ss') + '] *****' + " /|\\ " + jobs[i].title + ' | LOCATION:' + jobs[i].organization)
                /*setTimeout(async() => { 
                    await gotoNextPage(page, browser, count)
                }, 5000)*/
                if(count < jobs.length)
                {
                    try
                    {
                        return await clickApply(browser, jobs, count)
                    }
                    catch(e)
                    {
                        console.log(e)
                        return await gotoNextPage(page, browser, count)
                    }
                }
                else
                {
                    return await gotoNextPage(page, browser, count)
                }
}

export { findJobs, clickApply, determinePageType, evaluateInputs }