import { ExtractPropTypes } from 'vue'

export const baseModalProps = {
  isShow: {
    // 是否展示
    type: Boolean,
    default: false
  }
} as const
export type BaseModalProps = ExtractPropTypes<typeof baseModalProps>
