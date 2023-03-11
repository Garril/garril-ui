import {
  defineComponent as x,
  toRefs as L,
  ref as l,
  computed as p,
  onMounted as b,
  createVNode as s
} from 'vue'
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
    default: 'div'
  }
}
const m = x({
    name: 'GVirtualList',
    props: H,
    setup(n, { slots: o }) {
      const { data: i, itemHeight: a, component: f } = L(n),
        r = l(0),
        u = l(0),
        c = l(),
        v = l(0),
        h = p(() => Math.ceil(r.value / a.value)),
        g = p(() => {
          const t = Math.min(u.value + h.value, i.value.length)
          return i.value.slice(u.value, t)
        })
      b(() => {
        var t
        r.value = (t = c.value) == null ? void 0 : t.clientHeight
      })
      const y = t => {
        const { scrollTop: e } = t.target
        ;(u.value = Math.floor(e / a.value)), (v.value = e - (e % a.value))
      }
      return () =>
        s(
          f.value,
          {
            class: 's-virtual-list--container',
            onScroll: y,
            ref: c
          },
          {
            default: () => [
              s(
                'div',
                {
                  class: 's-virtual-list--blank',
                  style: {
                    height: `${i.value.length * a.value}px`
                  }
                },
                null
              ),
              s(
                'div',
                {
                  class: 's-virtual-list',
                  style: {
                    transform: `translate3d(0,${v.value}px,0)`
                  }
                },
                [
                  g.value.map((t, e) => {
                    var d
                    return (d = o.default) == null
                      ? void 0
                      : d.call(o, {
                          item: t,
                          index: e
                        })
                  })
                ]
              )
            ]
          }
        )
    }
  }),
  C = {
    install(n) {
      n.component(m.name, m)
    }
  }
export { m as VirtualList, C as default }
