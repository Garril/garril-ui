import { defineComponent, inject, toRefs, unref } from 'vue'
import { NODE_LEFT_INDENT, NODE_HEIGHT } from '../constant'
import { TreeHooksType, TreeNodeProps, treeNodeProps } from './tree-node-type'

export default defineComponent({
  name: 'GTreeNode',
  props: treeNodeProps,
  setup(props: TreeNodeProps, { slots }) {
    const { lineable, checkable, node } = toRefs(props)
    /*const { clickExpandedNode, effectOtherTreeNode, getChildNodes } =
      inject<TreeHooksType>('TREE_HOOKS') as any 
      or
      const { clickExpandedNode, effectOtherTreeNode, getChildNodes } =
      inject<TreeHooksType>('TREE_HOOKS', {}, {}, {})
      or
    */
    const { clickExpandedNode, effectOtherTreeNode, getChildNodes } = inject(
      'TREE_HOOKS'
    ) as TreeHooksType
    return () => {
      // eslint-disable-next-line prefer-const
      let { level, expanded, isLeaf, checked, label } = unref(node)
      return (
        <div
          class="s-tree-node hover:bg-slate-300 relative leading-8"
          style={{
            paddingLeft: `${NODE_LEFT_INDENT * (level - 1)}px`
          }}
        >
          {/* 连接线 */}
          {!isLeaf && expanded && lineable.value && (
            <span
              class="s-tree-node_line absolute w-px bg-gray-400"
              style={{
                height: `${
                  NODE_HEIGHT * getChildNodes(node.value, false).length
                }px`,
                top: `${NODE_HEIGHT}px`,
                left: `${NODE_LEFT_INDENT * (level - 1) + 9}px`
              }}
            ></span>
          )}
          {/* 折叠图标 */}
          {isLeaf ? (
            <span style={{ display: 'inline-block', width: '25px' }}></span>
          ) : (
            slots.icon?.()
          )}
          {/* 复选框 */}
          {checkable.value && (
            <input
              type="checkbox"
              v-model={checked}
              style={{ marginRight: '8px' }}
              onClick={() => effectOtherTreeNode(node.value)}
            ></input>
          )}
          {/* 标签内容*/}
          {slots.content?.()}
        </div>
      )
    }
  }
})
