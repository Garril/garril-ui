import { defineComponent } from 'vue'
import { TabItemProps, tabItemProps } from './tab-item-type'

export default defineComponent({
  name: 'GTabItem',
  props: tabItemProps,
  setup(props: TabItemProps, { slots }) {
    return () => <div class="s-tab-item">{slots.default?.()}</div>
  }
})
