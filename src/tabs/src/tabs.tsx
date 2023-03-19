import { defineComponent, ref } from 'vue'
import { TabsProps, tabsProps } from './tabs-type'

export default defineComponent({
  name: 'GTabs',
  props: tabsProps,
  emits: ['update:modelValue'],
  setup(props: TabsProps, { slots, emit }) {
    const data = ref([
      { id: 'home', title: 'home' },
      { id: 'radio', title: 'radio' },
      { id: 'article', title: 'article' }
    ])
    const activeTab = ref(props.modelValue)
    const changeActiveTab = (id: string) => {
      activeTab.value = id
      emit('update:modelValue', id)
    }
    return () => (
      <div class="s-tabs">
        {/* tab栏 */}
        <ul class="s-tabs-ul">
          {data.value.map(tab => {
            return (
              <li
                class={tab.id === activeTab.value ? 's-tabs-li-active' : ''}
                onClick={() => changeActiveTab(tab.id)}
              >
                {tab.title}
              </li>
            )
          })}
        </ul>
        {activeTab.value}
        {/* 内容 */}
        {slots.default?.()}
      </div>
    )
  }
})
