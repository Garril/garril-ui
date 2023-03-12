import { computed, defineComponent, toRefs, watch } from 'vue'
import usePage from '../hooks/use-page'
import { getCenterPage } from '../utils'
import { pagerProps, PagerProps } from './pager-type'

export default defineComponent({
  name: 'GPager',
  props: pagerProps,
  emits: ['updatePagerIndex'],
  setup(props: PagerProps, { emit }) {
    const { total, pageSize, pageCount } = toRefs(props)
    const calcTotalPage = computed(() => {
      return Math.ceil(total.value / pageSize.value)
    })
    const centerPages = computed(() => {
      return getCenterPage(
        calcTotalPage.value,
        pageIndex.value,
        pageCount.value
      )
    })
    const { pageIndex, setPageIndex, jumpToPageIndex, nextPage, prePage } =
      usePage()
    watch(
      () => pageIndex.value,
      newVal => {
        emit('updatePagerIndex', newVal)
      }
    )
    return {
      pageCount,
      calcTotalPage,
      centerPages,
      pageIndex,
      setPageIndex,
      jumpToPageIndex,
      nextPage,
      prePage
    }
  },
  render() {
    const {
      pageCount,
      calcTotalPage,
      centerPages,
      pageIndex,
      setPageIndex,
      jumpToPageIndex
    } = this
    // 别写箭头函数
    return (
      <ul class="s-pager">
        <li
          onClick={() => setPageIndex(1)}
          class={{ current: pageIndex === 1 }}
        >
          1
        </li>
        {calcTotalPage > pageCount && pageIndex > Math.ceil(pageCount / 2) && (
          <li
            class="ellipsis_left"
            onClick={() => jumpToPageIndex(-5, calcTotalPage)}
          >
            ...
          </li>
        )}
        {centerPages.map(page => (
          <li
            onClick={() => setPageIndex(page)}
            class={{ current: pageIndex === page }}
          >
            {page}
          </li>
        ))}
        {calcTotalPage > pageCount &&
          pageIndex < calcTotalPage - Math.ceil(pageCount / 2) + 1 && (
            <li
              class="ellipsis_right"
              onClick={() => jumpToPageIndex(5, calcTotalPage)}
            >
              ...
            </li>
          )}
        {calcTotalPage > 1 && (
          <li
            onClick={() => setPageIndex(calcTotalPage)}
            class={{ current: pageIndex === calcTotalPage }}
          >
            {calcTotalPage}
          </li>
        )}
      </ul>
    )
  }
})
