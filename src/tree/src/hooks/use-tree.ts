import { Ref, ref, SetupContext, unref } from 'vue'
import { ITreeNode, TreeProps } from '../tree-type'
import { generateFlatTree } from '../utils'
import { TreeHooksType } from './type/use-tree-type'
import { useCheck } from './use-check'
import { useDragDrop } from './use-dragdrop'
import { useExpand } from './use-expand'
import { useLazyLoad } from './use-lazy-load'
import { useOperation } from './use-operation'
import { useTreeCore } from './use-tree-core'

export function useTree(
  node: Ref<ITreeNode[]> | ITreeNode[],
  props: TreeProps,
  context: SetupContext
): TreeHooksType {
  // 做一个扁平化处理
  const flatTreeData = ref(generateFlatTree(unref(node)))
  const core = useTreeCore(flatTreeData)
  const hooksList = [useCheck, useExpand, useOperation]
  const lazyLoad = useLazyLoad(flatTreeData, core, context)
  const dragDropPlugin = useDragDrop(flatTreeData, core, props.dragdrop)
  const hooksFunction = hooksList.reduce((resObj, curHook) => {
    return { ...resObj, ...curHook(flatTreeData, core, context, lazyLoad) }
  }, {})
  return {
    ...hooksFunction,
    ...core,
    ...dragDropPlugin,
    flatTreeData
  } as TreeHooksType
}
