(function(){var n={5022:function(n,e,t){"use strict";var a=t(9963),o=t(6252),r=t.p+"img/logo.ecd309f0.svg";const i={id:"container"},u=(0,o._)("img",{alt:"Aeternity",src:r,style:{width:"250px"}},null,-1),l=(0,o._)("h1",null,"Welcome To Aeternity",-1),s={id:"nav"};function c(n,e,t,a,r,c){const d=(0,o.up)("router-link"),f=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",i,[u,l,(0,o._)("div",s,[(0,o.Wm)(d,{to:"/"},{default:(0,o.w5)((()=>[(0,o.Uk)("Home")])),_:1}),(0,o.Uk)(" | "),(0,o.Wm)(d,{to:"/about"},{default:(0,o.w5)((()=>[(0,o.Uk)("About")])),_:1})])]),(0,o.Wm)(f)],64)}var d=t(4860),f=(0,o.aZ)({name:"App",setup(){(0,o.bv)((async()=>{await(0,d.y)()}))}}),p=t(3744);const _=(0,p.Z)(f,[["render",c]]);var m=_,v=t(3085);const w={class:"home"},g=(0,o._)("h1",null,"Home Page",-1);function E(n,e,t,a,r,i){const u=(0,o.up)("WalletInfo");return(0,o.wg)(),(0,o.iD)("div",w,[g,(0,o.Wm)(u)])}var b=t(6414),h={name:"HomeView",components:{WalletInfo:b.Z}};const k=(0,p.Z)(h,[["render",E]]);var y=k;const P=[{path:"/",name:"Home",component:y},{path:"/about",name:"About",component:()=>t.e(443).then(t.bind(t,3991))}],A=(0,v.p7)({history:(0,v.PO)("/"),routes:P});var U=A;(0,a.ri)(m).use(U).mount("#app")},4860:function(n,e,t){"use strict";t.d(e,{S:function(){return d},y:function(){return f}});var a=t(6628),o=t(3593),r=t(2913),i=t(9622),u=t(1068),l=t(6770),s=t(6900),c=t(2262);const d=(0,c.qj)({walletInfo:null,aeSdk:null,balance:null,status:"connecting",networkId:"ae_mainnet"}),f=async()=>{const{status:n,aeSdk:e}=(0,c.BK)(d);try{const n={nodes:[{name:"ae_mainnet",instance:new a.Z("https://mainnet.aeternity.io")}],compilerUrl:{VUE_APP_NETWORK_ID:"ae_mainnet",VUE_APP_NETWORK_NAME:"mainnet",VUE_APP_NODE_URL:"https://mainnet.aeternity.io",NODE_ENV:"production",VUE_APP_COMPILER_URL:"https://compiler.aepps.com",BASE_URL:"/"}.COMPILER_URL};if({VUE_APP_NETWORK_ID:"ae_mainnet",VUE_APP_NETWORK_NAME:"mainnet",VUE_APP_NODE_URL:"https://mainnet.aeternity.io",NODE_ENV:"production",VUE_APP_COMPILER_URL:"https://compiler.aepps.com",BASE_URL:"/"}.VUE_APP_WALLET_SECRET_KEY){const t=new o.Z({VUE_APP_NETWORK_ID:"ae_mainnet",VUE_APP_NETWORK_NAME:"mainnet",VUE_APP_NODE_URL:"https://mainnet.aeternity.io",NODE_ENV:"production",VUE_APP_COMPILER_URL:"https://compiler.aepps.com",BASE_URL:"/"}.VUE_APP_WALLET_SECRET_KEY);e.value=(0,c.Um)(new r.Z({...n,accounts:[t]})),await m()}else e.value=(0,c.Um)(new i.Z({name:"AEPP",...n,async onNetworkChange({networkId:n}){await v(n)},async onAddressChange(n){console.info("onAddressChange ::",n),await m()}})),await p()}catch(t){throw n.value="failed",t}},p=async()=>{const{status:n,walletInfo:e,aeSdk:t}=(0,c.BK)(d);n.value="scanning";const a=await new Promise((n=>{const e=async({newWallet:e})=>{a(),n(e)},t=new u.Z,a=(0,l.Z)(t,e)}));e.value=await t.value.connectToWallet(a.getConnection()),n.value="asking_account_access",await t.value.subscribeAddress("subscribe","current"),await m()},_=()=>{const{networkId:n,status:e}=(0,c.BK)(d),t="ae_mainnet"===n.value;return t||(e.value="failed: Connected to wrong network. Please switch to mainnet in your wallet."),t},m=async()=>{if(!_())return;const{balance:n,status:e}=(0,c.BK)(d);e.value="fetching_info",n.value=await d.aeSdk.getBalance(d.aeSdk.address,{format:s.fM.AE}),d.status="connected"},v=async n=>{const{networkId:e,aeSdk:t}=(0,c.BK)(d);e.value=n,_()&&(t.value.selectNode(n),t.value.addresses().length&&await m())}},6414:function(n,e,t){"use strict";t.d(e,{Z:function(){return P}});var a=t(6252),o=t(3577),r=t.p+"img/loading_logo.b33f3c90.svg";const i=n=>((0,a.dD)("data-v-49723874"),n=n(),(0,a.Cn)(),n),u={class:"wallet"},l=i((()=>(0,a._)("strong",null,"Wallet Status :: ",-1))),s=i((()=>(0,a._)("br",null,null,-1))),c=i((()=>(0,a._)("strong",null,"Provider :: ",-1))),d=i((()=>(0,a._)("br",null,null,-1))),f=i((()=>(0,a._)("strong",null,"Network ID :: ",-1))),p=i((()=>(0,a._)("br",null,null,-1))),_=i((()=>(0,a._)("strong",null,"Address :: ",-1))),m={class:"wallet-address"},v=i((()=>(0,a._)("br",null,null,-1))),w=i((()=>(0,a._)("strong",null,"Balance :: ",-1))),g={key:2,src:r,style:{width:"50px"}};function E(n,e,t,r,i,E){return(0,a.wg)(),(0,a.iD)("div",u,[n.status?((0,a.wg)(),(0,a.iD)(a.HY,{key:0},[l,(0,a.Uk)(" "+(0,o.zw)(n.status)+" ",1),s],64)):(0,a.kq)("",!0),"connected"===n.status?((0,a.wg)(),(0,a.iD)(a.HY,{key:1},[n.walletInfo?((0,a.wg)(),(0,a.iD)(a.HY,{key:0},[c,(0,a.Uk)(" "+(0,o.zw)(n.walletInfo.name)+" ",1),d],64)):(0,a.kq)("",!0),f,(0,a.Uk)(" "+(0,o.zw)(n.networkId)+" ",1),p,_,(0,a.Uk)(),(0,a._)("span",m,(0,o.zw)(n.aeSdk.address),1),v,w,(0,a.Uk)(" "+(0,o.zw)(n.balance)+" AE ",1)],64)):(0,a.kq)("",!0),["connected","failed"].includes(n.status.split(/\W/)[0])?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("img",g))])}var b=t(4860),h=(0,a.aZ)({name:"WalletInfo",setup(){return b.S}}),k=t(3744);const y=(0,k.Z)(h,[["render",E],["__scopeId","data-v-49723874"]]);var P=y},5024:function(){}},e={};function t(a){var o=e[a];if(void 0!==o)return o.exports;var r=e[a]={exports:{}};return n[a](r,r.exports,t),r.exports}t.m=n,function(){var n=[];t.O=function(e,a,o,r){if(!a){var i=1/0;for(c=0;c<n.length;c++){a=n[c][0],o=n[c][1],r=n[c][2];for(var u=!0,l=0;l<a.length;l++)(!1&r||i>=r)&&Object.keys(t.O).every((function(n){return t.O[n](a[l])}))?a.splice(l--,1):(u=!1,r<i&&(i=r));if(u){n.splice(c--,1);var s=o();void 0!==s&&(e=s)}}return e}r=r||0;for(var c=n.length;c>0&&n[c-1][2]>r;c--)n[c]=n[c-1];n[c]=[a,o,r]}}(),function(){t.d=function(n,e){for(var a in e)t.o(e,a)&&!t.o(n,a)&&Object.defineProperty(n,a,{enumerable:!0,get:e[a]})}}(),function(){t.f={},t.e=function(n){return Promise.all(Object.keys(t.f).reduce((function(e,a){return t.f[a](n,e),e}),[]))}}(),function(){t.u=function(n){return"js/about.5ce15654.js"}}(),function(){t.miniCssF=function(n){}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===typeof window)return window}}()}(),function(){t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)}}(),function(){var n={},e="aepp-boilerplate-vue:";t.l=function(a,o,r,i){if(n[a])n[a].push(o);else{var u,l;if(void 0!==r)for(var s=document.getElementsByTagName("script"),c=0;c<s.length;c++){var d=s[c];if(d.getAttribute("src")==a||d.getAttribute("data-webpack")==e+r){u=d;break}}u||(l=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,t.nc&&u.setAttribute("nonce",t.nc),u.setAttribute("data-webpack",e+r),u.src=a),n[a]=[o];var f=function(e,t){u.onerror=u.onload=null,clearTimeout(p);var o=n[a];if(delete n[a],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(n){return n(t)})),e)return e(t)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=f.bind(null,u.onerror),u.onload=f.bind(null,u.onload),l&&document.head.appendChild(u)}}}(),function(){t.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})}}(),function(){t.p="/"}(),function(){var n={143:0};t.f.j=function(e,a){var o=t.o(n,e)?n[e]:void 0;if(0!==o)if(o)a.push(o[2]);else{var r=new Promise((function(t,a){o=n[e]=[t,a]}));a.push(o[2]=r);var i=t.p+t.u(e),u=new Error,l=function(a){if(t.o(n,e)&&(o=n[e],0!==o&&(n[e]=void 0),o)){var r=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.src;u.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",u.name="ChunkLoadError",u.type=r,u.request=i,o[1](u)}};t.l(i,l,"chunk-"+e,e)}},t.O.j=function(e){return 0===n[e]};var e=function(e,a){var o,r,i=a[0],u=a[1],l=a[2],s=0;if(i.some((function(e){return 0!==n[e]}))){for(o in u)t.o(u,o)&&(t.m[o]=u[o]);if(l)var c=l(t)}for(e&&e(a);s<i.length;s++)r=i[s],t.o(n,r)&&n[r]&&n[r][0](),n[r]=0;return t.O(c)},a=self["webpackChunkaepp_boilerplate_vue"]=self["webpackChunkaepp_boilerplate_vue"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=t.O(void 0,[998],(function(){return t(5022)}));a=t.O(a)})();
//# sourceMappingURL=app.e7510279.js.map