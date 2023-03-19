import { defineComponent, provide, ref } from 'vue'
import { randomId } from './utils'
import { TabDataType, TabsProps, tabsProps } from './tabs-type'

export default defineComponent({
  name: 'GTabs',
  props: tabsProps,
  emits: ['update:modelValue'],
  setup(props: TabsProps, { slots, emit }) {
    // tab选项卡可选的数据
    const tab_data = ref<TabDataType>([])
    provide('TAB_DATA', tab_data)

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
    const idSet = ref<Set<string>>(new Set())
    provide('SET_FOR_TEST', idSet)

    // 关闭/删除 tab页的方法
    const closeTab = (id: string) => {
      if (tab_data.value.length > 1) {
        const index = tab_data.value.findIndex(item => item.id === id)
        if (index !== -1) {
          activeTab.value = id
          tab_data.value.splice(index, 1)
          idSet.value.delete(id)
        }
      } else {
        console.warn('至少保留一个选项卡...')
      }
    }
    // 添加tab页的方法
    const newId = ref<string>('')
    const newContent = ref<string>('')
    const addTab = () => {
      newId.value = randomId(4)
      newContent.value = randomId(20)
      tab_data.value.push({
        id: newId.value,
        title: 'new tab',
        content: newContent.value,
        type: 'dynamic'
      })
      activeTab.value = newId.value
    }

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
                {/* 关闭选项卡的按钮 */}
                {props.closeAble && (
                  <svg
                    onClick={() => closeTab(tab.id)}
                    style="margin-left: 8px;"
                    viewBox="0 0 1024 1024"
                    width="12"
                    height="12"
                  >
                    <path d="M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"></path>
                  </svg>
                )}
              </li>
            )
          })}
          {props.addAble && (
            <li>
              <svg
                onClick={addTab}
                viewBox="0 0 1024 1024"
                width="14"
                height="14"
              >
                <path d="M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z"></path>
              </svg>
            </li>
          )}
        </ul>
        {/* 内容 -- tab-item */}
        {slots.default?.()}
        {/* 新增的tab对应的内容 */}
        {tab_data.value
          .filter(tab => tab.type === 'dynamic')
          .map(tab => {
            return (
              tab.id === activeTab.value && (
                <div class="s-tab-item">{tab.content}</div>
              )
            )
          })}
      </div>
    )
  }
})
