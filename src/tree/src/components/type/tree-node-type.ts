import { ExtractPropTypes, PropType } from 'vue'
import { IFlatTreeNode, treeProps } from '../../tree-type'

export const treeNodeProps = {
  ...treeProps,
  node: {
    type: Object as PropType<IFlatTreeNode>,
    required: true
  }
} as const
export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>

export type TreeInjectType = {
  clickExpandedNode: (node: IFlatTreeNode) => void
  getChildNodes: (node: IFlatTreeNode, recursive?: boolean) => IFlatTreeNode[]
  checkTreeNode: (node: IFlatTreeNode) => void
  appendTreeNode: (parent: IFlatTreeNode, node: IFlatTreeNode) => void
  removeTreeNode: (node: IFlatTreeNode) => void
  onDragStart: (event: DragEvent, node: IFlatTreeNode) => void
  onDragOver: (event: DragEvent) => void
  onDragLeave: (event: DragEvent) => void
  onDragEnd: (event: DragEvent) => void
  onDrop: (event: DragEvent, targetNode: IFlatTreeNode) => void
}
