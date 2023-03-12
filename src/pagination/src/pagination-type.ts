import { ExtractPropTypes, PropType } from 'vue'

export const paginationProps = {
  total: {
    // data总条数
    type: Number,
    default: 10
  },
  pageSize: {
    // 每页最大条数
    type: Number,
    default: 5
  },
  pageCount: {
    // 底部显示的页数按钮 数量
    type: Number,
    default: 5
  }
} as const
export type PaginationProps = ExtractPropTypes<typeof paginationProps>
