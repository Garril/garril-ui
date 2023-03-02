import { Ref, SetupContext } from 'vue'
import { IFlatTreeNode } from '../tree-type'
import {
  UseExpandType,
  UseLazyLoadType,
  UseTreeCoreType
} from './type/use-tree-type'

export function useExpand(
  flatTreeData: Ref<IFlatTreeNode[]>,
  core: UseTreeCoreType,
  context: SetupContext,
  lazyLoad: UseLazyLoadType
): UseExpandType {
  const { lazyLoadNode } = lazyLoad
  // 点击展开三角-触发事件
  const clickExpandedNode = (node: IFlatTreeNode) => {
    const cur = flatTreeData.value.find(item => item.id === node.id)
    if (cur) {
      cur.expanded = !cur.expanded
      // 当前是展开的，判断是否要懒加载cur下的所有子节点
      if (cur.expanded) {
        lazyLoadNode(cur)
      }
    }
  }

  return {
    clickExpandedNode
  }
}
