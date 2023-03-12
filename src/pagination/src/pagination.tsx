import { computed, defineComponent, onMounted, ref, toRefs, watch } from 'vue'
import Pager from './components/pager'
import { PaginationProps, paginationProps } from './pagination-type'

export default defineComponent({
  name: 'GPagination',
  props: paginationProps,
  emits: ['update:curPageIndex'],
  setup(props: PaginationProps, { emit }) {
    const { total, pageSize } = toRefs(props)
    const pagerRef = ref<InstanceType<typeof Pager>>()
    const calcTotalPage = computed(() => {
      return Math.ceil(total.value / pageSize.value)
    })
    const disablePre = computed(() =>
      pagerRef.value ? pagerRef.value.pageIndex < 2 : true
    )
    const disableNext = computed(() =>
      pagerRef.value ? pagerRef.value.pageIndex >= calcTotalPage.value : true
    )
    const changePageIndex = (val: any) => {
      emit('update:curPageIndex', val)
    }
    onMounted(() => {
      watch(
        () => props.curPageIndex,
        (newVal: number) => {
          if (pagerRef.value) {
            pagerRef.value.setPageIndex(newVal)
          }
        }
      )
    })
    return () => {
      return (
        <div class="s-pagination">
          <button
            onClick={() => pagerRef.value?.prePage(calcTotalPage.value)}
            disabled={disablePre.value}
          >
            上一页
          </button>
          <Pager
            {...props}
            ref={pagerRef}
            onUpdatePagerIndex={(val: any) => changePageIndex(val)}
          ></Pager>
          <button
            onClick={() => pagerRef.value?.nextPage(calcTotalPage.value)}
            disabled={disableNext.value}
          >
            下一页
          </button>
        </div>
      )
    }
  }
})
