import { ExtractPropTypes } from 'vue'

export const tabItemProps = {
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
} as const
export type TabItemProps = ExtractPropTypes<typeof tabItemProps>
