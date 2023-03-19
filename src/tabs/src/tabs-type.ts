import { ExtractPropTypes } from 'vue'

export const tabsProps = {
  modelValue: {
    type: String,
    default: ''
  },
  closeAble: {
    type: Boolean,
    default: false
  },
  addAble: {
    type: Boolean,
    default: false
  }
} as const
export type TabsProps = ExtractPropTypes<typeof tabsProps>

export type TabDataType = Array<{
  title: string
  id: string
  type?: 'dynamic'
  content?: string
}>
