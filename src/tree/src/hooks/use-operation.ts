import { ref, Ref } from 'vue'
import { IFlatTreeNode } from '../tree-type'
import { UseOperationType, UseTreeCoreType } from './type/use-tree-type'
import { randomId } from '../utils'

export function useOperation(
  flatTreeData: Ref<IFlatTreeNode[]>,
  { getChildNodes, getTreeNodeIndex }: UseTreeCoreType
): UseOperationType {
  // 添加孩子节点到父元素children[]末尾
  const appendTreeNode = (parent: IFlatTreeNode, node: IFlatTreeNode) => {
    // parent有孩子,获取最后一个子节点
    const childNodeList = getChildNodes(parent, false)
    const lastChild = childNodeList[childNodeList.length - 1]
    // 找到要插入的位置index: 默认为parent后一位
    let insertIndex = getTreeNodeIndex(parent) + 1
    if (lastChild) {
      insertIndex = getTreeNodeIndex(lastChild) + 1
    } else {
      // parent是叶子节点 (insertIndex保持默认)
    }
    // 处理节点
    parent.expanded = true
    parent.isLeaf = false
    const newChild = ref({
      ...node,
      level: parent.level + 1,
      parentId: parent.id,
      isLeaf: true,
      id: randomId(10)
    })
    // 插入节点
    flatTreeData.value.splice(insertIndex, 0, newChild.value)
  }

  // 删除节点以及它的所有孩子节点
  const removeTreeNode = (node: IFlatTreeNode) => {
    const childNodeIdList = getChildNodes(node, true).map(child => child.id)
    if (childNodeIdList.length === 0) {
      // 没有孩子
      flatTreeData.value = flatTreeData.value.filter(
        item => item.id !== node.id
      )
    } else {
      // 有孩子
      flatTreeData.value = flatTreeData.value.filter(
        item => item.id !== node.id && !childNodeIdList.includes(item.id)
      )
    }
  }
  return {
    appendTreeNode,
    removeTreeNode
  }
}
