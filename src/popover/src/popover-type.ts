import { ExtractPropTypes, PropType } from 'vue'

export const popoverProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  hostDom: {
    type: Object as PropType<HTMLElement>,
    default: null
  }
} as const
export type PopoverProps = ExtractPropTypes<typeof popoverProps>
