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
  const getChildNodes: (node: IFlatTreeNode) => IFlatTreeNode[] = (
    node: IFlatTreeNode
  ) => {
    const res: IFlatTreeNode[] = []
    const startIndex = innerData.value.findIndex(item => item.id === node.id)
    for (
      let i = startIndex + 1;
      i < innerData.value.length && node.level < innerData.value[i].level;
      i++
    ) {
      res.push(innerData.value[i])
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
  return {
    innerData,
    clickExpandedNode,
    getChildNodes,
    getExpandedNodeList
  }
}
