import { ExtractPropTypes, PropType } from 'vue'

export const baseModalProps = {
  isShow: {
    type: Boolean,
    default: false
  }
} as const
export type BaseModalProps = ExtractPropTypes<typeof baseModalProps>
