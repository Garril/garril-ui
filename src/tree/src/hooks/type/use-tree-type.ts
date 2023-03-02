import { ComputedRef, Ref, SetupContext } from 'vue'
import { IFlatTreeNode, ITreeNode } from '../../tree-type'

export type UseTreeCoreType = {
  getChildNodes: (node: IFlatTreeNode, recursive?: boolean) => IFlatTreeNode[]
  getTreeNodeIndex: (node: IFlatTreeNode) => number
  getExpandedNodeList: ComputedRef<IFlatTreeNode[]>
  getNode: (node: IFlatTreeNode) => IFlatTreeNode | undefined
  getParentNode: (node: IFlatTreeNode) => IFlatTreeNode | undefined
}

export type UseExpandType = {
  clickExpandedNode: (node: IFlatTreeNode) => void
}

export type UseCheckType = {
  checkTreeNode: (node: IFlatTreeNode) => void
}

export type UseOperationType = {
  appendTreeNode: (parent: IFlatTreeNode, node: IFlatTreeNode) => void
  removeTreeNode: (node: IFlatTreeNode) => void
}

export type UseLazyLoadType = {
  lazyLoadNode: (node: IFlatTreeNode) => void
}
export type LazyNodeResType = {
  parentNode: IFlatTreeNode
  childNodes: ITreeNode[]
}
// 拖拽
export type DragDropType = boolean | DropType
export interface DropType {
  prev?: boolean
  next?: boolean
  inner?: boolean
}
export type UseDraggable = {
  onDragStart: (event: DragEvent, node: IFlatTreeNode) => void
  // 在node上面移动时: 决定操作类型（确定放在目标drop节点的prev/next/inner）
  onDragOver: (event: DragEvent) => void
  onDragLeave: (event: DragEvent) => void
  onDragEnd: (event: DragEvent) => void
  onDrop: (event: DragEvent, targetNode: IFlatTreeNode) => void
}
export type DragState = {
  dropType?: keyof Required<DropType>
  // 元素节点
  draggingHtmlNode?: HTMLElement | null
  // 数据节点
  draggingTreeNode?: IFlatTreeNode | null
}

export type TreeHooksType = {
  flatTreeData: Ref<IFlatTreeNode[]>
  context: SetupContext
} & UseTreeCoreType &
  UseExpandType &
  UseCheckType &
  UseOperationType &
  UseLazyLoadType &
  UseDraggable
