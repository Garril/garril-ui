import { computed, Ref } from 'vue'
import { IFlatTreeNode } from '../tree-type'
import { UseTreeCoreType } from './type/use-tree-type'

export function useTreeCore(
  flatTreeData: Ref<IFlatTreeNode[]>
): UseTreeCoreType {
  // 获取扁平数组内，node结点的所有子元素，作为数组返回
  // 参数recursive: true 所有后代. false: 第一代直接后代
  const getChildNodes: (
    node: IFlatTreeNode,
    recursive?: boolean
  ) => IFlatTreeNode[] = (node: IFlatTreeNode, recursive = true) => {
    const res: IFlatTreeNode[] = []
    const startIndex = flatTreeData.value.findIndex(item => item.id === node.id)
    for (
      let i = startIndex + 1;
      i < flatTreeData.value.length && node.level < flatTreeData.value[i].level;
      i++
    ) {
      if (recursive) {
        // 递归，所有后代子结点
        res.push(flatTreeData.value[i])
      } else if (node.level + 1 === flatTreeData.value[i].level) {
        // 第一直接代子结点
        res.push(flatTreeData.value[i])
      }
    }
    return res
  }
  // 在扁平化后的数组中找到node的index
  function getTreeNodeIndex(node: IFlatTreeNode) {
    if (!node) return -1
    return flatTreeData.value.findIndex(item => item.id === node.id)
  }
  // 获取展开的结点列表 (真正显示，渲染的所有node的列表)
  const getExpandedNodeList = computed(() => {
    let excludeNodes: IFlatTreeNode[] = []
    const resultNodes: IFlatTreeNode[] = []
    for (const node of flatTreeData.value) {
      // 此次node在excludeNodes中，跳过此次循环
      if (excludeNodes.includes(node)) {
        continue
      }
      // 没展开，排除子结点
      if (node.expanded !== true) {
        excludeNodes = getChildNodes(node, true)
      }
      resultNodes.push(node)
    }
    return resultNodes
  })
  const getNode = (node: IFlatTreeNode) => {
    if (!node) return undefined
    return flatTreeData.value.find(item => item.id === node.id)
  }
  const getParentNode = (node: IFlatTreeNode) => {
    if (!node) return undefined
    return flatTreeData.value.find(item => item.id === node.parentId)
  }
  return {
    getChildNodes,
    getTreeNodeIndex,
    getExpandedNodeList,
    getNode,
    getParentNode
  }
}
