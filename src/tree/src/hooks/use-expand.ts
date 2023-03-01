import { Ref } from 'vue'
import { IFlatTreeNode } from '../tree-type'
import { UseExpandType, UseTreeCoreType } from './type/use-tree-type'

export function useExpand(
  innerData: Ref<IFlatTreeNode[]>,
  core: UseTreeCoreType
): UseExpandType {
  // 点击展开三角-触发事件
  const clickExpandedNode = (node: IFlatTreeNode) => {
    const cur = innerData.value.find(item => item.id === node.id)
    if (cur) {
      cur.expanded = !cur.expanded
    }
  }

  return {
    clickExpandedNode
  }
}
