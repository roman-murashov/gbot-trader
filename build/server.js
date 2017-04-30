(function(){function e(e,t){for(var r=-1,n=t.length>>>0;++r<n;)if(e===t[r])return!0;return!1}var t,r,n,a,l,o,c,i,s,u,d,p,_,b,f,m,g,y,T,O,E,x,C,k,v,S,w,h,R,N,P,I,D,U,L,B,F,A,j,M,q,H,J,V,z,G,K,Y,Q,W,X,Z,$,ee,te,re,ne,ae,le,oe,ce,ie,se,ue,de,pe,_e,be,fe,me,ge,ye,Te,Oe,Ee,xe,Ce,ke,ve,Se,we,he,Re,Ne,Pe,Ie,De,Ue,Le,Be,Fe,Ae,je,Me,qe,He,Je,Ve,ze,Ge,Ke,Ye,Qe,We,Xe,Ze,$e,et,tt,rt,nt,at,lt,ot,ct,it,st,ut,dt,pt,_t,bt,ft,mt,gt;if(t=require("./conf"),r=require("./api-btc-e"),n=require("./api-poloniex"),a=require("async"),l=require("lodash"),require("colors"),o=require("ms"),c=require("moment"),i=require("moment-range"),s=require("nodemailer"),u=require("node-telegram-bot-api"),d=require("ta-lib"),c=i.extendMoment(c),!t.tokenTelegram)return void console.log("There is no token Telegram!".red);p="poloniex"===t.exchange?new n:new r,_=new u(t.tokenTelegram,{polling:!0}),b=function(e,r){e.length>4096&&(e="Слишком много информации для отображения"),e.length||(e="Error: Не удалось обработать ошибку"),_.sendMessage(t.myChatId,e,r)},f=s.createTransport(t.email),m=function(e,t){return f.sendMail(e,t)},g=function(){return t.tradeCurrency.pair.replace("_","/").toUpperCase()},y=function(e){return{from:t.email.auth.user,to:t.email.reportEmail,subject:"Error Script Trader",text:"time: "+(new Date).toString()+"\nPair: "+g()+"\n\nmessage: "+e+"\n\n---"}},T=function(){return(new Date).toLocaleTimeString("en-US",{timeZone:t.timeZone,hour12:!1})},O=function(){return Math.round((new Date).getTime()/1e3)},E=function(e){var t;return t="",Object.keys(e).forEach(function(r){if(e.hasOwnProperty(r))return t+=r+" :: "+e[r]+"\n"}),t},x=function(e){return"object"==typeof e?e.hasOwnProperty("error")?e.error:e.hasOwnProperty("message")?e.message:E(e):e},C=!0,k=null,v=!1,S={name:0,nameTwo:0},w=O(),h=O(),R=O(),N=t.timeUpdateAutoSettings,P=!0,I=!1,D=0,U={all:null,buy:null,sell:null},L={extra:0,buy:0,sell:0,first:0},B=0,F=0,A=0,j={buy:0,sell:0},M={},q={},H={id:0,priceBuy:0,amount:0},J={},V=!1,z=0,G=!1,K=0,Y=0,Q=0,W=0,X=[],Z=[],$="all",ee=!1,te={ask:0,bid:0},re="normal",ne=0,ae=0,le=0,oe=0,ce=0,ie=!1,se=!1,ue=!1,de=null!=(pe=t.notificationPair)?pe.toLowerCase().replace(/\//g,"_").split(/\s*,\s*/):void 0,_e={status:!1,interval:!1},be={status:!1,interval:!1},fe={btc:"฿",usd:"$",eur:"€",rur:"₽",ltc:"L"},me="-----------------------------------",ge=function(e){return fe.hasOwnProperty(e)?fe[e]:e+" "},ye=function(e,t){return O()-e>=60*t},Te=function(e,t){var r,n,a;return null!=t&&(r=t),r||(r=e>=1?["минута","минуты","минут"]:["секунда","секунды","секунд"],e=e<1?60*e:e),n=[2,0,1,1,1,2],a=r[e%100>4&&e%100<20?2:n[e%10<5?e%10:5]],e+" "+a},Oe=function(e,t){return null==t&&(t=3),+(+e).toFixed(t)},Ee=function(e){return e.toFixed(10).replace(/(.*0\.0*[1-9]*)0+\d*/g,"$1")},xe=function(e,t){var r,n,a;return r=[],l.forIn(e,function(e,t){r.push(e)}),n=r.sort(function(e,t){return t.rate-e.rate}),a=l.findKey(n,function(e){return e.rate<=t}),n[a]},Ce=function(e,t){var r,n;return r=[],l.forIn(e,function(e,n){"min"===t&&"buy"!==e.type||"max"===t&&"sell"!==e.type||r.push(e)}),n=r.sort(function(e,t){return t.rate-e.rate}),"min"===t?l.last(n):l.head(n)},ke=function(e,t){return t>0?+(100*e/t).toFixed(1):0},ve=function(e,t){return e*(1+t/100)},Se=function(e,t){return e*(1-t/100)},we=function(e,t){return null==t&&(t=ne),Oe(e/+("1e"+t),t)},he=function(e,t){return null==t&&(t=ne),Oe(e*+("1e"+t),t)},Re=function(e,t,r){var n,a;return null==t&&(t=0),null==r&&(r=ne),n=e/100*le*2,a=Math.ceil(n*+("1e"+r))/+("1e"+r),Oe(ve(a,t),r)},Ne=function(e,t){return Oe(ve(e,t),ne)},Pe=function(e,t){return Oe(Se(e,t),ne)},Ie=function(e,t){return Se(e/t,le)},De=function(e,t){return Se(e*t,le)},Ue=function(){t.bbands&&W>0&&(Z.push(W),Z.length>30&&Z.splice(0,1))},Le=function(e,t){var r,n;return null==t&&(t=.1),r=e/100*t,n=1/+("1e"+ne),r>=n||(r=n),Oe(r,ne)},Be=function(e,t){var r,n,a;null==t&&(t=1),r=e.toString().split(".")[0];try{n=e.toString().split(".")[1].length}catch(e){n=1}return a=r>0?r>1e4?+("1e"+(n+1)):r>1e3?+("1e"+n):r>100?+("1e"+(n-1)):r>10?+("1e"+(n-2)):n>3?+("1e"+(n-3)):1:1,t*=a,Oe(t/+("1e"+n),n)},Fe=function(e,r,n){var a,o,c,i,s,u,p,_,f,m,y,E,x,k,v,S,w,A,j,M,q,V,z,G,K,ue,de,pe,_e,be,fe,ge,ye,Te,Ce,ve,Se;if(R=O(),U={buy:null,sell:null},a=e.toString().length,o=r.toString().length,i={},i[a+""]=e,i[o+""]=r,c=i,s=Math.max(a,o),u=c[s],ne=at.pairs[t.tradeCurrency.pair].decimal_places,oe=at.pairs[t.tradeCurrency.pair].min_amount,ae=at.pairs[t.tradeCurrency.pair].min_price,le=at.pairs[t.tradeCurrency.pair].fee,p=Oe(e-r,ne),_=Re(u,200),t.dynamicSettingsTime&&(X.push(n),X.length>50&&X.splice(0,1),f=l.max(X),m=l.min(X),t.botLog&&console.log([me,"price-array:","length: "+X.length,"max: "+f,"min: "+m,"change-time-settings: "+(ke(f,m)>102)].join("\n")),ke(f,m)>102?N=.1:N!==t.timeUpdateAutoSettings&&(N=t.timeUpdateAutoSettings)),t.abruptChangeTrend&&(y=Re(u,500)),t.dangerPriceStop&&(E=Ne(Q,9),x=Pe(Y,9)),t.dynamicOffsetOrders&&(k={current:Re(u,450),prev:Re(u,380),prev_2:Re(u,300)},v=p>=k.current||p>=k.prev||p>=k.prev_2),t.dynamicOffsetOrders&&v?(console.log("["+T()+"]: Dynamic market"),S=Be(u,he(k.current)),w=1.5*t.stepBreakevenPercent):(S=Be(u,t.offsetOrdersPoints),w=t.stepBreakevenPercent),S=function(){switch(!1){case!t.offsetOrdersPercent:return Le(u,t.offsetOrdersPercent);case!t.rangeOffset:return Le(u,Oe(t.rangeOffset/t.countOrders,2));default:return S}}(),A=1.3*S,j=Le(u,t.offsetFirstOrdersPercent),M=t.offsetOrdersPercent?Le(u):2,B=function(){switch(!1){case!t.bbands:case!t.oneOrdersSell:return 0;default:return Re(u,w)}}(),t.botLog&&(console.log(me),console.log("current-spread:",(Ee(p)+"")[p>B?"green":"white"]),console.log("spread-min-default:",Ee(B)),console.log("trend-spread:",Ee(_)),t.abruptChangeTrend&&console.log("immediate-spread:",y),console.log("trader-speed:",re),console.log("price-prev:",Q+" - "+Y),console.log("price-prev2:",te.ask+" - "+te.bid),t.dangerPriceStop&&(console.log("danger-price-ask:",E,!P&&e>=E?"Attention!".red:""),console.log("danger-price-bid:",x,!P&&r<=x?"Attention!".red:"")),t.dynamicOffsetOrders&&(console.log("spread_1_450:",k.current,p>=k.current?"Attention!".red:""),console.log("spread_2_380:",k.prev,p>=k.prev?"Attention!".red:""),console.log("spread_3_300:",k.prev_2,p>=k.prev_2?"Attention!".red:""),console.log("dynamic-market:",v))),t.dangerPriceStop&&!P&&(e>=E||r<=x))return e>=E&&(U.buy=1),h=0,I=!0,q="DANGER PRICE: "+e+" - "+r+" | Bot Pause!",console.log("["+T()+"]: "+q),void b(q+"");V=M,z=D>Math.round(ce/2)?A:S,t.botLog&&(console.log("offset-max-one:",(Ee(S)+"")[S===z?"green":"yellow"]),console.log("offset-type-max:",Ee(z)),t.offsetFirstOrdersPercent&&console.log("offset-first-orders:",Ee(j)),console.log(me)),ie||($="all",ee=!1),P?(t.bbands&&(C=!1),G=K=z):t.oneOrdersSell?(G=K=z,t.timeCloseOrders=1e5,t.timeCloseOrdersInactivity=t.timeCloseOrders,(ue=xe(J,r))&&r>Ne(ue.rate,t.oneOrdersSellOffset)&&!H.id&&(U.all=1,h=0)):t.bbands?(G=K=z,N=.1,de=14,Z.length>2*de&&(i=d.BBANDS(Z,20,t.bbandsDeviation),pe=i.middleband,_e=i.lowband,be=i.highband,fe=d.RSI(l.clone(Z).reverse(),de),ge=d.average(fe).mean,ye=d.average(pe).mean,Te=d.average(be).mean,Ce=d.average(_e).mean,ve=Te>n&&n>ye,Se=ye>n&&n>Ce,ve&&(ie||($="sell"),C=99>ge&&ge>70),Se&&(ie||($="buy"),C=1<ge&&ge<30),se=ve&&Se,t.botLog&&console.log(["BBANDS:","highband: "+Te,"middleband: "+ye,"lowband: "+Ce,"rsa: "+ge,"sell: "+ve,"buy: "+Se,"bot trade: "+C,"orders-calculation-brake: "+se,me].join("\n")))):t.trendDefinition&&r>Y&&e>Q&&p>_&&"normal"===re?(console.log("["+T()+"]: Trend: UP"),G=V,K=z,ie||($="buy",U.sell=1,h=0,t.abruptChangeTrend&&p>y&&(console.log("["+T()+"]: Spread Immediate"),ee=!0,R=0))):t.trendDefinition&&r<Y&&e<Q&&p>_&&"normal"===re?(console.log("["+T()+"]: Trend: DOWN"),G=z,K=V,ie||($="sell",U.buy=1,h=0,t.abruptChangeTrend&&p>y&&(console.log("["+T()+"]: Spread Immediate"),ee=!0,R=0))):G=K=z,te={ask:Q,bid:Y},Y=r,Q=e,W=n,F=Re(u),L={buy:G,sell:K,extra:Be(u),first:j},rt(),console.log("["+T()+"]: Update: "+$.toUpperCase()+" | "+e+" - "+r+" | "+n+" | "+g())},Ae=function(e,t){var r,n;return r="name"===t?S.name:S.nameTwo,n=e-r,n>0?n:0},je=function(e,r){return a.parallel([function(r){return t.botLog&&console.log(me+"\nПолучение цен"),p.getTicker(e,function(n,a){return null!=n?(t.botLog&&(console.log("Price: "+a[e].buy),console.log(x(n))),r(n)):r(null,{price:a[e].buy})})},function(r){return a.series([function(r){return t.botLog&&console.log(me+"\nЗакрытие всех позиций"),U.all=1,pt(e,function(e){return r(null!=e?e:null)})},function(e){return t.botLog&&console.log(me+"\nПолучение баланса"),p.balanceRequest(t.tradeCurrency,function(r,n,a){return null!=r?(t.botLog&&(console.log("balance: "+n+" | balance-two: "+a),console.log(x(r))),e(r)):t.botTrade&&n<.001&&a<.001?(t.botLog&&console.log("balance: "+n+" | balance-two: "+a),e({error:"Err: No money!"})):e(null,{balance:n,balanceTwo:a})})}],function(e,t){return null!=e?r(e):r(null,{balance:t[1].balance,balanceTwo:t[1].balanceTwo})})}],function(e,n){var a,l,o,c,i,s,u,d,p,_,b,f,m,g,y;return null!=e?r(e):(t.botLog&&console.log(me+"\nРасчет депозита"),a=0<(l=t.depositLimit)&&l<100?t.depositLimit:100,t.oneOrdersSell&&("poloniex"===t.exchange?(o=n[1].balanceTwo,n[1].balanceTwo=0):(o=n[1].balance,n[1].balance=0)),"poloniex"===t.exchange?(c=n[1].balanceTwo*n[0].price+n[1].balance,i=n[1].balance/n[0].price+n[1].balanceTwo):(c=n[1].balanceTwo/n[0].price+n[1].balance,i=n[1].balance*n[0].price+n[1].balanceTwo),s=c*a/100,u=i*a/100,100===a?(t.botLog&&console.log("type:",0),d=0,p=0):n[1].balance>=s&&n[1].balanceTwo>=u?(t.botLog&&console.log("type:",1),d=n[1].balance-s/2,p=n[1].balanceTwo-u/2):n[1].balance>=s&&n[1].balanceTwo<u?(t.botLog&&console.log("type:",2),d="poloniex"===t.exchange?n[1].balance-(u-n[1].balanceTwo)*n[0].price:n[1].balance-(u-n[1].balanceTwo)/n[0].price,p=0):n[1].balance<s&&n[1].balanceTwo>=u?(t.botLog&&console.log("type:",3),d=0,p="poloniex"===t.exchange?n[1].balanceTwo-(s-n[1].balance)/n[0].price:n[1].balanceTwo-(s-n[1].balance)*n[0].price):n[1].balance<s&&n[1].balanceTwo<u&&(t.botLog&&console.log("type:",4),"poloniex"===t.exchange?(d=n[1].balance-(u-n[1].balanceTwo)*n[0].price,p=n[1].balanceTwo-(s-n[1].balance)/n[0].price):(d=n[1].balance-(u-n[1].balanceTwo)/n[0].price,p=n[1].balanceTwo-(s-n[1].balance)*n[0].price)),t.botLog&&(_=ke(d,n[1].balance),b=ke(p,n[1].balanceTwo),console.log(["reserved-deposit:",t.tradeCurrency.name.toUpperCase(),_+"% / "+b+"%",t.tradeCurrency.nameTwo.toUpperCase()].join(" "))),t.oneOrdersSell&&("poloniex"===t.exchange?p=o:d=o),S={name:d>0?d:0,nameTwo:p>0?p:0},f="poloniex"===t.exchange?u:s,t.countOrders?t.countOrders>=3||(t.countOrders=3):t.countOrders=f<=10?6:f<=200?15:f<=500?18:f<=1e3?21:25,m="poloniex"===t.exchange?t.poloniexMinOrders/n[0].price:oe,ce=t.countOrders*t.multiplierOrdersExtra,t.sizeOrdersMartingale?(g=1+t.sizeOrdersMartingale/100,y=f/((Math.pow(g,t.countOrders)-1)/(g-1))):y=f/t.countOrders,A=Oe(y>m?y:m,ne),t.botLog&&console.log([me+"\nРасчет переменных","balance: "+Oe(n[1].balance)+" "+t.tradeCurrency.name.toUpperCase(),"balance-two: "+Oe(n[1].balanceTwo)+" "+ge(t.tradeCurrency.nameTwo),"deposit: "+c+" "+t.tradeCurrency.name.toUpperCase()+" или "+i+" "+t.tradeCurrency.nameTwo.toUpperCase(),"percent-deposit: "+t.depositLimit+" %","trade-deposit: "+s+" "+t.tradeCurrency.name.toUpperCase()+" | "+u+" "+t.tradeCurrency.nameTwo.toUpperCase(),"reserved-deposit: "+Oe(S.name)+" "+t.tradeCurrency.name.toUpperCase()+" | "+Oe(S.nameTwo)+" "+t.tradeCurrency.nameTwo.toUpperCase(),"count-orders: "+t.countOrders,"quantity-orders-in-blocks: "+(t.quantityOrdersInBlocks?t.quantityOrdersInBlocks:"OFF"),"size-static-order: "+A,me].join("\n")),r(null))})},_.on("message",function(e){var r,n,o,c,i,s,u,d,f,m;if(r=e.chat.id,t.myChatId||_.sendMessage(r,"Install your Telegram id: "+r),r===t.myChatId){if("Ордера"===e.text&&(n=function(){a.series([function(e){return p.balanceRequest(t.tradeCurrency,function(t,r,n){return null!=t?e(t):e(null,{balance:r,balanceTwo:n})})},function(e){return p.ordersRequest(t.tradeCurrency.pair,function(t,r){return null!=t?e(t):e(null,{data:r})})}],function(e,r){var a,o,c,i,s,u,d,_,f,m,y,T;a=[g()+":",me],o="Balance: "+(null!=(c=r[0])?c.balance.toFixed(3):void 0)+" "+t.tradeCurrency.name.toUpperCase()+" | "+ge(t.tradeCurrency.nameTwo)+(null!=(i=r[0])?i.balanceTwo.toFixed(3):void 0),null!=e?0===e.success?(s=null!=(u=e.error)?u.split("send:")[1]:void 0,null!=s?(p.setNonce(s),n()):(d=x(e),a.push(d+"\n"+me+"\n"+o),b(a.join("\n")))):b(e):(_={},f=0,m=0,y={},Object.keys(r[1].data).forEach(function(e){var n,a,l;n=r[1].data[e].rate*+("1e"+ne),null!=y[n]?(++_[n],a=" | "+_[n],l=Oe(Oe(y[n].split("|")[1].trim())+Oe(r[1].data[e].amount)),y[n]=r[1].data[e].type+" | "+l+" | "+ge(t.tradeCurrency.nameTwo)+r[1].data[e].rate+a):(_[n]=1,y[n]=r[1].data[e].type+" | "+Oe(r[1].data[e].amount)+" | "+ge(t.tradeCurrency.nameTwo)+r[1].data[e].rate),f+=r[1].data[e].amount,m+=r[1].data[e].amount*r[1].data[e].rate}),a=l.concat(a,l.values(y)),a.push(me+"\nCount: "+Oe(f)+" | Sum: "+ge(t.tradeCurrency.nameTwo)+Oe(m)+"\n"+o),T=a.join("\n"),b(T))})})(),"История"===e.text&&(o=function(){p.tradeGetHistory(t.tradeCurrency.pair,10,function(e,r){var n,a,l;return null!=e?0===e.success?(n=null!=(a=e.error)?a.split("send:")[1]:void 0,null!=n?(p.setNonce(n),o()):b(x(e))):b(x(e)):(l=[],Object.keys(r).forEach(function(e){l.push(r[e].type+" | "+r[e].amount.toFixed(3)+" | "+ge(t.tradeCurrency.nameTwo)+r[e].rate)}),l.push(g()+":\n"+me),l.reverse(),b(l.join("\n")))})})(),"Закрыть активные ордера"===e.text&&(c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({inline_keyboard:[[{text:"Закрыть ордера!",callback_data:"close_orders_now"}]]})},b("*Вы уверены что хотите закрыть ордера?*",c)),"/config"===(null!=(i=e.text)?i.toLowerCase():void 0)&&(s=["Бот на паре: "+g(),"EXCHANGE: "+t.exchange+" | Выбор биржи btc-e or poloniex","POLONIEX_FEE: "+t.poloniexFee+" | Комиссия на сделки биржи POLONIEX","TIME_UPDATE_AUTO_SETTINGS: "+N+" | время обновления авто настроек параметров (в мин)","DEPOSIT_LIMIT: "+t.depositLimit+" | процент использования депозита","NOTIFICATION_PAIR: "+t.notificationPair+" | пары для уведомления","NOTIFICATION_DEVIATION_PERCENT: "+t.notificationDeviation+" | процент отклонения от текущей цены чтобы сработало уведомление","COUNT_ORDERS: "+t.countOrders+" | количество ордеров","QUANTITY_ORDERS_IN_BLOCKS: "+t.quantityOrdersInBlocks+" | количество ордеров в блоке","TIME_CLOSE_ORDERS: "+t.timeCloseOrders+" | сколько минут ждать перед закрытием неисполнившихся ордеров","TIME_CLOSE_ORDERS_INACTIVITY: "+t.timeCloseOrdersInactivity+" | закрытие после бездействия","OFFSET_ORDERS_POINTS: "+t.offsetOrdersPoints+" | отступ ордеров в пунктах","OFFSET_ORDERS_PERCENT: "+t.offsetOrdersPercent+" | отступ для ордеров в процентах","OFFSET_FIRST_ORDERS_PERCENT: "+t.offsetFirstOrdersPercent+" | отступ первого ордера в процентах","STEP_BREAKEVEN_PERCENT: "+t.stepBreakevenPercent+" | процент отступа безубытка для торгов","DANGER_PRICE_STOP: "+t.dangerPriceStop+" | остановка бота при большом изменении цены","DYNAMIC_SETTINGS_TIME: "+t.dynamicSettingsTime+" | динамическое время обновления настроек","DYNAMIC_OFFSET_ORDERS: "+t.dynamicOffsetOrders+" | динамическое распределение ордеров","TREND_DEFINITION: "+t.trendDefinition+" | определение тренда","ABRUPT_CHANGE_TREND: "+t.abruptChangeTrend+" | быстрое изменение направления тренда","BBANDS: "+t.bbands+" | Стратегия Полосы Боллинджера","BBANDS_DEVIATION: "+t.bbandsDeviation+" | Отклонение","BBANDS_INTERVAL: "+t.bbandsInterval+" | Таймфрейм (в мин)","ONE_ORDERS_SELL: "+t.oneOrdersSell+" | Стратегия One Sell a lot Buy","ONE_ORDERS_SELL_PERCENT: "+t.oneOrdersSellPercent+" | Насколько увеличить среднюю цену продажи в процентах","ONE_ORDERS_SELL_OFFSET: "+t.oneOrdersSellOffset+" | Разница между ценой LastPrice и первым ордером buy в стеке ордеров в процентах"],b(s.join("\n\n"))),"/version"===(null!=(u=e.text)?u.toLowerCase():void 0)&&b("Версия бота: "+t.versionBot),"/start"!==(d=null!=(f=e.text)?f.toLowerCase():void 0)&&"главное меню"!==d||(c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({keyboard:[[{text:"Ордера"},{text:"Котировки"},{text:"История"}],[{text:"Контроль"},{text:"Нотис"},{text:"Торговля"}],[{text:"Закрыть активные ордера"}]],resize_keyboard:!0})},b("Выберите:",c)),"Котировки"===e.text){if("btc-e"!==t.exchange)return void b("Этот пункт не доступен для данной биржи");c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({keyboard:[[{text:"USD"},{text:"BTC"},{text:"OTHER"}],[{text:"Главное меню"}]],resize_keyboard:!0})},b("Валюта:",c)}if("Торговля"===e.text&&(c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({keyboard:[[{text:"Сменить пару"},{text:"Тип"}],[{text:"Авто выход из пары"}],[{text:"Главное меню"}]],resize_keyboard:!0})},b("Выберите:",c)),"USD"===e.text&&(c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({inline_keyboard:[[{text:"NMC",callback_data:"nmc_usd"},{text:"PPC",callback_data:"ppc_usd"},{text:"NVC",callback_data:"nvc_usd"},{text:"LTC",callback_data:"ltc_usd"},{text:"BTC",callback_data:"btc_usd"}],[{text:"DSH",callback_data:"dsh_usd"},{text:"ETH",callback_data:"eth_usd"},{text:"EUR",callback_data:"eur_usd"},{text:"RUR",callback_data:"usd_rur"}]]})},b("Символ:",c)),"BTC"===e.text&&(c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({inline_keyboard:[[{text:"NMC",callback_data:"nmc_btc"},{text:"PPC",callback_data:"ppc_btc"},{text:"NVC",callback_data:"nvc_btc"},{text:"LTC",callback_data:"ltc_btc"}],[{text:"DSH",callback_data:"dsh_btc"},{text:"ETH",callback_data:"eth_btc"},{text:"RUR",callback_data:"btc_rur"},{text:"EUR",callback_data:"btc_eur"}]]})},b("Символ:",c)),"OTHER"===e.text&&(c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({inline_keyboard:[[{text:"ETH/LTC",callback_data:"eth_ltc"},{text:"ETH/EUR",callback_data:"eth_eur"},{text:"ETH/RUR",callback_data:"eth_rur"}],[{text:"LTC/RUR",callback_data:"ltc_rur"},{text:"LTC/EUR",callback_data:"ltc_eur"},{text:"EUR/RUR",callback_data:"eur_rur"}]]})},b("Пара:",c)),"Контроль"===e.text&&(c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({keyboard:[[{text:"Скорость"},{text:"Состояние"},{text:"Модули"}],[{text:"Главное меню"}]],resize_keyboard:!0})},b("Выберите:",c)),"Нотис"===e.text&&(c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({keyboard:[[{text:"Мониторинг"},{text:"Уведомление"}],[{text:"Круг"}],[{text:"Главное меню"}]],resize_keyboard:!0})},b("Выберите:",c)),"Мониторинг"===e.text&&(c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({inline_keyboard:[[{text:"Старт",callback_data:"monitoring start"},{text:"Стоп",callback_data:"monitoring stop"}]]})},m=be.status?"Работает.":"Остановлен.",s=["Включает мониторинг возможных торговых пар. Уведомление раз в 5 минут.","Текущие состояние: "+m],b(s.join("\n"),c)),"Уведомление"===e.text&&(c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({inline_keyboard:[[{text:"Старт",callback_data:"notification start"},{text:"Стоп",callback_data:"notification stop"}]]})},m=_e.status?"Работает.":"Остановлен.",s=["Включает уведомления о скачках курса.","Текущие состояние: "+m],b(s.join("\n"),c)),"Круг"===e.text&&Xe(),"Тип"===e.text&&(c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({inline_keyboard:[[{text:"Only buy",callback_data:"type buy"},{text:"Only sell",callback_data:"type sell"},{text:"Buy & Sell",callback_data:"type all"}]]})},s=["Текущий тип торговли "+$.toUpperCase(),"Новый тип:"],b(s.join("\n"),c)),"Сменить пару"===e.text){if("btc-e"!==t.exchange)return void b("Этот пункт не доступен для данной биржи");c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({inline_keyboard:[[{text:"BTC/USD",callback_data:"trade btc_usd"},{text:"BTC/RUR",callback_data:"trade btc_rur"},{text:"BTC/EUR",callback_data:"trade btc_eur"}],[{text:"LTC/BTC",callback_data:"trade ltc_btc"},{text:"LTC/USD",callback_data:"trade ltc_usd"},{text:"LTC/RUR",callback_data:"trade ltc_rur"}],[{text:"LTC/EUR",callback_data:"trade ltc_eur"},{text:"NMC/BTC",callback_data:"trade nmc_btc"},{text:"NMC/USD",callback_data:"trade nmc_usd"}],[{text:"NVC/BTC",callback_data:"trade nvc_btc"},{text:"NVC/USD",callback_data:"trade nvc_usd"},{text:"PPC/BTC",callback_data:"trade ppc_btc"}],[{text:"PPC/USD",callback_data:"trade ppc_usd"},{text:"DSH/BTC",callback_data:"trade dsh_btc"},{text:"DSH/USD",callback_data:"trade dsh_usd"}],[{text:"ETH/BTC",callback_data:"trade eth_btc"},{text:"ETH/USD",callback_data:"trade eth_usd"},{text:"ETH/EUR",callback_data:"trade eth_eur"}],[{text:"ETH/LTC",callback_data:"trade eth_ltc"},{text:"ETH/RUR",callback_data:"trade eth_rur"},{text:"USD/RUR",callback_data:"trade usd_rur"}],[{text:"EUR/USD",callback_data:"trade eur_usd"},{text:"EUR/RUR",callback_data:"trade eur_rur"}]]})},s=["Текущая пара "+g(),"Внимание! На новой паре должны быть средства для торгов, иначе переключение завершится ошибкой!","Новая торгая пара:"],b(s.join("\n"),c)}return"Авто выход из пары"===e.text&&(t.oneOrdersSell?(t.oneOrdersSellPercent=0,ue=!0,s="Авто выход включен!"):s="На текущей стратегии данная функция недоступна",b(s)),"Скорость"===e.text&&(c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({inline_keyboard:[[{text:"Normal",callback_data:"speed normal"},{text:"Extra",callback_data:"speed extra"}]]})},s=["Влияет на плотность стека ордеров, размер спреда и время закрытия неиспользованных ордеров","Время действия "+Te(N)+".","Текущая скорость: "+re].join("\n"),b(s,c)),"Состояние"===e.text&&(c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({inline_keyboard:[[{text:"Пауза",callback_data:"worker pause"},{text:"Продолжить",callback_data:"worker continued"}]]})},m=I?"Пауза":"Работает",b("Текущие состояние: "+m,c)),"Модули"===e.text&&(c={parse_mode:"markdown",disable_web_page_preview:!1,reply_markup:JSON.stringify({inline_keyboard:[[{text:"Динам. время обновления "+(t.dynamicSettingsTime?"[Вкл]":"[Выкл]"),callback_data:"modules dynamic-settings-time"}],[{text:"Динам. распределение ордеров "+(t.dynamicOffsetOrders?"[Вкл]":"[Выкл]"),callback_data:"modules dynamic-offset-orders"}],[{text:"Определение тренда "+(t.trendDefinition?"[Вкл]":"[Выкл]"),callback_data:"modules trend-definition"}],[{text:"Контроль смены тренда "+(t.abruptChangeTrend?"[Вкл]":"[Выкл]"),callback_data:"modules abrupt-change-trend"}],[{text:"Стоп при большом изменении цены "+(t.dangerPriceStop?"[Вкл]":"[Выкл]"),callback_data:"modules danger-price-stop"}],[{text:"Включить все",callback_data:"modules all-modules-on"},{text:"Выключить все",callback_data:"modules all-modules-off"}],[{text:"Полосы Боллинджера "+(t.bbands?"[Вкл]":"[Выкл]"),callback_data:"modules bbands"}],[{text:"One Sell a lot Buy "+(t.oneOrdersSell?"[Вкл]":"[Выкл]"),callback_data:"modules one-orders-sell"}],[{text:"Вывод лога "+(t.botLog?"[Вкл]":"[Выкл]"),callback_data:"modules bot-log"}]]})},b("*Модули обновления настроек:*",c)),"/help"===(null!=(d=e.text)?d.toLowerCase():void 0)&&(s=["Бот на паре: "+g(),"Exchange: "+t.exchange.toUpperCase(),"TIME_UPDATE_AUTO_SETTINGS="+N+" | время обновления авто настроек параметров (в мин)","OFFSET_ORDERS_POINTS="+t.offsetOrdersPoints+" | отступ для ордеров в пунктах","OFFSET_ORDERS_PERCENT="+t.offsetOrdersPercent+" | отступ для ордеров в процентах","OFFSET_FIRST_ORDERS_PERCENT="+t.offsetFirstOrdersPercent+" | отступ первого ордера в процентах","STEP_BREAKEVEN_PERCENT="+t.stepBreakevenPercent+" | процент отступа безубытка для торгов","TIME_CLOSE_ORDERS="+t.timeCloseOrders+" | сколько минут ждать перед закрытием неисполнившихся ордеров","COUNT_ORDERS="+t.countOrders+" | количество ордеров (бот будет переазгружен)","QUANTITY_ORDERS_IN_BLOCKS="+t.quantityOrdersInBlocks+" | количество ордеров в блоке","DEPOSIT_LIMIT="+t.depositLimit+" | процент использования депозита (бот будет перезагружен)","ONE_ORDERS_SELL_PERCENT="+t.oneOrdersSellPercent+" | Насколько увеличить среднюю цену продажи в процентах","ONE_ORDERS_SELL_OFFSET="+t.oneOrdersSellOffset+" | Разница между ценой LastPrice и первым ордером buy в стеке ордеров в процентах"],b(s.join("\n\n"))),/(\D+)=(\d+)/.test(e.text)?function(){var r,n,a;r=e.text.split("="),r[0]=r[0].toUpperCase(),"OFFSET_ORDERS_POINTS"!==(n=r[0])&&"TIME_UPDATE_AUTO_SETTINGS"!==n&&"OFFSET_ORDERS_PERCENT"!==n&&"OFFSET_FIRST_ORDERS_PERCENT"!==n&&"TIME_CLOSE_ORDERS"!==n&&"STEP_BREAKEVEN_PERCENT"!==n&&"DEPOSIT_LIMIT"!==n&&"COUNT_ORDERS"!==n&&"QUANTITY_ORDERS_IN_BLOCKS"!==n&&"ONE_ORDERS_SELL_PERCENT"!==n&&"ONE_ORDERS_SELL_OFFSET"!==n||(a=l.camelCase(r[0]),t[a]=+r[1],console.log("SET "+r[0]+"="+r[1]),b("Настройки обновлены!"),"DEPOSIT_LIMIT"!==(n=r[0])&&"COUNT_ORDERS"!==n||(I=!0,je(t.tradeCurrency.pair,function(e){I=!1,b("Бот перезапущен!")})))}():void 0}}),_.on("callback_query",function(e){e.from.id===t.myChatId&&(/trade (\w*_(usd|rur|eur|btc|ltc))/.test(e.data)?qe(e.data.substr(6)):/speed (normal|extra)/.test(e.data)?Je(e.data.substr(6)):/worker (continued|pause)/.test(e.data)?Ve(e.data.substr(7)):/monitoring (start|stop)/.test(e.data)?Ke(e.data.substr(11)):/notification (start|stop)/.test(e.data)?Ye(e.data.substr(13)):/type (buy|sell|all)/.test(e.data)?He(e.data.substr(5)):/modules (\w*)/.test(e.data)?ze(e.data.substr(8)):/close_orders_now/.test(e.data)?Me():Ge(e.data))}),Me=function(){b("Начато закрытие ордеров..."),I=!0,U.all=1,setTimeout(function(){pt(t.tradeCurrency.pair,function(e){var t,r;null!=e?0===e.success&&(t=null!=(r=e.error)?r.split("send:")[1]:void 0,null!=t?(p.setNonce(t),Me()):b(x(e))):b("Активные ордера закрыты на паре: "+g()),I=!1})},o("2s"))},qe=function(e){var r,n;b("Инициализировано изменение пары..."),I=!0,r=e.split("_")[0],n=e.split("_")[1],t.tradeCurrency.name===r&&t.tradeCurrency.nameTwo!==n?U.sell=1:t.tradeCurrency.name!==r&&t.tradeCurrency.nameTwo===n&&(U.buy=1),setTimeout(function(){pt(t.tradeCurrency.pair,function(){t.tradeCurrency={name:r,nameTwo:n,pair:[r,n].join("_")},P=!0,ot(t.tradeCurrency.pair,function(e){var t,r;null!=e?(t=x(e),console.log(("["+T()+"]: Ошибка получения данных с сервера!\n"+t).red),r=["Critical error: Ошибка получения данных с сервера!","Бот поставлен на паузу, после обновления баланса необходимо перезапустить пару!","Ошибка: "+t].join("\n"),b(r),I=!0):(D=0,I=!1,b("Выполнено! Новая пара "+g()))})})},o("5s"))},He=function(e){$=e,ie="all"!==e,b("Выполнено! Новый тип "+$.toUpperCase())},Je=function(e){var t;rt(e),t=["Режим "+e.toUpperCase()+" включен.","Пара: "+g()],R=O(),console.log(("\n["+T()+"]: "+t[0]+"\n").green),b(t.join(" "))},Ve=function(e){var t;I="pause"===e,t=I?"Пауза":"Работает",b("Новое состояние: "+t+". Пара: "+g())},ze=function(e){var r,n;/\all-modules/.test(e)?(r="all-modules-on"===e,t.dynamicSettingsTime=r,t.dynamicOffsetOrders=r,t.trendDefinition=r,t.abruptChangeTrend=r,t.dangerPriceStop=r,t.dynamicSettingsTime||(N=t.timeUpdateAutoSettings),b("Все модули "+(r?"включены":"выключены")+"!")):("one-orders-sell"===e&&(t.bbands=!1),"bbands"===e&&(t.oneOrdersSell=!1),n=e.replace(/\-./g,function(e,t,r){return e.replace("-","").toUpperCase()}),t[n]=!t[n],b(e.replace(/\-/g,"_").toUpperCase()+": "+t[n]))},Ge=function(e){p.getTicker(e,function(r,n){var a,l,o,c,i,s,u,d,p,_,f;return null!=r?b(x(r)):(a=at.pairs[e].decimal_places,l=n[e].last,o=n[e].sell,c=n[e].buy,i=Oe(n[e].avg,a),s=Oe(c-o,a),u=e.split("_")[1],d=Re(c,t.stepBreakevenPercent,a),p=s>d?"✔":"✗",_=l>i?"↑":"↓",f=[e.replace("_","/").toUpperCase()+":","sell: "+ge(u)+o,"buy: "+ge(u)+c,"last: "+ge(u)+l,"avg: "+ge(u)+i+" | "+_,"spread:   "+s+" | "+(s/d*100-100).toFixed()+"%","required: "+d+" "+p],b(f.join("\n")))})},Ke=function(e){var t;be.status="start"===e,clearInterval(be.interval),be.status?(t="Работает",Qe(),be.interval=setInterval(function(){Qe()},o("5m"))):t="Остановлен",b("Новое состояние: "+t)},Ye=function(e){var t;if(null==de||!de.length)return void b("Внимание! Конфиг для уведомлений не задан!");_e.status="start"===e,clearInterval(_e.interval),_e.status?(t="Работает",We()):t="Остановлен",b("Новое состояние: "+t)},Qe=function(){var e;e=lt.join("-"),a.parallel([function(t){return p.getTicker(e,function(e,r){return null!=e?t(e):t(null,r)})},function(t){return p.getTrades(e,{limit:2},function(e,r){return null!=e?t(e):t(null,r)})}],function(e,r){var n,a,l,i,s,u;if(null!=e)return n=x(e),a="Error trading pairs available: "+n,b(a),void console.log(a.red);l=["Доступные пары для торгов:\n"],i=(new Date).getTime(),s=c.range(i-o("1m"),i),u=0,lt.forEach(function(e){var n,a,o,c,i,d,p,_,f,m,g,y,T;n=e.split("_")[1],a=e.split("_")[0],o=at.pairs[e].decimal_places,c=r[0][e].last,i=r[0][e].sell,d=r[0][e].buy,p=r[0][e].vol,_=r[0][e].vol_cur,f=r[0][e].avg?r[0][e].avg:(i+d)/2,f=Oe(f,o),m=Oe(d-i,o),g=Re(d,t.stepBreakevenPercent,o),y=c>f?"↑":"↓",T=!r[1][e][0].timestamp||s.contains(1e3*r[1][e][0].timestamp)&&s.contains(1e3*r[1][e][1].timestamp),m>g&&T&&(u++,l.push(e.replace("_","/").toUpperCase()+"\nprice: "+d+" - "+i+"\navg:   "+f+" | "+y+"\nvol_cur: "+_+" "+ge(a)+"\nvol:        "+p+" "+ge(n)+"\nspread:   "+Ee(m)+" | "+(m/g*100-100).toFixed()+"%\nrequired: "+Ee(g)+"\n")),u>=20&&(b(l.join("\n")),u=0,l=[])}),setTimeout(function(){l.length&&b(l.join("\n"))},o("2s"))})},We=function(){var r,n;null!=de&&de.length&&("all_all"===de[0]&&(de=lt),r=de.join("-"),n={},_e.interval=setInterval(function(){p.getTicker(r,function(r,a){var l,c,i;return null==r?(i=0,c=[],de.forEach(function(r){var l,s,u,d,p,_,f,m,g,y,T,O,E;t.tradeCurrency.pair!==r&&e(r,lt)&&(n[r]||(l=at.pairs[r].decimal_places,s=a[r].sell,u=a[r].buy,d=a[r].last,p=a[r].vol,_=a[r].vol_cur,f=a[r].avg?a[r].avg:(s+u)/2,f=Oe(f,l),m=Oe(u-s,l),g=Re(s,t.notificationDeviation,l),m>g&&(i++,n[r]=!0,y=r.split("_")[1],T=r.split("_")[0],O=d<=s||d<=s+we(3,l)?"down ↓":"up ↑",E=d>f?"↑":"↓",c.push(["Уведомление "+r.replace("_","/").toUpperCase()+":","directions: "+O,"sell: "+ge(y)+s,"buy: "+ge(y)+u,"last: "+ge(y)+d,"avg: "+ge(y)+f+" | "+E,"vol_cur: "+_+" "+ge(T),"vol: "+p+" "+ge(y),"spread: "+Ee(m)+"\n"].join("\n"))),i>=15&&(b(c.join("\n")),i=0,c=[]),setTimeout(function(){n[r]=!1,n.error=!1},o("15m"))))}),setTimeout(function(){c.length&&b(c.join("\n"))},o("2s"))):(l=x(r),c="Error notification price: "+l,console.log(c.red),n.error?void 0:(b(c),n.error=!0))})},o("5s")))},Xe=function(t,r){var n,a,l,o;null==t&&(t=.993),null==r&&(r=!1),n={},a={},l={},o={},lt.forEach(function(e){var t;t=e.split(/\s*_\s*/),n[t[0]]?n[t[0]].push(t[1]):n[t[0]]=[t[1]]}),p.getTicker(lt.join("-"),function(c,i){var s,u,d,p;return null!=c?(s=x(c),b("Error: "+s)):(lt.forEach(function(e){a[e]=Ie(1,i[e].buy)}),lt.forEach(function(e){var t;t=e.split(/\s*_\s*/),n[t[0]].forEach(function(r){r!==t[1]&&(l[t[1]+"_"+t[0]+"_"+r]=De(a[e],i[t[0]+"_"+r].sell))})}),Object.keys(l).forEach(function(r){var n,a;n=r.split(/\s*_\s*/),e(n[0]+"_"+n[2],lt)&&(a=Ie(l[r],i[n[0]+"_"+n[2]].buy)),e(n[2]+"_"+n[0],lt)&&(a=De(l[r],i[n[2]+"_"+n[0]].buy)),a>t&&(o[r+"_"+n[0]]=Oe(a,5))}),u=["Проверка возможных вариантов перепродаж.","Показаны значения больше: "+t,"Значения меньше 1 убыточны:\n"],d=[],Object.keys(o).forEach(function(e){d.push([e.replace(/\_/g,"->"),o[e]])}),d.length?(p=d.sort(function(e,t){return t[1]-e[1]}),p.forEach(function(e){u.push(e.join(": "))})):u.push("Нет подходящих вариантов"),!r||d.length?b(u.join("\n")):void 0)})},rt=function(e){var r;null!=e&&(r=e),r||(r=D>ce?"extra":"normal"),D=0,"extra"===r?(Ze=L.extra,$e=L.extra,tt=F,et=60*t.timeCloseOrdersExtra):(Ze=L.buy,$e=L.sell,tt=B,et=60*t.timeCloseOrders),re=r},nt=0,ot=function(e,t){return p.getInfo(function(r,n){if(null!=r)return t(r);try{at=n,lt=Object.keys(n.pairs),ne=n.pairs[e].decimal_places,oe=n.pairs[e].min_amount,ae=n.pairs[e].min_price,le=n.pairs[e].fee}catch(e){t("Not valid pair")}return je(e,function(r){var n,a;return r?(n=null!=(a=r.error)?a.split("send:")[1]:void 0,null!=n?(p.setNonce(n),ot(e,t)):(nt++,nt>5?(nt=0,
t(r)):ot(e,t))):t(null)})})},ct=function(e,t){return p.getTicker(e,function(r,n){var a,l,o,c;return null!=r?t(r):(a=n[e].last,l=n[e].sell,o=n[e].buy,c=Oe(o-l,ne),G=tt<=we(2)?c>=tt:c>tt,t(null,{lastPrice:a,bidPrice:l,askPrice:o,spread:c}))})},it=function(e,r){return G?p.balanceRequest(e,function(e,n,a){return null!=e?r(e):(n=Ae(n,"name"),a=Ae(a,"nameTwo"),"all"===$?n<oe&&a<oe?K<t.ecoCountCycle&&K++:K>0&&(K=0):K=t.ecoCountCycle,r(null,{balance:n,balanceTwo:a}))}):r(null)},st=function(e,r,n,o,c){var i;return i="poloniex"===t.exchange?r*n<t.poloniexMinOrders:r<oe,i?c(null):se?c(null):a.series([function(e){return U.sell=1,pt(o,e)},function(e){var n,a,o,c,i,s,u,d;return n=l.keys(J),a=l.keys(q),o=l.difference(a,n),c=0,i=0,s=0,o.forEach(function(e){s++,c+=+q[e].amount,i+=+q[e].amount*+q[e].rate}),s>0?(H.priceBuy=i/c,u=ve(i,2*le+t.oneOrdersSellPercent)/c,d=l.findKey(J,["type","sell"]),d&&(r+=J[d].amount),H.amount=r,e(null,{rate:u})):e(null,{rate:0})}],function(t,n){return n[1].rate>0?dt(e,n[1].rate,r,o,c):c(null)})},ut=function(e,r,n,o,c){var i,s,u,d;if(r<oe)return c(null);if(se)return c(null);if(t.quantityOrdersInBlocks){if(t.quantityOrdersInBlocks<=z)return c(null);i=!0}return s=!0,M={buy:-1,sell:-1},"all"===$||$===e?r>=A?(void 0!==u&&null!==u||(u=n),a.doWhilst(function(a){var c,d;return ee?("sell"===e&&(u-=$e),"buy"===e&&(u+=Ze),r/=2,dt(e,u,r,o,a)):("buy"===e?((v||i)&&(v=!1,i=!1,l.isEmpty(J)||(s=!1,"object"==typeof(c=Ce(J,"min"))&&c.rate<n&&(u=c.rate))),t.offsetFirstOrdersPercent&&s?(u-=L.first,s=!1):u-=Ze,r=-1===M.buy?r:M.buy/u):(t.offsetFirstOrdersPercent&&s?(u+=L.first,s=!1):u+=$e,r=-1===M.sell?r:M.sell),t.sizeOrdersMartingale?(j[e]=j[e]?ve(j[e],t.sizeOrdersMartingale):A,d=r>j[e]?j[e]:r):d=r>A?A:r,dt(e,u,d,o,a))},function(){return!(t.quantityOrdersInBlocks&&t.quantityOrdersInBlocks<=z)&&r>A},function(e){return c(null!=e?e:null)})):(t.oneOrdersSell&&"buy"===e&&"object"==typeof(d=Ce(J,"min"))&&d.rate<n&&(n=d.rate),t.offsetOrdersPercent&&("sell"===e&&(n+=$e),"buy"===e&&(n-=Ze)),t.dynamicOffsetOrders&&("sell"===e&&(n+=we(1)),"buy"===e&&(n-=we(1))),dt(e,n,r,o,c)):c(null)},dt=function(e,r,n,a,l){var o;return r=Oe(r,ne),r>=ae||(r=ae),n=Oe(n-1e-7,8),o="poloniex"===t.exchange?n*r<t.poloniexMinOrders:n<oe,o?l(null):p.tradeSetOrder(a,e,r,n,function(a,o){var c,i;return null!=a?(v=!0,c=x(a),console.log(("["+T()+"]: Error: "+c+" | "+e+" | rate: "+r+" | amount: "+n).red),l(a)):(i="["+T()+"]: Open: "+e+" | rate: "+r+" | amount: "+n,"buy"===e?(t.oneOrdersSell&&(q[o.order_id]={rate:r,amount:n},t.quantityOrdersInBlocks&&z++),M.buy="poloniex"===t.exchange?Ae(o.funds[t.tradeCurrency.name],"name"):Ae(o.funds[t.tradeCurrency.nameTwo],"nameTwo")):(t.oneOrdersSell&&(H.id=o.order_id),M.sell="poloniex"===t.exchange?Ae(o.funds[t.tradeCurrency.nameTwo],"nameTwo"):Ae(o.funds[t.tradeCurrency.name],"name")),console.log("buy"===e?i.green:i.yellow),D++,l(null))})},pt=function(e,t){return p.ordersRequest(e,function(e,r){var n,l,o;return h=O(),null!=e?0===e.success&&null==(null!=(n=e.error)?n.split("send:")[1]:void 0)?(l=x(e),console.log(("["+T()+"] Cancel orders: "+l).yellow),t(null)):t(e):(o=Object.keys(r),a.eachSeries(o,function(e,t){return null!=U.buy&&"sell"===r[e].type?t(null):null!=U.sell&&"buy"===r[e].type?t(null):h-r[e].timestamp_created>(U.buy||U.sell||U.all||60)?_t(e,r[e].type,r[e].amount,r[e].rate,t):t(null)},function(e){return U={all:null,buy:null,sell:null},t(null!=e?e:null)}))})},_t=function(e,r,n,a,l){return p.tradeCancelOrder({order_id:e},function(o,c){return null!=o?l(o):(t.oneOrdersSell&&delete q[e],console.log(("["+T()+"]: Close: "+r+" | rate: "+a+" | amount: "+n).cyan),D>0&&D--,l(null))})},bt=function(){ie||ye(h,t.timeCloseOrdersInactivity)&&pt(t.tradeCurrency.pair,function(e){null!=e&&console.log("["+T()+"]: Orders inactivity: "+x(e))})},ft=function(){var e;ye(w,10)&&(e="Unknown error: Worker does not meet!",console.log(("["+T()+"]: "+e).red),gt({error:e}))},mt=function(){w=O(),I?setTimeout(function(){mt()},o("30s")):a.series([function(e){return ct(t.tradeCurrency.pair,e)},function(e){return it(t.tradeCurrency,e)}],function(e,r){var n;null!=e?(n=x(e),console.log(("Error: "+n).red),gt(e)):(P&&(Fe(r[0].askPrice,r[0].bidPrice,r[0].lastPrice),P=!1),G?a.series([function(e){return N>0&&w-R>60*N&&Fe(r[0].askPrice,r[0].bidPrice,r[0].lastPrice),e(null)},function(e){return w-h>et?pt(t.tradeCurrency.pair,e):e(null)},function(e){return t.oneOrdersSell?p.ordersRequest(t.tradeCurrency.pair,function(r,n){var a;return J=null!=n?n:{},t.quantityOrdersInBlocks&&(z=l.size(J)),a=l.findKey(J,["type","sell"]),a&&Oe(H.amount-1e-7,8)>J[a].amount&&(q=J,q["0000000001"]={rate:H.priceBuy,amount:J[a].amount},delete q[a],j={buy:0,sell:0}),V=!1,!a&&H.id&&(V=!0,H={},q={},U.all=1,h=0,j={buy:0,sell:0},ue&&(I=!0,ue=!1,pt(t.tradeCurrency.pair,function(){b("Авто выход завершен!\nБот поставлен на паузу!")}))),e(null)}):e(null)},function(e){var n,a;return t.oneOrdersSell&&V?e(null):t.botTrade&&C?(n=ee?te.ask:r[0].askPrice,a="poloniex"===t.exchange?r[1].balanceTwo:r[1].balance,t.oneOrdersSell?st("sell",a,n,t.tradeCurrency.pair,e):(j.sell=0,ut("sell",a,n,t.tradeCurrency.pair,e))):e(null)},function(e){var n,a;return t.oneOrdersSell&&V?e(null):t.botTrade&&C?(n=ee?te.bid:r[0].bidPrice,a="poloniex"===t.exchange?r[1].balance/n:r[1].balanceTwo/n,t.oneOrdersSell?v||z||(j.buy=0):j.buy=0,ut("buy",a,n,t.tradeCurrency.pair,e)):e(null)}],function(e){var r;null!=e?(r=x(e),console.log(("ErrorTrader: "+r).red),gt(e)):K===t.ecoCountCycle?setTimeout(function(){mt()},o("2s")):mt()}):setTimeout(function(){mt()},o("5s")))})},gt=function(e){var r,n,a,l;r="restart after "+t.restartTraderTime+" sec ...",console.log("["+T()+"]: "+r),n=null!=(a=e.error)?a.split("send:")[1]:void 0,null==n&&(l=x(e),k!==l&&(k=l,t.emailS&&"production"===process.env.NODE_ENV&&m(y(l+"\n\n"+r),function(e,t){}))),setTimeout(function(){console.log(("["+T()+"]: trader restart").bgGreen),null!=n&&p.setNonce(n),mt()},o(t.restartTraderTime+"s"))},function(){if(!t.myChatId)return void console.log("Get the user id in the Telegram");console.log("["+T()+"]: Trader Bot starting..."),console.log("["+T()+"]: Exchange: "+t.exchange.toUpperCase()+" | v."+t.versionBot),ot(t.tradeCurrency.pair,function(e){var r;return null!=e&&(r=x(e),console.log(("["+T()+"]: Error getting parameters from the server!\n"+r).red),process.exit(0)),mt(),t.botTrade&&setInterval(function(){bt(),ft()},o("5m")),setInterval(function(){Ue()},o(10*t.bbandsInterval+"s")),"production"===process.env.NODE_ENV&&b("Trader Bot started. Pair "+g()),console.log("["+T()+"]: Trader Bot started")})}()}).call(this);