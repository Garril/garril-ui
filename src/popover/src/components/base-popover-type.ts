import { ExtractPropTypes, PropType } from 'vue'

export const basePopoverProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  hostDom: {
    type: Object as PropType<HTMLElement>,
    default: null
  }
} as const
export type BasePopoverProps = ExtractPropTypes<typeof basePopoverProps>
