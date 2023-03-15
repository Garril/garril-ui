import { Rules } from 'async-validator'
import { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import { FormItemContext } from './components/form-item-type'
export type LayoutType = 'vertical' | 'horizontal'
export type LabelSizeType = 'sm' | 'md' | 'lg'
export type LabelAlignType = 'start' | 'center' | 'end'

export const formProps = {
  model: {
    type: Object,
    required: true
  },
  layout: {
    type: String as PropType<LayoutType>,
    default: 'vertical'
  },
  labelSize: {
    type: String as PropType<LabelSizeType>,
    default: 'md'
  },
  labelAlign: {
    type: String as PropType<LabelAlignType>,
    default: 'start'
  },
  rules: {
    type: Object as PropType<Rules>
  }
} as const
export type FormProps = ExtractPropTypes<typeof formProps>

export type FormContext = {
  model: any
  rules?: Rules
  addItem: (item: FormItemContext) => void
  deleteItem: (item: FormItemContext) => void
}
// 在他provide的时候进行强类型传递
export const formContextToken: InjectionKey<FormContext> =
  Symbol('formContextToken')
