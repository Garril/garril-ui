import { IFlatTreeNode, ITreeNode } from './tree-type'
export function generateFlatTree(
  tree: ITreeNode[],
  level = 0,
  parentNode = {} as IFlatTreeNode
): IFlatTreeNode[] {
  level++
  const resArr: IFlatTreeNode[] = tree?.reduce((pre, cur) => {
    const curNode = { ...cur } as IFlatTreeNode
    // 初始化状态
    curNode.selected = curNode.selected ?? false
    curNode.checked = curNode.checked ?? false
    curNode.expanded = curNode.expanded ?? false
    // 设置curNode的level
    curNode.level = level
    // 设置parentId
    if (level > 1 && parentNode) {
      curNode.parentId = parentNode.id
    }
    // cur 是否存在children, 设置
    if (curNode.children) {
      curNode.isLeaf = false
      // 需要删除父节点children数组属性
      const children = generateFlatTree(curNode.children, level, curNode)
      delete curNode.children
      // 把cur结点和所有的子结点 拼接在一起
      return pre.concat(curNode, children)
    } else {
      // 叶子结点
      // curNode.isLeaf = true
      // 可能懒加载要把isLeaf提前的，故意的设置为true，但是不代表curNode就一定是叶子节点
      if (curNode.isLeaf === undefined) {
        curNode.isLeaf = true
      }
      return pre.concat(curNode)
    }
  }, [] as IFlatTreeNode[])
  // resArr[0].expanded = true
  return resArr
}

export function randomId(len: number): string {
  let outStr = ''
  const tempStr = 'abcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < len; i++) {
    outStr += tempStr.charAt(Math.floor(Math.random() * tempStr.length))
  }
  return outStr
}
