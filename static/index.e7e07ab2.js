var e=Object.defineProperty,o=Object.defineProperties,n=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,i=(o,n,t)=>n in o?e(o,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[n]=t,a=(e,o)=>{for(var n in o||(o={}))r.call(o,n)&&i(e,n,o[n]);if(t)for(var n of t(o))s.call(o,n)&&i(e,n,o[n]);return e},c=(e,t)=>o(e,n(t)),l=(e,o)=>{var n={};for(var i in e)r.call(e,i)&&o.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&t)for(var i of t(e))o.indexOf(i)<0&&s.call(e,i)&&(n[i]=e[i]);return n};import{e as u,r as p,j as d,a as f,E as g,C as h,W as v,u as O,B as m,b as y,c as S,I as x,d as C,f as b,g as L,h as w,i as I,F,R as k,k as E,l as M}from"./vendor.2a7ce7d9.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&o(e)})).observe(document,{childList:!0,subtree:!0})}function o(e){if(e.ep)return;e.ep=!0;const o=function(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?o.credentials="include":"anonymous"===e.crossorigin?o.credentials="omit":o.credentials="same-origin",o}(e);fetch(e.href,o)}}();const R=u({config:{initialColorMode:"dark",useSystemColorMode:!0}});const T=["William","Juliano","Matheus","Igão","Italo","Zaza","Clebinho"];function P(){return function(e,o=1e3){return new Promise((n=>setTimeout((()=>n(e)),o)))}(T,2e3)}const N={w:"12px",h:"12px"},U={w:"16px",h:"16px"};function j({connectivityState:e}){return d(p.exports.Fragment,{children:[["IDLE","SUCCESSFUL"].includes(e)&&f(g,a({},U)),"LOADING"===e&&f(h,{isIndeterminate:!0,size:U.w,trackColor:"transparent",color:"blue.300"}),"FAILURE"===e&&f(v,c(a({},U),{color:"red.300"}))]})}const D=p.exports.forwardRef((function(e,o){var n=e,{isOpen:t=!1,selected:r,options:s=[],onSelectOption:i=(()=>{})}=n,u=l(n,["isOpen","selected","options","onSelectOption"]);const g=p.exports.useMemo((()=>t&&s.length>0),[t,s]);return f(p.exports.Fragment,{children:g&&f(m,c(a({ref:o,position:"absolute",top:"100%",my:"6px",width:"100%",boxSizing:"border-box",borderRadius:"6px",boxShadow:"0 0 0 1px hsl(0deg 0% 0% / 10%), 0 4px 11px hsl(0deg 0% 0% / 10%)",background:"gray.700",as:"ul",listStyleType:"none",zIndex:"3",overflow:"auto"},u),{children:s.map((e=>d(y,{variant:"ghost",width:"100%",justifyContent:"space-between",onClick:()=>i(e),children:[e.value,r===e&&f(S,a({},N))]},e.key)))}))})}));const W=p.exports.forwardRef((function(e,o){var n=e,{LeftComponent:t,RightComponent:r,options:s,value:i,selected:u,isMenuOpen:g,onInputFocus:h,onChangeValue:v,onSelectOption:y}=n,S=l(n,["LeftComponent","RightComponent","options","value","selected","isMenuOpen","onInputFocus","onChangeValue","onSelectOption"]);const F=p.exports.useRef(),k=function({ref:e,value:o,isMenuOpen:n,selected:t,onInputFocus:r,onChangeValue:s,onSelectOption:i}){const[a,c]=p.exports.useState(null!=o?o:""),[l,u]=p.exports.useState(t),[d,f]=p.exports.useState(null!=n&&n),g=p.exports.useCallback((e=>{r&&r(e),!d&&f(!0)}),[d,r]),h=p.exports.useCallback((e=>{const o="string"==typeof e?e:e.target.value;s?s(o):c(o),!d&&f(!0)}),[d,s]),v=p.exports.useCallback((e=>{i?i(e):u(e),s?s(e.value):c(e.value),d&&f(!1)}),[d,i,s]),m=p.exports.useCallback((()=>{c(""),u(void 0),d&&f(!1)}),[f]);return O({ref:e,handler:()=>f(!1),enabled:d}),{value:a,isMenuOpen:d,selected:l,onInputFocus:g,onChangeValue:h,onSelectOption:v,onResetState:m}}({ref:F,value:i,selected:u,isMenuOpen:g,onInputFocus:h,onChangeValue:v,onSelectOption:y});return d(m,c(a({position:"relative"},S),{children:[d(x,{children:[f(C,{children:t&&f(t,a({},k))}),f(b,{ref:o,value:k.value,onFocus:k.onInputFocus,onChange:k.onChangeValue}),f(L,{children:r?f(r,a({},k)):k.value?f(I,c(a({},N),{cursor:"pointer",onClick:k.onResetState})):f(w,a({},N))})]}),f(D,{ref:F,selected:k.selected,options:s,isOpen:k.isMenuOpen,onSelectOption:k.onSelectOption})]}))}));var G,V;(V=G||(G={})).UP="UP",V.DOWN="DOWN",V.LEFT="LEFT",V.RIGHT="RIGHT";const A={[G.UP]:38,[G.DOWN]:40,[G.LEFT]:37,[G.RIGHT]:39},z=[A.UP,A.UP,A.LEFT,A.RIGHT,A.DOWN,A.DOWN];function H(e){var o=e,{service:n,onMapToOptions:t,onLoading:r,onSuccess:s,onFailure:i}=o,c=l(o,["service","onMapToOptions","onLoading","onSuccess","onFailure"]);const{connectivityState:u,options:d,execute:g}=function(e,{mappers:{onMapToOptions:o},lifecycle:{onLoading:n,onSuccess:t,onFailure:r}}){const[s,i]=p.exports.useState("IDLE"),[a,c]=p.exports.useState([]),l=p.exports.useCallback((async()=>{i("LOADING"),n&&n();try{const n=await e(),r=o(n);c(r),i("SUCCESSFUL"),t&&t(n)}catch(s){i("FAILURE"),r&&r(s)}}),[e,o,n,t,r]);return p.exports.useEffect((()=>{l()}),[]),{connectivityState:s,options:a,execute:l}}(n,{mappers:{onMapToOptions:t},lifecycle:{onLoading:r,onSuccess:s,onFailure:i}});return function(e,{sequence:o}){const[n,t]=p.exports.useState([]),r=p.exports.useMemo((()=>o.length===n.length),[o,n]),s=p.exports.useMemo((()=>n.reduce(((e,n,t)=>e&&o[t]===n),!0)),[n,o]),i=p.exports.useCallback((e=>o.includes(e.keyCode)&&t((o=>[...o,e.keyCode]))),[o]);p.exports.useEffect((()=>(window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i))),[i]),p.exports.useEffect((()=>{r&&(s&&e(),t([]))}),[r,s,e])}(g,{sequence:z}),f(W,a({LeftComponent:()=>f(j,{connectivityState:u}),options:d},c))}function q(){return f(F,{width:"100vw",height:"100vh",alignItems:"center",justifyContent:"center",children:f(H,{service:()=>P(),onMapToOptions:e=>function(e){return e.map((e=>({key:e,value:e})))}(e),onLoading:()=>console.log("onLoading"),onSuccess:e=>console.log(`onSuccess: ${JSON.stringify(e)}`),onFailure:()=>console.log("onFailure")})})}k.render(f(E.StrictMode,{children:f(M,{theme:R,children:f(q,{})})}),document.getElementById("root"));
//# sourceMappingURL=index.e7e07ab2.js.map
