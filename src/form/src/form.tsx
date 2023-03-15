import { Value } from 'async-validator'
import { computed, defineComponent, provide, toRef, toRefs } from 'vue'
import { FormItemContext } from './components/form-item-type'
import { formContextToken, FormProps, formProps } from './form-type'

export default defineComponent({
  name: 'GForm',
  props: formProps,
  emits: ['form-submit'],
  setup(props: FormProps, { slots, emit, expose }) {
    const { model } = toRefs(props)
    // 提供 labelData
    const labelData = computed(() => ({
      layout: props.layout,
      labelSize: props.labelSize,
      labelAlign: props.labelAlign
    }))
    provide('LabelData', labelData)
    // 提供表单上下文 以及 全局校验
    const formItems = new Set<FormItemContext>()
    const addItem = (item: FormItemContext) => formItems.add(item)
    const deleteItem = (item: FormItemContext) => formItems.delete(item)
    provide(formContextToken, {
      model: props.model,
      rules: props.rules,
      addItem,
      deleteItem
    })
    const formSubmit = (event: Event) => {
      // 取消表单默认提交行为，防止页面刷新
      event.preventDefault()
      emit('form-submit')
    }
    const validateFormData = (cb: (isCheckSuccess: boolean) => void) => {
      const resArr: Array<Promise<Value>> = []
      formItems.forEach(item => resArr.push(item.validate()))
      Promise.all(resArr)
        .then(() => cb(true))
        .catch(() => cb(false))
    }
    // 对外暴露接口
    expose({
      validateFormData
    })
    return () => (
      <form class="s-form" onSubmit={formSubmit}>
        <div>{model.value.name}</div>
        <div>{slots.default?.()}</div>
      </form>
    )
  }
})
