(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{621:function(t,e,n){"use strict";n.r(e);n(70),n(63),n(62),n(86),n(64),n(87);var o=n(47),c=n(105);function r(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var l={components:{CoinSelector:n(620).default},data:function(){return{coin:null}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?r(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):r(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.b)(["watchlist"])),methods:{add:function(){this.$db.addWatchlist(this.coin),this.$bvModal.hide("watch-modal")}}},d=n(85),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"btn btn-secondary",on:{click:function(e){return t.$bvModal.show("watch-modal")}}},[n("b-icon-eye"),t._v(" "),Object.keys(t.watchlist.list).length?t._e():n("span",{staticClass:"ml-2"},[t._v("Watch")]),t._v(" "),n("b-modal",{attrs:{id:"watch-modal","hide-footer":""}},[n("div",{staticClass:"modal-body"},[n("coin-selector",{model:{value:t.coin,callback:function(e){t.coin=e},expression:"coin"}}),t._v(" "),n("button",{staticClass:"btn btn-primary btn-block mt-5",on:{click:t.add}},[t._v("\n        Add to watchlist\n      ")])],1)])],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{CoinSelector:n(620).default})}}]);