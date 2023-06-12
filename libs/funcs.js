let totalJobs = 0

async function determinePageType(browser, jobs, page, count)
    {
            let title = await page.title()
            console.log(count + "|" + title)
            setTimeout(async() => {
                await evaluateInputs(browser, jobs, page, count, title)
            }, 1000);
    }

    async function fillInputs(inputs, page)
    {
            for(let input of inputs)
            {
            if(input != null)
            {
                if(input.type == 'number' || input.type == 'text')
                {
                    for(let i = 0; i < 4; i++)
                    {
                        await page.focus(input.id)
                        await page.keyboard.press('Backspace')
                    }
                        await page.type(input.id, '8')
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
            }
        }
    }

    async function evaluateInputs(browser, jobs, page, count, title)
    {
        switch(title)
        {
            case 'Answer screener questions from the employer | Indeed.com' : {
                        const inputs = await page.$$eval('.ia-Questions-item', async e => {
                            let the = e.map(e => {
                                if(e.querySelectorAll('input')[0])
                                {
                                    if(e.querySelectorAll('input')[0].type == 'radio')
                                    {
                                        e.querySelectorAll('input')[0].click()
                                    }
                                    if(e.querySelectorAll('input')[0].type == 'text' ||
                                    e.querySelectorAll('input')[0].type == 'number')
                                    {
                                        return e = {
                                            type:e.querySelectorAll('input')[0].type,
                                            id:'#' + e.querySelectorAll('input')[0].id
                                        }
                                    }
                                }
                                if(e.querySelectorAll('select')[0])
                                {
                                    return e = {
                                        type:e.querySelectorAll('select')[0].type,
                                        id:'#' + e.querySelectorAll('select')[0].id,
                                        option:e.querySelectorAll('select')[0][0],
                                    }
                                }
                                if(e.querySelectorAll('textarea')[0])
                                {
                                    return e = {
                                        type:e.querySelectorAll('textarea')[0].type,
                                        id:'#' + e.querySelectorAll('textarea')[0].id
                                    }
                                }
                                if(e.querySelectorAll('checkbox')[0])
                                {
                                    return e = {
                                        type:e.querySelectorAll('checkbox')[0].type,
                                        id:'#' + e.querySelectorAll('checkbox')[0].id
                                    }
                                }
                            }
                        )
                        
                        return the
                        })
                        
                        await fillInputs(inputs, page)
                        
                        setTimeout(async() => {
                    await page.evaluateHandle(async() => {
                        let button = Array.from(document.querySelectorAll('button')).filter((e) => e.innerText == "Continue")[0]
                        await button.click()
                    })
                }, 2000);
                break
                }
            case 'Upload or build a resume for this application | Indeed.com' : {
                await page.evaluateHandle(async() => {
                    let button = Array.from(document.querySelectorAll('button')).filter((e) => {
                        if(e.innerText == "Review your application") 
                        return e.innerText == "Review your application" 
                        else if(e.innerText == "Continue")
                        return e.innerText == "Continue" 
                    })[0]
                    await button.click()
            })
            break
            }
            case 'Review the contents of this job application | Indeed.com' : {
                await page.evaluateHandle(async() => {
                    let button = Array.from(document.querySelectorAll('button')).filter((e) => {
                        if(e.innerText == "Review your application") 
                        return e.innerText == "Review your application" 
                        else if(e.innerText == "Continue")
                        return e.innerText == "Continue" 
                        else if(e.innerText == "Submit your application")
                        return e.innerText == "Submit your application" 
                    })[0]
                    await button.click()
            })
            break
            }
            case 'Add relevant work experience information | Indeed.com' : {
                await page.evaluateHandle(async() => {
                    let button = Array.from(document.querySelectorAll('button')).filter((e) => e.innerText == "Continue")[0]
                    await button.click()
                })
                break
            }
            case 'Add documents to support this application | Indeed.com' : {
                await page.evaluateHandle(async() => {
                    let button = Array.from(document.querySelectorAll('button')).filter((e) => e.innerText == "Review your application")[0]
                    await button.click()
                })
                break
            }
            case 'Your application has been submitted | Indeed.com' : {
                console.log("MASTER I AM HERE TO SERVE YOU")
                await page.close()
                return await clickApply(browser, jobs, count + 1, page)
                break
            }
            case 'Qualification check | Indeed.com' : {
                    await page.evaluateHandle(async() => {
                    let button = Array.from(document.querySelectorAll('button')).filter((e) => e.innerText == "Continue to application")[0]
                    await button.click()
                })
                break
            }
    }
            setTimeout(async() => {
                await determinePageType(browser, jobs, page, count)
            }, 10000);
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
                    }, 2000);
                }

                if(button.type != "Apply now")
                {
                    await page.close()
                    return await findJobs(page, browser, count)
                }
            }
                else
                {
                    console.log(count + ' out of ' + jobs.length + ' jobs applied for!')
                    await findJobs(page, browser, count)
                }

}

async function gotoNextPage(page, browser, count) {
    setTimeout(async() => {
            count = 0
            const nextPage = await page.waitForSelector(('a[data-testid=pagination-page-next]'))
            await nextPage.click()
            await findJobs(page, browser, count)
        }, 4000);
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
                    await clickApply(browser, jobs, count)
                }
                else if(count > jobs.length || jobs.length == 0)
                {
                    await gotoNextPage(page, browser, count)
                }
}

export { findJobs, clickApply, determinePageType }