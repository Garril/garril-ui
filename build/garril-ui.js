import { defineComponent as c, toRefs as i, createVNode as p } from 'vue'
const r = {
    type: {
      type: String,
      default: 'secondary'
    },
    size: {
      type: String,
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    block: {
      type: Boolean,
      default: !1
    }
  },
  n = c({
    name: 'GButton',
    props: r,
    setup(t, { slots: e }) {
      const { type: o, size: l, disabled: s, block: a } = i(t)
      return () => {
        const u = e.default ? e.default() : '按钮',
          d = a.value ? 's-btn--block' : ''
        return p(
          'button',
          {
            disabled: s.value,
            class: `s-btn s-btn--${o.value} s-btn--${l.value} ${d}`
          },
          [u]
        )
      }
    }
  }),
  f = {
    install(t) {
      t.component(n.name, n)
    }
  },
  b = [f],
  y = {
    install(t) {
      b.forEach(e => {
        t.use(e)
      })
    }
  }
export { n as Button, y as default }
