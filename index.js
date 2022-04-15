const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { NewMessage } = require('telegram/events');
require('dotenv').config();
const apiId = parseInt(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH;
const binanceFuturesChannel = parseInt(process.env.BINANCE_FUTURES_CHANNEL);
const stringSession = new StringSession(process.env.STRING_SESSION);
const input = require("input");
const Binance = require("node-binance-api")

// Binance
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_SECRET_KEY,
  hedgeMode: true
})

// Leverage and percent
const leverage = parseInt(process.env.LEVERAGE)
const percent = parseFloat(process.env.PERCENT_SIZE_AMOUNT)

const version = process.env.VERSION;
let client;

/**
 * 
 * Main
 * 
 * */
(async () => {
  client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Phone number?"),
    password: async () => await input.text("Password?"),
    phoneCode: async () => await input.text("Phone Code?"),
    onError: (err) => console.log(err),
  });
  console.log(`\nCurrent Version is ${version}\n`);
  console.log("Your string session is:", client.session.save(), '\n');

  client.addEventHandler(onNewMessage, new NewMessage({}));
  console.log('\n', "Waiting for telegram notification to buy...");
  //await client.sendMessage('me', { message: `Waiting for telegram notification to buy...`, schedule: (15 * 1) + (Date.now() / 1000) });
})();


function onNewMessageBinanceFutures(message) {
  const keys = /LONG\/BUY|SHORT\/SELL/

  if (message.peerId.channelId == binanceFuturesChannel) {
    console.log('--- NEW SIGNAL FOUND ---');
    let timeStamp = new Date().toLocaleString();
    console.log(timeStamp);
    const msg = message.message.toUpperCase().replace(/\n/g, ' ').split(' ');
    const position = /LONG/.test(msg) ? 'LONG' : 'SHORT'
    const isSignal = keys.test(msg)

    let coin = null

    if (isSignal) {
      msg.forEach(key => {
        if (/USDT/.test(key)) {
          coin = key.replace('#', '').replace('/', '').trim()
        }
      })

      openOrder(coin, position).then(async buySymbol => {
        console.log(`
*Symbol*: ${buySymbol.symbol}
*Qty*: ${buySymbol.origQty}
*positionSide*: ${buySymbol.positionSide}
`)
      }).catch(e => console.log(e))
    }
  } else {
    console.log('Waiting for telegram notification to buy...', '\n');
  }
}

async function openOrder(symbol, position) {
  const futures = await binance.futuresExchangeInfo()
  const symbols = futures['symbols']
  let precisionQty
  let precisionPrice

  for (let item in symbols) {
    if (symbols[item].symbol === symbol)
      precisionQty = symbols[item].quantityPrecision
    precisionPrice = symbols[item].pricePrecision
  }

  let balanceFutures = await binance.futuresBalance();

  await binance.futuresLeverage(symbol, leverage)

  await binance.futuresMarginType(symbol, 'ISOLATED');

  let quote = await binance.futuresMarkPrice(symbol)
  let markPrice = parseFloat(quote.markPrice)

  let balanceUSDT

  for (let i = 0; i < balanceFutures.length; i++) {
    if (balanceFutures[i].asset === 'USDT') {
      balanceUSDT = parseInt(balanceFutures[i].balance)
    }
  }

  if (position === 'LONG') {
    let qty = parseFloat(Math.round((balanceUSDT * percent * leverage) / markPrice)).toFixed(precisionQty)
    let priceSell = parseFloat(markPrice * 1.10).toFixed(2)

    // sell
    let buySymbol = await binance.futuresMarketBuy(symbol, qty)
    //let takeProfit = await binance.futuresSell(symbol, qty, false, { type: 'TAKE_PROFIT_MARKET', workingType: 'MARK_PRICE', closePosition: true, stopPrice: precoVenda, positionSide: position, timeInForce: 'GTC' });
    //let stopMarket = await binance.futuresSell(symbol, qty, false, { type: 'STOP_MARKET', workingType: 'MARK_PRICE', closePosition: true, stopPrice: stopLoss, positionSide: position, timeInForce: 'GTC' });

    //return { buySymbol, takeProfit, stopMarket }

    return buySymbol
  } else {
    let qty = parseFloat(Math.round((balanceUSDT * percent * leverage) / markPrice)).toFixed(precisionQty)
    let priceSell = parseFloat(markPrice * 0.90).toFixed(2)

    let buySymbol = await binance.futuresMarketSell(symbol, qty)
    //let takeProfit = await binance.futuresBuy(symbol, qty, false, { type: 'TAKE_PROFIT_MARKET', closePosition: true, stopPrice: precoVenda, positionSide: position, timeInForce: 'GTC' });
    //let stopMarket = await binance.futuresBuy(symbol, qty, false, { type: 'STOP_MARKET', closePosition: true, stopPrice: stopLoss, positionSide: position, timeInForce: 'GTC' });

    return buySymbol
  }
}

/**
 * 
 * Recieved new Telegram message
 * 
 * */
async function onNewMessage(event) {
  const message = event.message;
  onNewMessageBinanceFutures(message);
}
