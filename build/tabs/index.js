import { defineComponent as p, ref as d, provide as v, createVNode as l, inject as r, Fragment as _ } from "vue";
function b(e) {
  let n = "";
  const u = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let t = 0; t < e; t++)
    n += u.charAt(Math.floor(Math.random() * u.length));
  return n;
}
const w = {
  modelValue: {
    type: String,
    default: ""
  },
  closeAble: {
    type: Boolean,
    default: !1
  },
  addAble: {
    type: Boolean,
    default: !1
  }
}, h = p({
  name: "GTabs",
  props: w,
  emits: ["update:modelValue"],
  setup(e, {
    slots: n,
    emit: u
  }) {
    const t = d([]);
    v("TAB_DATA", t);
    const c = d(e.modelValue);
    v("CUR_ACTIVE_TAB", c);
    const o = (i) => {
      c.value = i, u("update:modelValue", i);
    }, m = d(/* @__PURE__ */ new Set());
    v("SET_FOR_TEST", m);
    const A = (i) => {
      if (t.value.length > 1) {
        const a = t.value.findIndex((S) => S.id === i);
        a !== -1 && (c.value = i, t.value.splice(a, 1), m.value.delete(i));
      } else
        console.warn("至少保留一个选项卡...");
    }, s = d(""), T = d(""), g = () => {
      s.value = b(4), T.value = b(20), t.value.push({
        id: s.value,
        title: "new tab",
        content: T.value,
        type: "dynamic"
      }), c.value = s.value;
    };
    return () => {
      var i;
      return l("div", {
        class: "s-tabs"
      }, [l("ul", {
        class: "s-tabs-ul"
      }, [t.value.map((a) => l("li", {
        class: a.id === c.value ? "s-tabs-li-active" : "",
        onClick: () => o(a.id)
      }, [a.title, e.closeAble && l("svg", {
        onClick: () => A(a.id),
        style: "margin-left: 8px;",
        viewBox: "0 0 1024 1024",
        width: "12",
        height: "12"
      }, [l("path", {
        d: "M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"
      }, null)])])), e.addAble && l("li", null, [l("svg", {
        onClick: g,
        viewBox: "0 0 1024 1024",
        width: "14",
        height: "14"
      }, [l("path", {
        d: "M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z"
      }, null)])])]), (i = n.default) == null ? void 0 : i.call(n), t.value.filter((a) => a.type === "dynamic").map((a) => a.id === c.value && l("div", {
        class: "s-tab-item"
      }, [a.content]))]);
    };
  }
}), y = {
  id: {
    type: String,
    required: !0
  },
  title: {
    type: String,
    required: !0
  }
}, f = p({
  name: "GTabItem",
  props: y,
  setup(e, {
    slots: n
  }) {
    const u = r("CUR_ACTIVE_TAB"), t = r("TAB_DATA");
    t.value.push({
      id: e.id,
      title: e.title
    });
    const c = r("SET_FOR_TEST");
    return c.value.add(e.id), c.value.size !== t.value.length && console.warn("tab item id should be unique!"), () => {
      var o;
      return l(_, null, [e.id === u.value && l("div", {
        class: "s-tab-item"
      }, [(o = n.default) == null ? void 0 : o.call(n)])]);
    };
  }
}), C = {
  install(e) {
    e.component(h.name, h), e.component(f.name, f);
  }
};
export {
  f as TabItem,
  h as Tabs,
  C as default
};
