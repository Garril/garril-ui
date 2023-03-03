import { defineComponent, provide, SetupContext, toRefs } from 'vue'

import { useTree } from './hooks/use-tree'
import { IFlatTreeNode, TreeProps, treeProps } from './tree-type'
import GTreeNode from './components/tree-node'
import GTreeSvg from './components/node-slots-svg'
import '../style/tree.scss'
import { VirtualList } from '../../virtual-list/index'

export default defineComponent({
  name: 'GTree',
  props: treeProps,
  emits: ['lazy-load'],
  setup(props: TreeProps, context) {
    // checkable、lineable、operable 已经{...props}传入
    const { data, height, itemHeight } = toRefs(props)
    const { slots } = context
    const {
      clickExpandedNode,
      getExpandedNodeList,
      checkTreeNode,
      getChildNodes,
      appendTreeNode,
      removeTreeNode,
      onDragStart,
      onDragOver,
      onDragLeave,
      onDragEnd,
      onDrop
    } = useTree(data, props, context as SetupContext)
    provide('TREE_HOOKS', {
      clickExpandedNode,
      checkTreeNode,
      getChildNodes,
      appendTreeNode,
      removeTreeNode,
      onDragStart,
      onDragOver,
      onDragLeave,
      onDragEnd,
      onDrop
    })
    return () => {
      const TreeNode = (node: IFlatTreeNode) => (
        <GTreeNode {...props} node={node}>
          {{
            content: () => (slots.content ? slots.content(node) : node.label),
            icon: () =>
              slots.icon ? (
                slots.icon({ node, clickExpandedNode })
              ) : (
                <GTreeSvg
                  expanded={!!node.expanded}
                  onClick={() => clickExpandedNode(node)}
                ></GTreeSvg>
              ),
            loading: () =>
              slots.loading ? (
                slots.loading({ node })
              ) : (
                <span class="ml-1">loading...</span>
              )
          }}
        </GTreeNode>
      )
      return (
        <div class="s-tree">
          {height?.value ? (
            // 虚拟列表
            <div style={{ height: `${height.value}px` }}>
              <VirtualList
                data={getExpandedNodeList?.value}
                itemHeight={itemHeight.value}
              >
                {{
                  default: ({ item: node }: { item: IFlatTreeNode }) =>
                    TreeNode(node)
                }}
              </VirtualList>
            </div>
          ) : (
            getExpandedNodeList?.value.map((node: IFlatTreeNode) => {
              return TreeNode(node)
            })
          )}
        </div>
      )
    }
  }
})
