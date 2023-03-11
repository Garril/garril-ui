;(function (V, t) {
  typeof exports == 'object' && typeof module < 'u'
    ? t(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], t)
    : ((V = typeof globalThis < 'u' ? globalThis : V || self),
      t((V.index = {}), V.Vue))
})(this, function (V, t) {
  'use strict'
  function E(n, l = 0, g = {}) {
    return (
      l++,
      n.reduce((r, d) => {
        const e = { ...d }
        if (
          ((e.selected = e.selected ?? !1),
          (e.checked = e.checked ?? !1),
          (e.expanded = e.expanded ?? !1),
          (e.level = l),
          l > 1 && g && (e.parentId = g.id),
          e.children)
        ) {
          e.isLeaf = !1
          const o = E(e.children, l, e)
          return delete e.children, r.concat(e, o)
        } else return e.isLeaf === void 0 && (e.isLeaf = !0), r.concat(e)
      }, [])
    )
  }
  function M(n) {
    let l = ''
    const g = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < n; i++)
      l += g.charAt(Math.floor(Math.random() * g.length))
    return l
  }
  function z(n, { getChildNodes: l }) {
    const g = r => {
      ;(r.checked = !r.checked),
        l(r, !0).forEach(u => {
          u.checked = r.checked
        })
      const d = n.value.find(u => u.id === r.parentId)
      if (!d) return
      l(d, !1).every(u => u.checked)
        ? ((d.checked = !0), i(d, !0))
        : ((d.checked = !1), i(d, !1))
    }
    function i(r, d) {
      if (r.parentId) {
        const e = n.value.find(o => o.id === r.parentId)
        d && l(e, !1).every(h => h.checked)
          ? ((e.checked = !0), i(e, !0))
          : ((e.checked = !1), i(e, !1))
      }
    }
    return { checkTreeNode: g }
  }
  const H = {
    prev: 's-tree-node--prev',
    next: 's-tree-node--next',
    inner: 's-tree-node--inner'
  }
  function B(n, { getChildNodes: l, getParentNode: g }, i) {
    const r = t.reactive({
        dropType: void 0,
        draggingHtmlNode: null,
        draggingTreeNode: null
      }),
      d = () => {
        ;(r.dropType = void 0),
          (r.draggingHtmlNode = null),
          (r.draggingTreeNode = null)
      },
      e = t.computed(() => n.value.reduce((a, p) => ({ ...a, [p.id]: p }), {})),
      o = a => {
        a == null || a.classList.remove(...Object.values(H))
      },
      u = (a, p) => {
        var s
        const f = (s = e.value[a]) == null ? void 0 : s.parentId
        return f === p ? !0 : f !== void 0 ? u(f, p) : !1
      },
      h = (a, p) => {
        var f
        a.stopPropagation(),
          (r.draggingHtmlNode = a.target),
          (r.draggingTreeNode = p),
          (f = a.dataTransfer) == null || f.setData('dragNodeId', p.id)
      },
      c = a => {
        if (
          (a.preventDefault(), a.stopPropagation(), !!r.draggingHtmlNode && i)
        ) {
          if ((a.dataTransfer && (a.dataTransfer.dropEffect = 'move'), !n))
            return
          let p = {}
          typeof i == 'object' ? (p = i) : i === !0 && (p = { inner: !0 })
          const { prev: f, next: s, inner: b } = p
          let v
          const L = f ? (b ? 0.25 : s ? 0.45 : 1) : -1,
            I = s ? (b ? 0.75 : f ? 0.55 : 0) : 1,
            m = a.currentTarget,
            k = m == null ? void 0 : m.getBoundingClientRect(),
            T = a.clientY - ((k == null ? void 0 : k.top) || 0)
          if (
            (T < ((k == null ? void 0 : k.height) || 0) * L
              ? (v = 'prev')
              : T > ((k == null ? void 0 : k.height) || 0) * I
              ? (v = 'next')
              : b
              ? (v = 'inner')
              : (v = void 0),
            v)
          ) {
            const O = m == null ? void 0 : m.classList
            O && (O.contains(H[v]) || (o(m), O.add(H[v])))
          } else o(m)
          r.dropType = v
        }
      },
      N = a => {
        a.stopPropagation(), r.draggingHtmlNode && o(a.currentTarget)
      },
      x = (a, p) => {
        var s
        if (
          (a.preventDefault(),
          a.stopPropagation(),
          o(a.currentTarget),
          !r.draggingHtmlNode || !i)
        )
          return
        const f =
          (s = a.dataTransfer) == null ? void 0 : s.getData('dragNodeId')
        if (f) {
          const b = u(p.id, f)
          if (f === p.id || b) return
          r.dropType && y(f, p), d()
        }
      }
    function y(a, p) {
      const f = n.value.find(s => s.id === a)
      if (f) {
        let s
        const b = l(f),
          v = g(f)
        if (r.dropType === 'inner') {
          s = { ...f, parentId: p.id, level: p.level + 1 }
          const L = n.value.indexOf(p)
          n.value.splice(L + 1, 0, s), (p.isLeaf = void 0)
          const I = n.value.indexOf(f)
          n.value.splice(I, 1)
        } else if (r.dropType === 'next') {
          s = { ...f, parentId: p.parentId, level: p.level }
          const L = n.value.indexOf(p),
            I = l(p, !0).length
          n.value.splice(L + I + 1, 0, s)
          const m = n.value.indexOf(f)
          n.value.splice(m, 1)
        } else if (r.dropType === 'prev') {
          s = { ...f, parentId: p.parentId, level: p.level }
          const L = n.value.indexOf(p)
          n.value.splice(L, 0, s)
          const I = n.value.indexOf(f)
          n.value.splice(I, 1)
        }
        ;(r.dropType = 'inner'),
          b.forEach(L => y(L.id, s)),
          v && l(v).length === 0 && (v.isLeaf = !0)
      }
    }
    return {
      onDragStart: h,
      onDragOver: c,
      onDragLeave: N,
      onDragEnd: a => {
        a.preventDefault(), a.stopPropagation(), d()
      },
      onDrop: x
    }
  }
  function j(n, l, g, i) {
    const { lazyLoadNode: r } = i
    return {
      clickExpandedNode: e => {
        const o = n.value.find(u => u.id === e.id)
        o && ((o.expanded = !o.expanded), o.expanded && r(o))
      }
    }
  }
  function R(
    n,
    { getNode: l, getTreeNodeIndex: g, getChildNodes: i },
    { emit: r }
  ) {
    const d = (h, c) => {
        c.value.forEach(N => {
          N.level - 1 === h.level && !N.parentId && (N.parentId = h.id)
        })
      },
      e = (h, c) => {
        const N = g(h)
        N && n.value.splice(N + 1, 0, ...c.value)
      },
      o = h => {
        const c = l(h.parentNode)
        if (c) {
          c.loading = !1
          const N = t.ref(E(h.childNodes, c.level))
          d(c, N), e(c, N)
          const x = i(c, !1)
          c.childNodeCount = x.length
        }
      }
    return {
      lazyLoadNode: h => {
        const c = l(h)
        ;(c == null ? void 0 : c.isLeaf) === !1 &&
          !c.childNodeCount &&
          ((c.loading = !0), r('lazy-load', h, o))
      }
    }
  }
  function _(n, { getChildNodes: l, getTreeNodeIndex: g }) {
    return {
      appendTreeNode: (d, e) => {
        const o = l(d, !1),
          u = o[o.length - 1]
        let h = g(d) + 1
        u && (h = g(u) + 1), (d.expanded = !0), (d.isLeaf = !1)
        const c = t.ref({
          ...e,
          level: d.level + 1,
          parentId: d.id,
          isLeaf: !0,
          id: M(10)
        })
        n.value.splice(h, 0, c.value)
      },
      removeTreeNode: d => {
        const e = l(d, !0).map(o => o.id)
        e.length === 0
          ? (n.value = n.value.filter(o => o.id !== d.id))
          : (n.value = n.value.filter(o => o.id !== d.id && !e.includes(o.id)))
      }
    }
  }
  function $(n) {
    const l = (e, o = !0) => {
      const u = [],
        h = n.value.findIndex(c => c.id === e.id)
      for (let c = h + 1; c < n.value.length && e.level < n.value[c].level; c++)
        (o || e.level + 1 === n.value[c].level) && u.push(n.value[c])
      return u
    }
    function g(e) {
      return e ? n.value.findIndex(o => o.id === e.id) : -1
    }
    const i = t.computed(() => {
      let e = []
      const o = []
      for (const u of n.value)
        e.includes(u) || (u.expanded !== !0 && (e = l(u, !0)), o.push(u))
      return o
    })
    return {
      getChildNodes: l,
      getTreeNodeIndex: g,
      getExpandedNodeList: i,
      getNode: e => {
        if (e) return n.value.find(o => o.id === e.id)
      },
      getParentNode: e => {
        if (e) return n.value.find(o => o.id === e.parentId)
      }
    }
  }
  function A(n, l, g) {
    const i = t.ref(E(t.unref(n))),
      r = $(i),
      d = [z, j, _],
      e = R(i, r, g),
      o = B(i, r, l.dragdrop)
    return {
      ...d.reduce((h, c) => ({ ...h, ...c(i, r, g, e) }), {}),
      ...r,
      ...o,
      flatTreeData: i
    }
  }
  const P = {
      data: { type: Object, required: !0 },
      checkable: { type: Boolean, default: !1 },
      lineable: { type: Boolean, default: !1 },
      operable: { type: Boolean, default: !1 },
      lazy: { type: Boolean, default: !1 },
      dragdrop: { type: [Boolean, Object], default: !1 },
      height: { type: Number },
      itemHeight: { type: Number, default: 24 }
    },
    S = 24,
    D = 28,
    G = { ...P, node: { type: Object, required: !0 } },
    q = t.defineComponent({
      name: 'GTreeNode',
      props: G,
      setup(n, { slots: l }) {
        const {
            lineable: g,
            checkable: i,
            node: r,
            operable: d,
            lazy: e,
            dragdrop: o
          } = t.toRefs(n),
          {
            checkTreeNode: u,
            getChildNodes: h,
            appendTreeNode: c,
            removeTreeNode: N,
            onDragStart: x,
            onDragOver: y,
            onDragLeave: C,
            onDragEnd: a,
            onDrop: p
          } = t.inject('TREE_HOOKS'),
          f = t.ref(!1),
          s = () => {
            f.value ? (f.value = !1) : (f.value = !0)
          }
        let b = {}
        return (
          o.value &&
            (b = {
              draggable: !0,
              onDragend: v => a(v),
              onDragleave: v => C(v),
              onDragover: v => y(v),
              onDragstart: v => x(v, r.value),
              onDrop: v => p(v, r.value)
            }),
          () => {
            var k, T, O
            let { level: v, expanded: L, isLeaf: I, checked: m } = t.unref(r)
            return t.createVNode(
              'div',
              {
                class: 's-tree-node hover:bg-slate-300 relative leading-8',
                style: { paddingLeft: `${S * (v - 1)}px` },
                onMouseenter: s,
                onMouseleave: s
              },
              [
                !I &&
                  L &&
                  g.value &&
                  t.createVNode(
                    'span',
                    {
                      class: 's-tree-node--line absolute w-px bg-gray-400',
                      style: {
                        height: `${D * h(r.value, !1).length}px`,
                        top: `${D}px`,
                        left: `${S * (v - 1) + 9}px`
                      }
                    },
                    null
                  ),
                t.createVNode(
                  'div',
                  t.mergeProps({ class: 's-tree-node--content' }, b),
                  [
                    I
                      ? t.createVNode(
                          'span',
                          { style: { display: 'inline-block', width: '25px' } },
                          null
                        )
                      : (k = l.icon) == null
                      ? void 0
                      : k.call(l),
                    i.value &&
                      t.withDirectives(
                        t.createVNode(
                          'input',
                          {
                            type: 'checkbox',
                            'onUpdate:modelValue': J => (m = J),
                            style: { marginRight: '8px' },
                            onClick: () => u(r.value)
                          },
                          null
                        ),
                        [[t.vModelCheckbox, m]]
                      ),
                    (T = l.content) == null ? void 0 : T.call(l),
                    d.value &&
                      f.value &&
                      t.createVNode('span', { class: 'inline-flex ml-1' }, [
                        t.createVNode(
                          'svg',
                          {
                            onClick: () => {
                              c(r.value, { label: '新节点' })
                            },
                            viewBox: '0 0 1024 1024',
                            width: '14',
                            height: '14',
                            class: 'cursor-pointer'
                          },
                          [
                            t.createVNode(
                              'path',
                              {
                                d: 'M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z'
                              },
                              null
                            )
                          ]
                        ),
                        t.createVNode(
                          'svg',
                          {
                            onClick: () => {
                              N(r.value)
                            },
                            viewBox: '0 0 1024 1024',
                            width: '14',
                            height: '14',
                            class: 'cursor-pointer ml-1'
                          },
                          [
                            t.createVNode(
                              'path',
                              {
                                d: 'M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z'
                              },
                              null
                            )
                          ]
                        )
                      ]),
                    e.value &&
                      r.value.loading &&
                      ((O = l.loading) == null ? void 0 : O.call(l))
                  ]
                )
              ]
            )
          }
        )
      }
    }),
    F = (n, { emit: l }) =>
      t.createVNode(
        'svg',
        {
          onClick: () => l('onClick'),
          style: {
            width: '18px',
            height: '18px',
            verticalAlign: 'text-top',
            display: 'inline-block',
            transform: n.expanded ? 'rotate(90deg)' : ''
          },
          viewBox: '0 0 1024 1024',
          xmlns: 'http://www.w3.org/2000/svg'
        },
        [
          t.createVNode(
            'path',
            { fill: 'currentColor', d: 'M384 192v640l384-320.064z' },
            null
          )
        ]
      ),
    Q = '',
    K = {
      data: { type: Array, default: [] },
      itemHeight: { type: Number, default: 24 },
      component: { type: String, default: 'div' }
    },
    W = '',
    Y = t.defineComponent({
      name: 'GVirtualList',
      props: K,
      setup(n, { slots: l }) {
        const { data: g, itemHeight: i, component: r } = t.toRefs(n),
          d = t.ref(0),
          e = t.ref(0),
          o = t.ref(),
          u = t.ref(0),
          h = t.computed(() => Math.ceil(d.value / i.value)),
          c = t.computed(() => {
            const x = Math.min(e.value + h.value, g.value.length)
            return g.value.slice(e.value, x)
          })
        t.onMounted(() => {
          var x
          d.value = (x = o.value) == null ? void 0 : x.clientHeight
        })
        const N = x => {
          const { scrollTop: y } = x.target
          ;(e.value = Math.floor(y / i.value)), (u.value = y - (y % i.value))
        }
        return () =>
          t.createVNode(
            r.value,
            { class: 's-virtual-list--container', onScroll: N, ref: o },
            {
              default: () => [
                t.createVNode(
                  'div',
                  {
                    class: 's-virtual-list--blank',
                    style: { height: `${g.value.length * i.value}px` }
                  },
                  null
                ),
                t.createVNode(
                  'div',
                  {
                    class: 's-virtual-list',
                    style: { transform: `translate3d(0,${u.value}px,0)` }
                  },
                  [
                    c.value.map((x, y) => {
                      var C
                      return (C = l.default) == null
                        ? void 0
                        : C.call(l, { item: x, index: y })
                    })
                  ]
                )
              ]
            }
          )
      }
    }),
    w = t.defineComponent({
      name: 'GTree',
      props: P,
      emits: ['lazy-load'],
      setup(n, l) {
        const { data: g, height: i, itemHeight: r } = t.toRefs(n),
          { slots: d } = l,
          {
            clickExpandedNode: e,
            getExpandedNodeList: o,
            checkTreeNode: u,
            getChildNodes: h,
            appendTreeNode: c,
            removeTreeNode: N,
            onDragStart: x,
            onDragOver: y,
            onDragLeave: C,
            onDragEnd: a,
            onDrop: p
          } = A(g, n, l)
        return (
          t.provide('TREE_HOOKS', {
            clickExpandedNode: e,
            checkTreeNode: u,
            getChildNodes: h,
            appendTreeNode: c,
            removeTreeNode: N,
            onDragStart: x,
            onDragOver: y,
            onDragLeave: C,
            onDragEnd: a,
            onDrop: p
          }),
          () => {
            const f = s =>
              t.createVNode(q, t.mergeProps(n, { node: s }), {
                content: () => (d.content ? d.content(s) : s.label),
                icon: () =>
                  d.icon
                    ? d.icon({ node: s, clickExpandedNode: e })
                    : t.createVNode(
                        F,
                        { expanded: !!s.expanded, onClick: () => e(s) },
                        null
                      ),
                loading: () =>
                  d.loading
                    ? d.loading({ node: s })
                    : t.createVNode('span', { class: 'ml-1' }, [
                        t.createTextVNode('loading...')
                      ])
              })
            return t.createVNode('div', { class: 's-tree' }, [
              i != null && i.value
                ? t.createVNode('div', { style: { height: `${i.value}px` } }, [
                    t.createVNode(
                      Y,
                      {
                        data: o == null ? void 0 : o.value,
                        itemHeight: r.value
                      },
                      { default: ({ item: s }) => f(s) }
                    )
                  ])
                : o == null
                ? void 0
                : o.value.map(s => f(s))
            ])
          }
        )
      }
    }),
    U = {
      install(n) {
        n.component(w.name, w)
      }
    }
  ;(V.Tree = w),
    (V.default = U),
    Object.defineProperties(V, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: 'Module' }
    })
})
