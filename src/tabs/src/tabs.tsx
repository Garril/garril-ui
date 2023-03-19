import { defineComponent, provide, ref } from 'vue'
import { TabsProps, tabsProps } from './tabs-type'

export default defineComponent({
  name: 'GTabs',
  props: tabsProps,
  emits: ['update:modelValue'],
  setup(props: TabsProps, { slots, emit }) {
    // tab选项卡可选的数据
    const tab_data = ref<Array<{ title: string; id: string }>>([])
    // 当前active的tab
    const activeTab = ref<string>(props.modelValue)
    // 提供activeTab
    provide('CUR_ACTIVE_TAB', activeTab)
    // 切换了tab
    const changeActiveTab = (id: string) => {
      activeTab.value = id
      emit('update:modelValue', id)
    }
    /* 
      这里，我们需要data是一个数组，但是不是写死的，要动态生成的
      然而我们的数据(id和title属性)，是直接传入tab-item，
      需要从他那里去拿,所以provide，inject一个数组，让子组件push
    */
    provide('TAB_DATA', tab_data)
    const idSet = ref<Set<string>>(new Set())
    provide('SET_FOR_TEST', idSet)
    return () => (
      <div class="s-tabs">
        {/* tab栏 */}
        <ul class="s-tabs-ul">
          {tab_data.value.map(tab => {
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
        {/* 内容 -- tab-item */}
        {slots.default?.()}
      </div>
    )
  }
})
