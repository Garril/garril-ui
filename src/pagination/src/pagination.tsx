import { computed, defineComponent, ref, toRefs } from 'vue'
import Pager from './components/pager'
import { PaginationProps, paginationProps } from './pagination-type'

export default defineComponent({
  name: 'GPagination',
  props: paginationProps,
  setup(props: PaginationProps) {
    const { total, pageSize } = toRefs(props)
    const calcTotalPage = computed(() => {
      return Math.ceil(total.value / pageSize.value)
    })
    const pagerRef = ref<InstanceType<typeof Pager>>()
    return () => {
      return (
        <div class="s-pagination">
          <button onClick={() => pagerRef.value?.prePage(calcTotalPage.value)}>
            上一页
          </button>
          <Pager {...props} ref={pagerRef}></Pager>
          <button onClick={() => pagerRef.value?.nextPage(calcTotalPage.value)}>
            下一页
          </button>
        </div>
      )
    }
  }
})
