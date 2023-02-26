import { defineComponent, ref, toRefs } from 'vue'
import { TreeProps, treeProps } from './tree-type'
import { generateInnerTree } from './utils'

export default defineComponent({
  name: 'GTree',
  props: treeProps,
  setup(props: TreeProps) {
    const { data } = toRefs(props)
    const innerData = ref(generateInnerTree(data.value))
    return () => {
      return (
        <div class="s-tree">
          {innerData?.value.map(node => {
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
