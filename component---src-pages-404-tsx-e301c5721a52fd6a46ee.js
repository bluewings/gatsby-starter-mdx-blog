(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{1034:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",function(){return i});var r=n(1),a=n.n(r),o=n(1043),c=n(1044);t.default=function(e){var t=e.data,n=e.location,r=t.site.siteMetadata.title;return a.a.createElement(o.a,{location:n,title:r},a.a.createElement(c.a,{title:"404: Not Found"}),a.a.createElement("h1",null,"Not Found"),a.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))};var i="1097489062"},1036:function(e,t,n){"use strict";n.d(t,"b",function(){return u});var r=n(1),a=n.n(r),o=n(150),c=n.n(o);n.d(t,"a",function(){return c.a});n(1038),n(42).default.enqueue;var i=a.a.createContext({});function l(e){var t=e.staticQueryData,n=e.data,r=e.query,o=e.render,c=n?n.data:t[r]&&t[r].data;return a.a.createElement(a.a.Fragment,null,c&&o(c),!c&&a.a.createElement("div",null,"Loading (StaticQuery)"))}var u=function(e){var t=e.data,n=e.query,r=e.render,o=e.children;return a.a.createElement(i.Consumer,null,function(e){return a.a.createElement(l,{data:t,query:n,render:r||o,staticQueryData:e})})}},1037:function(e,t,n){"use strict";n.d(t,"a",function(){return l}),n.d(t,"b",function(){return u});var r=n(1047),a=n.n(r),o=n(1048),c=n.n(o);c.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"},body:{fontFamily:"'Open Sans', 'Gothic A1', 'Apple SD Gothic NEO', helvetica, sans-serif"},"h1,h2,h3,h4,h5,h6":{fontFamily:"Montserrat, Black Han Sans",fontWeight:"normal",wordBreak:"keep-all"},p:{wordBreak:"keep-all"},".date":{fontFamily:"'Montserrat SemiBold', 'Apple SD Gothic NEO', helvetica, sans-serif"}}},delete c.a.googleFonts;var i=new a.a(c.a);var l=i.rhythm,u=i.scale},1038:function(e,t,n){var r;e.exports=(r=n(1039))&&r.default||r},1039:function(e,t,n){"use strict";n.r(t);n(81),n(8),n(5),n(9),n(4),n(18);var r=n(1),a=n.n(r),o=n(206);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.default=function(e){var t=e.location,n=e.pageResources;return n?a.a.createElement(o.a,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(n,!0).forEach(function(t){i(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({location:t,pageResources:n},n.json)):null}},1041:function(e){e.exports={data:{site:{siteMetadata:{social:{twitter:"",github:"https://github.com/bluewings",stackOverflow:"",facebook:""}}}}}},1042:function(e){e.exports={data:{site:{siteMetadata:{title:"개츠비 스타터 MDX",description:"A starter blog demonstrating what Gatsby can do.",author:"Cha Sung Won"}}}}},1043:function(e,t,n){"use strict";n(81),n(8),n(5),n(9),n(4),n(18);var r=n(1),a=n.n(r),o=n(1036),c=n(1037),i=n(1051),l=n(205),u=n(1028),s=n.n(u);function m(){var e=Object(r.useContext)(l.a),t=e.theme,n=e.setTheme,a=Object(r.useState)(!!function(){try{return window.__getPreferredTheme()}catch(e){}return""}()),o=a[0],c=a[1],i=Object(r.useRef)(0);return[Object(r.useMemo)(function(){var e=Math.abs(i.current%360);return("light"===t&&0===e||"dark"===t&&180===e)&&(i.current-=180),{transform:"rotate("+i.current+"deg)"}},[t]),function(){var e=function(){try{return window.__toggleTheme()}catch(e){}return""}();c(!0),n(e)},o]}var d=function(){var e=m(),t=e[0],n=e[1],r=e[2],o=a.a.createElement("button",{type:"button",className:s.a.root,onClick:n},a.a.createElement("div",{className:s.a.spinner,style:t},a.a.createElement("svg",{className:s.a.sun,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},a.a.createElement("path",{d:"M277.3 32h-42.7v64h42.7V32zm129.1 43.7L368 114.1l29.9 29.9 38.4-38.4-29.9-29.9zm-300.8 0l-29.9 29.9 38.4 38.4 29.9-29.9-38.4-38.4zM256 128c-70.4 0-128 57.6-128 128s57.6 128 128 128 128-57.6 128-128-57.6-128-128-128zm224 106.7h-64v42.7h64v-42.7zm-384 0H32v42.7h64v-42.7zM397.9 368L368 397.9l38.4 38.4 29.9-29.9-38.4-38.4zm-283.8 0l-38.4 38.4 29.9 29.9 38.4-38.4-29.9-29.9zm163.2 48h-42.7v64h42.7v-64z"})),a.a.createElement("svg",{className:s.a.moon,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},a.a.createElement("path",{d:"M195 125c0-26.3 5.3-51.3 14.9-74.1C118.7 73 51 155.1 51 253c0 114.8 93.2 208 208 208 97.9 0 180-67.7 202.1-158.9-22.8 9.6-47.9 14.9-74.1 14.9-106 0-192-86-192-192z"}))));return a.a.createElement("div",null,r?o:a.a.createElement(i.a,{placement:"bottom",visible:!0,overlay:a.a.createElement("span",{className:s.a.tooltipText},"Dark Mode"),arrowContent:a.a.createElement("div",{className:"rc-tooltip-arrow-inner"})},o))},p=(n(24),n(1041));var f=function(){return a.a.createElement(o.b,{query:b,render:function(e){var t=e.site.siteMetadata.social,n=Object.keys(t).filter(function(e){return t[e]}).map(function(e){return{name:e,uri:t[e]}});return a.a.createElement("footer",{style:{marginTop:Object(c.a)(2)}},n.map(function(e,t){return a.a.createElement(r.Fragment,{key:e.name},t>0&&a.a.createElement(a.a.Fragment,null," • "),a.a.createElement("a",{href:e.uri,target:"_blank",rel:"noopener noreferrer"},e.name))}))},data:p})},b="3346284184",h=f,g=n(1029),v=n.n(g);n(1030),n(1031);function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(n,!0).forEach(function(t){O(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E=function(e){var t,n=e.location,r=e.title,i=e.children,l=e.maxWidth,u=e.isIndexPage;return t="/gatsby-starter-mdx-blog/"===n.pathname||u?a.a.createElement("h1",{style:w({},Object(c.b)(1.5),{marginBottom:Object(c.a)(1.5),marginTop:0})},a.a.createElement(o.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},r)):a.a.createElement("h3",{style:{marginTop:0}},a.a.createElement(o.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},r)),a.a.createElement("div",{className:v.a.root},a.a.createElement("div",{className:v.a.inner,style:{marginLeft:"auto",marginRight:"auto",maxWidth:l||Object(c.a)(24),padding:Object(c.a)(1.5)+" "+Object(c.a)(.75)}},a.a.createElement("header",null,t,a.a.createElement(d,null)),a.a.createElement("main",null,i),a.a.createElement(h,null)))};t.a=E},1044:function(e,t,n){"use strict";var r=n(1042),a=n(1),o=n.n(a),c=n(1050),i=n.n(c),l=n(1036);function u(e){var t=e.description,n=e.lang,a=e.meta,c=e.keywords,u=e.title;return o.a.createElement(l.b,{query:m,render:function(e){var r=t||e.site.siteMetadata.description;return o.a.createElement(i.a,{htmlAttributes:{lang:n},title:u,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:r},{property:"og:title",content:u},{property:"og:description",content:r},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:u},{name:"twitter:description",content:r}].concat(c.length>0?{name:"keywords",content:c.join(", ")}:[]).concat(a)})},data:r})}u.defaultProps={description:"",lang:"en",meta:[],keywords:[]};var s=u,m="1025518380";t.a=s}}]);
//# sourceMappingURL=component---src-pages-404-tsx-e301c5721a52fd6a46ee.js.map