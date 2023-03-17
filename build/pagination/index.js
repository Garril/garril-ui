import { ref as v, defineComponent as x, toRefs as m, computed as d, watch as f, createVNode as o, createTextVNode as g, onMounted as k, mergeProps as N } from "vue";
function M(n = 1) {
  const e = v(n), s = (u) => {
    e.value = u;
  }, a = (u, i) => {
    let c = e.value + u;
    i && c > i ? c = i : c < 1 && (c = 1), e.value = c;
  };
  return {
    pageIndex: e,
    setPageIndex: s,
    jumpToPageIndex: a,
    prePage: (u) => {
      a(-1, u);
    },
    nextPage: (u) => {
      a(1, u);
    }
  };
}
function y(n, e, s) {
  const a = Array.from({ length: n }, (t, l) => l);
  if (n <= s)
    return a.slice(2, n);
  {
    const t = Math.ceil(s / 2);
    return e <= t ? a.slice(2, s) : e >= n - t + 1 ? a.slice(n - s + 2, n) : a.slice(e - t + 2, e + t - 1);
  }
}
const I = {
  total: {
    // data总条数
    type: Number,
    default: 10
  },
  pageSize: {
    // 每页最大条数
    type: Number,
    default: 5
  },
  pageCount: {
    // 底部显示的页数按钮 数量
    type: Number,
    default: 5
  },
  curPageIndex: {
    type: Number,
    default: 1
  }
}, E = I, p = x({
  name: "GPager",
  props: E,
  emits: ["updatePagerIndex"],
  setup(n, {
    emit: e
  }) {
    const {
      total: s,
      pageSize: a,
      pageCount: t
    } = m(n), l = d(() => Math.ceil(s.value / a.value)), u = d(() => y(l.value, i.value, t.value)), {
      pageIndex: i,
      setPageIndex: c,
      jumpToPageIndex: r,
      nextPage: b,
      prePage: h
    } = M();
    return f(() => i.value, (C) => {
      e("updatePagerIndex", C);
    }), {
      pageCount: t,
      calcTotalPage: l,
      centerPages: u,
      pageIndex: i,
      setPageIndex: c,
      jumpToPageIndex: r,
      nextPage: b,
      prePage: h
    };
  },
  render() {
    const {
      pageCount: n,
      calcTotalPage: e,
      centerPages: s,
      pageIndex: a,
      setPageIndex: t,
      jumpToPageIndex: l
    } = this;
    return o("ul", {
      class: "s-pager"
    }, [o("li", {
      onClick: () => t(1),
      class: {
        current: a === 1
      }
    }, [g("1")]), e > n && a > Math.ceil(n / 2) && o("li", {
      class: "ellipsis_left",
      onClick: () => l(-5, e)
    }, [g("...")]), s.map((u) => o("li", {
      onClick: () => t(u),
      class: {
        current: a === u
      }
    }, [u])), e > n && a < e - Math.ceil(n / 2) + 1 && o("li", {
      class: "ellipsis_right",
      onClick: () => l(5, e)
    }, [g("...")]), e > 1 && o("li", {
      onClick: () => t(e),
      class: {
        current: a === e
      }
    }, [e])]);
  }
}), P = x({
  name: "GPagination",
  props: I,
  emits: ["update:curPageIndex"],
  setup(n, {
    emit: e
  }) {
    const {
      total: s,
      pageSize: a
    } = m(n), t = v(), l = d(() => Math.ceil(s.value / a.value)), u = d(() => t.value ? t.value.pageIndex < 2 : !0), i = d(() => t.value ? t.value.pageIndex >= l.value : !0), c = (r) => {
      e("update:curPageIndex", r);
    };
    return k(() => {
      f(() => n.curPageIndex, (r) => {
        t.value && t.value.setPageIndex(r);
      });
    }), () => o("div", {
      class: "s-pagination"
    }, [o("button", {
      onClick: () => {
        var r;
        return (r = t.value) == null ? void 0 : r.prePage(l.value);
      },
      disabled: u.value
    }, [g("上一页")]), o(p, N(n, {
      ref: t,
      onUpdatePagerIndex: (r) => c(r)
    }), null), o("button", {
      onClick: () => {
        var r;
        return (r = t.value) == null ? void 0 : r.nextPage(l.value);
      },
      disabled: i.value
    }, [g("下一页")])]);
  }
}), z = {
  install(n) {
    n.component(P.name, P), n.component(p.name, p);
  }
};
export {
  p as Pager,
  P as Pagination,
  z as default
};
