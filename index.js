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
const cron = require('node-cron');

// Binance
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_SECRET_KEY,
  useServerTime: true,
  recvWindow: 60000,
  hedgeMode: true
})

// Leverage and percent
let leverage = parseInt(process.env.LEVERAGE)
const percent = process.env.PERCENT_SIZE_AMOUNT
const targetProfit = parseInt(process.env.TARGET_PROFIT)
const minutes = parseInt(process.env.MINUTES_CLOSE_ORDERS)
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
  checkHedgeMode();
  //await client.sendMessage('me', { message: `Waiting for telegram notification to buy...`, schedule: (15 * 1) + (Date.now() / 1000) });
})();


async function onNewMessageBinanceFutures(message) {
  const channelBinanceFutures = message.peerId.channelId == binanceFuturesChannel
  const arrayFutures = message.message.toUpperCase().trim().split(/\n/g)
  const hasTextEntryPoint = /PONTO DE ENTRADA\:/.test(arrayFutures)

  try {
    if (channelBinanceFutures && hasTextEntryPoint) {

      const itemSearch = item => item.substring(item.indexOf(':') + 1).trim()

      let position = null
      let coin = null
      let entryPoint = null
      let stopLoss = null
      let targets = []
      let takeProfit = null

      arrayFutures.forEach(async (item, index) => {
        if (item.includes('LONG')) position = 'LONG'
        if (item.includes('SHORT')) position = 'SHORT'

        if (/MOEDA\:/.test(item)) {
          coin = itemSearch(item).replace(/[^a-z]/gi, '')
        }

        if (/ENTRADA\:/.test(item)) {
          entryPoint = itemSearch(item)
        }

        if (/ALAVANCAGEM\:/.test(item)) {
          leverage = itemSearch(item).replace(/[^0-9]/gi, '')
        }

        if (/STOP LOSS\:/.test(item)) {
          stopLoss = itemSearch(item)
        }

        if (/ALVOS\:/.test(item)) {
          targets = itemSearch(item).split(' - ')
        }

      })

      typeof targets[targetProfit] === 'undefined' ? takeProfit = targets[0] : takeProfit = targets[targetProfit - 1]

      console.log(arrayFutures)
      console.log(position, coin, entryPoint, leverage, stopLoss, takeProfit)

      const execOrder = await openOrder(coin, position, entryPoint, stopLoss, takeProfit)
      console.log(`
*Symbol*: ${execOrder.symbol}
*entryPoint*: ${entryPoint}
*targetProfit*: ${takeProfit}
*stopLoss*: ${stopLoss}
*Qty*: ${execOrder.origQty}
*positionSide*: ${execOrder.positionSide}
`)
    } else {
      console.log(`Waiting for signals from the Group ${binanceFuturesChannel}!`)
    }
  } catch (e) {
    console.log(e)
  }
}

async function openOrder(symbol, position, entryPoint, stopLoss, takeProfit) {
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
    const qty = parseFloat(Math.round((balanceUSDT * percent * leverage) / markPrice)).toFixed(precisionQty)
    const priceSell = parseFloat(markPrice * 1.10).toFixed(2)

    // buy
    const buySymbol = await binance.futuresOrder('BUY', symbol, qty, false, {
      type: 'LIMIT', timeInForce: 'GTC', price: parseFloat(entryPoint)
    })
    //const buySymbol = await binance.futuresMarketBuy(symbol, qty)
    const targetProfit = await binance.futuresSell(symbol, qty, false, {
      type: 'TAKE_PROFIT_MARKET', workingType: 'CONTRACT_PRICE', closePosition: true, stopPrice: parseFloat(takeProfit), positionSide: position, timeInForce: 'GTC'
    });

    const stopMarket = await binance.futuresSell(symbol, qty, false, {
      type: 'STOP_MARKET', workingType: 'CONTRACT_PRICE', closePosition: true, stopPrice: parseFloat(stopLoss), positionSide: position, timeInForce: 'GTC'
    });

    //return { buySymbol, takeProfit, stopMarket }
    console.log(buySymbol)

    return buySymbol

  } else {
    const qty = parseFloat(Math.round((balanceUSDT * percent * leverage) / markPrice)).toFixed(precisionQty)
    const priceSell = parseFloat(markPrice * 0.90).toFixed(2)

    const buySymbol = await binance.futuresOrder('SELL', symbol, qty, false, {
      type: 'LIMIT', timeInForce: 'GTC', price: parseFloat(entryPoint)
    })
    //const buySymbol = await binance.futuresMarketSell(symbol, qty)
    const targetProfit = await binance.futuresBuy(symbol, qty, false, {
      type: 'TAKE_PROFIT_MARKET', workingType: 'CONTRACT_PRICE', closePosition: true, stopPrice: parseFloat(takeProfit), positionSide: position, timeInForce: 'GTC'
    });

    const stopMarket = await binance.futuresBuy(symbol, qty, false, {
      type: 'STOP_MARKET', workingType: 'CONTRACT_PRICE', closePosition: true, stopPrice: parseFloat(stopLoss), positionSide: position, timeInForce: 'GTC'
    });

    console.log(buySymbol)
    return buySymbol
  }
}


// Check Order Limit Open Expired Time
setInterval(function () {
  checkOrders();
  console.log(`🔎 O bot irá cancelar as ordens LIMIT com mais de ${minutes} minuto(s) abertas!`)
}, 5000)

// Check Open Orders
const checkOrders = async () => {
  try {
    const position_data = await binance.futuresPositionRisk()
    const ordens = await binance.futuresOpenOrders()
    const ordensAbertas = []
    const positionOpen = []

    position_data.forEach(item => {
      if (item.positionAmt > 0) positionOpen.push(item)
    })

    ordens.forEach(item => {
      ordensAbertas.push(item)
    })

    const ordensStopeTakeProfit = ordensAbertas
      .filter(({ type }) => type === 'STOP_MARKET' || type === 'TAKE_PROFIT_MARKET')

    //console.log(ordensStopeTakeProfit)
    //console.log('=======')
    //console.log(positionOpen)


    const apenasOrdensSemPosicao = ordensStopeTakeProfit
      .filter(({ symbol: coin1 }) => !positionOpen
        .some(({ symbol: coin2 }) => coin1 === coin2));


    const apenasOrdensComPosicao = ordensStopeTakeProfit
      .filter(ordem => positionOpen
        .filter(posicao => posicao.symbol === ordem.symbol &&
          posicao.positionSide === ordem.positionSide).length);

    // Orders Limit Expired Time
    ordensAbertas.forEach(async item => {
      let date = item.time
      let updatetime = new Date()

      console.log('Data ordem: ' + date)
      console.log('Data atual: ' + updatetime.getTime())
      console.log((updatetime.getTime() - date) / 1000 / 60)

      //let quote = await binance.futuresMarkPrice(item.symbol)
      //let markPrice = parseFloat(quote.markPrice)

      const dataAtual = (updatetime.getTime())
      const tempoLimite = (minutes * 60000)
      const typeOrder = item.type

      const orderNotReachEntryPoint =
        (
          (dataAtual - date) > tempoLimite && typeOrder === 'LIMIT'
        )

      console.log((dataAtual - date) > tempoLimite, tempoLimite, (dataAtual - date))
      console.log(typeOrder === 'LIMIT')

      // console.log(item)

      if (orderNotReachEntryPoint) {
        await binance.futuresCancel(item.symbol, { orderId: item.orderId })

        console.log('Ordens encerradas')
      }

    })

    console.log('===========================')
    console.log(apenasOrdensSemPosicao)

    apenasOrdensSemPosicao.forEach(async item => {
      await binance.futuresCancel(item.symbol, { orderId: item.orderId })
    })

    //console.log(positionOpen)
  } catch (e) {
    console.log(e)
  }
}

// Change Hedge Mode
async function checkHedgeMode() {
  positionMode = await binance.futuresPositionSideDual().then(data => {
    if (!data.dualSidePosition) {
      console.log('HedgeMode: not in hedge mode');
      changeHedgeMode();
    }
    else {
      console.log('HedgeMode: in hedge mode');
    }
  }).catch((err) => console.log(err));
}

async function changeHedgeMode() {
  changeMode = await binance.futuresChangePositionSideDual(true).then(data => {
    console.log(data);
  }).catch((err) => console.log(err));
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
