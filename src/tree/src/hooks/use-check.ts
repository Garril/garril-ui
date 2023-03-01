import { Ref } from 'vue'
import { IFlatTreeNode } from '../tree-type'
import { UseCheckType, UseTreeCoreType } from './type/use-tree-type'

export function useCheck(
  innerData: Ref<IFlatTreeNode[]>,
  { getChildNodes }: UseTreeCoreType
): UseCheckType {
  // 选中复选框后的，父到子的联动，子到父的联动
  const checkTreeNode = (node: IFlatTreeNode) => {
    // 初始化node的checked属性,可能为undefined,初次bug
    node.checked = !node.checked
    // 父到子
    getChildNodes(node).forEach(child => {
      child.checked = node.checked
    })
    // 子到父
    // 获取父节点
    const parentNode: IFlatTreeNode = innerData.value.find(
      item => item.id === node.parentId
    ) as IFlatTreeNode
    if (!parentNode) {
      return
    }
    // 有父节点，获取兄弟节点
    const siblingNodes = getChildNodes(parentNode, false)
    const sign = siblingNodes.every(item => item.checked)
    if (sign) {
      // 选中父节点复选框
      parentNode.checked = true
      // 父节点节点 再往上有父节点
      upwardDealSilbingNodes(parentNode, true)
    } else {
      // 取消父节点复选框
      parentNode.checked = false
      // 父节点节点 再往上有父节点
      upwardDealSilbingNodes(parentNode, false)
    }
  }
  function upwardDealSilbingNodes(node: IFlatTreeNode, val: boolean) {
    if (node.parentId) {
      const grandparentNode: IFlatTreeNode = innerData.value.find(
        item => item.id === node.parentId
      ) as IFlatTreeNode
      if (!val) {
        // 取消掉所有上层父级就行
        grandparentNode.checked = false
        upwardDealSilbingNodes(grandparentNode, false)
      } else {
        // 需要拿到父辈node节点的兄弟节点，判断祖先节点是否选中
        const siblingNodes = getChildNodes(grandparentNode, false)
        const sign = siblingNodes.every(item => item.checked)
        if (sign) {
          grandparentNode.checked = true
          upwardDealSilbingNodes(grandparentNode, true)
        } else {
          grandparentNode.checked = false
          upwardDealSilbingNodes(grandparentNode, false)
        }
      }
    }
  }
  return {
    checkTreeNode
  }
}
