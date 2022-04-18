# Binance-Futures-Signals
Binance Futures Signals from https://t.me/sinaisfortesfutures

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ghostnetrn)


# Deploy to DigitalOcean
[![Deploy to DO](https://mp-assets1.sfo2.digitaloceanspaces.com/deploy-to-do/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/lagoanova/Binance-Futures-Signals/tree/main&refcode=a076ff7a9a6a)

# Deploy to Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/lagoanova/Binance-Futures-Signals)

*[Note about Heroku](#note-about-heroku)

# String Session Telegram Bot
If using on Heroku or DigitalOcean, generate the session string using a telegram bot, such as https://t.me/genStr_robot or another one of your choice

Another alternative is https://www.youtube.com/watch?v=nIgFYfxuIkg


## Getting Started
Binance Futures Signals bot that buys when you recieve Telegram notification from this channel https://t.me/sinaisfortesfutures.

## Installation guide
Link to manual https://docs.google.com/document/d/e/2PACX-1vSkiTmErxbz_zvLRFW1-hhC20HYkJHKu_CWsx8LYL0cQGD7Fwk-6r2d9oXAbYZmtN37xwIERgfQJDgm/pub

#### First, if you don't have node.js installed go to https://nodejs.org and install the lastest LTS version.
#### Then install git https://git-scm.com/downloads, or you can just download zip file if you don't want to clone repository.
#### Then go to https://my.telegram.org sign in, click Api developement tools and create an app to get app apiID and app apiHash.

## After installation, you'll need to obtain an API ID and hash:

- Login into your telegram account
- Then click "API development tools" and fill your application details (only app title and short name required)
- Finally, click "Create application"

> Never share any API/authorization details, that will compromise your
> application and account.


## Then Use the following commands either in VScode terminal or command prompt 
```
git clone https://github.com/lagoanova/Binance-Futures-Signals.git
```
```
cd Binance-Futures-Signals
```
```
npm i
```
#### Then edit the .env.example file and rename it to .env:
 - TELEGRAM_API_ID="" // ID Telegram of https://my.telegram.org
 - TELEGRAM_API_HASH="" // Hash Telegram of https://my.telegram.org
 - BINANCE_FUTURES_CHANNEL="1617612647" // default 1617612647
 - BINANCE_API_KEY="" // API KEY Binance
 - BINANCE_SECRET_KEY="" // SECRET KEY Binance
 - LEVERAGE="30" // Binance leverage
 - PERCENT_SIZE_AMOUNT="0.05" // Account balance percentage
 - STRING_SESSION="" // String that will be displayed in the terminal. Copy and paste here. Next time the bot starts it will not ask for the phone number and code. Or Generate the string at https://t.me/genStr_robot


To start bot run this command
```
npm start

```

When bot is running it it will ask for your telephone number to log in to Telegram enter your telephone number with country code ex 55555555555 then press enter. Then telegram will send you a code to log in enter that number and press enter. If you have two step verification on the bot will ask for your two step password. Then leave the bot running and when you recieve a notification from the channel you select it will buy that coin.

## Channel

#### 🏆 BINANCE FUTURES / Sinais Fortes Brazil https://t.me/sinaisfortesfutures

## Note about Heroku
Note: Person accounts receive a base of 550 free dynamic hours per month. In addition to these base hours, credit card verified accounts will receive an additional 450 hours to their free monthly dyno quota. This means that you can receive a total of 1000 free dynamic hours per month if you verify your account with a credit card (video https://www.youtube.com/watch?v=KhOjVv2sXhs).

As the bot will be on 24/7, consider adding the card (preferably virtual) to increase your free monthly base hours to 1000 hours. Source: https://devcenter.heroku.com/articles/free-dyno-hours

## Donate
If this bot helped you out feel free to donate.

- BTC: bc1qmdnrffyvhhyhm05he9wm20zjv4nnqugf0kkgyx
- BNB: bnb1zg5yfv3uplxq3vyafez7387yg52k4l9cwxfjjk
- TETHER USD: TAvihdDuyY1QwLwJN7JK721MrhsrP8mtaA 
- ETH: 0xab331dB5A06ECcb339c15b5432cf97BF14A7b704
- TRX: TAvihdDuyY1QwLwJN7JK721MrhsrP8mtaA
- ADA: addr1qxk8ht7zxjfqnhn9sguljtx4tyv5jacqwnqqu7gy7kw5cldv0whuydyjp80xtq3elykd2kgef9msqaxqpeusfavaf37ssy0tgz
- XRP: rAKJqSjf3ffPqNgjiVA7gxysa8BZPegfG
- XLM: GCF5RIUK5V3MSMXAMQOI56MALHIZDIQ4XUUWTWAVAGV62Y3UJDNZBI5B

## Contribute
If you can code and want to make this project better please feel free to contribute.

## Disclaimer
⚠️ Use at own risk ⚠️. Investing in cryptocurrency is risky. This is not financial advice.

If you have an issue please don't post screenshots with personal information like seed phrase, telephone number, Telegram code, Telegram two factor password, or Telegram string session. Please keep that information private!


