(window.webpackJsonp=window.webpackJsonp||[]).push([[8,4,6,7],{688:function(t,e,n){"use strict";n.r(e);var r={props:{value:String},data:function(){return{state:this.value}},watch:{state:function(t){this.$emit("input",t)}}},l=n(95),component=Object(l.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"d-flex"},[e("button",{class:["btn flex-grow-1",{"btn-light":!t.state},{"btn-success":"buy"==t.state}],attrs:{type:"button"},on:{click:function(e){t.state="buy"}}},[t._v("\n    Buy\n  ")]),t._v(" "),e("button",{class:["btn flex-grow-1",{"btn-light":!t.state},{"btn-danger":"sell"==t.state}],attrs:{type:"button"},on:{click:function(e){t.state="sell"}}},[t._v("\n    Sell\n  ")])])}),[],!1,null,null,null);e.default=component.exports},690:function(t,e,n){"use strict";n.r(e);n(73),n(66),n(65),n(40),n(96),n(67),n(97);var r=n(53),l=n(123);function o(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var c={components:{CoinSelector:n(689).default},data:function(){return{coin:null}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(l.b)(["watchlist"])),methods:{add:function(){this.$db.addWatchlist(this.coin),this.$bvModal.hide("watch-modal")}}},d=c,v=n(95),component=Object(v.a)(d,(function(){var t=this,e=t._self._c;return e("button",{staticClass:"btn btn-secondary",on:{click:function(e){return t.$bvModal.show("watch-modal")}}},[e("b-icon-eye"),t._v(" "),Object.keys(t.watchlist.list).length?t._e():e("span",{staticClass:"ml-2"},[t._v("Watch")]),t._v(" "),e("b-modal",{attrs:{id:"watch-modal","hide-footer":""}},[e("div",{staticClass:"modal-body"},[e("coin-selector",{model:{value:t.coin,callback:function(e){t.coin=e},expression:"coin"}}),t._v(" "),e("button",{staticClass:"btn btn-primary btn-block mt-5",on:{click:t.add}},[t._v("\n        Add to watchlist\n      ")])],1)])],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{CoinSelector:n(689).default})},695:function(t,e,n){var content=n(709);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(124).default)("7420f7dc",content,!0,{sourceMap:!1})},696:function(t,e,n){"use strict";n.r(e);n(73),n(66),n(65),n(40),n(96),n(67),n(97);var r=n(53),l=n(123),o=n(689);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var d={components:{BuySellRadio:n(688).default,CoinSelector:o.default},data:function(){return{view:null,type:null,coin:null,quantity:null,price:null,datetime:null,selectedDate:null,selectedTime:null,fee:.1}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(l.b)(["funds"])),methods:{add:function(){var t=this.quantity*("buy"===this.type?1:-1);this.$db.addTrans(this.coin,t,this.price,this.fee,this.datetime),this.$bvModal.hide("transaction-modal")},setDatetime:function(){this.datetime=this.selectedDate+" "+this.selectedTime,this.view=null},intial:function(){this.type="buy",this.coin=null,this.quantity=null,this.price=null,this.selectedDate=this.$moment().format("YYYY-MM-DD"),this.selectedTime=this.$moment().format("HH:mm"),this.setDatetime()}}},v=d,m=n(95),component=Object(m.a)(v,(function(){var t=this,e=t._self._c;return e("b-modal",{attrs:{id:"transaction-modal",title:"Add new transaction","hide-footer":""},on:{show:t.intial}},[e("div",{staticClass:"modal-body"},[e("form",{directives:[{name:"show",rawName:"v-show",value:!t.view,expression:"!view"}],attrs:{novalidate:""},on:{submit:function(e){return e.preventDefault(),t.add.apply(null,arguments)}}},[e("div",{staticClass:"form-group"},[e("coin-selector",{model:{value:t.coin,callback:function(e){t.coin=e},expression:"coin"}})],1),t._v(" "),e("div",{staticClass:"form-group"},[e("buy-sell-radio",{model:{value:t.type,callback:function(e){t.type=e},expression:"type"}})],1),t._v(" "),e("div",{staticClass:"form-group"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-6"},[e("label",[t._v("Quantity")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.quantity,expression:"quantity"}],staticClass:"form-control",attrs:{type:"number",step:"0.01",placeholder:"0.00"},domProps:{value:t.quantity},on:{input:function(e){e.target.composing||(t.quantity=e.target.value)}}})]),t._v(" "),e("div",{staticClass:"col-6"},[e("label",[t._v("Price per coin")]),t._v(" "),e("div",{staticClass:"d-flex align-items-center postion-relative"},[e("span",{staticClass:"position-absolute ml-2"},[t._v("$")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.price,expression:"price"}],staticClass:"form-control pl-4",attrs:{type:"number",step:"0.000001",placeholder:"0.00"},domProps:{value:t.price},on:{input:function(e){e.target.composing||(t.price=e.target.value)}}})])])])]),t._v(" "),e("div",{staticClass:"form-group"},[e("button",{staticClass:"btn btn-sm btn-light",attrs:{type:"button"},on:{click:function(e){t.view="date"}}},[e("strong",[e("b-icon-calendar",{staticClass:"mr-1"}),t._v("\n            "+t._s(t.$moment(t.datetime).format("MMMM DD; YYYY, hh:mm A"))+"\n          ")],1)]),t._v(" "),e("b-dropdown",{staticClass:"d-inline",attrs:{variant:"light","toggle-class":"btn-sm"},scopedSlots:t._u([{key:"button-content",fn:function(){return[e("strong",[t._v(" Fee: "+t._s(t.fee)+"%")])]},proxy:!0}])},[t._v(" "),t._l([0,.1,.2,.3,.4,.5],(function(p,i){return e("b-dropdown-item-button",{key:i,on:{click:function(e){t.fee=p}}},[t._v("\n            "+t._s(p)+"%\n          ")])}))],2)],1),t._v(" "),e("button",{staticClass:"btn btn-primary btn-block mt-5",attrs:{type:"submit"}},[t._v("\n        Add transaction\n      ")])]),t._v(" "),e("form",{directives:[{name:"show",rawName:"v-show",value:"date"===t.view,expression:"view === 'date'"}],on:{submit:function(e){return e.preventDefault(),t.setDatetime.apply(null,arguments)}}},[e("div",{staticClass:"form-group"},[e("b-calendar",{attrs:{locale:"en-US",block:""},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),t._v(" "),e("div",{staticClass:"form-group text-center"},[e("b-time",{attrs:{locale:"en",block:""},model:{value:t.selectedTime,callback:function(e){t.selectedTime=e},expression:"selectedTime"}})],1),t._v(" "),e("div",{staticClass:"d-flex mt-5"},[e("button",{staticClass:"btn btn-light mr-3",attrs:{type:"button"},on:{click:function(e){t.view=null}}},[e("b-icon-arrow-left-short")],1),t._v(" "),e("button",{staticClass:"btn btn-primary flex-grow-1",attrs:{type:"submit"}},[t._v("\n          Set date & time\n        ")])])])])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{CoinSelector:n(689).default,BuySellRadio:n(688).default})},700:function(t,e,n){var r=n(16),l=n(466).values;r({target:"Object",stat:!0},{values:function(t){return l(t)}})},708:function(t,e,n){"use strict";n(695)},709:function(t,e,n){var r=n(122)(!1);r.push([t.i,".pointer[data-v-7f5df901]{cursor:pointer}",""]),t.exports=r},711:function(t,e,n){"use strict";n.r(e);n(472),n(74),n(66),n(65),n(96),n(67),n(97);var r=n(27),l=n(53),o=(n(84),n(145),n(73),n(691),n(40),n(700),n(146),n(123)),c=n(692),d=n(696),v=n(690);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function _(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(l.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={components:{TransactionModal:d.default,WatchButton:v.default},middleware:["init"],interval:null,data:function(){return{coins:c.a,viewTrans:null,market:{}}},computed:_(_({},Object(o.b)(["assets","watchlist"])),{},{tokens:function(){return Object.keys(this.assets.list).concat(Object.keys(this.watchlist.list))},assetList:function(){var t=[];for(var e in this.assets.list){var n=this.assets.list[e];if(this.market[n.id]){var r=n.total*this.notNaN(n.avgPrice),l=0,o=0,c=0;this.market[n.id].usd&&(o=(l=n.total*this.market[n.id].usd)-r,c=100*(l/r-1)),t.push(_(_({},n),{},{valueUSD:l,pnlUSD:o,pnlUSDChange:c}))}}return t.sort((function(a,b){return a.valueUSD>b.valueUSD?-1:b.valueUSD>a.valueUSD?1:0}))},transList:function(){return this.viewTrans?this.assets.list[this.viewTrans.id].records:[]},capital:function(){return Object.values(this.assetList).reduce((function(t,e){return t.total+=e.valueUSD,t.pnlUSD+=e.pnlUSD,t}),{total:0,pnlUSD:0})}}),watch:{tokens:function(){this.syncMarket()}},mounted:function(){this.$options.interval=setInterval(this.syncMarket,1e4),this.syncMarket()},destroyed:function(){clearTimeout(this.$options.interval)},methods:{syncMarket:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.tokens.length){e.next=5;break}return e.next=3,t.$cgc.simple.price({ids:t.tokens,vs_currencies:["usd"],include_24hr_change:!0});case 3:data=e.sent,t.market=data.data;case 5:case"end":return e.stop()}}),e)})))()},notNaN:function(t){return isNaN(t)?0:t},viewTransactions:function(t){this.viewTrans=t}}},h=(n(708),n(95)),component=Object(h.a)(f,(function(){var t=this,e=t._self._c;return e("div",{class:["container my-4 flex-grow-1",{"d-flex flex-column justify-content-center":!t.tokens.length}]},[t.assetList.length?e("div",{staticClass:"d-flex flex-column"},[e("div",{staticClass:"row justify-content-between align-items-center"},[t._m(0),t._v(" "),e("div",{staticClass:"mt-4 mt-md-0 col-md-6 d-flex align-items-center justify-content-md-end"},[e("button",{directives:[{name:"b-modal",rawName:"v-b-modal.transaction-modal",modifiers:{"transaction-modal":!0}}],staticClass:"btn btn-primary"},[e("b-icon-plus",{staticClass:"mr-2"}),t._v("\n          Add transaction\n        ")],1),t._v(" "),e("b-dropdown",{staticClass:"ml-2",attrs:{variant:"light","no-caret":"",right:""},scopedSlots:t._u([{key:"button-content",fn:function(){return[e("b-icon-three-dots-vertical")]},proxy:!0}],null,!1,357261731)},[t._v(" "),e("b-dropdown-item-button",{directives:[{name:"b-modal",rawName:"v-b-modal.purge-modal",modifiers:{"purge-modal":!0}}]},[e("span",{staticClass:"text-danger"},[e("b-icon-trash",{staticClass:"mr-1"}),t._v("\n              Purge your portfolio\n            ")],1)])],1)],1)]),t._v(" "),e("div",{staticClass:"mb-3 mt-5 d-flex align-items-start"},[e("watch-button",{staticClass:"btn-sm"}),t._v(" "),e("div",{staticClass:"d-flex flex-wrap"},[t._l(t.watchlist.list,(function(n){return[t.market[n.id]?e("span",{key:n.id,staticClass:"ml-2 mb-2 border rounded px-2 py-1 small"},[e("strong",[t._v(t._s(n.symbol.toUpperCase()))]),t._v("\n            "+t._s(t._f("usd")(t.market[n.id].usd))+"\n\n            "),e("span",{class:[{"text-success":t.market[n.id].usd_24h_change>=0},{"text-danger":t.market[n.id].usd_24h_change<0}]},[t.market[n.id].usd_24h_change>0?e("b-icon-caret-up-fill"):t._e(),t._v(" "),t.market[n.id].usd_24h_change<0?e("b-icon-caret-down-fill"):t._e(),t._v("\n\n              "+t._s(Math.abs(t.market[n.id].usd_24h_change).toFixed(2))+"%\n            ")],1),t._v(" "),e("b-icon-x",{staticClass:"pointer",on:{click:function(e){return t.$db.deleteWatchlist(n)}}})],1):t._e()]}))],2)],1),t._v(" "),e("div",{staticClass:"rounded border"},[e("div",{staticClass:"px-2 py-3 d-flex justify-content-between align-items-center"},[e("h4",{staticClass:"mb-0"},[t._v("Your assets")]),t._v(" "),e("div",{staticClass:"text-right"},[t._m(1),t._v(" "),e("h4",{staticClass:"mb-0"},[t._v(t._s(t._f("usd")(t.capital.total)))]),t._v(" "),e("small",{class:[{"text-success":t.capital.pnlUSD>=0},{"text-danger":t.capital.pnlUSD<0}]},[t.capital.pnlUSD>0?e("b-icon-caret-up-fill"):t._e(),t._v(" "),t.capital.pnlUSD<0?e("b-icon-caret-down-fill"):t._e(),t._v("\n            "+t._s(t.capital.pnlUSD>0?"+":"")+"\n            "+t._s(t._f("usd")(t.capital.pnlUSD))+"\n          ")],1)])]),t._v(" "),e("div",[t.assetList.length?e("table",{staticClass:"table table-striped table-hover mb-0"},[t._m(2),t._v(" "),e("tbody",[t._l(t.assetList,(function(n){var r;return[t.market[n.id]&&n.total?e("tr",{key:"coin-".concat(n.id)},[e("td",{staticClass:"py-4 align-middle"},[e("strong",{staticClass:"d-block d-md-inline"},[t._v(t._s(n.name))]),t._v(" "),e("small",{staticClass:"text-muted d-block d-md-inline"},[t._v("\n                    "+t._s(n.symbol.toUpperCase())+"\n                  ")]),t._v(" "),e("small",{staticClass:"d-block d-md-none"},[t._v(t._s(n.total))])]),t._v(" "),e("td",{staticClass:"py-4 align-middle text-right"},[e("div",[t._v("\n                    "+t._s(t._f("usd")(null!==(r=t.market[n.id].usd)&&void 0!==r?r:"-"))+"\n                  ")]),t._v(" "),e("div",{class:["small d-md-none",{"text-success":t.market[n.id].usd_24h_change>=0},{"text-danger":t.market[n.id].usd_24h_change<0}]},[t.market[n.id].usd_24h_change>0?e("b-icon-caret-up-fill"):t._e(),t._v(" "),t.market[n.id].usd_24h_change<0?e("b-icon-caret-down-fill"):t._e(),t._v(" "),e("span",[t._v("\n                      "+t._s(Math.abs(t.market[n.id].usd_24h_change).toFixed(2))+"%\n                    ")])],1),t._v(" "),e("div",{staticClass:"small text-muted"},[t._v("\n                    Avg: "+t._s(t._f("usd")(n.avgPrice))+"\n                  ")])]),t._v(" "),t.market[n.id].usd?e("td",{class:["py-4 align-middle text-right d-none d-md-table-cell",{"text-success":t.market[n.id].usd_24h_change>=0},{"text-danger":t.market[n.id].usd_24h_change<0}]},[t.market[n.id].usd_24h_change>0?e("b-icon-caret-up-fill"):t._e(),t._v(" "),t.market[n.id].usd_24h_change<0?e("b-icon-caret-down-fill"):t._e(),t._v(" "),e("span",[t._v("\n                    "+t._s(Math.abs(t.market[n.id].usd_24h_change).toFixed(2))+"%\n                  ")])],1):e("td",{staticClass:"py-4 align-middle text-center d-none d-md-table-cell"},[t._v("\n                  ∞\n                ")]),t._v(" "),e("td",{staticClass:"py-4 align-middle text-right d-none d-md-table-cell"},[e("div",[e("span",{staticClass:"text-muted ml2"},[t._v("\n                      "+t._s(n.symbol.toUpperCase())+"\n                    ")]),t._v("\n                    "+t._s(t._f("fnum")(n.total))+"\n                  ")]),t._v(" "),e("div",{staticClass:"small"},[t._v("\n                    "+t._s(t._f("usd")(n.valueUSD))+"\n                  ")])]),t._v(" "),e("td",{staticClass:"py-4 align-middle text-right"},[e("div",[t._v("\n                    "+t._s(n.pnlUSD>0?"+":"")+"\n                    "+t._s(t._f("usd")(n.pnlUSD))+"\n                  ")]),t._v(" "),e("div",{class:["small",{"text-success":n.pnlUSDChange>=0},{"text-danger":n.pnlUSDChange<0}]},[n.pnlUSDChange>0?e("b-icon-caret-up-fill"):t._e(),t._v(" "),n.pnlUSDChange<0?e("b-icon-caret-down-fill"):t._e(),t._v("\n\n                    "+t._s(isFinite(n.pnlUSDChange)?Math.abs(n.pnlUSDChange).toFixed(2)+"%":"∞")+"\n                  ")],1)]),t._v(" "),e("td",{staticClass:"py-4 align-middle d-flex align-items-center"},[e("button",{staticClass:"btn btn-link btn-sm",on:{click:function(e){return t.viewTransactions(n)}}},[e("b-icon-card-checklist")],1),t._v(" "),e("button",{staticClass:"btn btn-link text-danger btn-sm",on:{click:function(e){return t.$db.deleteAsset(n)}}},[e("b-icon-trash")],1)])]):t._e()]}))],2)]):e("div",{staticClass:"text-center py-5 rounded"},[e("h4",[t._v("Your portfolio is empty!")]),t._v(" "),e("p",{staticClass:"text-muted"},[t._v("Add your some transactions.")])])])])]):e("div",{staticClass:"text-center"},[t._m(3),t._v(" "),e("h4",[t._v("Free, open source & privacy-first portfolio tracker")]),t._v(" "),e("h5",{staticClass:"text-muted"},[t._v("for crypto lovers")]),t._v(" "),t._m(4),t._v(" "),e("button",{directives:[{name:"b-modal",rawName:"v-b-modal.transaction-modal",modifiers:{"transaction-modal":!0}}],staticClass:"btn btn-primary mt-2"},[t._v("\n      Add a transaction\n    ")]),t._v(" "),e("div",{staticClass:"mt-5"},[t._v("\n      We're on\n      "),e("a",{staticClass:"text-dark",attrs:{href:"https://github.com/amraei/fortpolio",target:"_blank"}},[e("b-icon-github"),t._v(" github.\n      ")],1)])]),t._v(" "),e("b-modal",{attrs:{visible:null!==t.viewTrans,"hide-footer":""}},[e("ul",t._l(t.transList,(function(n){return e("li",{key:n.created_at},[t._v("\n        "+t._s(n.quantity)+"\n      ")])})),0)]),t._v(" "),e("b-modal",{attrs:{id:"purge-modal",title:"Purge your portfolio","header-text-variant":"white","header-bg-variant":"danger","ok-variant":"danger","ok-title":"Purge it"},on:{ok:function(e){return t.$db.purge()}}},[t._v("\n    Are you sure to purge all data in your portfolio? It "),e("b",[t._v("CANNOT")]),t._v(" be\n    undone and everthing will be deleted permanently.\n  ")]),t._v(" "),e("transaction-modal")],1)}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"col-md-6"},[e("h3",{staticClass:"mb-0"},[t._v("Your Portfolio")]),t._v(" "),e("h6",{staticClass:"text-muted"},[t._v("Track your crypto assets.")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"text-muted"},[t._v("\n            Capital"),e("span",{staticClass:"d-none d-md-inline"},[t._v(" (approximate)")]),t._v(":\n          ")])},function(){var t=this,e=t._self._c;return e("thead",[e("tr",{staticClass:"small"},[e("th",[t._v("Name")]),t._v(" "),e("th",{staticClass:"text-right"},[t._v("Price")]),t._v(" "),e("th",{staticClass:"text-right d-none d-md-table-cell"},[t._v("24hr Change")]),t._v(" "),e("th",{staticClass:"text-right d-none d-md-table-cell"},[t._v("Holdings")]),t._v(" "),e("th",{staticClass:"text-right"},[t._v("Profit/Loss")]),t._v(" "),e("th",{staticStyle:{width:"0px"}})])])},function(){var t=this,e=t._self._c;return e("h1",{staticClass:"display-1"},[e("span",{staticClass:"text-primary"},[t._v("F")]),t._v("ortpolio")])},function(){var t=this,e=t._self._c;return e("h6",{staticClass:"mt-7"},[t._v("\n      Add a transaction to setting up your portfolio."),e("br"),t._v(" "),e("small",{staticClass:"text-muted"},[t._v("(All data are stored on your browser.)")])])}],!1,null,"7f5df901",null);e.default=component.exports;installComponents(component,{WatchButton:n(690).default})}}]);