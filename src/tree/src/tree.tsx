import { computed, defineComponent, toRefs } from 'vue'
import { NODE_LEFT_INDENT, NODE_HEIGHT } from './constant'
import { useTree } from './hooks/use-tree'
import { TreeProps, treeProps } from './tree-type'

export default defineComponent({
  name: 'GTree',
  props: treeProps,
  setup(props: TreeProps, { slots }) {
    const { data, checkable } = toRefs(props)
    const {
      clickExpandedNode,
      getExpandedNodeList,
      effectOtherTreeNode,
      getChildNodes
    } = useTree(data)
    return () => {
      return (
        <div class="s-tree">
          {getExpandedNodeList?.value.map(node => {
            const { level, isLeaf, expanded } = node
            return (
              <div
                class="s-tree-node hover:bg-slate-300 relative leading-8"
                style={{
                  paddingLeft: `${NODE_LEFT_INDENT * (level - 1)}px`
                }}
              >
                {/* 连接线 */}
                {!node.isLeaf && node.expanded && (
                  <span
                    class="s-tree-node_line absolute w-px bg-gray-400"
                    style={{
                      height: `${
                        NODE_HEIGHT * getChildNodes(node, false).length
                      }px`,
                      top: `${NODE_HEIGHT}px`,
                      left: `${NODE_LEFT_INDENT * (level - 1) + 8}px`
                    }}
                  ></span>
                )}
                {/* 折叠图标 */}
                {isLeaf ? (
                  <span
                    style={{ display: 'inline-block', width: '25px' }}
                  ></span>
                ) : slots.icon ? (
                  slots.icon({ node, clickExpandedNode })
                ) : (
                  <svg
                    onClick={() => clickExpandedNode(node)}
                    style={{
                      width: '18px',
                      height: '18px',
                      verticalAlign: 'text-top',
                      display: 'inline-block',
                      transform: expanded ? 'rotate(90deg)' : ''
                    }}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M384 192v640l384-320.064z"
                    ></path>
                  </svg>
                )}
                {/* 复选框 */}
                {checkable.value && (
                  <input
                    type="checkbox"
                    v-model={node.checked}
                    style={{ marginRight: '8px' }}
                    onClick={() => effectOtherTreeNode(node)}
                  ></input>
                )}
                {/* 标签内容*/}
                {slots.content ? slots.content(node) : node.label}
              </div>
            )
          })}
        </div>
      )
    }
  }
})
