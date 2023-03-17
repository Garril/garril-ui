import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  provide,
  ref
} from 'vue'
import { formContextToken } from '../form-type'
import { FormItemProps, formItemProps, LabelDataType } from './form-item-type'
import Validator from 'async-validator'

export default defineComponent({
  name: 'GFormItem',
  props: formItemProps,
  setup(props: FormItemProps, { slots }) {
    const labelData = inject('LabelData') as ComputedRef<LabelDataType>
    const itemClasses = computed(() => ({
      's-form-item': true,
      's-form-item--horizontal': labelData.value.layout === 'horizontal',
      's-form-item--vertical': labelData.value.layout === 'vertical'
    }))
    const labelClass = computed(() => ({
      's-form-item-label': true,
      's-form-item-label--vertical': labelData.value.layout === 'vertical',
      /* 水平 才显示 */
      [`s-form-item-label--${labelData.value.labelAlign}`]:
        labelData.value.layout === 'horizontal',
      [`s-form-item-label--${labelData.value.labelSize}`]:
        labelData.value.layout === 'horizontal'
    }))
    const errorMessage = ref('')
    const showMessage = ref(false)
    // form提供，强类型传递，不需要进行断言
    const formCtx = inject(formContextToken)

    const validate = () => {
      if (!formCtx) {
        console.warn('请在Form中使用FormItem')
        return Promise.reject('请在Form中使用FormItem')
      }
      if (!props.field) {
        console.warn('请在FormItem中设置field字段')
        return Promise.reject('请在FormItem中设置field字段')
      }
      // 不需要校验规则
      if (!formCtx.rules) {
        return Promise.resolve({ result: true })
      }
      // 获取校验规则和数值
      const itemRules = formCtx.rules[props.field] || undefined
      if (!itemRules) {
        return Promise.resolve({ result: true })
      }
      const val = formCtx.model[props.field]
      // 校验，返回结果
      // 创建一个校验的实例
      const validator = new Validator({ [props.field]: itemRules })
      return validator.validate({ [props.field]: val }, err => {
        if (err) {
          showMessage.value = true
          errorMessage.value = err[0].message || '校验失败'
        } else {
          showMessage.value = false
          errorMessage.value = ''
        }
      })
    }
    const formItemCtx = { validate }
    provide('FORM_ITEM_CTX', formItemCtx)
    // 全表单校验
    onMounted(() => {
      if (props.field) {
        formCtx?.addItem(formItemCtx)
      }
    })
    onUnmounted(() => {
      if (props.field) {
        formCtx?.deleteItem(formItemCtx)
      }
    })
    return () => {
      return (
        <div class={itemClasses.value}>
          {/* label */}
          <span class={labelClass.value}>{props.label}</span>
          {/* control */}
          <div>{slots.default?.()}</div>
          {/* error */}
          {showMessage.value && (
            <div class="error-message">{errorMessage.value}</div>
          )}
        </div>
      )
    }
  }
})
