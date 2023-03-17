import { reactive as G, computed as w, ref as C, unref as V, defineComponent as D, toRefs as P, inject as R, createVNode as h, mergeProps as j, withDirectives as _, vModelCheckbox as F, onMounted as q, provide as K, createTextVNode as Y } from "vue";
function S(n, o = 0, v = {}) {
  return o++, n == null ? void 0 : n.reduce((l, r) => {
    const e = { ...r };
    if (e.selected = e.selected ?? !1, e.checked = e.checked ?? !1, e.expanded = e.expanded ?? !1, e.level = o, o > 1 && v && (e.parentId = v.id), e.children) {
      e.isLeaf = !1;
      const t = S(e.children, o, e);
      return delete e.children, l.concat(e, t);
    } else
      return e.isLeaf === void 0 && (e.isLeaf = !0), l.concat(e);
  }, []);
}
function U(n) {
  let o = "";
  const v = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < n; i++)
    o += v.charAt(Math.floor(Math.random() * v.length));
  return o;
}
function J(n, { getChildNodes: o }) {
  const v = (l) => {
    l.checked = !l.checked, o(l, !0).forEach((s) => {
      s.checked = l.checked;
    });
    const r = n.value.find(
      (s) => s.id === l.parentId
    );
    if (!r)
      return;
    o(r, !1).every((s) => s.checked) ? (r.checked = !0, i(r, !0)) : (r.checked = !1, i(r, !1));
  };
  function i(l, r) {
    if (l.parentId) {
      const e = n.value.find(
        (t) => t.id === l.parentId
      );
      r && o(e, !1).every((f) => f.checked) ? (e.checked = !0, i(e, !0)) : (e.checked = !1, i(e, !1));
    }
  }
  return {
    checkTreeNode: v
  };
}
const T = {
  prev: "s-tree-node--prev",
  next: "s-tree-node--next",
  inner: "s-tree-node--inner"
};
function Q(n, { getChildNodes: o, getParentNode: v }, i) {
  const l = G({
    dropType: void 0,
    draggingHtmlNode: null,
    draggingTreeNode: null
  }), r = () => {
    l.dropType = void 0, l.draggingHtmlNode = null, l.draggingTreeNode = null;
  }, e = w(
    () => n.value.reduce(
      (d, u) => ({
        ...d,
        [u.id]: u
      }),
      {}
    )
  ), t = (d) => {
    d == null || d.classList.remove(...Object.values(T));
  }, s = (d, u) => {
    var c;
    const p = (c = e.value[d]) == null ? void 0 : c.parentId;
    return p === u ? !0 : p !== void 0 ? s(p, u) : !1;
  }, f = (d, u) => {
    var p;
    d.stopPropagation(), l.draggingHtmlNode = d.target, l.draggingTreeNode = u, (p = d.dataTransfer) == null || p.setData("dragNodeId", u.id);
  }, a = (d) => {
    if (d.preventDefault(), d.stopPropagation(), !!l.draggingHtmlNode && i) {
      if (d.dataTransfer && (d.dataTransfer.dropEffect = "move"), !n)
        return;
      let u = {};
      typeof i == "object" ? u = i : i === !0 && (u = { inner: !0 });
      const { prev: p, next: c, inner: I } = u;
      let g;
      const L = p ? I ? 0.25 : c ? 0.45 : 1 : -1, b = c ? I ? 0.75 : p ? 0.55 : 0 : 1, m = d.currentTarget, k = m == null ? void 0 : m.getBoundingClientRect(), H = d.clientY - ((k == null ? void 0 : k.top) || 0);
      if (H < ((k == null ? void 0 : k.height) || 0) * L ? g = "prev" : H > ((k == null ? void 0 : k.height) || 0) * b ? g = "next" : I ? g = "inner" : g = void 0, g) {
        const E = m == null ? void 0 : m.classList;
        E && (E.contains(T[g]) || (t(m), E.add(T[g])));
      } else
        t(m);
      l.dropType = g;
    }
  }, x = (d) => {
    d.stopPropagation(), l.draggingHtmlNode && t(d.currentTarget);
  }, N = (d, u) => {
    var c;
    if (d.preventDefault(), d.stopPropagation(), t(d.currentTarget), !l.draggingHtmlNode || !i)
      return;
    const p = (c = d.dataTransfer) == null ? void 0 : c.getData("dragNodeId");
    if (p) {
      const I = s(u.id, p);
      if (p === u.id || I)
        return;
      l.dropType && y(p, u), r();
    }
  };
  function y(d, u) {
    const p = n.value.find((c) => c.id === d);
    if (p) {
      let c;
      const I = o(p), g = v(p);
      if (l.dropType === "inner") {
        c = {
          ...p,
          parentId: u.id,
          level: u.level + 1
        };
        const L = n.value.indexOf(u);
        n.value.splice(L + 1, 0, c), u.isLeaf = void 0;
        const b = n.value.indexOf(p);
        n.value.splice(b, 1);
      } else if (l.dropType === "next") {
        c = {
          ...p,
          parentId: u.parentId,
          level: u.level
        };
        const L = n.value.indexOf(u), b = o(u, !0).length;
        n.value.splice(
          L + b + 1,
          0,
          c
        );
        const m = n.value.indexOf(p);
        n.value.splice(m, 1);
      } else if (l.dropType === "prev") {
        c = {
          ...p,
          parentId: u.parentId,
          level: u.level
        };
        const L = n.value.indexOf(u);
        n.value.splice(L, 0, c);
        const b = n.value.indexOf(p);
        n.value.splice(b, 1);
      }
      l.dropType = "inner", I.forEach((L) => y(L.id, c)), g && o(g).length === 0 && (g.isLeaf = !0);
    }
  }
  return {
    onDragStart: f,
    onDragOver: a,
    onDragLeave: x,
    onDragEnd: (d) => {
      d.preventDefault(), d.stopPropagation(), r();
    },
    onDrop: N
  };
}
function W(n, o, v, i) {
  const { lazyLoadNode: l } = i;
  return {
    clickExpandedNode: (e) => {
      const t = n.value.find((s) => s.id === e.id);
      t && (t.expanded = !t.expanded, t.expanded && l(t));
    }
  };
}
function X(n, { getNode: o, getTreeNodeIndex: v, getChildNodes: i }, { emit: l }) {
  const r = (f, a) => {
    a.value.forEach((x) => {
      x.level - 1 === f.level && !x.parentId && (x.parentId = f.id);
    });
  }, e = (f, a) => {
    const x = v(f);
    x && n.value.splice(x + 1, 0, ...a.value);
  }, t = (f) => {
    const a = o(f.parentNode);
    if (a) {
      a.loading = !1;
      const x = C(
        S(f.childNodes, a.level)
      );
      r(a, x), e(a, x);
      const N = i(a, !1);
      a.childNodeCount = N.length;
    }
  };
  return {
    lazyLoadNode: (f) => {
      const a = o(f);
      (a == null ? void 0 : a.isLeaf) === !1 && !a.childNodeCount && (a.loading = !0, l("lazy-load", f, t));
    }
  };
}
function Z(n, { getChildNodes: o, getTreeNodeIndex: v }) {
  return {
    appendTreeNode: (r, e) => {
      const t = o(r, !1), s = t[t.length - 1];
      let f = v(r) + 1;
      s && (f = v(s) + 1), r.expanded = !0, r.isLeaf = !1;
      const a = C({
        ...e,
        level: r.level + 1,
        parentId: r.id,
        isLeaf: !0,
        id: U(10)
      });
      n.value.splice(f, 0, a.value);
    },
    removeTreeNode: (r) => {
      const e = o(r, !0).map((t) => t.id);
      e.length === 0 ? n.value = n.value.filter(
        (t) => t.id !== r.id
      ) : n.value = n.value.filter(
        (t) => t.id !== r.id && !e.includes(t.id)
      );
    }
  };
}
function ee(n) {
  const o = (e, t = !0) => {
    const s = [], f = n.value.findIndex((a) => a.id === e.id);
    for (let a = f + 1; a < n.value.length && e.level < n.value[a].level; a++)
      (t || e.level + 1 === n.value[a].level) && s.push(n.value[a]);
    return s;
  };
  function v(e) {
    return e ? n.value.findIndex((t) => t.id === e.id) : -1;
  }
  const i = w(() => {
    let e = [];
    const t = [];
    for (const s of n.value)
      e.includes(s) || (s.expanded !== !0 && (e = o(s, !0)), t.push(s));
    return t;
  });
  return {
    getChildNodes: o,
    getTreeNodeIndex: v,
    getExpandedNodeList: i,
    getNode: (e) => {
      if (e)
        return n.value.find((t) => t.id === e.id);
    },
    getParentNode: (e) => {
      if (e)
        return n.value.find((t) => t.id === e.parentId);
    }
  };
}
function ne(n, o, v) {
  const i = C(S(V(n))), l = ee(i), r = [J, W, Z], e = X(i, l, v), t = Q(i, l, o.dragdrop);
  return {
    ...r.reduce((f, a) => ({ ...f, ...a(i, l, v, e) }), {}),
    ...l,
    ...t,
    flatTreeData: i
  };
}
const $ = {
  data: {
    type: Object,
    required: !0
  },
  // 多选框
  checkable: {
    type: Boolean,
    default: !1
  },
  // 左侧线
  lineable: {
    type: Boolean,
    default: !1
  },
  // 添加删除节点
  operable: {
    type: Boolean,
    default: !1
  },
  // 懒加载
  lazy: {
    type: Boolean,
    default: !1
  },
  // 拖拽
  dragdrop: {
    // 可能丢到节点里面，上面，下面
    type: [Boolean, Object],
    default: !1
  },
  // 设置了高度，代表要开启虚拟滚动
  height: {
    type: Number
  },
  itemHeight: {
    type: Number,
    default: 24
  }
}, z = 24, M = 28, te = {
  ...$,
  node: {
    type: Object,
    required: !0
  }
}, le = D({
  name: "GTreeNode",
  props: te,
  setup(n, {
    slots: o
  }) {
    const {
      lineable: v,
      checkable: i,
      node: l,
      operable: r,
      lazy: e,
      dragdrop: t
    } = P(n), {
      checkTreeNode: s,
      getChildNodes: f,
      appendTreeNode: a,
      removeTreeNode: x,
      onDragStart: N,
      onDragOver: y,
      onDragLeave: O,
      onDragEnd: d,
      onDrop: u
    } = R("TREE_HOOKS"), p = C(!1), c = () => {
      p.value ? p.value = !1 : p.value = !0;
    };
    let I = {};
    return t.value && (I = {
      draggable: !0,
      onDragend: (g) => d(g),
      onDragleave: (g) => O(g),
      onDragover: (g) => y(g),
      onDragstart: (g) => N(g, l.value),
      onDrop: (g) => u(g, l.value)
    }), () => {
      var k, H, E;
      let {
        level: g,
        expanded: L,
        isLeaf: b,
        checked: m
      } = V(l);
      return h("div", {
        class: "s-tree-node hover:bg-slate-300 relative leading-8",
        style: {
          paddingLeft: `${z * (g - 1)}px`
        },
        onMouseenter: c,
        onMouseleave: c
      }, [!b && L && v.value && h("span", {
        class: "s-tree-node--line absolute w-px bg-gray-400",
        style: {
          height: `${M * f(l.value, !1).length}px`,
          top: `${M}px`,
          left: `${z * (g - 1) + 9}px`
        }
      }, null), h("div", j({
        class: "s-tree-node--content"
      }, I), [b ? h("span", {
        style: {
          display: "inline-block",
          width: "25px"
        }
      }, null) : (k = o.icon) == null ? void 0 : k.call(o), i.value && _(h("input", {
        type: "checkbox",
        "onUpdate:modelValue": (A) => m = A,
        style: {
          marginRight: "8px"
        },
        onClick: () => s(l.value)
      }, null), [[F, m]]), (H = o.content) == null ? void 0 : H.call(o), r.value && p.value && h("span", {
        class: "inline-flex ml-1"
      }, [h("svg", {
        onClick: () => {
          a(l.value, {
            label: "新节点"
          });
        },
        viewBox: "0 0 1024 1024",
        width: "14",
        height: "14",
        class: "cursor-pointer"
      }, [h("path", {
        d: "M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z"
      }, null)]), h("svg", {
        onClick: () => {
          x(l.value);
        },
        viewBox: "0 0 1024 1024",
        width: "14",
        height: "14",
        class: "cursor-pointer ml-1"
      }, [h("path", {
        d: "M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"
      }, null)])]), e.value && l.value.loading && ((E = o.loading) == null ? void 0 : E.call(o))])]);
    };
  }
}), oe = (n, {
  emit: o
}) => h("svg", {
  onClick: () => o("onClick"),
  style: {
    width: "18px",
    height: "18px",
    verticalAlign: "text-top",
    display: "inline-block",
    transform: n.expanded ? "rotate(90deg)" : ""
  },
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [h("path", {
  fill: "currentColor",
  d: "M384 192v640l384-320.064z"
}, null)]);
const re = {
  data: {
    type: Array,
    default: []
  },
  itemHeight: {
    type: Number,
    default: 24
  },
  component: {
    type: String,
    default: "div"
  }
};
const ie = D({
  name: "GVirtualList",
  props: re,
  setup(n, {
    slots: o
  }) {
    const {
      data: v,
      itemHeight: i,
      component: l
    } = P(n), r = C(0), e = C(0), t = C(), s = C(0), f = w(() => Math.ceil(r.value / i.value)), a = w(() => {
      const N = Math.min(e.value + f.value, v.value.length);
      return v.value.slice(e.value, N);
    });
    q(() => {
      var N;
      r.value = (N = t.value) == null ? void 0 : N.clientHeight;
    });
    const x = (N) => {
      const {
        scrollTop: y
      } = N.target;
      e.value = Math.floor(y / i.value), s.value = y - y % i.value;
    };
    return () => h(l.value, {
      id: "s-virtual-list-id",
      class: "s-virtual-list--container",
      onScroll: x,
      ref: t
    }, {
      default: () => [h("div", {
        class: "s-virtual-list--blank",
        style: {
          height: `${v.value.length * i.value}px`
        }
      }, null), h("div", {
        class: "s-virtual-list",
        style: {
          transform: `translate3d(0,${s.value}px,0)`
        }
      }, [a.value.map((N, y) => {
        var O;
        return (O = o.default) == null ? void 0 : O.call(o, {
          item: N,
          index: y
        });
      })])]
    });
  }
}), B = D({
  name: "GTree",
  props: $,
  emits: ["lazy-load"],
  setup(n, o) {
    const {
      data: v,
      height: i,
      itemHeight: l
    } = P(n), {
      slots: r
    } = o, {
      clickExpandedNode: e,
      getExpandedNodeList: t,
      checkTreeNode: s,
      getChildNodes: f,
      appendTreeNode: a,
      removeTreeNode: x,
      onDragStart: N,
      onDragOver: y,
      onDragLeave: O,
      onDragEnd: d,
      onDrop: u
    } = ne(v, n, o);
    return K("TREE_HOOKS", {
      clickExpandedNode: e,
      checkTreeNode: s,
      getChildNodes: f,
      appendTreeNode: a,
      removeTreeNode: x,
      onDragStart: N,
      onDragOver: y,
      onDragLeave: O,
      onDragEnd: d,
      onDrop: u
    }), () => {
      const p = (c) => h(le, j(n, {
        node: c
      }), {
        content: () => r.content ? r.content(c) : c.label,
        icon: () => r.icon ? r.icon({
          node: c,
          clickExpandedNode: e
        }) : h(oe, {
          expanded: !!c.expanded,
          onClick: () => e(c)
        }, null),
        loading: () => r.loading ? r.loading({
          node: c
        }) : h("span", {
          class: "ml-1"
        }, [Y("loading...")])
      });
      return h("div", {
        class: "s-tree"
      }, [i != null && i.value ? (
        // 虚拟列表
        h("div", {
          style: {
            height: `${i.value}px`
          }
        }, [h(ie, {
          data: t == null ? void 0 : t.value,
          itemHeight: l.value
        }, {
          default: ({
            item: c
          }) => p(c)
        })])
      ) : t == null ? void 0 : t.value.map((c) => p(c))]);
    };
  }
}), de = {
  install(n) {
    n.component(B.name, B);
  }
};
export {
  B as Tree,
  de as default
};
