import { defineComponent, inject, Ref } from 'vue'
import { TabDataType } from '../tabs-type'
import { TabItemProps, tabItemProps } from './tab-item-type'

export default defineComponent({
  name: 'GTabItem',
  props: tabItemProps,
  setup(props: TabItemProps, { slots }) {
    // 拿到当前active的tab
    const activeTab = inject('CUR_ACTIVE_TAB') as Ref<string>
    // 把tab_item的信息传给tabs
    const tab_data = inject('TAB_DATA') as Ref<TabDataType>
    tab_data.value.push({
      id: props.id,
      title: props.title
    })
    // 提示id不唯一
    const idSet = inject('SET_FOR_TEST') as Ref<Set<string>>
    idSet.value.add(props.id)
    if (idSet.value.size !== tab_data.value.length) {
      console.warn('tab item id should be unique!')
    }
    return () => (
      <>
        {props.id === activeTab.value && (
          <div class="s-tab-item">{slots.default?.()}</div>
        )}
      </>
    )
  }
})
