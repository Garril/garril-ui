import { ExtractPropTypes, PropType } from 'vue'

export const treeProps = {
  data: {
    type: Object as PropType<Array<ITreeNode>>,
    required: true
  },
  checkable: {
    type: Boolean,
    default: false
  },
  lineable: {
    type: Boolean,
    default: false
  }
} as const
export type TreeProps = ExtractPropTypes<typeof treeProps>

export interface ITreeNode {
  label: string
  id?: string
  children?: ITreeNode[]

  selected?: boolean // 选中
  checked?: boolean // 勾选
  expanded?: boolean // 展开

  disableSelect?: boolean
  disableCheck?: boolean
  disableExpand?: boolean
}
// 单纯用ITreeNode可以达到效果，但是可能嵌套过多
// 需要递归操作，且很难做虚拟滚动,所以引入IFlatTreeNode
// 不同层级子元素要缩进，用level可以作为缩进的倍数
export interface IFlatTreeNode extends ITreeNode {
  parentId?: string // 父级id
  level: number // 结点层级
  isLeaf?: boolean // 是否为叶子结点
}
