import { defineComponent as p, toRefs as r, createVNode as a } from "vue";
const f = {
  isShow: {
    type: Boolean,
    default: !1
  }
}, m = p({
  name: "GBaseModal",
  props: f,
  emits: ["update:isShow"],
  setup(d, {
    slots: e,
    emit: l
  }) {
    const {
      isShow: n
    } = r(d);
    return () => {
      var o;
      return a("div", null, [n.value && a("div", {
        class: "s-base-modal"
      }, [a("div", {
        class: "s-base-modal--mask",
        onClick: () => {
          l("update:isShow", !1);
        }
      }, null), (o = e.default) == null ? void 0 : o.call(e)])]);
    };
  }
}), s = {
  modelValue: {
    type: Boolean,
    default: !1
  },
  title: {
    type: String,
    default: ""
  }
}, c = p({
  name: "GModal",
  props: s,
  emits: ["update:modelValue"],
  setup(d, {
    slots: e,
    emit: l
  }) {
    const {
      modelValue: n,
      title: o
    } = r(d);
    return () => a(m, {
      class: "s-modal",
      isShow: n.value,
      "onUpdate:isShow": () => {
        l("update:modelValue");
      }
    }, {
      default: () => {
        var t, u, i;
        return [a("div", {
          class: "s-modal-container"
        }, [e.header ? (t = e.header) == null ? void 0 : t.call(e) : a("div", {
          class: "s-modal-header"
        }, [o.value]), a("div", {
          className: "s-modal-default"
        }, [(u = e.default) == null ? void 0 : u.call(e)]), a("div", {
          className: "s-modal-footer"
        }, [(i = e.footer) == null ? void 0 : i.call(e)])])];
      }
    });
  }
}), h = {
  install(d) {
    d.component(c.name, c), d.component(m.name, m);
  }
};
export {
  m as BaseModal,
  c as Modal,
  h as default
};
