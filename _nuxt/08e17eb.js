(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{690:function(t,e,n){"use strict";n.r(e);n(73),n(66),n(65),n(40),n(96),n(67),n(97);var o=n(53),c=n(123);function r(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var l={components:{CoinSelector:n(689).default},data:function(){return{coin:null}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?r(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):r(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.b)(["watchlist"])),methods:{add:function(){this.$db.addWatchlist(this.coin),this.$bvModal.hide("watch-modal")}}},d=l,f=n(95),component=Object(f.a)(d,(function(){var t=this,e=t._self._c;return e("button",{staticClass:"btn btn-secondary",on:{click:function(e){return t.$bvModal.show("watch-modal")}}},[e("b-icon-eye"),t._v(" "),Object.keys(t.watchlist.list).length?t._e():e("span",{staticClass:"ml-2"},[t._v("Watch")]),t._v(" "),e("b-modal",{attrs:{id:"watch-modal","hide-footer":""}},[e("div",{staticClass:"modal-body"},[e("coin-selector",{model:{value:t.coin,callback:function(e){t.coin=e},expression:"coin"}}),t._v(" "),e("button",{staticClass:"btn btn-primary btn-block mt-5",on:{click:t.add}},[t._v("\n        Add to watchlist\n      ")])],1)])],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{CoinSelector:n(689).default})}}]);