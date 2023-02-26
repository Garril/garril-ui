import { defineComponent } from 'vue'
import { TreeProps, treeProps } from './tree-type'

export default defineComponent({
  name: 'GTree',
  props: treeProps,
  setup(props: TreeProps) {
    return () => {
      return <div class="s-tree"> i am the tree </div>
    }
  }
})
