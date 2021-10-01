var e=Object.defineProperty,o=Object.defineProperties,n=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,s=(o,n,t)=>n in o?e(o,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[n]=t,a=(e,o)=>{for(var n in o||(o={}))r.call(o,n)&&s(e,n,o[n]);if(t)for(var n of t(o))i.call(o,n)&&s(e,n,o[n]);return e},c=(e,t)=>o(e,n(t)),l=(e,o)=>{var n={};for(var s in e)r.call(e,s)&&o.indexOf(s)<0&&(n[s]=e[s]);if(null!=e&&t)for(var s of t(e))o.indexOf(s)<0&&i.call(e,s)&&(n[s]=e[s]);return n};import{e as u,r as p,j as d,a as f,I as g,C as h,W as m,u as x,B as y,b as O,c as v,d as S,f as b,g as C,h as L,F as w,R as I,i as M,k}from"./vendor.47e92db7.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&o(e)})).observe(document,{childList:!0,subtree:!0})}function o(e){if(e.ep)return;e.ep=!0;const o=function(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?o.credentials="include":"anonymous"===e.crossorigin?o.credentials="omit":o.credentials="same-origin",o}(e);fetch(e.href,o)}}();const F=u({config:{initialColorMode:"dark",useSystemColorMode:!0}});function N(){return function(e,o=1e3){return new Promise((n=>setTimeout((()=>n(e)),o)))}(["William","Juliano","Matheus","Igão","Italo","Zaza","Clebinho"],2e3)}const j={w:"12px",h:"12px"},R={w:"16px",h:"16px"};function E({connectivityState:e}){return d(p.exports.Fragment,{children:["LOADING","FAILURE"].includes(e)&&f(g,{children:["LOADING"===e&&d(h,{isIndeterminate:!0,size:R.w,trackColor:"transparent",color:"blue.300"}),"FAILURE"===e&&d(m,c(a({},R),{color:"red.300"}))]})})}const T=p.exports.forwardRef((function(e,o){var n=e,{isOpen:t=!1,options:r=[],onSelectOption:i=(()=>{})}=n,s=l(n,["isOpen","options","onSelectOption"]);const u=p.exports.useMemo((()=>t&&r.length>0),[t,r]);return d(p.exports.Fragment,{children:u&&d(y,c(a({ref:o,position:"absolute",top:"100%",my:"6px",width:"100%",boxSizing:"border-box",borderRadius:"6px",boxShadow:"0 0 0 1px hsl(0deg 0% 0% / 10%), 0 4px 11px hsl(0deg 0% 0% / 10%)",background:"gray.700",as:"ul",listStyleType:"none",zIndex:"3",overflow:"auto"},s),{children:r.map((e=>d(O,{variant:"ghost",width:"100%",justifyContent:"start",onClick:()=>i(e),children:e.value},e.key)))}))})}));const A=p.exports.forwardRef((function(e,o){var n=e,{LeftComponent:t,RightComponent:r,options:i}=n,s=l(n,["LeftComponent","RightComponent","options"]);const u=p.exports.useRef(),{value:g,isMenuOpen:h,reset:m,onChange:O,onSelectOption:w}=function({ref:e}){const[o,n]=p.exports.useState(""),[t,r]=p.exports.useState(),[i,s]=p.exports.useState(!1),a=p.exports.useCallback((e=>{n(e.target.value),!i&&s(!0)}),[i]),c=p.exports.useCallback((e=>{r(e),n(e.value)}),[]),l=p.exports.useCallback((()=>{n(""),r(void 0)}),[]);return x({ref:e,handler:()=>s(!1)}),{value:o,isMenuOpen:i,selected:t,onChange:a,onSelectOption:c,reset:l}}({ref:u});return f(y,c(a({position:"relative"},s),{children:[f(v,{children:[t&&d(t,{}),d(S,{ref:o,value:g,onChange:O}),d(b,{children:r?d(r,{value:g}):g?d(L,c(a({},j),{cursor:"pointer",onClick:m})):d(C,a({},j))})]}),d(T,{ref:u,options:i,isOpen:h,onSelectOption:w})]}))}));function P(e){var o=e,{service:n,execution:t,onMapToOptions:r,onLoading:i,onSuccess:s,onFailure:c}=o,u=l(o,["service","execution","onMapToOptions","onLoading","onSuccess","onFailure"]);const{connectivityState:f,options:g}=function(e,{execution:o="ON_MOUNT",mappers:{onMapToOptions:n},lifecycle:{onLoading:t,onSuccess:r,onFailure:i}}){const[s,a]=p.exports.useState("IDLE"),[c,l]=p.exports.useState([]),u=p.exports.useCallback((async()=>{a("LOADING"),t&&t();try{const o=await e(),t=n(o);l(t),a("SUCCESSFUL"),r&&r(o)}catch(o){a("FAILURE"),i&&i(o)}}),[e,n,t,r,i]);return p.exports.useEffect((()=>{"ON_MOUNT"===o&&u()}),[]),{connectivityState:s,options:c,execute:u}}(n,{execution:t,mappers:{onMapToOptions:r},lifecycle:{onLoading:i,onSuccess:s,onFailure:c}});return d(A,a({LeftComponent:()=>d(E,{connectivityState:f}),options:g},u))}function U(){return d(w,{width:"100vw",height:"100vh",alignItems:"center",justifyContent:"center",children:d(P,{service:()=>N(),onMapToOptions:e=>function(e){return e.map((e=>({key:e,value:e})))}(e),onLoading:()=>console.log("onLoading"),onSuccess:e=>console.log(`onSuccess: ${JSON.stringify(e)}`),onFailure:()=>console.log("onFailure")})})}I.render(d(M.StrictMode,{children:d(k,{theme:F,children:d(U,{})})}),document.getElementById("root"));
//# sourceMappingURL=index.ef81bc63.js.map