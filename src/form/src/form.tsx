import { defineComponent, toRef, toRefs } from 'vue'
import { FormProps, formProps } from './form-type'

export default defineComponent({
  name: 'GForm',
  props: formProps,
  setup(props: FormProps) {
    const { model } = toRefs(props)
    return () => {
      return <div class="s-form">{model.value}</div>
    }
  }
})
