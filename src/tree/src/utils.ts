import { IFlatTreeNode, ITreeNode } from './tree-type'
export function generateFlatTree(
  tree: ITreeNode[],
  level = 0,
  parentNode = {} as IFlatTreeNode
): IFlatTreeNode[] {
  level++
  const resArr: IFlatTreeNode[] = tree.reduce((pre, cur) => {
    const curNode = { ...cur } as IFlatTreeNode
    curNode.expanded = false
    // 设置curNode的level
    curNode.level = level
    if (level > 1 && parentNode) {
      curNode.parentId = parentNode.id
    }
    // cur 是否存在children
    if (curNode.children) {
      // 需要删除children属性
      const children = generateFlatTree(curNode.children, level, curNode)
      delete curNode.children
      // 把cur结点和所有的子结点 拼接在一起
      return pre.concat(curNode, children)
    } else {
      // 叶子结点
      curNode.isLeaf = true
      return pre.concat(curNode)
    }
  }, [] as IFlatTreeNode[])
  // resArr[0].expanded = true
  return resArr
}
