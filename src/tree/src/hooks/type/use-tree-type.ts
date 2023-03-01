import { ComputedRef, Ref } from 'vue'
import { IFlatTreeNode } from '../../tree-type'

export type UseTreeCoreType = {
  getChildNodes: (node: IFlatTreeNode, recursive?: boolean) => IFlatTreeNode[]
  getTreeNodeIndex: (node: IFlatTreeNode) => number
  getExpandedNodeList: ComputedRef<IFlatTreeNode[]>
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

export type TreeHooksType = {
  innerData: Ref<IFlatTreeNode[]>
} & UseTreeCoreType &
  UseExpandType &
  UseCheckType &
  UseOperationType
