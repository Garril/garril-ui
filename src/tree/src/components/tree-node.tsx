import { defineComponent, inject, toRefs, unref, ref } from 'vue'
import { NODE_LEFT_INDENT, NODE_HEIGHT } from '../constant'
import { IFlatTreeNode } from '../tree-type'
import {
  TreeInjectType,
  TreeNodeProps,
  treeNodeProps
} from './type/tree-node-type'

export default defineComponent({
  name: 'GTreeNode',
  props: treeNodeProps,
  setup(props: TreeNodeProps, { slots }) {
    const { lineable, checkable, node, operable, lazy, dragdrop } =
      toRefs(props)
    /*const { clickExpandedNode, checkTreeNode, getChildNodes } =
      inject<TreeInjectType>('TREE_HOOKS') as any 
      or
      const { clickExpandedNode, checkTreeNode, getChildNodes } =
      inject<TreeInjectType>('TREE_HOOKS', {}, {}, {})
      or
      const { clickExpandedNode, checkTreeNode, getChildNodes } =
      inject('TREE_HOOKS') as TreeInjectType
    */
    const {
      checkTreeNode,
      getChildNodes,
      appendTreeNode,
      removeTreeNode,
      onDragStart,
      onDragOver,
      onDragLeave,
      onDragEnd,
      onDrop
    } = inject('TREE_HOOKS') as TreeInjectType
    const isShow = ref(false)
    const mouseOperation = () => {
      if (isShow.value) {
        isShow.value = false
      } else {
        isShow.value = true
      }
    }
    // 构造drag属性对象
    let dragDropProps = {}
    // 坑：事件绑定 onDragend/onDragleave....而不是 onDragEnd/onDragLeave....
    if (dragdrop.value) {
      dragDropProps = {
        draggable: true,
        onDragend: (event: DragEvent) => onDragEnd(event),
        onDragleave: (event: DragEvent) => onDragLeave(event),
        onDragover: (event: DragEvent) => onDragOver(event),
        onDragstart: (event: DragEvent) => onDragStart(event, node.value),
        onDrop: (event: DragEvent) => onDrop(event, node.value)
      }
    }
    return () => {
      // eslint-disable-next-line prefer-const
      let { level, expanded, isLeaf, checked } = unref(node)
      return (
        <div
          class="s-tree-node hover:bg-slate-300 relative leading-8"
          style={{
            paddingLeft: `${NODE_LEFT_INDENT * (level - 1)}px`
          }}
          onMouseenter={mouseOperation}
          onMouseleave={mouseOperation}
        >
          {/* 连接线 */}
          {!isLeaf && expanded && lineable.value && (
            <span
              class="s-tree-node--line absolute w-px bg-gray-400"
              style={{
                height: `${
                  NODE_HEIGHT * getChildNodes(node.value, false).length
                }px`,
                top: `${NODE_HEIGHT}px`,
                left: `${NODE_LEFT_INDENT * (level - 1) + 9}px`
              }}
            ></span>
          )}
          {/* 容器，节点内容 */}
          <div class="s-tree-node--content" {...dragDropProps}>
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
                onClick={() => checkTreeNode(node.value)}
              ></input>
            )}
            {/* 标签内容*/}
            {slots.content?.()}

            {/* 节点增删操作 */}
            {operable.value && isShow.value && (
              <span class="inline-flex ml-1">
                <svg
                  onClick={() => {
                    appendTreeNode(node.value, {
                      label: '新节点'
                    } as IFlatTreeNode)
                  }}
                  viewBox="0 0 1024 1024"
                  width="14"
                  height="14"
                  class="cursor-pointer"
                >
                  <path d="M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z"></path>
                </svg>
                <svg
                  onClick={() => {
                    removeTreeNode(node.value)
                  }}
                  viewBox="0 0 1024 1024"
                  width="14"
                  height="14"
                  class="cursor-pointer ml-1"
                >
                  <path d="M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"></path>
                </svg>
              </span>
            )}
            {/* loading状态显示 */}
            {lazy.value && node.value.loading && slots.loading?.()}
          </div>
        </div>
      )
    }
  }
})
