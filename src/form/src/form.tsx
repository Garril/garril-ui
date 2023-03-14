import { computed, defineComponent, provide, toRef, toRefs } from 'vue'
import { FormProps, formProps } from './form-type'

export default defineComponent({
  name: 'GForm',
  props: formProps,
  setup(props: FormProps, { slots }) {
    const { model } = toRefs(props)
    const labelData = computed(() => ({
      layout: props.layout,
      labelSize: props.labelSize,
      labelAlign: props.labelAlign
    }))
    provide('LabelData', labelData)
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
