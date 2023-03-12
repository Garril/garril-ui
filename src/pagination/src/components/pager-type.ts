import { ExtractPropTypes, PropType } from 'vue'
import { paginationProps } from '../pagination-type'

export const pagerProps = paginationProps
export type PagerProps = ExtractPropTypes<typeof pagerProps>
