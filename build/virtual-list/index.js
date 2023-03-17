import { defineComponent as x, toRefs as L, ref as l, computed as p, onMounted as b, createVNode as u } from "vue";
const H = {
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
const m = x({
  name: "GVirtualList",
  props: H,
  setup(n, {
    slots: i
  }) {
    const {
      data: o,
      itemHeight: a,
      component: f
    } = L(n), r = l(0), s = l(0), c = l(), v = l(0), h = p(() => Math.ceil(r.value / a.value)), g = p(() => {
      const t = Math.min(s.value + h.value, o.value.length);
      return o.value.slice(s.value, t);
    });
    b(() => {
      var t;
      r.value = (t = c.value) == null ? void 0 : t.clientHeight;
    });
    const y = (t) => {
      const {
        scrollTop: e
      } = t.target;
      s.value = Math.floor(e / a.value), v.value = e - e % a.value;
    };
    return () => u(f.value, {
      id: "s-virtual-list-id",
      class: "s-virtual-list--container",
      onScroll: y,
      ref: c
    }, {
      default: () => [u("div", {
        class: "s-virtual-list--blank",
        style: {
          height: `${o.value.length * a.value}px`
        }
      }, null), u("div", {
        class: "s-virtual-list",
        style: {
          transform: `translate3d(0,${v.value}px,0)`
        }
      }, [g.value.map((t, e) => {
        var d;
        return (d = i.default) == null ? void 0 : d.call(i, {
          item: t,
          index: e
        });
      })])]
    });
  }
}), C = {
  install(n) {
    n.component(m.name, m);
  }
};
export {
  m as VirtualList,
  C as default
};
