;(function (t, e) {
  typeof exports == 'object' && typeof module < 'u'
    ? e(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], e)
    : ((t = typeof globalThis < 'u' ? globalThis : t || self),
      e((t.index = {}), t.Vue))
})(this, function (t, e) {
  'use strict'
  const v = {
      data: { type: Array, default: [] },
      itemHeight: { type: Number, default: 24 },
      component: { type: String, default: 'div' }
    },
    b = '',
    i = e.defineComponent({
      name: 'GVirtualList',
      props: v,
      setup(o, { slots: s }) {
        const { data: u, itemHeight: l, component: h } = e.toRefs(o),
          c = e.ref(0),
          r = e.ref(0),
          d = e.ref(),
          f = e.ref(0),
          g = e.computed(() => Math.ceil(c.value / l.value)),
          y = e.computed(() => {
            const n = Math.min(r.value + g.value, u.value.length)
            return u.value.slice(r.value, n)
          })
        e.onMounted(() => {
          var n
          c.value = (n = d.value) == null ? void 0 : n.clientHeight
        })
        const V = n => {
          const { scrollTop: a } = n.target
          ;(r.value = Math.floor(a / l.value)), (f.value = a - (a % l.value))
        }
        return () =>
          e.createVNode(
            h.value,
            { class: 's-virtual-list--container', onScroll: V, ref: d },
            {
              default: () => [
                e.createVNode(
                  'div',
                  {
                    class: 's-virtual-list--blank',
                    style: { height: `${u.value.length * l.value}px` }
                  },
                  null
                ),
                e.createVNode(
                  'div',
                  {
                    class: 's-virtual-list',
                    style: { transform: `translate3d(0,${f.value}px,0)` }
                  },
                  [
                    y.value.map((n, a) => {
                      var p
                      return (p = s.default) == null
                        ? void 0
                        : p.call(s, { item: n, index: a })
                    })
                  ]
                )
              ]
            }
          )
      }
    }),
    m = {
      install(o) {
        o.component(i.name, i)
      }
    }
  ;(t.VirtualList = i),
    (t.default = m),
    Object.defineProperties(t, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: 'Module' }
    })
})
