# Due to personal reasons, this project has been abandoned by its original maintainer. I hope that someone else takes this and makes something great. Never, ever give up in life. God bless you. - Robbie :)

# Welcome to indeedBot!

Are you tired of your time not being respected by employers, recruiters or headhunters? We sure are, so, after looking for a job application bot for Indeed and only finding broken ones, we made our own.

The public has the right to easy access to these technologies to aid in the increasingly difficult job of standing out in our increasingly noisy and automated digital world.

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

Run `npm start` in the main directory to start the bot.

## Contact

For any questions or concerns, feel free to contact Robbie at programmers.rule.the.world@gmail.com

## Disclaimer

This is for educational purposes only; any and all action taken by you with this bot is your responsibility.
