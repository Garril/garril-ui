import { ExtractPropTypes, PropType } from 'vue'
import { DragDropType } from './hooks/type/use-tree-type'

export const treeProps = {
  data: {
    type: Object as PropType<Array<ITreeNode>>,
    required: true
  },
  // 多选框
  checkable: {
    type: Boolean,
    default: false
  },
  // 左侧线
  lineable: {
    type: Boolean,
    default: false
  },
  // 添加删除节点
  operable: {
    type: Boolean,
    default: false
  },
  // 懒加载
  lazy: {
    type: Boolean,
    default: false
  },
  // 拖拽
  dragdrop: {
    // 可能丢到节点里面，上面，下面
    type: [Boolean, Object] as PropType<DragDropType>,
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
  loading?: boolean // 节点是否显示加载中
  childNodeCount?: number // 该节点的数量

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
