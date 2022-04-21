Selecione o idioma: **Portuguese**, [English](https://github.com/lagoanova/Binance-Futures-Signals/blob/main/README.md)


# Binance-Futures-Signals
Binance Futures Signals é um bot que pega os sinais de compra/venda enviadas pelo grupo free https://t.me/sinaisfortesfutures


Se você gostou deste projeto, considere ajudar por meio das opções abaixo ;)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ghostnetrn) or *[Donate](#donate)


# Instalação na nuvem na plataforma da DigitalOcean
[![Deploy to DO](https://mp-assets1.sfo2.digitaloceanspaces.com/deploy-to-do/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/lagoanova/Binance-Futures-Signals/tree/main&refcode=a076ff7a9a6a)


# Instalação na nuvem no Heroku (opção free)
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/lagoanova/Binance-Futures-Signals)

*[Nota sobre o Heroku](#note-about-heroku)


# String Session Telegram Bot
Se você estiver usando Heroku ou DigitalOcean, gere a Session String usando um bot do Telegram, como o https://t.me/StarkStringGenBot (escolha a opção Telethon) ou use outro método de sua escolha.

Outra alternativa para gerar https://www.youtube.com/watch?v=nIgFYfxuIkg


## Informações iniciais
Binance Futures Signals é um bot que irá comprar sempre que uma notificação de compra chegar no grupo free https://t.me/sinaisfortesfutures.


## Guia de Instalação
**Link para o manual** https://docs.google.com/document/d/e/2PACX-1vSkiTmErxbz_zvLRFW1-hhC20HYkJHKu_CWsx8LYL0cQGD7Fwk-6r2d9oXAbYZmtN37xwIERgfQJDgm/pub


#### Guia para instalação no seu computador (localmente)
- Primeiro, se você não tiver o Node.js instalado, acesse https://nodejs.org, faça o download e instale a versão LTS.
- Depois, baixe e instale o Git https://git-scm.com/downloads, ou você pode apenas baixar o arquivo ZIP do repositório do bot e descompactar, através do link https://github.com/lagoanova/Binance-Futures-Signals/archive/refs/heads/main.zip.
- Depois acesse https://my.telegram.org, faça login e clique em Api developement tools para criar o seu app e gerar a apiID e a apiHash.

## Como obter a API ID e apiHash:
- Faça login em https://my.telegram.org
- Clique em Api developement tools para criar o seu app e gerar a apiID e a apiHash

> Nunca compartilhe sua API/Authorization details, pois isso pode comprometer sua conta do Telegram.


## Após instalar o Node.js, acesse a pasta do seu bot e digite o comando 
```
npm i
```


#### Renomeie o arquivo env.example para .env e preencha com os dados abaixo:
 - TELEGRAM_API_ID="" // ID Telegram de https://my.telegram.org
 - TELEGRAM_API_HASH="" // Hash Telegram de https://my.telegram.org
 - BINANCE_FUTURES_CHANNEL="1617612647" // padrão 1617612647
 - BINANCE_API_KEY="" // API KEY Binance
 - BINANCE_SECRET_KEY="" // SECRET KEY Binance
 - LEVERAGE="30" // Binance alavancagem
 - PERCENT_SIZE_AMOUNT="0.05" // Percentual da sua stake por ordem
 - TARGET_PROFIT="1" // Alvos de lucro. Padrão: 1 (os alvos vão de 1 a 5)
 - STRING_SESSION="" // String do Telegram que você gerou com o bot acima ou então quando você instalou localmente em sua máquina. Copie e cole neste campo. Da próxima vez que o bot iniciar, ele não irá pedir o número de telefone e o código de ativação. O código pode ser obtido utilizando este bot https://t.me/StarkStringGenBot 


 **Example de um sinal recebido no grupo**

![image](https://user-images.githubusercontent.com/54438080/164044091-8cb1ab37-7fe5-4d71-8976-4de3c8ec8d7a.png)


## Para iniciar o bot, digite 
```
npm start

```

Observação: Se você instalou o bot localmente, sempre que você o iniciar, ele irá pedir seu número de telefone com código do país e DDD, no formato 55555555555. Após preencher, dê um ENTER. O Telegram irá enviar um código para que você possa logar na conta. Após digitar, tecle ENTER novamente. Se a autenticação de dois fatores estiver ativa em seu Telegram, o bot irá solicitar a senha. Após isso, o bot estará ativo e monitorando os sinais do grupo.

## Canal

#### 🏆 BINANCE FUTURES / Sinais Fortes Brasil https://t.me/sinaisfortesfutures


## Nota sobre o Heroku
Observação: as contas pessoais recebem a base de 550 horas dinâmicas gratuitas por mês. Além dessas horas básicas, as contas verificadas com cartão de crédito receberão 450 horas adicionais à sua cota mensal gratuita de dinamômetro. Isso significa que você pode receber um total de 1.000 horas dinâmicas gratuitas por mês se verificar sua conta com cartão de crédito (vídeo https://www.youtube.com/watch?v=KhOjVv2sXhs).

Como o bot estará disponível 24 horas por dia, 7 dias por semana, considere adicionar o cartão (de preferência virtual) para aumentar suas horas-base mensais gratuitas para 1000 horas. Fonte: https://devcenter.heroku.com/articles/free-dyno-hours

## Doações
Se este bot o ajudou, sinta-se à vontade para doar.

- BTC: bc1qmdnrffyvhhyhm05he9wm20zjv4nnqugf0kkgyx
- BNB: bnb1zg5yfv3uplxq3vyafez7387yg52k4l9cwxfjjk
- TETHER USD: TAvihdDuyY1QwLwJN7JK721MrhsrP8mtaA 
- ETH: 0xab331dB5A06ECcb339c15b5432cf97BF14A7b704
- TRX: TAvihdDuyY1QwLwJN7JK721MrhsrP8mtaA
- ADA: addr1qxk8ht7zxjfqnhn9sguljtx4tyv5jacqwnqqu7gy7kw5cldv0whuydyjp80xtq3elykd2kgef9msqaxqpeusfavaf37ssy0tgz
- XRP: rAKJqSjf3ffPqNgjiVA7gxysa8BZPegfG
- XLM: GCF5RIUK5V3MSMXAMQOI56MALHIZDIQ4XUUWTWAVAGV62Y3UJDNZBI5B

## Contribuições
Se você pode codificar e quiser melhorar este projeto, sinta-se à vontade para contribuir.

## Isenção de responsabilidade
⚠️ Uso por conta e risco ⚠️. Investir em criptomoeda é arriscado. Este não é um conselho financeiro.

Se você tiver um problema, abra uma issue no repositório do Git, e não publique capturas de tela com informações pessoais, como frase inicial, número de telefone, código do Telegram, senha de dois fatores do Telegram ou sessão de string do Telegram. Por favor, mantenha essa informação privada!
