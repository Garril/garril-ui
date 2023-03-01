import { Ref, ref, unref } from 'vue'
import { ITreeNode } from '../tree-type'
import { generateFlatTree } from '../utils'
import { TreeHooksType } from './type/use-tree-type'
import { useCheck } from './use-check'
import { useExpand } from './use-expand'
import { useOperation } from './use-operation'
import { useTreeCore } from './use-tree-core'

export function useTree(node: Ref<ITreeNode[]> | ITreeNode[]): TreeHooksType {
  // 做一个扁平化处理
  const innerData = ref(generateFlatTree(unref(node)))
  const core = useTreeCore(innerData)
  const hooksList = [useCheck, useExpand, useOperation]
  const hooksFunction = hooksList.reduce((resObj, curHook, curIndex, arr) => {
    return { ...resObj, ...curHook(innerData, core) }
  }, {})
  return {
    ...hooksFunction,
    ...core,
    innerData
  } as TreeHooksType
}
