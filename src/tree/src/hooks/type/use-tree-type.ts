import { ComputedRef, Ref, SetupContext } from 'vue'
import { IFlatTreeNode, ITreeNode } from '../../tree-type'

export type UseTreeCoreType = {
  getChildNodes: (node: IFlatTreeNode, recursive?: boolean) => IFlatTreeNode[]
  getTreeNodeIndex: (node: IFlatTreeNode) => number
  getExpandedNodeList: ComputedRef<IFlatTreeNode[]>
  getNode: (node: IFlatTreeNode) => IFlatTreeNode | undefined
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

export type TreeHooksType = {
  flatTreeData: Ref<IFlatTreeNode[]>
  context: SetupContext
} & UseTreeCoreType &
  UseExpandType &
  UseCheckType &
  UseOperationType &
  UseLazyLoadType
