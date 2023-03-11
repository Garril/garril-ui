import { ExtractPropTypes, PropType } from 'vue'

export const paginationProps = {
  total: {
    type: Number,
    default: 10
  },
  pageSize: {
    type: Number,
    default: 5
  }
} as const
export type PaginationProps = ExtractPropTypes<typeof paginationProps>
