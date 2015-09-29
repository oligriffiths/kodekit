/*!
 * modernizr v3.0.0
 * Build http://modernizr.com/download?-touchevents-shiv-dontmin
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
!function(a,b,c){function d(a,b){return typeof a===b}function e(){var a,b,c,e,f,g,h;for(var i in j){if(a=[],b=j[i],b.name&&(a.push(b.name.toLowerCase()),b.options&&b.options.aliases&&b.options.aliases.length))for(c=0;c<b.options.aliases.length;c++)a.push(b.options.aliases[c].toLowerCase());for(e=d(b.fn,"function")?b.fn():b.fn,f=0;f<a.length;f++)g=a[f],h=g.split("."),1===h.length?l[h[0]]=e:(!l[h[0]]||l[h[0]]instanceof Boolean||(l[h[0]]=new Boolean(l[h[0]])),l[h[0]][h[1]]=e),m.push((e?"":"no-")+h.join("-"))}}function f(a){var b=n.className,c=l._config.classPrefix||"";if(o&&(b=b.baseVal),l._config.enableJSClass){var d=new RegExp("(^|\\s)"+c+"no-js(\\s|$)");b=b.replace(d,"$1"+c+"js$2")}l._config.enableClasses&&(b+=" "+c+a.join(" "+c),o?n.className.baseVal=b:n.className=b)}function g(){return"function"!=typeof b.createElement?b.createElement(arguments[0]):o?b.createElementNS.call(b,"http://www.w3.org/2000/svg",arguments[0]):b.createElement.apply(b,arguments)}function h(){var a=b.body;return a||(a=g(o?"svg":"body"),a.fake=!0),a}function i(a,c,d,e){var f,i,j,k,l="modernizr",m=g("div"),o=h();if(parseInt(d,10))for(;d--;)j=g("div"),j.id=e?e[d]:l+(d+1),m.appendChild(j);return f=g("style"),f.type="text/css",f.id="s"+l,(o.fake?o:m).appendChild(f),o.appendChild(m),f.styleSheet?f.styleSheet.cssText=a:f.appendChild(b.createTextNode(a)),m.id=l,o.fake&&(o.style.background="",o.style.overflow="hidden",k=n.style.overflow,n.style.overflow="hidden",n.appendChild(o)),i=c(m,a),o.fake?(o.parentNode.removeChild(o),n.style.overflow=k,n.offsetHeight):m.parentNode.removeChild(m),!!i}var j=[],k={_version:"3.0.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(a,b){var c=this;setTimeout(function(){b(c[a])},0)},addTest:function(a,b,c){j.push({name:a,fn:b,options:c})},addAsyncTest:function(a){j.push({name:null,fn:a})}},l=function(){};l.prototype=k,l=new l;var m=[],n=b.documentElement,o="svg"===n.nodeName.toLowerCase();o||!function(a,b){function c(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function d(){var a=t.elements;return"string"==typeof a?a.split(" "):a}function e(a,b){var c=t.elements;"string"!=typeof c&&(c=c.join(" ")),"string"!=typeof a&&(a=a.join(" ")),t.elements=c+" "+a,j(b)}function f(a){var b=s[a[q]];return b||(b={},r++,a[q]=r,s[r]=b),b}function g(a,c,d){if(c||(c=b),l)return c.createElement(a);d||(d=f(c));var e;return e=d.cache[a]?d.cache[a].cloneNode():p.test(a)?(d.cache[a]=d.createElem(a)).cloneNode():d.createElem(a),!e.canHaveChildren||o.test(a)||e.tagUrn?e:d.frag.appendChild(e)}function h(a,c){if(a||(a=b),l)return a.createDocumentFragment();c=c||f(a);for(var e=c.frag.cloneNode(),g=0,h=d(),i=h.length;i>g;g++)e.createElement(h[g]);return e}function i(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return t.shivMethods?g(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+d().join().replace(/[\w\-:]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(t,b.frag)}function j(a){a||(a=b);var d=f(a);return!t.shivCSS||k||d.hasCSS||(d.hasCSS=!!c(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),l||i(a,d),a}var k,l,m="3.7.2",n=a.html5||{},o=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,q="_html5shiv",r=0,s={};!function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",k="hidden"in a,l=1==a.childNodes.length||function(){b.createElement("a");var a=b.createDocumentFragment();return"undefined"==typeof a.cloneNode||"undefined"==typeof a.createDocumentFragment||"undefined"==typeof a.createElement}()}catch(c){k=!0,l=!0}}();var t={elements:n.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:m,shivCSS:n.shivCSS!==!1,supportsUnknownElements:l,shivMethods:n.shivMethods!==!1,type:"default",shivDocument:j,createElement:g,createDocumentFragment:h,addElements:e};a.html5=t,j(b)}(this,b);var p=k._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];k._prefixes=p;var q=k.testStyles=i;/*!
{
  "name": "Touch Events",
  "property": "touchevents",
  "caniuse" : "touch",
  "tags": ["media", "attribute"],
  "notes": [{
    "name": "Touch Events spec",
    "href": "http://www.w3.org/TR/2013/WD-touch-events-20130124/"
  }],
  "warnings": [
    "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
  ],
  "knownBugs": [
    "False-positive on some configurations of Nokia N900",
    "False-positive on some BlackBerry 6.0 builds – https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
  ]
}
!*/
l.addTest("touchevents",function(){var c;if("ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch)c=!0;else{var d=["@media (",p.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");q(d,function(a){c=9===a.offsetTop})}return c}),e(),f(m),delete k.addTest,delete k.addAsyncTest;for(var r=0;r<l._q.length;r++)l._q[r]();a.Modernizr=l}(window,document);
//# sourceMappingURL=modernizr.js.map