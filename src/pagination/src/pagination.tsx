import { computed, defineComponent, toRefs } from 'vue'
import usePage from './hooks/use-page'
import { PaginationProps, paginationProps } from './pagination-type'
import { getCenterPage } from './utils'

export default defineComponent({
  name: 'GPagination',
  props: paginationProps,
  setup(props: PaginationProps) {
    const { total, pageSize } = toRefs(props)
    const calcTotalPage = computed(() => {
      return Math.ceil(total.value / pageSize.value)
    })
    const { pageIndex, setPageIndex, jumpToPageIndex, nextPage, prePage } =
      usePage()
    const centerPages = computed(() => {
      return getCenterPage(calcTotalPage.value, pageIndex.value, pageSize.value)
    })
    return () => {
      return (
        <div class="s-pagination">
          <button onClick={() => prePage()}>上一页</button>
          <ul class="s-pager">
            <li
              onClick={() => setPageIndex(1)}
              class={{ current: pageIndex.value === 1 }}
            >
              1
            </li>
            {calcTotalPage.value > pageSize.value &&
              pageIndex.value > Math.ceil(pageSize.value / 2) && (
                <li class="more left" onClick={() => jumpToPageIndex(-5)}>
                  ...
                </li>
              )}
            {centerPages.value.map(page => (
              <li
                onClick={() => setPageIndex(page)}
                class={{ current: pageIndex.value === page }}
              >
                {page}
              </li>
            ))}
            {calcTotalPage.value > pageSize.value &&
              pageIndex.value <
                calcTotalPage.value - Math.ceil(pageSize.value / 2) + 1 && (
                <li class="more right" onClick={() => jumpToPageIndex(5)}>
                  ...
                </li>
              )}
            {calcTotalPage.value > 1 && (
              <li
                onClick={() => setPageIndex(calcTotalPage.value)}
                class={{ current: pageIndex.value === calcTotalPage.value }}
              >
                {calcTotalPage.value}
              </li>
            )}
          </ul>
          <button onClick={() => nextPage(calcTotalPage.value)}>下一页</button>
        </div>
      )
    }
  }
})
