import { defineComponent, inject, Ref } from 'vue'
import { TabItemProps, tabItemProps } from './tab-item-type'

export default defineComponent({
  name: 'GTabItem',
  props: tabItemProps,
  setup(props: TabItemProps, { slots }) {
    const activeTab = inject('CUR_ACTIVE_TAB') as Ref<string>
    const tab_data = inject('TAB_DATA') as Ref<
      Array<{ title: string; id: string }>
    >
    const idSet = inject('SET_FOR_TEST') as Ref<Set<string>>
    tab_data.value.push({
      id: props.id,
      title: props.title
    })
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
