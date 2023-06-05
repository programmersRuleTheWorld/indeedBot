let totalJobs = 0

async function determinePageType(browser, jobs, page, count)
    {
        await page.waitForNavigation()
        let title = await page.title()
        console.log(count + "|" + title)
        count++
        await clickApply(browser, jobs, count)
        //fillInputs(browser, jobs, page, count, title)
        await page.close()
    }

    async function fillInputs(browser, jobs, page, count, title)
    {
        switch(title)
        {
            case 'Answer screener questions from the employer | Indeed.com' : {
                const inputs = await page.$$eval('.ia-Questions-item', (e) => {
                    return e.map(e => {
                        let tagName
                        switch(e)
                        {
                            case e.querySelectorAll('input') != null : {
                                return tagName = e.querySelector('input').tagName
                                break
                            }
                            case e.querySelectorAll('textArea') != null : {
                                return tagName = e.querySelector('textarea').tagName
                                break
                            }
                            case e.querySelectorAll('button') != null : {
                                return tagName = e.querySelector('button').tagName
                                break
                            }
                        }
                        e = {
                            question:e.getElementsByClassName('css-1ux7cjx')[0].innerText,
                            tagName:tagName
                        }
                    })
                })        
            }
            case 'Upload or build a resume for this application | Indeed.com' : {
            let button = await page.evaluateHandle(() => {
                return Array.from(document.querySelectorAll('button')).filter((e) => e.innerText == "Continue")[0]
            })
            await button.click()
            }
            case 'Review the contents of this job application | Indeed.com' : {
            let button = await page.evaluateHandle(() => {
                return Array.from(document.querySelectorAll('button')).filter((e) => e.innerText == "Submit your application")[0]
            })
            }
            case 'Your application has been submitted | Indeed.com' : {
                await page,close()
            }
    }
    await determinePageType(browser, jobs, page, count)
    }

    async function clickApply(browser, jobs, count) {
                let page = await browser.newPage()
                await page.goto(jobs[count].href)
                
                let button = await page.evaluateHandle(() => {
                    return Array.from(document.querySelectorAll('button')).filter((e) => e.innerText == "Apply now")[0]
                })
                await button.click()
                setTimeout(async() => { 
                    await determinePageType(browser, jobs, page, count)
                }, 1000);
}

async function gotoNextPage(page, browser, count) {
        const nextPage = await page.$('a[data-testid=pagination-page-next]')
        await nextPage.click()
        await findJobs(page, browser, count)
}

async function findJobs(page, browser, count) {

        await page.waitForSelector('li')
        const jobs = await page.$$eval('li', (e) => {
            let filteredJobs = e.filter(e => e.querySelectorAll('td.indeedApply').length > 0)
                .map(e => e = {
                    title: e.getElementsByClassName('jcs-JobTitle')[0].innerText,
                    organization: e.getElementsByClassName('companyName')[0].innerText,
                    href: e.getElementsByClassName('jcs-JobTitle')[0].href,
                })
            return filteredJobs
        })
        
        // iteratively complete applications
        for(let i = 0; i < jobs.length; i++)
        {
                    totalJobs++
                    console.log("[" + totalJobs + "] | " + jobs[i].title + " | " + jobs[i].organization)
        }
                //console.log("[" + count.easy + "]" + '[' + date.format(new Date(), 'YYYY/MM/DD HH:mm:ss') + '] *****' + " /|\\ " + jobs[i].title + ' | LOCATION:' + jobs[i].organization)
                setTimeout(async() => { 
                    await gotoNextPage(page, browser, count)
                }, 5000);
                //await clickApply(browser, jobs, count)
}

export { findJobs, clickApply, determinePageType }