import { computed, Ref, ref, unref } from 'vue'
import { IFlatTreeNode, ITreeNode } from '../tree-type'
import { generateFlatTree } from '../utils'

export function useTree(node: Ref<ITreeNode[]> | ITreeNode[]) {
  // 做一个扁平化处理
  const innerData = ref(generateFlatTree(unref(node)))
  // 点击展开三角-触发事件
  const clickExpandedNode = (node: IFlatTreeNode) => {
    const cur = innerData.value.find(item => item.id === node.id)
    if (cur) {
      cur.expanded = !cur.expanded
    }
  }
  // 获取扁平数组内，node结点的所有子元素，作为数组返回
  // 参数recursive: true 所有后代. false: 第一代直接后代
  const getChildNodes: (
    node: IFlatTreeNode,
    recursive?: boolean
  ) => IFlatTreeNode[] = (node: IFlatTreeNode, recursive = true) => {
    const res: IFlatTreeNode[] = []
    const startIndex = innerData.value.findIndex(item => item.id === node.id)
    for (
      let i = startIndex + 1;
      i < innerData.value.length && node.level < innerData.value[i].level;
      i++
    ) {
      if (recursive) {
        // 递归，所有后代子结点
        res.push(innerData.value[i])
      } else if (node.level + 1 === innerData.value[i].level) {
        // 第一直接代子结点
        res.push(innerData.value[i])
      }
    }
    return res
  }
  // 获取展开的结点列表
  const getExpandedNodeList = computed(() => {
    let excludeNodes: IFlatTreeNode[] = []
    const resultNodes: IFlatTreeNode[] = []
    for (const node of innerData.value) {
      // 此次node在excludeNodes中，跳过此次循环
      if (excludeNodes.includes(node)) {
        continue
      }
      // 没展开，排除子结点
      if (node.expanded !== true) {
        excludeNodes = getChildNodes(node)
      }
      resultNodes.push(node)
    }
    return resultNodes
  })
  // 选中复选框后的，父到子的联动，子到父的联动
  const effectOtherTreeNode = (node: IFlatTreeNode) => {
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
    innerData,
    clickExpandedNode,
    getChildNodes,
    getExpandedNodeList,
    effectOtherTreeNode
  }
}
