import { defineComponent as ae, toRefs as de, computed as U, provide as B, createVNode as R, inject as C, ref as H, onMounted as ce, onUnmounted as le } from "vue";
const me = {
  model: {
    type: Object,
    required: !0
  },
  layout: {
    type: String,
    default: "vertical"
  },
  labelSize: {
    type: String,
    default: "md"
  },
  labelAlign: {
    type: String,
    default: "start"
  },
  rules: {
    type: Object
  }
}, fe = Symbol("formContextToken"), Q = ae({
  name: "GForm",
  props: me,
  emits: ["form-submit"],
  setup(n, {
    slots: e,
    emit: r,
    expose: t
  }) {
    const {
      model: i
    } = de(n), f = U(() => ({
      layout: n.layout,
      labelSize: n.labelSize,
      labelAlign: n.labelAlign
    }));
    B("LabelData", f);
    const a = /* @__PURE__ */ new Set(), s = (m) => a.add(m), u = (m) => a.delete(m);
    B(fe, {
      model: n.model,
      rules: n.rules,
      addItem: s,
      deleteItem: u
    });
    const g = (m) => {
      m.preventDefault(), r("form-submit");
    };
    return t({
      validateFormData: (m) => {
        const v = [];
        a.forEach((w) => v.push(w.validate())), Promise.all(v).then(() => m(!0)).catch(() => m(!1));
      }
    }), () => {
      var m;
      return R("form", {
        class: "s-form",
        onSubmit: g
      }, [R("div", null, [i.value.name]), R("div", null, [(m = e.default) == null ? void 0 : m.call(e)])]);
    };
  }
}), pe = {
  label: {
    type: String,
    default: ""
  },
  field: {
    type: String
  }
};
function S() {
  return S = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var t in r)
        Object.prototype.hasOwnProperty.call(r, t) && (n[t] = r[t]);
    }
    return n;
  }, S.apply(this, arguments);
}
function ye(n, e) {
  n.prototype = Object.create(e.prototype), n.prototype.constructor = n, I(n, e);
}
function G(n) {
  return G = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, G(n);
}
function I(n, e) {
  return I = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, i) {
    return t.__proto__ = i, t;
  }, I(n, e);
}
function ge() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function z(n, e, r) {
  return ge() ? z = Reflect.construct.bind() : z = function(i, f, a) {
    var s = [null];
    s.push.apply(s, f);
    var u = Function.bind.apply(i, s), g = new u();
    return a && I(g, a.prototype), g;
  }, z.apply(null, arguments);
}
function ve(n) {
  return Function.toString.call(n).indexOf("[native code]") !== -1;
}
function J(n) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return J = function(t) {
    if (t === null || !ve(t))
      return t;
    if (typeof t != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(t))
        return e.get(t);
      e.set(t, i);
    }
    function i() {
      return z(t, arguments, G(this).constructor);
    }
    return i.prototype = Object.create(t.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), I(i, t);
  }, J(n);
}
var he = /%[sdj%]/g, se = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (se = function(e, r) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && r.every(function(t) {
    return typeof t == "string";
  }) && console.warn(e, r);
});
function W(n) {
  if (!n || !n.length)
    return null;
  var e = {};
  return n.forEach(function(r) {
    var t = r.field;
    e[t] = e[t] || [], e[t].push(r);
  }), e;
}
function x(n) {
  for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), t = 1; t < e; t++)
    r[t - 1] = arguments[t];
  var i = 0, f = r.length;
  if (typeof n == "function")
    return n.apply(null, r);
  if (typeof n == "string") {
    var a = n.replace(he, function(s) {
      if (s === "%%")
        return "%";
      if (i >= f)
        return s;
      switch (s) {
        case "%s":
          return String(r[i++]);
        case "%d":
          return Number(r[i++]);
        case "%j":
          try {
            return JSON.stringify(r[i++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return s;
      }
    });
    return a;
  }
  return n;
}
function be(n) {
  return n === "string" || n === "url" || n === "hex" || n === "email" || n === "date" || n === "pattern";
}
function b(n, e) {
  return !!(n == null || e === "array" && Array.isArray(n) && !n.length || be(e) && typeof n == "string" && !n);
}
function we(n, e, r) {
  var t = [], i = 0, f = n.length;
  function a(s) {
    t.push.apply(t, s || []), i++, i === f && r(t);
  }
  n.forEach(function(s) {
    e(s, a);
  });
}
function k(n, e, r) {
  var t = 0, i = n.length;
  function f(a) {
    if (a && a.length) {
      r(a);
      return;
    }
    var s = t;
    t = t + 1, s < i ? e(n[s], f) : r([]);
  }
  f([]);
}
function Fe(n) {
  var e = [];
  return Object.keys(n).forEach(function(r) {
    e.push.apply(e, n[r] || []);
  }), e;
}
var ee = /* @__PURE__ */ function(n) {
  ye(e, n);
  function e(r, t) {
    var i;
    return i = n.call(this, "Async Validation Error") || this, i.errors = r, i.fields = t, i;
  }
  return e;
}(/* @__PURE__ */ J(Error));
function qe(n, e, r, t, i) {
  if (e.first) {
    var f = new Promise(function(v, w) {
      var O = function(o) {
        return t(o), o.length ? w(new ee(o, W(o))) : v(i);
      }, d = Fe(n);
      k(d, r, O);
    });
    return f.catch(function(v) {
      return v;
    }), f;
  }
  var a = e.firstFields === !0 ? Object.keys(n) : e.firstFields || [], s = Object.keys(n), u = s.length, g = 0, p = [], m = new Promise(function(v, w) {
    var O = function(h) {
      if (p.push.apply(p, h), g++, g === u)
        return t(p), p.length ? w(new ee(p, W(p))) : v(i);
    };
    s.length || (t(p), v(i)), s.forEach(function(d) {
      var h = n[d];
      a.indexOf(d) !== -1 ? k(h, r, O) : we(h, r, O);
    });
  });
  return m.catch(function(v) {
    return v;
  }), m;
}
function xe(n) {
  return !!(n && n.message !== void 0);
}
function Oe(n, e) {
  for (var r = n, t = 0; t < e.length; t++) {
    if (r == null)
      return r;
    r = r[e[t]];
  }
  return r;
}
function re(n, e) {
  return function(r) {
    var t;
    return n.fullFields ? t = Oe(e, n.fullFields) : t = e[r.field || n.fullField], xe(r) ? (r.field = r.field || n.fullField, r.fieldValue = t, r) : {
      message: typeof r == "function" ? r() : r,
      fieldValue: t,
      field: r.field || n.fullField
    };
  };
}
function te(n, e) {
  if (e) {
    for (var r in e)
      if (e.hasOwnProperty(r)) {
        var t = e[r];
        typeof t == "object" && typeof n[r] == "object" ? n[r] = S({}, n[r], t) : n[r] = t;
      }
  }
  return n;
}
var oe = function(e, r, t, i, f, a) {
  e.required && (!t.hasOwnProperty(e.field) || b(r, a || e.type)) && i.push(x(f.messages.required, e.fullField));
}, Ee = function(e, r, t, i, f) {
  (/^\s+$/.test(r) || r === "") && i.push(x(f.messages.whitespace, e.fullField));
}, $, Ae = function() {
  if ($)
    return $;
  var n = "[a-fA-F\\d:]", e = function(y) {
    return y && y.includeBoundaries ? "(?:(?<=\\s|^)(?=" + n + ")|(?<=" + n + ")(?=\\s|$))" : "";
  }, r = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", t = "[a-fA-F\\d]{1,4}", i = (`
(?:
(?:` + t + ":){7}(?:" + t + `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` + t + ":){6}(?:" + r + "|:" + t + `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` + t + ":){5}(?::" + r + "|(?::" + t + `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` + t + ":){4}(?:(?::" + t + "){0,1}:" + r + "|(?::" + t + `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` + t + ":){3}(?:(?::" + t + "){0,2}:" + r + "|(?::" + t + `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` + t + ":){2}(?:(?::" + t + "){0,3}:" + r + "|(?::" + t + `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` + t + ":){1}(?:(?::" + t + "){0,4}:" + r + "|(?::" + t + `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` + t + "){0,5}:" + r + "|(?::" + t + `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), f = new RegExp("(?:^" + r + "$)|(?:^" + i + "$)"), a = new RegExp("^" + r + "$"), s = new RegExp("^" + i + "$"), u = function(y) {
    return y && y.exact ? f : new RegExp("(?:" + e(y) + r + e(y) + ")|(?:" + e(y) + i + e(y) + ")", "g");
  };
  u.v4 = function(l) {
    return l && l.exact ? a : new RegExp("" + e(l) + r + e(l), "g");
  }, u.v6 = function(l) {
    return l && l.exact ? s : new RegExp("" + e(l) + i + e(l), "g");
  };
  var g = "(?:(?:[a-z]+:)?//)", p = "(?:\\S+(?::\\S*)?@)?", m = u.v4().source, v = u.v6().source, w = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", O = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", d = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", h = "(?::\\d{2,5})?", o = '(?:[/?#][^\\s"]*)?', A = "(?:" + g + "|www\\.)" + p + "(?:localhost|" + m + "|" + v + "|" + w + O + d + ")" + h + o;
  return $ = new RegExp("(?:^" + A + "$)", "i"), $;
}, ne = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, V = {
  integer: function(e) {
    return V.number(e) && parseInt(e, 10) === e;
  },
  float: function(e) {
    return V.number(e) && !V.integer(e);
  },
  array: function(e) {
    return Array.isArray(e);
  },
  regexp: function(e) {
    if (e instanceof RegExp)
      return !0;
    try {
      return !!new RegExp(e);
    } catch {
      return !1;
    }
  },
  date: function(e) {
    return typeof e.getTime == "function" && typeof e.getMonth == "function" && typeof e.getYear == "function" && !isNaN(e.getTime());
  },
  number: function(e) {
    return isNaN(e) ? !1 : typeof e == "number";
  },
  object: function(e) {
    return typeof e == "object" && !V.array(e);
  },
  method: function(e) {
    return typeof e == "function";
  },
  email: function(e) {
    return typeof e == "string" && e.length <= 320 && !!e.match(ne.email);
  },
  url: function(e) {
    return typeof e == "string" && e.length <= 2048 && !!e.match(Ae());
  },
  hex: function(e) {
    return typeof e == "string" && !!e.match(ne.hex);
  }
}, Pe = function(e, r, t, i, f) {
  if (e.required && r === void 0) {
    oe(e, r, t, i, f);
    return;
  }
  var a = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], s = e.type;
  a.indexOf(s) > -1 ? V[s](r) || i.push(x(f.messages.types[s], e.fullField, e.type)) : s && typeof r !== e.type && i.push(x(f.messages.types[s], e.fullField, e.type));
}, je = function(e, r, t, i, f) {
  var a = typeof e.len == "number", s = typeof e.min == "number", u = typeof e.max == "number", g = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, p = r, m = null, v = typeof r == "number", w = typeof r == "string", O = Array.isArray(r);
  if (v ? m = "number" : w ? m = "string" : O && (m = "array"), !m)
    return !1;
  O && (p = r.length), w && (p = r.replace(g, "_").length), a ? p !== e.len && i.push(x(f.messages[m].len, e.fullField, e.len)) : s && !u && p < e.min ? i.push(x(f.messages[m].min, e.fullField, e.min)) : u && !s && p > e.max ? i.push(x(f.messages[m].max, e.fullField, e.max)) : s && u && (p < e.min || p > e.max) && i.push(x(f.messages[m].range, e.fullField, e.min, e.max));
}, N = "enum", _e = function(e, r, t, i, f) {
  e[N] = Array.isArray(e[N]) ? e[N] : [], e[N].indexOf(r) === -1 && i.push(x(f.messages[N], e.fullField, e[N].join(", ")));
}, Re = function(e, r, t, i, f) {
  if (e.pattern) {
    if (e.pattern instanceof RegExp)
      e.pattern.lastIndex = 0, e.pattern.test(r) || i.push(x(f.messages.pattern.mismatch, e.fullField, r, e.pattern));
    else if (typeof e.pattern == "string") {
      var a = new RegExp(e.pattern);
      a.test(r) || i.push(x(f.messages.pattern.mismatch, e.fullField, r, e.pattern));
    }
  }
}, c = {
  required: oe,
  whitespace: Ee,
  type: Pe,
  range: je,
  enum: _e,
  pattern: Re
}, Se = function(e, r, t, i, f) {
  var a = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r, "string") && !e.required)
      return t();
    c.required(e, r, i, a, f, "string"), b(r, "string") || (c.type(e, r, i, a, f), c.range(e, r, i, a, f), c.pattern(e, r, i, a, f), e.whitespace === !0 && c.whitespace(e, r, i, a, f));
  }
  t(a);
}, Ne = function(e, r, t, i, f) {
  var a = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    c.required(e, r, i, a, f), r !== void 0 && c.type(e, r, i, a, f);
  }
  t(a);
}, De = function(e, r, t, i, f) {
  var a = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (r === "" && (r = void 0), b(r) && !e.required)
      return t();
    c.required(e, r, i, a, f), r !== void 0 && (c.type(e, r, i, a, f), c.range(e, r, i, a, f));
  }
  t(a);
}, Ve = function(e, r, t, i, f) {
  var a = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    c.required(e, r, i, a, f), r !== void 0 && c.type(e, r, i, a, f);
  }
  t(a);
}, Te = function(e, r, t, i, f) {
  var a = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    c.required(e, r, i, a, f), b(r) || c.type(e, r, i, a, f);
  }
  t(a);
}, Ie = function(e, r, t, i, f) {
  var a = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    c.required(e, r, i, a, f), r !== void 0 && (c.type(e, r, i, a, f), c.range(e, r, i, a, f));
  }
  t(a);
}, Me = function(e, r, t, i, f) {
  var a = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    c.required(e, r, i, a, f), r !== void 0 && (c.type(e, r, i, a, f), c.range(e, r, i, a, f));
  }
  t(a);
}, $e = function(e, r, t, i, f) {
  var a = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (r == null && !e.required)
      return t();
    c.required(e, r, i, a, f, "array"), r != null && (c.type(e, r, i, a, f), c.range(e, r, i, a, f));
  }
  t(a);
}, ze = function(e, r, t, i, f) {
  var a = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    c.required(e, r, i, a, f), r !== void 0 && c.type(e, r, i, a, f);
  }
  t(a);
}, Le = "enum", Ue = function(e, r, t, i, f) {
  var a = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    c.required(e, r, i, a, f), r !== void 0 && c[Le](e, r, i, a, f);
  }
  t(a);
}, Be = function(e, r, t, i, f) {
  var a = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r, "string") && !e.required)
      return t();
    c.required(e, r, i, a, f), b(r, "string") || c.pattern(e, r, i, a, f);
  }
  t(a);
}, Ge = function(e, r, t, i, f) {
  var a = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r, "date") && !e.required)
      return t();
    if (c.required(e, r, i, a, f), !b(r, "date")) {
      var u;
      r instanceof Date ? u = r : u = new Date(r), c.type(e, u, i, a, f), u && c.range(e, u.getTime(), i, a, f);
    }
  }
  t(a);
}, Je = function(e, r, t, i, f) {
  var a = [], s = Array.isArray(r) ? "array" : typeof r;
  c.required(e, r, i, a, f, s), t(a);
}, L = function(e, r, t, i, f) {
  var a = e.type, s = [], u = e.required || !e.required && i.hasOwnProperty(e.field);
  if (u) {
    if (b(r, a) && !e.required)
      return t();
    c.required(e, r, i, s, f, a), b(r, a) || c.type(e, r, i, s, f);
  }
  t(s);
}, We = function(e, r, t, i, f) {
  var a = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    c.required(e, r, i, a, f);
  }
  t(a);
}, T = {
  string: Se,
  method: Ne,
  number: De,
  boolean: Ve,
  regexp: Te,
  integer: Ie,
  float: Me,
  array: $e,
  object: ze,
  enum: Ue,
  pattern: Be,
  date: Ge,
  url: L,
  hex: L,
  email: L,
  required: Je,
  any: We
};
function Z() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function() {
      var e = JSON.parse(JSON.stringify(this));
      return e.clone = this.clone, e;
    }
  };
}
var Y = Z(), M = /* @__PURE__ */ function() {
  function n(r) {
    this.rules = null, this._messages = Y, this.define(r);
  }
  var e = n.prototype;
  return e.define = function(t) {
    var i = this;
    if (!t)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof t != "object" || Array.isArray(t))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(t).forEach(function(f) {
      var a = t[f];
      i.rules[f] = Array.isArray(a) ? a : [a];
    });
  }, e.messages = function(t) {
    return t && (this._messages = te(Z(), t)), this._messages;
  }, e.validate = function(t, i, f) {
    var a = this;
    i === void 0 && (i = {}), f === void 0 && (f = function() {
    });
    var s = t, u = i, g = f;
    if (typeof u == "function" && (g = u, u = {}), !this.rules || Object.keys(this.rules).length === 0)
      return g && g(null, s), Promise.resolve(s);
    function p(d) {
      var h = [], o = {};
      function A(y) {
        if (Array.isArray(y)) {
          var q;
          h = (q = h).concat.apply(q, y);
        } else
          h.push(y);
      }
      for (var l = 0; l < d.length; l++)
        A(d[l]);
      h.length ? (o = W(h), g(h, o)) : g(null, s);
    }
    if (u.messages) {
      var m = this.messages();
      m === Y && (m = Z()), te(m, u.messages), u.messages = m;
    } else
      u.messages = this.messages();
    var v = {}, w = u.keys || Object.keys(this.rules);
    w.forEach(function(d) {
      var h = a.rules[d], o = s[d];
      h.forEach(function(A) {
        var l = A;
        typeof l.transform == "function" && (s === t && (s = S({}, s)), o = s[d] = l.transform(o)), typeof l == "function" ? l = {
          validator: l
        } : l = S({}, l), l.validator = a.getValidationMethod(l), l.validator && (l.field = d, l.fullField = l.fullField || d, l.type = a.getType(l), v[d] = v[d] || [], v[d].push({
          rule: l,
          value: o,
          source: s,
          field: d
        }));
      });
    });
    var O = {};
    return qe(v, u, function(d, h) {
      var o = d.rule, A = (o.type === "object" || o.type === "array") && (typeof o.fields == "object" || typeof o.defaultField == "object");
      A = A && (o.required || !o.required && d.value), o.field = d.field;
      function l(F, _) {
        return S({}, _, {
          fullField: o.fullField + "." + F,
          fullFields: o.fullFields ? [].concat(o.fullFields, [F]) : [F]
        });
      }
      function y(F) {
        F === void 0 && (F = []);
        var _ = Array.isArray(F) ? F : [F];
        !u.suppressWarning && _.length && n.warning("async-validator:", _), _.length && o.message !== void 0 && (_ = [].concat(o.message));
        var P = _.map(re(o, s));
        if (u.first && P.length)
          return O[o.field] = 1, h(P);
        if (!A)
          h(P);
        else {
          if (o.required && !d.value)
            return o.message !== void 0 ? P = [].concat(o.message).map(re(o, s)) : u.error && (P = [u.error(o, x(u.messages.required, o.field))]), h(P);
          var D = {};
          o.defaultField && Object.keys(d.value).map(function(j) {
            D[j] = o.defaultField;
          }), D = S({}, D, d.rule.fields);
          var K = {};
          Object.keys(D).forEach(function(j) {
            var E = D[j], ue = Array.isArray(E) ? E : [E];
            K[j] = ue.map(l.bind(null, j));
          });
          var X = new n(K);
          X.messages(u.messages), d.rule.options && (d.rule.options.messages = u.messages, d.rule.options.error = u.error), X.validate(d.value, d.rule.options || u, function(j) {
            var E = [];
            P && P.length && E.push.apply(E, P), j && j.length && E.push.apply(E, j), h(E.length ? E : null);
          });
        }
      }
      var q;
      if (o.asyncValidator)
        q = o.asyncValidator(o, d.value, y, d.source, u);
      else if (o.validator) {
        try {
          q = o.validator(o, d.value, y, d.source, u);
        } catch (F) {
          console.error == null || console.error(F), u.suppressValidatorError || setTimeout(function() {
            throw F;
          }, 0), y(F.message);
        }
        q === !0 ? y() : q === !1 ? y(typeof o.message == "function" ? o.message(o.fullField || o.field) : o.message || (o.fullField || o.field) + " fails") : q instanceof Array ? y(q) : q instanceof Error && y(q.message);
      }
      q && q.then && q.then(function() {
        return y();
      }, function(F) {
        return y(F);
      });
    }, function(d) {
      p(d);
    }, s);
  }, e.getType = function(t) {
    if (t.type === void 0 && t.pattern instanceof RegExp && (t.type = "pattern"), typeof t.validator != "function" && t.type && !T.hasOwnProperty(t.type))
      throw new Error(x("Unknown rule type %s", t.type));
    return t.type || "string";
  }, e.getValidationMethod = function(t) {
    if (typeof t.validator == "function")
      return t.validator;
    var i = Object.keys(t), f = i.indexOf("message");
    return f !== -1 && i.splice(f, 1), i.length === 1 && i[0] === "required" ? T.required : T[this.getType(t)] || void 0;
  }, n;
}();
M.register = function(e, r) {
  if (typeof r != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  T[e] = r;
};
M.warning = se;
M.messages = Y;
M.validators = T;
const ie = ae({
  name: "GFormItem",
  props: pe,
  setup(n, {
    slots: e
  }) {
    const r = C("LabelData"), t = U(() => ({
      "s-form-item": !0,
      "s-form-item--horizontal": r.value.layout === "horizontal",
      "s-form-item--vertical": r.value.layout === "vertical"
    })), i = U(() => ({
      "s-form-item-label": !0,
      "s-form-item-label--vertical": r.value.layout === "vertical",
      /* 水平 才显示 */
      [`s-form-item-label--${r.value.labelAlign}`]: r.value.layout === "horizontal",
      [`s-form-item-label--${r.value.labelSize}`]: r.value.layout === "horizontal"
    })), f = H(""), a = H(!1), s = C(fe), g = {
      validate: () => {
        if (!s)
          return console.warn("请在Form中使用FormItem"), Promise.reject("请在Form中使用FormItem");
        if (!n.field)
          return console.warn("请在FormItem中设置field字段"), Promise.reject("请在FormItem中设置field字段");
        if (!s.rules)
          return Promise.resolve({
            result: !0
          });
        const p = s.rules[n.field] || void 0;
        if (!p)
          return Promise.resolve({
            result: !0
          });
        const m = s.model[n.field];
        return new M({
          [n.field]: p
        }).validate({
          [n.field]: m
        }, (w) => {
          w ? (a.value = !0, f.value = w[0].message || "校验失败") : (a.value = !1, f.value = "");
        });
      }
    };
    return B("FORM_ITEM_CTX", g), ce(() => {
      n.field && (s == null || s.addItem(g));
    }), le(() => {
      n.field && (s == null || s.deleteItem(g));
    }), () => {
      var p;
      return R("div", {
        class: t.value
      }, [R("span", {
        class: i.value
      }, [n.label]), R("div", null, [(p = e.default) == null ? void 0 : p.call(e)]), a.value && R("div", {
        class: "error-message"
      }, [f.value])]);
    };
  }
}), Ye = {
  install(n) {
    n.component(Q.name, Q), n.component(ie.name, ie);
  }
};
export {
  Q as Form,
  ie as FormItem,
  Ye as default
};
