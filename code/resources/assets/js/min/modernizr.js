/*!
 * modernizr v3.0.0
 * Build http://modernizr.com/download?-appearance-checked-flexbox-flexboxlegacy-flexboxtweener-flexwrap-shiv-dontmin-cssclassprefix:k-
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Alexander Farkas
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */
!function(a,b,c){function d(a){var b=w.className,c=v._config.classPrefix||"";if(x&&(b=b.baseVal),v._config.enableJSClass){var d=new RegExp("(^|\\s)"+c+"no-js(\\s|$)");b=b.replace(d,"$1"+c+"js$2")}v._config.enableClasses&&(b+=" "+c+a.join(" "+c),x?w.className.baseVal=b:w.className=b)}function e(a,b){return typeof a===b}function f(){var a,b,c,d,f,g,h;for(var i in t){if(a=[],b=t[i],b.name&&(a.push(b.name.toLowerCase()),b.options&&b.options.aliases&&b.options.aliases.length))for(c=0;c<b.options.aliases.length;c++)a.push(b.options.aliases[c].toLowerCase());for(d=e(b.fn,"function")?b.fn():b.fn,f=0;f<a.length;f++)g=a[f],h=g.split("."),1===h.length?v[h[0]]=d:(!v[h[0]]||v[h[0]]instanceof Boolean||(v[h[0]]=new Boolean(v[h[0]])),v[h[0]][h[1]]=d),s.push((d?"":"no-")+h.join("-"))}}function g(){return"function"!=typeof b.createElement?b.createElement(arguments[0]):x?b.createElementNS.call(b,"http://www.w3.org/2000/svg",arguments[0]):b.createElement.apply(b,arguments)}function h(){var a=b.body;return a||(a=g(x?"svg":"body"),a.fake=!0),a}function i(a,c,d,e){var f,i,j,k,l="modernizr",m=g("div"),n=h();if(parseInt(d,10))for(;d--;)j=g("div"),j.id=e?e[d]:l+(d+1),m.appendChild(j);return f=g("style"),f.type="text/css",f.id="s"+l,(n.fake?n:m).appendChild(f),n.appendChild(m),f.styleSheet?f.styleSheet.cssText=a:f.appendChild(b.createTextNode(a)),m.id=l,n.fake&&(n.style.background="",n.style.overflow="hidden",k=w.style.overflow,w.style.overflow="hidden",w.appendChild(n)),i=c(m,a),n.fake?(n.parentNode.removeChild(n),w.style.overflow=k,w.offsetHeight):m.parentNode.removeChild(m),!!i}function j(a,b){return!!~(""+a).indexOf(b)}function k(a){return a.replace(/([a-z])-([a-z])/g,function(a,b,c){return b+c.toUpperCase()}).replace(/^-/,"")}function l(a,b){return function(){return a.apply(b,arguments)}}function m(a,b,c){var d;for(var f in a)if(a[f]in b)return c===!1?a[f]:(d=b[a[f]],e(d,"function")?l(d,c||b):d);return!1}function n(a){return a.replace(/([A-Z])/g,function(a,b){return"-"+b.toLowerCase()}).replace(/^ms-/,"-ms-")}function o(b,d){var e=b.length;if("CSS"in a&&"supports"in a.CSS){for(;e--;)if(a.CSS.supports(n(b[e]),d))return!0;return!1}if("CSSSupportsRule"in a){for(var f=[];e--;)f.push("("+n(b[e])+":"+d+")");return f=f.join(" or "),i("@supports ("+f+") { #modernizr { position: absolute; } }",function(a){return"absolute"==getComputedStyle(a,null).position})}return c}function p(a,b,d,f){function h(){l&&(delete D.style,delete D.modElem)}if(f=e(f,"undefined")?!1:f,!e(d,"undefined")){var i=o(a,d);if(!e(i,"undefined"))return i}for(var l,m,n,p,q,r=["modernizr","tspan"];!D.style;)l=!0,D.modElem=g(r.shift()),D.style=D.modElem.style;for(n=a.length,m=0;n>m;m++)if(p=a[m],q=D.style[p],j(p,"-")&&(p=k(p)),D.style[p]!==c){if(f||e(d,"undefined"))return h(),"pfx"==b?p:!0;try{D.style[p]=d}catch(s){}if(D.style[p]!=q)return h(),"pfx"==b?p:!0}return h(),!1}function q(a,b,c,d,f){var g=a.charAt(0).toUpperCase()+a.slice(1),h=(a+" "+A.join(g+" ")+g).split(" ");return e(b,"string")||e(b,"undefined")?p(h,b,d,f):(h=(a+" "+B.join(g+" ")+g).split(" "),m(h,b,c))}function r(a,b,d){return q(a,c,c,b,d)}var s=[],t=[],u={_version:"3.0.0",_config:{classPrefix:"k-",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(a,b){var c=this;setTimeout(function(){b(c[a])},0)},addTest:function(a,b,c){t.push({name:a,fn:b,options:c})},addAsyncTest:function(a){t.push({name:null,fn:a})}},v=function(){};v.prototype=u,v=new v;var w=b.documentElement,x="svg"===w.nodeName.toLowerCase();x||!function(a,b){function c(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function d(){var a=t.elements;return"string"==typeof a?a.split(" "):a}function e(a,b){var c=t.elements;"string"!=typeof c&&(c=c.join(" ")),"string"!=typeof a&&(a=a.join(" ")),t.elements=c+" "+a,j(b)}function f(a){var b=s[a[q]];return b||(b={},r++,a[q]=r,s[r]=b),b}function g(a,c,d){if(c||(c=b),l)return c.createElement(a);d||(d=f(c));var e;return e=d.cache[a]?d.cache[a].cloneNode():p.test(a)?(d.cache[a]=d.createElem(a)).cloneNode():d.createElem(a),!e.canHaveChildren||o.test(a)||e.tagUrn?e:d.frag.appendChild(e)}function h(a,c){if(a||(a=b),l)return a.createDocumentFragment();c=c||f(a);for(var e=c.frag.cloneNode(),g=0,h=d(),i=h.length;i>g;g++)e.createElement(h[g]);return e}function i(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return t.shivMethods?g(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+d().join().replace(/[\w\-:]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(t,b.frag)}function j(a){a||(a=b);var d=f(a);return!t.shivCSS||k||d.hasCSS||(d.hasCSS=!!c(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),l||i(a,d),a}var k,l,m="3.7.3",n=a.html5||{},o=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,q="_html5shiv",r=0,s={};!function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",k="hidden"in a,l=1==a.childNodes.length||function(){b.createElement("a");var a=b.createDocumentFragment();return"undefined"==typeof a.cloneNode||"undefined"==typeof a.createDocumentFragment||"undefined"==typeof a.createElement}()}catch(c){k=!0,l=!0}}();var t={elements:n.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:m,shivCSS:n.shivCSS!==!1,supportsUnknownElements:l,shivMethods:n.shivMethods!==!1,type:"default",shivDocument:j,createElement:g,createDocumentFragment:h,addElements:e};a.html5=t,j(b),"object"==typeof module&&module.exports&&(module.exports=t)}("undefined"!=typeof a?a:this,b);var y=u.testStyles=i;/*!
   {
   "name": "CSS :checked pseudo-selector",
   "caniuse": "css-sel3",
   "property": "checked",
   "tags": ["css"],
   "notes": [{
   "name": "Related Github Issue",
   "href": "https://github.com/Modernizr/Modernizr/pull/879"
   }]
   }
   !*/
v.addTest("checked",function(){return y("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}",function(a){var b=g("input");return b.setAttribute("type","checkbox"),b.setAttribute("checked","checked"),a.appendChild(b),20===b.offsetLeft})});var z="Moz O ms Webkit",A=u._config.usePrefixes?z.split(" "):[];u._cssomPrefixes=A;var B=u._config.usePrefixes?z.toLowerCase().split(" "):[];u._domPrefixes=B;var C={elem:g("modernizr")};v._q.push(function(){delete C.elem});var D={style:C.elem.style};v._q.unshift(function(){delete D.style}),u.testAllProps=q,u.testAllProps=r,/*!
   {
   "name": "Appearance",
   "property": "appearance",
   "caniuse": "css-appearance",
   "tags": ["css"],
   "notes": [{
   "name": "MDN documentation",
   "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/-moz-appearance"
   },{
   "name": "CSS-Tricks CSS Almanac: appearance",
   "href": "http://css-tricks.com/almanac/properties/a/appearance/"
   }]
   }
   !*/
v.addTest("appearance",r("appearance")),/*!
   {
   "name": "Flexbox",
   "property": "flexbox",
   "caniuse": "flexbox",
   "tags": ["css"],
   "notes": [{
   "name": "The _new_ flexbox",
   "href": "http://dev.w3.org/csswg/css3-flexbox"
   }],
   "warnings": [
   "A `true` result for this detect does not imply that the `flex-wrap` property is supported; see the `flexwrap` detect."
   ]
   }
   !*/
v.addTest("flexbox",r("flexBasis","1px",!0)),/*!
   {
   "name": "Flexbox (legacy)",
   "property": "flexboxlegacy",
   "tags": ["css"],
   "polyfills": ["flexie"],
   "notes": [{
   "name": "The _old_ flexbox",
   "href": "http://www.w3.org/TR/2009/WD-css3-flexbox-20090723/"
   }]
   }
   !*/
v.addTest("flexboxlegacy",r("boxDirection","reverse",!0)),/*!
   {
   "name": "Flexbox (tweener)",
   "property": "flexboxtweener",
   "tags": ["css"],
   "polyfills": ["flexie"],
   "notes": [{
   "name": "The _inbetween_ flexbox",
   "href": "http://www.w3.org/TR/2011/WD-css3-flexbox-20111129/"
   }],
   "warnings": ["This represents an old syntax, not the latest standard syntax."]
   }
   !*/
v.addTest("flexboxtweener",r("flexAlign","end",!0)),/*!
   {
   "name": "Flex Line Wrapping",
   "property": "flexwrap",
   "tags": ["css", "flexbox"],
   "notes": [{
   "name": "W3C Flexible Box Layout spec",
   "href": "http://dev.w3.org/csswg/css3-flexbox"
   }],
   "warnings": [
   "Does not imply a modern implementation – see documentation."
   ]
   }
   !*/
v.addTest("flexwrap",r("flexWrap","wrap",!0)),f(),d(s),delete u.addTest,delete u.addAsyncTest;for(var E=0;E<v._q.length;E++)v._q[E]();a.Modernizr=v}(window,document);
//# sourceMappingURL=modernizr.js.map