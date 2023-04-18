import { defineComponent as ft, toRefs as ut, ref as tt, watch as Lt, nextTick as Tt, onUnmounted as Et, createVNode as k, Fragment as dt, mergeProps as pt } from "vue";
const Pt = {
  modelValue: {
    type: Boolean,
    default: !1
  },
  hostDom: {
    type: Object,
    default: null
  },
  title: {
    type: String,
    default: ""
  },
  showArrow: {
    type: Boolean,
    default: !0
  },
  placement: {
    type: String,
    default: "bottom"
  }
};
function D(t) {
  return t.split("-")[1];
}
function Q(t) {
  return t === "y" ? "height" : "width";
}
function M(t) {
  return t.split("-")[0];
}
function I(t) {
  return ["top", "bottom"].includes(M(t)) ? "x" : "y";
}
function et(t, e, o) {
  let { reference: n, floating: a } = t;
  const r = n.x + n.width / 2 - a.width / 2, i = n.y + n.height / 2 - a.height / 2, l = I(e), f = Q(l), c = n[f] / 2 - a[f] / 2, u = l === "x";
  let s;
  switch (M(e)) {
    case "top":
      s = { x: r, y: n.y - a.height };
      break;
    case "bottom":
      s = { x: r, y: n.y + n.height };
      break;
    case "right":
      s = { x: n.x + n.width, y: i };
      break;
    case "left":
      s = { x: n.x - a.width, y: i };
      break;
    default:
      s = { x: n.x, y: n.y };
  }
  switch (D(e)) {
    case "start":
      s[l] -= c * (o && u ? -1 : 1);
      break;
    case "end":
      s[l] += c * (o && u ? -1 : 1);
  }
  return s;
}
const At = async (t, e, o) => {
  const { placement: n = "bottom", strategy: a = "absolute", middleware: r = [], platform: i } = o, l = r.filter(Boolean), f = await (i.isRTL == null ? void 0 : i.isRTL(e));
  let c = await i.getElementRects({ reference: t, floating: e, strategy: a }), { x: u, y: s } = et(c, n, f), d = n, p = {}, w = 0;
  for (let m = 0; m < l.length; m++) {
    const { name: h, fn: y } = l[m], { x: g, y: x, data: b, reset: R } = await y({ x: u, y: s, initialPlacement: n, placement: d, strategy: a, middlewareData: p, rects: c, platform: i, elements: { reference: t, floating: e } });
    u = g ?? u, s = x ?? s, p = { ...p, [h]: { ...p[h], ...b } }, R && w <= 50 && (w++, typeof R == "object" && (R.placement && (d = R.placement), R.rects && (c = R.rects === !0 ? await i.getElementRects({ reference: t, floating: e, strategy: a }) : R.rects), { x: u, y: s } = et(c, d, f)), m = -1);
  }
  return { x: u, y: s, placement: d, strategy: a, middlewareData: p };
};
function mt(t) {
  return typeof t != "number" ? function(e) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...e };
  }(t) : { top: t, right: t, bottom: t, left: t };
}
function Y(t) {
  return { ...t, top: t.y, left: t.x, right: t.x + t.width, bottom: t.y + t.height };
}
async function Ot(t, e) {
  var o;
  e === void 0 && (e = {});
  const { x: n, y: a, platform: r, rects: i, elements: l, strategy: f } = t, { boundary: c = "clippingAncestors", rootBoundary: u = "viewport", elementContext: s = "floating", altBoundary: d = !1, padding: p = 0 } = e, w = mt(p), m = l[d ? s === "floating" ? "reference" : "floating" : s], h = Y(await r.getClippingRect({ element: (o = await (r.isElement == null ? void 0 : r.isElement(m))) == null || o ? m : m.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(l.floating)), boundary: c, rootBoundary: u, strategy: f })), y = s === "floating" ? { ...i.floating, x: n, y: a } : i.reference, g = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(l.floating)), x = await (r.isElement == null ? void 0 : r.isElement(g)) && await (r.getScale == null ? void 0 : r.getScale(g)) || { x: 1, y: 1 }, b = Y(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: y, offsetParent: g, strategy: f }) : y);
  return { top: (h.top - b.top + w.top) / x.y, bottom: (b.bottom - h.bottom + w.bottom) / x.y, left: (h.left - b.left + w.left) / x.x, right: (b.right - h.right + w.right) / x.x };
}
const Dt = Math.min, $t = Math.max;
function Vt(t, e, o) {
  return $t(t, Dt(e, o));
}
const Bt = (t) => ({ name: "arrow", options: t, async fn(e) {
  const { element: o, padding: n = 0 } = t || {}, { x: a, y: r, placement: i, rects: l, platform: f, elements: c } = e;
  if (o == null)
    return {};
  const u = mt(n), s = { x: a, y: r }, d = I(i), p = Q(d), w = await f.getDimensions(o), m = d === "y", h = m ? "top" : "left", y = m ? "bottom" : "right", g = m ? "clientHeight" : "clientWidth", x = l.reference[p] + l.reference[d] - s[d] - l.floating[p], b = s[d] - l.reference[d], R = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(o));
  let A = R ? R[g] : 0;
  A && await (f.isElement == null ? void 0 : f.isElement(R)) || (A = c.floating[g] || l.floating[p]);
  const z = x / 2 - b / 2, S = u[h], H = A - w[p] - u[y], v = A / 2 - w[p] / 2 + z, E = Vt(S, v, H), C = D(i) != null && v != E && l.reference[p] / 2 - (v < S ? u[h] : u[y]) - w[p] / 2 < 0;
  return { [d]: s[d] - (C ? v < S ? S - v : H - v : 0), data: { [d]: E, centerOffset: v - E } };
} }), St = ["top", "right", "bottom", "left"], nt = St.reduce((t, e) => t.concat(e, e + "-start", e + "-end"), []), Ct = { left: "right", right: "left", bottom: "top", top: "bottom" };
function ot(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Ct[e]);
}
function kt(t, e, o) {
  o === void 0 && (o = !1);
  const n = D(t), a = I(t), r = Q(a);
  let i = a === "x" ? n === (o ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (i = ot(i)), { main: i, cross: ot(i) };
}
const Wt = { start: "end", end: "start" };
function Ht(t) {
  return t.replace(/start|end/g, (e) => Wt[e]);
}
const Ft = function(t) {
  return t === void 0 && (t = {}), { name: "autoPlacement", options: t, async fn(e) {
    var o, n, a;
    const { rects: r, middlewareData: i, placement: l, platform: f, elements: c } = e, { crossAxis: u = !1, alignment: s, allowedPlacements: d = nt, autoAlignment: p = !0, ...w } = t, m = s !== void 0 || d === nt ? function(v, E, C) {
      return (v ? [...C.filter((T) => D(T) === v), ...C.filter((T) => D(T) !== v)] : C.filter((T) => M(T) === T)).filter((T) => !v || D(T) === v || !!E && Ht(T) !== T);
    }(s || null, p, d) : d, h = await Ot(e, w), y = ((o = i.autoPlacement) == null ? void 0 : o.index) || 0, g = m[y];
    if (g == null)
      return {};
    const { main: x, cross: b } = kt(g, r, await (f.isRTL == null ? void 0 : f.isRTL(c.floating)));
    if (l !== g)
      return { reset: { placement: m[0] } };
    const R = [h[M(g)], h[x], h[b]], A = [...((n = i.autoPlacement) == null ? void 0 : n.overflows) || [], { placement: g, overflows: R }], z = m[y + 1];
    if (z)
      return { data: { index: y + 1, overflows: A }, reset: { placement: z } };
    const S = A.map((v) => {
      const E = D(v.placement);
      return [v.placement, E && u ? v.overflows.slice(0, 2).reduce((C, T) => C + T, 0) : v.overflows[0], v.overflows];
    }).sort((v, E) => v[1] - E[1]), H = ((a = S.filter((v) => v[2].slice(0, D(v[0]) ? 2 : 3).every((E) => E <= 0))[0]) == null ? void 0 : a[0]) || S[0][0];
    return H !== l ? { data: { index: y + 1, overflows: A }, reset: { placement: H } } : {};
  } };
}, Mt = function(t) {
  return t === void 0 && (t = 0), { name: "offset", options: t, async fn(e) {
    const { x: o, y: n } = e, a = await async function(r, i) {
      const { placement: l, platform: f, elements: c } = r, u = await (f.isRTL == null ? void 0 : f.isRTL(c.floating)), s = M(l), d = D(l), p = I(l) === "x", w = ["left", "top"].includes(s) ? -1 : 1, m = u && p ? -1 : 1, h = typeof i == "function" ? i(r) : i;
      let { mainAxis: y, crossAxis: g, alignmentAxis: x } = typeof h == "number" ? { mainAxis: h, crossAxis: 0, alignmentAxis: null } : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...h };
      return d && typeof x == "number" && (g = d === "end" ? -1 * x : x), p ? { x: g * m, y: y * w } : { x: y * w, y: g * m };
    }(e, t);
    return { x: o + a.x, y: n + a.y, data: a };
  } };
};
function L(t) {
  var e;
  return ((e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function O(t) {
  return L(t).getComputedStyle(t);
}
function gt(t) {
  return t instanceof L(t).Node;
}
function B(t) {
  return gt(t) ? (t.nodeName || "").toLowerCase() : "";
}
let X;
function ht() {
  if (X)
    return X;
  const t = navigator.userAgentData;
  return t && Array.isArray(t.brands) ? (X = t.brands.map((e) => e.brand + "/" + e.version).join(" "), X) : navigator.userAgent;
}
function P(t) {
  return t instanceof L(t).HTMLElement;
}
function $(t) {
  return t instanceof L(t).Element;
}
function it(t) {
  return typeof ShadowRoot > "u" ? !1 : t instanceof L(t).ShadowRoot || t instanceof ShadowRoot;
}
function _(t) {
  const { overflow: e, overflowX: o, overflowY: n, display: a } = O(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + n + o) && !["inline", "contents"].includes(a);
}
function jt(t) {
  return ["table", "td", "th"].includes(B(t));
}
function q(t) {
  const e = /firefox/i.test(ht()), o = O(t), n = o.backdropFilter || o.WebkitBackdropFilter;
  return o.transform !== "none" || o.perspective !== "none" || !!n && n !== "none" || e && o.willChange === "filter" || e && !!o.filter && o.filter !== "none" || ["transform", "perspective"].some((a) => o.willChange.includes(a)) || ["paint", "layout", "strict", "content"].some((a) => {
    const r = o.contain;
    return r != null && r.includes(a);
  });
}
function J() {
  return /^((?!chrome|android).)*safari/i.test(ht());
}
function Z(t) {
  return ["html", "body", "#document"].includes(B(t));
}
const rt = Math.min, F = Math.max, G = Math.round;
function yt(t) {
  const e = O(t);
  let o = parseFloat(e.width), n = parseFloat(e.height);
  const a = P(t), r = a ? t.offsetWidth : o, i = a ? t.offsetHeight : n, l = G(o) !== r || G(n) !== i;
  return l && (o = r, n = i), { width: o, height: n, fallback: l };
}
function wt(t) {
  return $(t) ? t : t.contextElement;
}
const vt = { x: 1, y: 1 };
function W(t) {
  const e = wt(t);
  if (!P(e))
    return vt;
  const o = e.getBoundingClientRect(), { width: n, height: a, fallback: r } = yt(e);
  let i = (r ? G(o.width) : o.width) / n, l = (r ? G(o.height) : o.height) / a;
  return i && Number.isFinite(i) || (i = 1), l && Number.isFinite(l) || (l = 1), { x: i, y: l };
}
function j(t, e, o, n) {
  var a, r;
  e === void 0 && (e = !1), o === void 0 && (o = !1);
  const i = t.getBoundingClientRect(), l = wt(t);
  let f = vt;
  e && (n ? $(n) && (f = W(n)) : f = W(t));
  const c = l ? L(l) : window, u = J() && o;
  let s = (i.left + (u && ((a = c.visualViewport) == null ? void 0 : a.offsetLeft) || 0)) / f.x, d = (i.top + (u && ((r = c.visualViewport) == null ? void 0 : r.offsetTop) || 0)) / f.y, p = i.width / f.x, w = i.height / f.y;
  if (l) {
    const m = L(l), h = n && $(n) ? L(n) : n;
    let y = m.frameElement;
    for (; y && n && h !== m; ) {
      const g = W(y), x = y.getBoundingClientRect(), b = getComputedStyle(y);
      x.x += (y.clientLeft + parseFloat(b.paddingLeft)) * g.x, x.y += (y.clientTop + parseFloat(b.paddingTop)) * g.y, s *= g.x, d *= g.y, p *= g.x, w *= g.y, s += x.x, d += x.y, y = L(y).frameElement;
    }
  }
  return Y({ width: p, height: w, x: s, y: d });
}
function V(t) {
  return ((gt(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function U(t) {
  return $(t) ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop } : { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
}
function xt(t) {
  return j(V(t)).left + U(t).scrollLeft;
}
function N(t) {
  if (B(t) === "html")
    return t;
  const e = t.assignedSlot || t.parentNode || it(t) && t.host || V(t);
  return it(e) ? e.host : e;
}
function bt(t) {
  const e = N(t);
  return Z(e) ? e.ownerDocument.body : P(e) && _(e) ? e : bt(e);
}
function Rt(t, e) {
  var o;
  e === void 0 && (e = []);
  const n = bt(t), a = n === ((o = t.ownerDocument) == null ? void 0 : o.body), r = L(n);
  return a ? e.concat(r, r.visualViewport || [], _(n) ? n : []) : e.concat(n, Rt(n));
}
function lt(t, e, o) {
  let n;
  if (e === "viewport")
    n = function(i, l) {
      const f = L(i), c = V(i), u = f.visualViewport;
      let s = c.clientWidth, d = c.clientHeight, p = 0, w = 0;
      if (u) {
        s = u.width, d = u.height;
        const m = J();
        (!m || m && l === "fixed") && (p = u.offsetLeft, w = u.offsetTop);
      }
      return { width: s, height: d, x: p, y: w };
    }(t, o);
  else if (e === "document")
    n = function(i) {
      const l = V(i), f = U(i), c = i.ownerDocument.body, u = F(l.scrollWidth, l.clientWidth, c.scrollWidth, c.clientWidth), s = F(l.scrollHeight, l.clientHeight, c.scrollHeight, c.clientHeight);
      let d = -f.scrollLeft + xt(i);
      const p = -f.scrollTop;
      return O(c).direction === "rtl" && (d += F(l.clientWidth, c.clientWidth) - u), { width: u, height: s, x: d, y: p };
    }(V(t));
  else if ($(e))
    n = function(i, l) {
      const f = j(i, !0, l === "fixed"), c = f.top + i.clientTop, u = f.left + i.clientLeft, s = P(i) ? W(i) : { x: 1, y: 1 };
      return { width: i.clientWidth * s.x, height: i.clientHeight * s.y, x: u * s.x, y: c * s.y };
    }(e, o);
  else {
    const i = { ...e };
    if (J()) {
      var a, r;
      const l = L(t);
      i.x -= ((a = l.visualViewport) == null ? void 0 : a.offsetLeft) || 0, i.y -= ((r = l.visualViewport) == null ? void 0 : r.offsetTop) || 0;
    }
    n = i;
  }
  return Y(n);
}
function at(t, e) {
  return P(t) && O(t).position !== "fixed" ? e ? e(t) : t.offsetParent : null;
}
function st(t, e) {
  const o = L(t);
  if (!P(t))
    return o;
  let n = at(t, e);
  for (; n && jt(n) && O(n).position === "static"; )
    n = at(n, e);
  return n && (B(n) === "html" || B(n) === "body" && O(n).position === "static" && !q(n)) ? o : n || function(a) {
    let r = N(a);
    for (; P(r) && !Z(r); ) {
      if (q(r))
        return r;
      r = N(r);
    }
    return null;
  }(t) || o;
}
function Nt(t, e, o) {
  const n = P(e), a = V(e), r = j(t, !0, o === "fixed", e);
  let i = { scrollLeft: 0, scrollTop: 0 };
  const l = { x: 0, y: 0 };
  if (n || !n && o !== "fixed")
    if ((B(e) !== "body" || _(a)) && (i = U(e)), P(e)) {
      const f = j(e, !0);
      l.x = f.x + e.clientLeft, l.y = f.y + e.clientTop;
    } else
      a && (l.x = xt(a));
  return { x: r.left + i.scrollLeft - l.x, y: r.top + i.scrollTop - l.y, width: r.width, height: r.height };
}
const zt = { getClippingRect: function(t) {
  let { element: e, boundary: o, rootBoundary: n, strategy: a } = t;
  const r = o === "clippingAncestors" ? function(c, u) {
    const s = u.get(c);
    if (s)
      return s;
    let d = Rt(c).filter((h) => $(h) && B(h) !== "body"), p = null;
    const w = O(c).position === "fixed";
    let m = w ? N(c) : c;
    for (; $(m) && !Z(m); ) {
      const h = O(m), y = q(m);
      h.position === "fixed" ? p = null : (w ? y || p : y || h.position !== "static" || !p || !["absolute", "fixed"].includes(p.position)) ? p = h : d = d.filter((g) => g !== m), m = N(m);
    }
    return u.set(c, d), d;
  }(e, this._c) : [].concat(o), i = [...r, n], l = i[0], f = i.reduce((c, u) => {
    const s = lt(e, u, a);
    return c.top = F(s.top, c.top), c.right = rt(s.right, c.right), c.bottom = rt(s.bottom, c.bottom), c.left = F(s.left, c.left), c;
  }, lt(e, l, a));
  return { width: f.right - f.left, height: f.bottom - f.top, x: f.left, y: f.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t) {
  let { rect: e, offsetParent: o, strategy: n } = t;
  const a = P(o), r = V(o);
  if (o === r)
    return e;
  let i = { scrollLeft: 0, scrollTop: 0 }, l = { x: 1, y: 1 };
  const f = { x: 0, y: 0 };
  if ((a || !a && n !== "fixed") && ((B(o) !== "body" || _(r)) && (i = U(o)), P(o))) {
    const c = j(o);
    l = W(o), f.x = c.x + o.clientLeft, f.y = c.y + o.clientTop;
  }
  return { width: e.width * l.x, height: e.height * l.y, x: e.x * l.x - i.scrollLeft * l.x + f.x, y: e.y * l.y - i.scrollTop * l.y + f.y };
}, isElement: $, getDimensions: function(t) {
  return yt(t);
}, getOffsetParent: st, getDocumentElement: V, getScale: W, async getElementRects(t) {
  let { reference: e, floating: o, strategy: n } = t;
  const a = this.getOffsetParent || st, r = this.getDimensions;
  return { reference: Nt(e, await a(o), n), floating: { x: 0, y: 0, ...await r(o) } };
}, getClientRects: (t) => Array.from(t.getClientRects()), isRTL: (t) => O(t).direction === "rtl" }, Xt = (t, e, o) => {
  const n = /* @__PURE__ */ new Map(), a = { platform: zt, ...o }, r = { ...a.platform, _c: n };
  return At(t, e, { ...a, platform: r });
}, Yt = {
  modelValue: {
    type: Boolean,
    default: !1
  },
  hostDom: {
    type: Object,
    default: null
  },
  showArrow: {
    type: Boolean,
    default: !0
  },
  placement: {
    type: String,
    default: "bottom"
  }
}, K = ft({
  name: "GBasePopOver",
  props: Yt,
  emits: ["update:modalValue"],
  setup(t, {
    slots: e,
    attrs: o
  }) {
    const {
      modelValue: n,
      hostDom: a,
      showArrow: r,
      placement: i
    } = ut(t), l = tt(), f = tt(), c = () => {
      const s = [];
      r.value && (s.push(Mt(8)), s.push(Bt({
        element: l.value
      }))), i.value || s.push(Ft()), Xt(a.value, f.value, {
        middleware: s,
        placement: i.value || "bottom"
      }).then(({
        x: d,
        y: p,
        middlewareData: w,
        placement: m
      }) => {
        if (Object.assign(f.value.style, {
          left: d + "px",
          top: p + "px"
        }), r.value) {
          const {
            x: h,
            y
          } = w.arrow, g = m.split("-")[0], x = {
            // 反方向，气泡卡片在宿主bottom位置，箭头就应该是指向top
            top: "bottom",
            bottom: "top",
            left: "right",
            right: "left"
          }[g], b = ["top", "right", "bottom", "left"], R = (b.indexOf(g) + 4 - 1) % 4, A = b[R];
          Object.assign(l.value.style, {
            left: h + "px",
            top: y + "px",
            [x]: "-4px",
            [`border-${g}-color`]: "transparent",
            [`border-${A}-color`]: "transparent"
          });
        }
      });
    }, u = new MutationObserver((s) => {
      c();
    });
    return Lt(n, (s) => {
      s ? (Tt(c), a.value && u.observe(a.value, {
        attributes: !0
      }), window.addEventListener("resize", c), window.addEventListener("scroll", c)) : (u.disconnect(), window.removeEventListener("resize", c), window.removeEventListener("scroll", c));
    }, {
      immediate: !0
    }), Et(() => {
      u.disconnect(), window.removeEventListener("resize", c), window.removeEventListener("scroll", c);
    }), () => {
      var s;
      return k(dt, null, [n.value && k("div", pt({
        ref: f,
        class: "s-base-popover"
      }, o), [r.value && k("div", {
        class: "s-base-popover--arrow",
        ref: l
      }, null), (s = e.default) == null ? void 0 : s.call(e)])]);
    };
  }
}), ct = ft({
  name: "GPopOver",
  props: Pt,
  emits: ["update:modalValue"],
  setup(t, {
    slots: e
  }) {
    const {
      modelValue: o,
      title: n
    } = ut(t);
    return () => k(dt, null, [o.value && k(K, pt({
      class: "s-popover"
    }, t), {
      default: () => {
        var a;
        return [k("h4", {
          class: "s-popover-title"
        }, [n.value]), (a = e.default) == null ? void 0 : a.call(e)];
      }
    })]);
  }
}), It = {
  install(t) {
    t.component(ct.name, ct), t.component(K.name, K);
  }
};
export {
  K as BasePopover,
  ct as Popover,
  It as default
};
