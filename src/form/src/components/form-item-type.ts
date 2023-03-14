import { Value } from 'async-validator'
import { ExtractPropTypes, PropType } from 'vue'
import { LabelAlignType, LabelSizeType, LayoutType } from '../form-type'

export const formItemProps = {
  label: {
    type: String,
    default: ''
  },
  field: {
    type: String
  }
} as const
export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export type LabelDataType = {
  layout: LayoutType
  labelSize: LabelSizeType
  labelAlign: LabelAlignType
}

export type FormItemContext = {
  validate: () => Promise<Value>
}
