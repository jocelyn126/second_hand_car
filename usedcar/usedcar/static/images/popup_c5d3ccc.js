!function(t){function o(t){var o=this;if(t)for(var e in t)c[e]=t[e];for(var e in c)o[e]=c[e];o._init()}function e(t,o){o>=1&&(o/=100);try{t.style.opacity=o}catch(e){}try{t.style.filter="alpha(opacity="+100*o+")"}catch(e){}}function n(){return document.body.scrollHeight+"px"}function i(o){var e=o.offsetHeight,n=document.documentElement.scrollTop||t.pageYOffset||document.body.scrollTop,i=t.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;return n+(i-e)/2+"px"}function d(o){var e=o.offsetWidth,n=document.body.scrollLeft,i=t.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;return n+(i-e)/2+"px"}function s(t){if(t&&!(t.length<=0)){var o=document.querySelectorAll(t);return!o||o.length<=0?null:o[0]}}var c={contentId:"",closeId:"",shadowId:"",contentShowCenter:!0,shadowUseCss:!1,isShowShadow:!0,shadowClose:!0,beforeShow:function(){},afterShow:function(){},beforeHide:function(){},afterHide:function(){}},l=function(){var t={bind:function(t,o,e,n){"mousewheel"===o&&void 0!==document.mozHidden&&(o="DOMMouseScroll"),t.addEventListener?t.addEventListener(o,e,n):t.attachEvent("on"+o,e)},unbind:function(t,o,e,n){"mousewheel"===o&&void 0!==document.mozHidden&&(o="DOMMouseScroll"),t.removeEventListener?t.removeEventListener(o,e,n):t.detachEvent("on"+o,e)}};return t}(),r=function(t,o){l.bind(t,"click",function(){o.target.hide()},!1)},a=function(){var t={unallowScroll:function(){},allowScroll:function(){}};return t}();o.prototype={constructor:o,isInit:!1,_init:function(){var t=this;try{t.content=s(t.contentId),t.closeId&&r(s(t.closeId),{target:t}),t._getShadow(),t.isInit=!0}catch(o){}},_getShadow:function(){var t=this;if(t.isShowShadow){var o=t.shadowId||"#pop_shadow_div",e=s(o);e||(e=document.createElement("div"),e.id=o.substring(1),s("body").appendChild(e)),t.shadowClose&&r(e,{target:t}),t.shadow=e}},_showShadow:function(){var t=this;t.isShowShadow&&(t.shadow.style.display="block",t.shadow.style.visibility="visible",t.shadowUseCss||(t.shadow.style.position="absolute",t.shadow.style.left=0,t.shadow.style.top=0,t.shadow.style.width="100%",t.shadow.style.zIndex="100",t.shadow.style.backgroundColor="#000",t.shadow.style.height=n(),e(t.shadow,50)))},_hideShadow:function(){var t=this;t.isShowShadow&&(t.shadow.style.display="none")},_showContent:function(){var t=this;t.content.style.display="block",t.content.style.visibility="visible",t.contentShowCenter&&(t.content.style.position="absolute",t.content.style.top=i(t.content),t.content.style.left=d(t.content))},show:function(){var t=this;t.isInit&&(t.beforeShow&&t.beforeShow(),a.unallowScroll(),t._showShadow(),t._showContent(),t.afterShow&&t.afterShow())},hide:function(){var t=this;t.isInit&&(t.beforeHide&&t.beforeHide(),a.allowScroll(),t._hideShadow(),t.content.style.display="none",t.afterHide&&t.afterHide())}},t.UXPopup=o}(window),"undefined"!=typeof module?module.exports=window.UXPopup:"function"==typeof define&&define.amd&&define([],function(){"use strict";return window.UXPopup});
//# sourceMappingURL=/static/newcar-www/js/carlist/popup.js.map
