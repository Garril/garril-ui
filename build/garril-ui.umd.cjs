;(function (e, t) {
  typeof exports == 'object' && typeof module < 'u'
    ? t(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], t)
    : ((e = typeof globalThis < 'u' ? globalThis : e || self),
      t((e['garril-ui'] = {}), e.Vue))
})(this, function (e, t) {
  'use strict'
  const s = {
      type: { type: String, default: 'secondary' },
      size: { type: String, default: 'medium' },
      disabled: { type: Boolean, default: !1 },
      block: { type: Boolean, default: !1 }
    },
    u = t.defineComponent({
      name: 'GButton',
      props: s,
      setup(n, { slots: o }) {
        const { type: a, size: d, disabled: f, block: c } = t.toRefs(n)
        return () => {
          const r = o.default ? o.default() : '按钮',
            p = c.value ? 's-btn--block' : ''
          return t.createVNode(
            'button',
            {
              disabled: f.value,
              class: `s-btn s-btn--${a.value} s-btn--${d.value} ${p}`
            },
            [r]
          )
        }
      }
    }),
    l = [
      {
        install(n) {
          n.component(u.name, u)
        }
      }
    ],
    i = {
      install(n) {
        l.forEach(o => {
          n.use(o)
        })
      }
    }
  ;(e.Button = u),
    (e.default = i),
    Object.defineProperties(e, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: 'Module' }
    })
})
