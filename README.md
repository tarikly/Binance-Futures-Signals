# Binance-Futures-Signals
Binance Futures Signals from https://t.me/sinaisfortesfutures

## Getting Started
Binance Futures Signals bot that buys when you recieve Telegram notification from this channel https://t.me/sinaisfortesfutures.

#### First, if you don't have node.js installed go to https://nodejs.org and install the lastest LTS version.
#### Then install git https://git-scm.com/downloads, or you can just download zip file if you don't want to clone repository.
#### Then go to https://my.telegram.org sign in, click Api developement tools and create an app to get app apiID and app apiHash.

Then Use the following commands either in VScode terminal or command prompt 
```
git clone https://github.com/lagoanova/Binance-Futures-Signals.git
```
```
cd Binance-Futures-Signals
```
```
npm i
```
#### Then edit the .env.example file with and rename it to .env:
 - TELEGRAM_API_ID="" // ID Telegram of https://my.telegram.org
 - TELEGRAM_API_HASH="" // Hash Telegram of https://my.telegram.org
 - BINANCE_FUTURES_CHANNEL="1617612647" // default 1617612647
 - BINANCE_API_KEY="" // API KEY Binance
 - BINANCE_SECRET_KEY="" // SECRET KEY Binance
 - STRING_SESSION="" // String that will be displayed in the terminal. Copy and paste here. Next time the bot starts it will not ask for the phone number and code


To start bot run this command
```
npm start
```

When bot is running it it will ask for your telephone number to log in to Telegram enter your telephone number with country code ex 55555555555 then press enter. Then telegram will send you a code to log in enter that number and press enter. If you have two step verification on the bot will ask for your two step password. Then leave the bot running and when you recieve a notification from the channel you select it will buy that coin.

## Channels

#### 🏆 BINANCE FUTURES / Sinais Fortes https://t.me/sinaisfortesfutures

## Contribute
If you can code and want to make this project better please feel free to contribute.

## Disclaimer
Use at your own risk. Investing in cryptocurrency is risky. This is not financial advice.

If you have an issue please don't post screenshots with personal information like seed phrase, telephone number, Telegram code, Telegram two factor password, or Telegram string session. Please keep that information private!


