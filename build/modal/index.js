import { defineComponent as m, toRefs as p, createVNode as a } from "vue";
const g = {
  isShow: {
    // 是否展示
    type: Boolean,
    default: !1
  }
}, n = m({
  name: "GBaseModal",
  props: g,
  emits: ["update:isShow"],
  setup(l, {
    slots: e,
    emit: o
  }) {
    const {
      isShow: d
    } = p(l);
    return () => {
      var t;
      return a("div", null, [d.value && a("div", {
        class: "s-base-modal"
      }, [a("div", {
        class: "s-base-modal--mask",
        onClick: () => {
          o("update:isShow", !1);
        }
      }, null), (t = e.default) == null ? void 0 : t.call(e)])]);
    };
  }
}), y = {
  modelValue: {
    // 是否展示
    type: Boolean,
    default: !1
  },
  title: {
    // 标题
    type: String,
    default: ""
  },
  width: {
    // 弹框的宽度
    type: String,
    default: "30%"
  },
  showClose: {
    // 显示关闭 x
    type: Boolean,
    default: !0
  },
  center: {
    // title居中 -- 没用slots.header的情况下
    type: Boolean,
    default: !1
  },
  alignCenter: {
    // modal整体 竖直方向居中
    type: Boolean,
    default: !1
  }
}, r = m({
  name: "GModal",
  props: y,
  emits: ["update:modelValue"],
  setup(l, {
    slots: e,
    emit: o
  }) {
    const {
      modelValue: d,
      title: t,
      width: c,
      showClose: f,
      center: h,
      alignCenter: v
    } = p(l), w = v.value ? {
      marginTop: 0,
      top: "50%",
      transform: "translateY(-50%)"
    } : {};
    return () => a(n, {
      class: "s-modal",
      isShow: d.value,
      "onUpdate:isShow": () => {
        o("update:modelValue");
      }
    }, {
      default: () => {
        var u, s, i;
        return [a("div", {
          class: "s-modal-container",
          style: {
            width: c.value,
            ...w
          }
        }, [e.header ? (u = e.header) == null ? void 0 : u.call(e, {
          close: () => {
            o("update:modelValue", !1);
          }
        }) : a("div", {
          class: "s-modal-header",
          style: {
            textAlign: h.value ? "center" : "left"
          }
        }, [t.value, f.value && a("svg", {
          onClick: () => {
            o("update:modelValue", !1);
          },
          class: "s-modal-close",
          viewBox: "0 0 1024 1024",
          width: "16",
          xmlns: "http://www.w3.org/2000/svg"
        }, [a("path", {
          fill: "currentColor",
          d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
        }, null)])]), a("div", {
          className: "s-modal-default"
        }, [(s = e.default) == null ? void 0 : s.call(e)]), a("div", {
          className: "s-modal-footer"
        }, [(i = e.footer) == null ? void 0 : i.call(e)])])];
      }
    });
  }
}), S = {
  install(l) {
    l.component(r.name, r), l.component(n.name, n);
  }
};
export {
  n as BaseModal,
  r as Modal,
  S as default
};
