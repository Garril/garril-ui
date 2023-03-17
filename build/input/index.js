import { defineComponent as s, inject as r, createVNode as e } from "vue";
const d = {
  type: {
    type: String,
    default: "text"
  },
  modelValue: {
    type: String,
    default: ""
  }
}, n = s({
  name: "GInput",
  props: d,
  emits: ["update:modelValue"],
  setup(t, {
    emit: a
  }) {
    const p = r("FORM_ITEM_CTX"), u = (o) => {
      const l = o.target.value;
      a("update:modelValue", l), p.validate();
    };
    return () => e("div", {
      class: "s-input-wrapper"
    }, [e("input", {
      class: "s-input",
      type: t.type,
      value: t.modelValue,
      onInput: u
    }, null)]);
  }
}), m = {
  install(t) {
    t.component(n.name, n);
  }
};
export {
  n as Input,
  m as default
};
