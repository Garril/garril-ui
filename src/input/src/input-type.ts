import { ExtractPropTypes } from 'vue'

export const inputProps = {
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    default: ''
  }
} as const
export type InputProps = ExtractPropTypes<typeof inputProps>
