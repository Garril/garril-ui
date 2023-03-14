import { ExtractPropTypes, PropType } from 'vue'
import { LabelAlignType, LabelSizeType, LayoutType } from '../form-type'

export const formItemProps = {
  label: {
    type: String,
    default: ''
  }
} as const
export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export type LabelDataType = {
  layout: LayoutType
  labelSize: LabelSizeType
  labelAlign: LabelAlignType
}
