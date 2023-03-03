import { defineComponent, provide, SetupContext, toRefs } from 'vue'

import { useTree } from './hooks/use-tree'
import { IFlatTreeNode, TreeProps, treeProps } from './tree-type'
import GTreeNode from './components/tree-node'
import GTreeSvg from './components/node-slots-svg'
import '../style/tree.scss'

export default defineComponent({
  name: 'GTree',
  props: treeProps,
  emits: ['lazy-load'],
  setup(props: TreeProps, context) {
    // checkable、lineable、operable 已经{...props}传入
    const { data } = toRefs(props)
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
      return (
        <div class="s-tree">
          {getExpandedNodeList?.value.map((node: IFlatTreeNode) => {
            return (
              <GTreeNode {...props} node={node}>
                {{
                  content: () =>
                    slots.content ? slots.content(node) : node.label,
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
          })}
        </div>
      )
    }
  }
})
