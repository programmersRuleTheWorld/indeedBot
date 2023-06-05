# Welcome to indeedBot!

Are you tired of your time not being respected by employers, recruiters or headhunters? We sure are, so, after looking for a job application bot for Indeed and only finding broken ones, we made our own.

The end goal is to have a bot that finds all "Easily apply" listings on Indeed and automatically applies to them using your information, in a manner such that Indeed's anti-bot systems will not detect them. Randomizing the time between http requests within a reasonable threshhold seems like a good solution to this.

As of 6/5/2023 the bot is not yet complete but is being actively worked on. Feel free to contribute by forking this repo and submitting a pull request.

# Installation Instructions

Clone the repo

`git clone https://github.com/programmersRuleTheWorld/indeedBot.git`

Install dependencies; this will install Puppeteer, Puppeteer's Chrome browser and all other dependencies for this project

`cd indeedBot && npm i`

# Usage Instructions

The main file is `index.js` which contains all function calls.
`libs/funcs.js` contains function definitions for functionality related to the bot which can be called in `index.js`

## !!important!!

The bot will not work if you do not first start Chrome properly.
Open a terminal and start a Chrome instance using `google-chrome --remote-debugging-port=21222` in order to start Chrome in a manner that the bot will be able to communicate.
