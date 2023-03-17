(function(P,p){typeof exports=="object"&&typeof module<"u"?p(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],p):(P=typeof globalThis<"u"?globalThis:P||self,p(P.index={},P.Vue))})(this,function(P,p){"use strict";const ae={model:{type:Object,required:!0},layout:{type:String,default:"vertical"},labelSize:{type:String,default:"md"},labelAlign:{type:String,default:"start"},rules:{type:Object}},K=Symbol("formContextToken"),U=p.defineComponent({name:"GForm",props:ae,emits:["form-submit"],setup(n,{slots:e,emit:r,expose:t}){const{model:i}=p.toRefs(n),f=p.computed(()=>({layout:n.layout,labelSize:n.labelSize,labelAlign:n.labelAlign}));p.provide("LabelData",f);const a=new Set,s=m=>a.add(m),d=m=>a.delete(m);p.provide(K,{model:n.model,rules:n.rules,addItem:s,deleteItem:d});const h=m=>{m.preventDefault(),r("form-submit")};return t({validateFormData:m=>{const v=[];a.forEach(F=>v.push(F.validate())),Promise.all(v).then(()=>m(!0)).catch(()=>m(!1))}}),()=>{var m;return p.createVNode("form",{class:"s-form",onSubmit:h},[p.createVNode("div",null,[i.value.name]),p.createVNode("div",null,[(m=e.default)==null?void 0:m.call(e)])])}}}),fe={label:{type:String,default:""},field:{type:String}};function R(){return R=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(n[t]=r[t])}return n},R.apply(this,arguments)}function se(n,e){n.prototype=Object.create(e.prototype),n.prototype.constructor=n,D(n,e)}function B(n){return B=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(r){return r.__proto__||Object.getPrototypeOf(r)},B(n)}function D(n,e){return D=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,i){return t.__proto__=i,t},D(n,e)}function oe(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function z(n,e,r){return oe()?z=Reflect.construct.bind():z=function(i,f,a){var s=[null];s.push.apply(s,f);var d=Function.bind.apply(i,s),h=new d;return a&&D(h,a.prototype),h},z.apply(null,arguments)}function de(n){return Function.toString.call(n).indexOf("[native code]")!==-1}function G(n){var e=typeof Map=="function"?new Map:void 0;return G=function(t){if(t===null||!de(t))return t;if(typeof t!="function")throw new TypeError("Super expression must either be null or a function");if(typeof e<"u"){if(e.has(t))return e.get(t);e.set(t,i)}function i(){return z(t,arguments,B(this).constructor)}return i.prototype=Object.create(t.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),D(i,t)},G(n)}var ue=/%[sdj%]/g,X=function(){};typeof process<"u"&&process.env&&process.env.NODE_ENV!=="production"&&typeof window<"u"&&typeof document<"u"&&(X=function(e,r){typeof console<"u"&&console.warn&&typeof ASYNC_VALIDATOR_NO_WARNING>"u"&&r.every(function(t){return typeof t=="string"})&&console.warn(e,r)});function J(n){if(!n||!n.length)return null;var e={};return n.forEach(function(r){var t=r.field;e[t]=e[t]||[],e[t].push(r)}),e}function O(n){for(var e=arguments.length,r=new Array(e>1?e-1:0),t=1;t<e;t++)r[t-1]=arguments[t];var i=0,f=r.length;if(typeof n=="function")return n.apply(null,r);if(typeof n=="string"){var a=n.replace(ue,function(s){if(s==="%%")return"%";if(i>=f)return s;switch(s){case"%s":return String(r[i++]);case"%d":return Number(r[i++]);case"%j":try{return JSON.stringify(r[i++])}catch{return"[Circular]"}break;default:return s}});return a}return n}function ce(n){return n==="string"||n==="url"||n==="hex"||n==="email"||n==="date"||n==="pattern"}function w(n,e){return!!(n==null||e==="array"&&Array.isArray(n)&&!n.length||ce(e)&&typeof n=="string"&&!n)}function le(n,e,r){var t=[],i=0,f=n.length;function a(s){t.push.apply(t,s||[]),i++,i===f&&r(t)}n.forEach(function(s){e(s,a)})}function H(n,e,r){var t=0,i=n.length;function f(a){if(a&&a.length){r(a);return}var s=t;t=t+1,s<i?e(n[s],f):r([])}f([])}function me(n){var e=[];return Object.keys(n).forEach(function(r){e.push.apply(e,n[r]||[])}),e}var Q=function(n){se(e,n);function e(r,t){var i;return i=n.call(this,"Async Validation Error")||this,i.errors=r,i.fields=t,i}return e}(G(Error));function pe(n,e,r,t,i){if(e.first){var f=new Promise(function(v,F){var E=function(o){return t(o),o.length?F(new Q(o,J(o))):v(i)},u=me(n);H(u,r,E)});return f.catch(function(v){return v}),f}var a=e.firstFields===!0?Object.keys(n):e.firstFields||[],s=Object.keys(n),d=s.length,h=0,y=[],m=new Promise(function(v,F){var E=function(b){if(y.push.apply(y,b),h++,h===d)return t(y),y.length?F(new Q(y,J(y))):v(i)};s.length||(t(y),v(i)),s.forEach(function(u){var b=n[u];a.indexOf(u)!==-1?H(b,r,E):le(b,r,E)})});return m.catch(function(v){return v}),m}function ye(n){return!!(n&&n.message!==void 0)}function ge(n,e){for(var r=n,t=0;t<e.length;t++){if(r==null)return r;r=r[e[t]]}return r}function k(n,e){return function(r){var t;return n.fullFields?t=ge(e,n.fullFields):t=e[r.field||n.fullField],ye(r)?(r.field=r.field||n.fullField,r.fieldValue=t,r):{message:typeof r=="function"?r():r,fieldValue:t,field:r.field||n.fullField}}}function ee(n,e){if(e){for(var r in e)if(e.hasOwnProperty(r)){var t=e[r];typeof t=="object"&&typeof n[r]=="object"?n[r]=R({},n[r],t):n[r]=t}}return n}var re=function(e,r,t,i,f,a){e.required&&(!t.hasOwnProperty(e.field)||w(r,a||e.type))&&i.push(O(f.messages.required,e.fullField))},he=function(e,r,t,i,f){(/^\s+$/.test(r)||r==="")&&i.push(O(f.messages.whitespace,e.fullField))},L,ve=function(){if(L)return L;var n="[a-fA-F\\d:]",e=function(g){return g&&g.includeBoundaries?"(?:(?<=\\s|^)(?="+n+")|(?<="+n+")(?=\\s|$))":""},r="(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}",t="[a-fA-F\\d]{1,4}",i=(`
(?:
(?:`+t+":){7}(?:"+t+`|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:`+t+":){6}(?:"+r+"|:"+t+`|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:`+t+":){5}(?::"+r+"|(?::"+t+`){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:`+t+":){4}(?:(?::"+t+"){0,1}:"+r+"|(?::"+t+`){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:`+t+":){3}(?:(?::"+t+"){0,2}:"+r+"|(?::"+t+`){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:`+t+":){2}(?:(?::"+t+"){0,3}:"+r+"|(?::"+t+`){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:`+t+":){1}(?:(?::"+t+"){0,4}:"+r+"|(?::"+t+`){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::`+t+"){0,5}:"+r+"|(?::"+t+`){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm,"").replace(/\n/g,"").trim(),f=new RegExp("(?:^"+r+"$)|(?:^"+i+"$)"),a=new RegExp("^"+r+"$"),s=new RegExp("^"+i+"$"),d=function(g){return g&&g.exact?f:new RegExp("(?:"+e(g)+r+e(g)+")|(?:"+e(g)+i+e(g)+")","g")};d.v4=function(l){return l&&l.exact?a:new RegExp(""+e(l)+r+e(l),"g")},d.v6=function(l){return l&&l.exact?s:new RegExp(""+e(l)+i+e(l),"g")};var h="(?:(?:[a-z]+:)?//)",y="(?:\\S+(?::\\S*)?@)?",m=d.v4().source,v=d.v6().source,F="(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)",E="(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*",u="(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))",b="(?::\\d{2,5})?",o='(?:[/?#][^\\s"]*)?',j="(?:"+h+"|www\\.)"+y+"(?:localhost|"+m+"|"+v+"|"+F+E+u+")"+b+o;return L=new RegExp("(?:^"+j+"$)","i"),L},te={email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,hex:/^#?([a-f0-9]{6}|[a-f0-9]{3})$/i},T={integer:function(e){return T.number(e)&&parseInt(e,10)===e},float:function(e){return T.number(e)&&!T.integer(e)},array:function(e){return Array.isArray(e)},regexp:function(e){if(e instanceof RegExp)return!0;try{return!!new RegExp(e)}catch{return!1}},date:function(e){return typeof e.getTime=="function"&&typeof e.getMonth=="function"&&typeof e.getYear=="function"&&!isNaN(e.getTime())},number:function(e){return isNaN(e)?!1:typeof e=="number"},object:function(e){return typeof e=="object"&&!T.array(e)},method:function(e){return typeof e=="function"},email:function(e){return typeof e=="string"&&e.length<=320&&!!e.match(te.email)},url:function(e){return typeof e=="string"&&e.length<=2048&&!!e.match(ve())},hex:function(e){return typeof e=="string"&&!!e.match(te.hex)}},be=function(e,r,t,i,f){if(e.required&&r===void 0){re(e,r,t,i,f);return}var a=["integer","float","array","regexp","object","method","email","number","date","url","hex"],s=e.type;a.indexOf(s)>-1?T[s](r)||i.push(O(f.messages.types[s],e.fullField,e.type)):s&&typeof r!==e.type&&i.push(O(f.messages.types[s],e.fullField,e.type))},we=function(e,r,t,i,f){var a=typeof e.len=="number",s=typeof e.min=="number",d=typeof e.max=="number",h=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,y=r,m=null,v=typeof r=="number",F=typeof r=="string",E=Array.isArray(r);if(v?m="number":F?m="string":E&&(m="array"),!m)return!1;E&&(y=r.length),F&&(y=r.replace(h,"_").length),a?y!==e.len&&i.push(O(f.messages[m].len,e.fullField,e.len)):s&&!d&&y<e.min?i.push(O(f.messages[m].min,e.fullField,e.min)):d&&!s&&y>e.max?i.push(O(f.messages[m].max,e.fullField,e.max)):s&&d&&(y<e.min||y>e.max)&&i.push(O(f.messages[m].range,e.fullField,e.min,e.max))},V="enum",Fe=function(e,r,t,i,f){e[V]=Array.isArray(e[V])?e[V]:[],e[V].indexOf(r)===-1&&i.push(O(f.messages[V],e.fullField,e[V].join(", ")))},qe=function(e,r,t,i,f){if(e.pattern){if(e.pattern instanceof RegExp)e.pattern.lastIndex=0,e.pattern.test(r)||i.push(O(f.messages.pattern.mismatch,e.fullField,r,e.pattern));else if(typeof e.pattern=="string"){var a=new RegExp(e.pattern);a.test(r)||i.push(O(f.messages.pattern.mismatch,e.fullField,r,e.pattern))}}},c={required:re,whitespace:he,type:be,range:we,enum:Fe,pattern:qe},xe=function(e,r,t,i,f){var a=[],s=e.required||!e.required&&i.hasOwnProperty(e.field);if(s){if(w(r,"string")&&!e.required)return t();c.required(e,r,i,a,f,"string"),w(r,"string")||(c.type(e,r,i,a,f),c.range(e,r,i,a,f),c.pattern(e,r,i,a,f),e.whitespace===!0&&c.whitespace(e,r,i,a,f))}t(a)},Oe=function(e,r,t,i,f){var a=[],s=e.required||!e.required&&i.hasOwnProperty(e.field);if(s){if(w(r)&&!e.required)return t();c.required(e,r,i,a,f),r!==void 0&&c.type(e,r,i,a,f)}t(a)},Ee=function(e,r,t,i,f){var a=[],s=e.required||!e.required&&i.hasOwnProperty(e.field);if(s){if(r===""&&(r=void 0),w(r)&&!e.required)return t();c.required(e,r,i,a,f),r!==void 0&&(c.type(e,r,i,a,f),c.range(e,r,i,a,f))}t(a)},Ae=function(e,r,t,i,f){var a=[],s=e.required||!e.required&&i.hasOwnProperty(e.field);if(s){if(w(r)&&!e.required)return t();c.required(e,r,i,a,f),r!==void 0&&c.type(e,r,i,a,f)}t(a)},Pe=function(e,r,t,i,f){var a=[],s=e.required||!e.required&&i.hasOwnProperty(e.field);if(s){if(w(r)&&!e.required)return t();c.required(e,r,i,a,f),w(r)||c.type(e,r,i,a,f)}t(a)},je=function(e,r,t,i,f){var a=[],s=e.required||!e.required&&i.hasOwnProperty(e.field);if(s){if(w(r)&&!e.required)return t();c.required(e,r,i,a,f),r!==void 0&&(c.type(e,r,i,a,f),c.range(e,r,i,a,f))}t(a)},_e=function(e,r,t,i,f){var a=[],s=e.required||!e.required&&i.hasOwnProperty(e.field);if(s){if(w(r)&&!e.required)return t();c.required(e,r,i,a,f),r!==void 0&&(c.type(e,r,i,a,f),c.range(e,r,i,a,f))}t(a)},Ne=function(e,r,t,i,f){var a=[],s=e.required||!e.required&&i.hasOwnProperty(e.field);if(s){if(r==null&&!e.required)return t();c.required(e,r,i,a,f,"array"),r!=null&&(c.type(e,r,i,a,f),c.range(e,r,i,a,f))}t(a)},Re=function(e,r,t,i,f){var a=[],s=e.required||!e.required&&i.hasOwnProperty(e.field);if(s){if(w(r)&&!e.required)return t();c.required(e,r,i,a,f),r!==void 0&&c.type(e,r,i,a,f)}t(a)},Se="enum",Ve=function(e,r,t,i,f){var a=[],s=e.required||!e.required&&i.hasOwnProperty(e.field);if(s){if(w(r)&&!e.required)return t();c.required(e,r,i,a,f),r!==void 0&&c[Se](e,r,i,a,f)}t(a)},De=function(e,r,t,i,f){var a=[],s=e.required||!e.required&&i.hasOwnProperty(e.field);if(s){if(w(r,"string")&&!e.required)return t();c.required(e,r,i,a,f),w(r,"string")||c.pattern(e,r,i,a,f)}t(a)},Te=function(e,r,t,i,f){var a=[],s=e.required||!e.required&&i.hasOwnProperty(e.field);if(s){if(w(r,"date")&&!e.required)return t();if(c.required(e,r,i,a,f),!w(r,"date")){var d;r instanceof Date?d=r:d=new Date(r),c.type(e,d,i,a,f),d&&c.range(e,d.getTime(),i,a,f)}}t(a)},Me=function(e,r,t,i,f){var a=[],s=Array.isArray(r)?"array":typeof r;c.required(e,r,i,a,f,s),t(a)},W=function(e,r,t,i,f){var a=e.type,s=[],d=e.required||!e.required&&i.hasOwnProperty(e.field);if(d){if(w(r,a)&&!e.required)return t();c.required(e,r,i,s,f,a),w(r,a)||c.type(e,r,i,s,f)}t(s)},Ie=function(e,r,t,i,f){var a=[],s=e.required||!e.required&&i.hasOwnProperty(e.field);if(s){if(w(r)&&!e.required)return t();c.required(e,r,i,a,f)}t(a)},M={string:xe,method:Oe,number:Ee,boolean:Ae,regexp:Pe,integer:je,float:_e,array:Ne,object:Re,enum:Ve,pattern:De,date:Te,url:W,hex:W,email:W,required:Me,any:Ie};function Z(){return{default:"Validation error on field %s",required:"%s is required",enum:"%s must be one of %s",whitespace:"%s cannot be empty",date:{format:"%s date %s is invalid for format %s",parse:"%s date could not be parsed, %s is invalid ",invalid:"%s date %s is invalid"},types:{string:"%s is not a %s",method:"%s is not a %s (function)",array:"%s is not an %s",object:"%s is not an %s",number:"%s is not a %s",date:"%s is not a %s",boolean:"%s is not a %s",integer:"%s is not an %s",float:"%s is not a %s",regexp:"%s is not a valid %s",email:"%s is not a valid %s",url:"%s is not a valid %s",hex:"%s is not a valid %s"},string:{len:"%s must be exactly %s characters",min:"%s must be at least %s characters",max:"%s cannot be longer than %s characters",range:"%s must be between %s and %s characters"},number:{len:"%s must equal %s",min:"%s cannot be less than %s",max:"%s cannot be greater than %s",range:"%s must be between %s and %s"},array:{len:"%s must be exactly %s in length",min:"%s cannot be less than %s in length",max:"%s cannot be greater than %s in length",range:"%s must be between %s and %s in length"},pattern:{mismatch:"%s value %s does not match pattern %s"},clone:function(){var e=JSON.parse(JSON.stringify(this));return e.clone=this.clone,e}}}var Y=Z(),I=function(){function n(r){this.rules=null,this._messages=Y,this.define(r)}var e=n.prototype;return e.define=function(t){var i=this;if(!t)throw new Error("Cannot configure a schema with no rules");if(typeof t!="object"||Array.isArray(t))throw new Error("Rules must be an object");this.rules={},Object.keys(t).forEach(function(f){var a=t[f];i.rules[f]=Array.isArray(a)?a:[a]})},e.messages=function(t){return t&&(this._messages=ee(Z(),t)),this._messages},e.validate=function(t,i,f){var a=this;i===void 0&&(i={}),f===void 0&&(f=function(){});var s=t,d=i,h=f;if(typeof d=="function"&&(h=d,d={}),!this.rules||Object.keys(this.rules).length===0)return h&&h(null,s),Promise.resolve(s);function y(u){var b=[],o={};function j(g){if(Array.isArray(g)){var x;b=(x=b).concat.apply(x,g)}else b.push(g)}for(var l=0;l<u.length;l++)j(u[l]);b.length?(o=J(b),h(b,o)):h(null,s)}if(d.messages){var m=this.messages();m===Y&&(m=Z()),ee(m,d.messages),d.messages=m}else d.messages=this.messages();var v={},F=d.keys||Object.keys(this.rules);F.forEach(function(u){var b=a.rules[u],o=s[u];b.forEach(function(j){var l=j;typeof l.transform=="function"&&(s===t&&(s=R({},s)),o=s[u]=l.transform(o)),typeof l=="function"?l={validator:l}:l=R({},l),l.validator=a.getValidationMethod(l),l.validator&&(l.field=u,l.fullField=l.fullField||u,l.type=a.getType(l),v[u]=v[u]||[],v[u].push({rule:l,value:o,source:s,field:u}))})});var E={};return pe(v,d,function(u,b){var o=u.rule,j=(o.type==="object"||o.type==="array")&&(typeof o.fields=="object"||typeof o.defaultField=="object");j=j&&(o.required||!o.required&&u.value),o.field=u.field;function l(q,S){return R({},S,{fullField:o.fullField+"."+q,fullFields:o.fullFields?[].concat(o.fullFields,[q]):[q]})}function g(q){q===void 0&&(q=[]);var S=Array.isArray(q)?q:[q];!d.suppressWarning&&S.length&&n.warning("async-validator:",S),S.length&&o.message!==void 0&&(S=[].concat(o.message));var _=S.map(k(o,s));if(d.first&&_.length)return E[o.field]=1,b(_);if(!j)b(_);else{if(o.required&&!u.value)return o.message!==void 0?_=[].concat(o.message).map(k(o,s)):d.error&&(_=[d.error(o,O(d.messages.required,o.field))]),b(_);var $={};o.defaultField&&Object.keys(u.value).map(function(N){$[N]=o.defaultField}),$=R({},$,u.rule.fields);var ne={};Object.keys($).forEach(function(N){var A=$[N],ze=Array.isArray(A)?A:[A];ne[N]=ze.map(l.bind(null,N))});var ie=new n(ne);ie.messages(d.messages),u.rule.options&&(u.rule.options.messages=d.messages,u.rule.options.error=d.error),ie.validate(u.value,u.rule.options||d,function(N){var A=[];_&&_.length&&A.push.apply(A,_),N&&N.length&&A.push.apply(A,N),b(A.length?A:null)})}}var x;if(o.asyncValidator)x=o.asyncValidator(o,u.value,g,u.source,d);else if(o.validator){try{x=o.validator(o,u.value,g,u.source,d)}catch(q){console.error==null||console.error(q),d.suppressValidatorError||setTimeout(function(){throw q},0),g(q.message)}x===!0?g():x===!1?g(typeof o.message=="function"?o.message(o.fullField||o.field):o.message||(o.fullField||o.field)+" fails"):x instanceof Array?g(x):x instanceof Error&&g(x.message)}x&&x.then&&x.then(function(){return g()},function(q){return g(q)})},function(u){y(u)},s)},e.getType=function(t){if(t.type===void 0&&t.pattern instanceof RegExp&&(t.type="pattern"),typeof t.validator!="function"&&t.type&&!M.hasOwnProperty(t.type))throw new Error(O("Unknown rule type %s",t.type));return t.type||"string"},e.getValidationMethod=function(t){if(typeof t.validator=="function")return t.validator;var i=Object.keys(t),f=i.indexOf("message");return f!==-1&&i.splice(f,1),i.length===1&&i[0]==="required"?M.required:M[this.getType(t)]||void 0},n}();I.register=function(e,r){if(typeof r!="function")throw new Error("Cannot register a validator by type, validator is not a function");M[e]=r},I.warning=X,I.messages=Y,I.validators=M;const C=p.defineComponent({name:"GFormItem",props:fe,setup(n,{slots:e}){const r=p.inject("LabelData"),t=p.computed(()=>({"s-form-item":!0,"s-form-item--horizontal":r.value.layout==="horizontal","s-form-item--vertical":r.value.layout==="vertical"})),i=p.computed(()=>({"s-form-item-label":!0,"s-form-item-label--vertical":r.value.layout==="vertical",[`s-form-item-label--${r.value.labelAlign}`]:r.value.layout==="horizontal",[`s-form-item-label--${r.value.labelSize}`]:r.value.layout==="horizontal"})),f=p.ref(""),a=p.ref(!1),s=p.inject(K),h={validate:()=>{if(!s)return console.warn("请在Form中使用FormItem"),Promise.reject("请在Form中使用FormItem");if(!n.field)return console.warn("请在FormItem中设置field字段"),Promise.reject("请在FormItem中设置field字段");if(!s.rules)return Promise.resolve({result:!0});const y=s.rules[n.field]||void 0;if(!y)return Promise.resolve({result:!0});const m=s.model[n.field];return new I({[n.field]:y}).validate({[n.field]:m},F=>{F?(a.value=!0,f.value=F[0].message||"校验失败"):(a.value=!1,f.value="")})}};return p.provide("FORM_ITEM_CTX",h),p.onMounted(()=>{n.field&&(s==null||s.addItem(h))}),p.onUnmounted(()=>{n.field&&(s==null||s.deleteItem(h))}),()=>{var y;return p.createVNode("div",{class:t.value},[p.createVNode("span",{class:i.value},[n.label]),p.createVNode("div",null,[(y=e.default)==null?void 0:y.call(e)]),a.value&&p.createVNode("div",{class:"error-message"},[f.value])])}}}),$e={install(n){n.component(U.name,U),n.component(C.name,C)}};P.Form=U,P.FormItem=C,P.default=$e,Object.defineProperties(P,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});