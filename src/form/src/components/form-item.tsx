import { computed, ComputedRef, defineComponent, inject, toRefs } from 'vue'
import { FormItemProps, formItemProps, LabelDataType } from './form-item-type'

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
    return () => {
      return (
        <div class={itemClasses.value}>
          {/* label */}
          <span class={labelClass.value}>{props.label}</span>
          {/* control */}
          <div>{slots.default?.()}</div>
        </div>
      )
    }
  }
})
