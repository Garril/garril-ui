import { computed, defineComponent, provide, toRef, toRefs } from 'vue'
import { formContextToken, FormProps, formProps } from './form-type'

export default defineComponent({
  name: 'GForm',
  props: formProps,
  setup(props: FormProps, { slots }) {
    const { model } = toRefs(props)
    // 提供 labelData
    const labelData = computed(() => ({
      layout: props.layout,
      labelSize: props.labelSize,
      labelAlign: props.labelAlign
    }))
    provide('LabelData', labelData)
    // 提供表单上下文
    provide(formContextToken, {
      model: props.model,
      rules: props.rules
    })
    return () => {
      return (
        <div class="s-form">
          <div>{model.value.name}</div>
          <div>{slots.default?.()}</div>
        </div>
      )
    }
  }
})
