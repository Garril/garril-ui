(function(e,t){typeof exports=="object"&&typeof module<"u"?t(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],t):(e=typeof globalThis<"u"?globalThis:e||self,t(e.index={},e.Vue))})(this,function(e,t){"use strict";const o={type:{type:String,default:"text"},modelValue:{type:String,default:""}},u=t.defineComponent({name:"GInput",props:o,emits:["update:modelValue"],setup(n,{emit:d}){const p=t.inject("FORM_ITEM_CTX"),l=s=>{const a=s.target.value;d("update:modelValue",a),p.validate()};return()=>t.createVNode("div",{class:"s-input-wrapper"},[t.createVNode("input",{class:"s-input",type:n.type,value:n.modelValue,onInput:l},null)])}}),i={install(n){n.component(u.name,u)}};e.Input=u,e.default=i,Object.defineProperties(e,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});