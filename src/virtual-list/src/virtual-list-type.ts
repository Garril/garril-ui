import { ExtractPropTypes } from 'vue'

export const virtualListProps = {
  data: {
    type: Array,
    default: []
  },
  itemHeight: {
    type: Number,
    default: 24
  },
  component: {
    type: String,
    default: 'div'
  }
} as const
export type VirtualListProps = ExtractPropTypes<typeof virtualListProps>
