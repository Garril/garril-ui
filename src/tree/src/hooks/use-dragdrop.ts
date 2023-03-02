/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { computed, reactive, Ref } from 'vue'
import { IFlatTreeNode } from '../tree-type'
import {
  DragDropType,
  DragState,
  DropType,
  UseDraggable,
  UseTreeCoreType
} from './type/use-tree-type'

const DropTypeMap = {
  prev: 's-tree__node--drop-prev',
  next: 's-tree__node--drop-next',
  inner: 's-tree__node--drop-inner'
}

export function useDragDrop(
  flatTreeData: Ref<IFlatTreeNode[]>,
  { getChildNodes, getParentNode }: UseTreeCoreType,
  dragdrop: DragDropType
): UseDraggable {
  const dragState = reactive<DragState>({
    dropType: undefined,
    draggingHtmlNode: null,
    draggingTreeNode: null
  })
  const resetDragState = () => {
    dragState.dropType = undefined
    dragState.draggingHtmlNode = null
    dragState.draggingTreeNode = null
  }
  const treeIdMapValue = computed<Record<string | number, IFlatTreeNode>>(
    () => {
      return flatTreeData.value.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.id!]: cur
        }),
        {}
      )
    }
  )

  const removeDraggingStyle = (target: HTMLElement | null) => {
    target?.classList.remove(...Object.values(DropTypeMap))
  }

  const IsChildParent = (
    childNodeId: number | string,
    parentNodeId: number | string
  ): boolean => {
    const realParentId = treeIdMapValue.value[childNodeId]?.parentId
    if (realParentId === parentNodeId) {
      return true
    } else if (realParentId !== undefined) {
      return IsChildParent(realParentId, parentNodeId)
    } else {
      return false
    }
  }

  // 拖拽起始
  const onDragStart = (event: DragEvent, node: IFlatTreeNode): void => {
    event.stopPropagation()
    dragState.draggingHtmlNode = event.target as HTMLElement | null
    dragState.draggingTreeNode = node
    // 将正在拖拽的数据节点id存入dataTransfer，未来需要在drop的时候取出来
    event.dataTransfer?.setData('dragNodeId', node.id!)
  }

  const onDragOver = (event: DragEvent): void => {
    event.preventDefault()
    event.stopPropagation()
    if (!dragState.draggingHtmlNode) {
      return
    }

    if (dragdrop) {
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }

      if (!flatTreeData) {
        return
      }
      let curDropType: DropType = {}
      if (typeof dragdrop === 'object') {
        curDropType = dragdrop
      } else if (dragdrop === true) {
        curDropType = { inner: true }
      }
      const { prev, next, inner } = curDropType

      let innerDropType: DragState['dropType']

      const prevPercent = prev ? (inner ? 0.25 : next ? 0.45 : 1) : -1
      const nextPercent = next ? (inner ? 0.75 : prev ? 0.55 : 0) : 1
      const currentTarget = event.currentTarget as HTMLElement | null
      const targetPosition = currentTarget?.getBoundingClientRect()
      const distance = event.clientY - (targetPosition?.top || 0)

      if (distance < (targetPosition?.height || 0) * prevPercent) {
        innerDropType = 'prev'
      } else if (distance > (targetPosition?.height || 0) * nextPercent) {
        innerDropType = 'next'
      } else if (inner) {
        innerDropType = 'inner'
      } else {
        innerDropType = undefined
      }
      if (innerDropType) {
        const classList = currentTarget?.classList
        if (classList) {
          if (!classList.contains(DropTypeMap[innerDropType])) {
            removeDraggingStyle(currentTarget)
            classList.add(DropTypeMap[innerDropType])
          }
        }
      } else {
        removeDraggingStyle(currentTarget)
      }
      dragState.dropType = innerDropType
    }
  }

  const onDragLeave = (event: DragEvent): void => {
    event.stopPropagation()
    if (!dragState.draggingHtmlNode) {
      return
    }
    removeDraggingStyle(event.currentTarget as HTMLElement | null)
  }

  // 释放事件回调
  const onDrop = (event: DragEvent, targetNode: IFlatTreeNode): void => {
    event.preventDefault()
    event.stopPropagation()
    removeDraggingStyle(event.currentTarget as HTMLElement | null)
    if (!dragState.draggingHtmlNode || !dragdrop) return

    // 获取正在被拖拽的树节点id
    const dragNodeId = event.dataTransfer?.getData('dragNodeId')
    if (dragNodeId) {
      // 判断释放节点 是否是 被拖拽的节点的子节点（不合理）
      const isParent = IsChildParent(targetNode.id!, dragNodeId)
      // 如果拖拽和释放是同一节点或者是父子关系则跳出
      if (dragNodeId === targetNode.id || isParent) {
        return
      }
      // 判断当前释放类型：prev、next或inner
      if (dragState.dropType) {
        handleDrop(dragNodeId, targetNode)
      }

      resetDragState()
    }
  }

  // 释放之后的节点操作
  function handleDrop(dragNodeId: string, dropNode: IFlatTreeNode) {
    // 获取正在拖拽的节点
    const dragNode = flatTreeData.value.find(item => item.id === dragNodeId)

    if (dragNode) {
      // 备份一个节点
      let cloneDragNode: IFlatTreeNode
      // 获取拖拽节点子节点
      const dragNodeChildren = getChildNodes(dragNode)
      // 获取拖拽节点的父节点
      const dragNodeParent = getParentNode(dragNode)

      // 如果是嵌套释放情况
      if (dragState.dropType === 'inner') {
        cloneDragNode = {
          ...dragNode,
          parentId: dropNode.id,
          level: dropNode.level + 1
        }
        // 插入克隆节点
        const dropNodeIndex = flatTreeData.value.indexOf(dropNode)
        flatTreeData.value.splice(dropNodeIndex + 1, 0, cloneDragNode)
        // 需要改进，如果改为false，会对懒加载产生影响
        dropNode.isLeaf = undefined
        // 删除旧拖拽节点
        const dragNodeIndex = flatTreeData.value.indexOf(dragNode)
        flatTreeData.value.splice(dragNodeIndex, 1)
      } else if (dragState.dropType === 'next') {
        cloneDragNode = {
          ...dragNode,
          parentId: dropNode.parentId,
          level: dropNode.level
        }
        // drop节点可能有自己的孩子，这时候
        // drag节点就要放到（扁平数组中的）drop节点的最后一个孩子的index+1
        const dropNodeIndex = flatTreeData.value.indexOf(dropNode)
        const dropNodeChildrenLength = getChildNodes(dropNode, true).length
        flatTreeData.value.splice(
          dropNodeIndex + dropNodeChildrenLength + 1,
          0,
          cloneDragNode
        )
        const dragNodeIndex = flatTreeData.value.indexOf(dragNode)
        flatTreeData.value.splice(dragNodeIndex, 1)
      } else if (dragState.dropType === 'prev') {
        cloneDragNode = {
          ...dragNode,
          parentId: dropNode.parentId,
          level: dropNode.level
        }
        const dropNodeIndex = flatTreeData.value.indexOf(dropNode)
        flatTreeData.value.splice(dropNodeIndex, 0, cloneDragNode)
        const dragNodeIndex = flatTreeData.value.indexOf(dragNode)
        flatTreeData.value.splice(dragNodeIndex, 1)
      }

      // 如果拖拽的是有子节点的节点，所有子节点也应该以inner方式被移动
      dragState.dropType = 'inner'
      dragNodeChildren.forEach(child => handleDrop(child.id!, cloneDragNode))

      // 拖拽结束，可能被往外拖拽走的节点，是父节点唯一节点，处理父节点isLeaf状态
      if (dragNodeParent) {
        if (getChildNodes(dragNodeParent).length === 0) {
          dragNodeParent.isLeaf = true
        }
      }
    }
  }
  const onDragEnd = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    resetDragState()
  }
  return {
    onDragStart,
    onDragOver,
    onDragLeave,
    onDragEnd,
    onDrop
  }
}
