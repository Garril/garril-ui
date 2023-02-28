import { defineComponent, inject, provide, toRefs } from 'vue'

import { useTree } from './hooks/use-tree'
import { IFlatTreeNode, TreeProps, treeProps } from './tree-type'
import GTreeNode from './components/tree-node'
import GTreeSvg from './components/tree-node-svg'
export default defineComponent({
  name: 'GTree',
  props: treeProps,
  setup(props: TreeProps, { slots }) {
    // checkable和lineable已经{...props}传入
    const { data } = toRefs(props)
    const {
      clickExpandedNode,
      getExpandedNodeList,
      effectOtherTreeNode,
      getChildNodes
    } = useTree(data)
    provide('TREE_HOOKS', {
      clickExpandedNode,
      effectOtherTreeNode,
      getChildNodes
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
