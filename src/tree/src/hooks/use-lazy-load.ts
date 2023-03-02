import { ref, Ref, SetupContext } from 'vue'
import { IFlatTreeNode } from '../tree-type'
import {
  LazyNodeResType,
  UseLazyLoadType,
  UseTreeCoreType
} from './type/use-tree-type'
import { generateFlatTree } from '../utils'
export function useLazyLoad(
  flatTreeData: Ref<IFlatTreeNode[]>,
  { getNode, getTreeNodeIndex, getChildNodes }: UseTreeCoreType,
  { emit }: SetupContext
): UseLazyLoadType {
  // 设置子节点的 父节点
  const setParent = (
    parentNode: IFlatTreeNode,
    childNodesList: Ref<IFlatTreeNode[]>
  ) => {
    childNodesList.value.forEach(child => {
      // 相差一层且parentId没有设置
      if (child.level - 1 === parentNode.level && !child.parentId) {
        child.parentId = parentNode.id
      }
    })
  }
  // 将异步获取的子节点加入父节点后面
  const insertChildren = (
    parentNode: IFlatTreeNode,
    childNodesList: Ref<IFlatTreeNode[]>
  ) => {
    const parentIndex = getTreeNodeIndex(parentNode)
    if (parentIndex) {
      flatTreeData.value.splice(parentIndex + 1, 0, ...childNodesList.value)
    }
  }
  // 在异步获取完子节点后，调用的回调函数
  const dealLazyChildNodeCB = (result: LazyNodeResType) => {
    // 获取父节点
    const node = getNode(result.parentNode)
    if (node) {
      // 结束加载状态
      node.loading = false
      // 扁平化处理
      const flatChildNodesList = ref<IFlatTreeNode[]>(
        generateFlatTree(result.childNodes, node.level)
      )
      // 处理子节点和父节点之间的关系
      setParent(node, flatChildNodesList)
      insertChildren(node, flatChildNodesList)
      // 更新父节点孩子数量(false最近的一代)
      const newChildNodesArr = getChildNodes(node, false)
      node.childNodeCount = newChildNodesArr.length
    }
  }

  // 接收一个节点，派发事件，外部调用异步方法获取数据，传入回调函数
  const lazyLoadNode = (node: IFlatTreeNode) => {
    const innerNode = getNode(node)
    // 判断是否需要懒加载节点
    if (innerNode?.isLeaf === false && !innerNode.childNodeCount) {
      // 初始childNodeCount为undefined，一次回调后设置了值，后续就不跑这个if
      // 需要懒加载
      innerNode.loading = true
      // 派发事件,让外面加载数据
      emit('lazy-load', node, dealLazyChildNodeCB)
    }
  }

  return {
    lazyLoadNode
  }
}
