import { computed, defineComponent, ref, toRefs } from 'vue'
import { IInnerTreeNode, TreeProps, treeProps } from './tree-type'
import { generateInnerTree } from './utils'

export default defineComponent({
  name: 'GTree',
  props: treeProps,
  setup(props: TreeProps) {
    const { data } = toRefs(props)
    const innerData = ref(generateInnerTree(data.value))
    const expandedNode = (node: IInnerTreeNode) => {
      const cur = innerData.value.find(item => item.id === node.id)
      if (cur) {
        cur.expanded = !cur.expanded
      }
    }
    // 获取结点子元素
    const excludeChildNodes: (node: IInnerTreeNode) => IInnerTreeNode[] = (
      node: IInnerTreeNode
    ) => {
      const res: IInnerTreeNode[] = []
      const startIndex = innerData.value.findIndex(item => item.id === node.id)
      for (
        let i = startIndex + 1;
        i < innerData.value.length && node.level < innerData.value[i].level;
        i++
      ) {
        res.push(innerData.value[i])
      }
      return res
    }
    // 获取展开的结点列表
    const getExpandedNodeList = computed(() => {
      let excludeNodes: IInnerTreeNode[] = []
      const resultNodes: IInnerTreeNode[] = []
      for (const node of innerData.value) {
        // 此次node在excludeNodes中，跳过此次循环
        if (excludeNodes.includes(node)) {
          continue
        }
        // 没展开，排除子结点
        if (node.expanded !== true) {
          excludeNodes = excludeChildNodes(node)
        }
        resultNodes.push(node)
      }
      return resultNodes
    })

    return () => {
      return (
        <div class="s-tree">
          {getExpandedNodeList?.value.map(node => {
            const { level, isLeaf, expanded } = node
            return (
              <div
                class="s-tree-node"
                style={{ paddingLeft: `${24 * (level - 1)}px` }}
              >
                {/* 折叠图标 */}
                {isLeaf ? (
                  <span
                    style={{ display: 'inline-block', width: '25px' }}
                  ></span>
                ) : (
                  <svg
                    onClick={() => expandedNode(node)}
                    style={{
                      width: '18px',
                      height: '18px',
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
                {node.label}
              </div>
            )
          })}
        </div>
      )
    }
  }
})
