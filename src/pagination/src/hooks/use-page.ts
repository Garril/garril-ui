import { ref } from 'vue'

export default function usePage(defaultPageIndex = 1) {
  // page number
  const pageIndex = ref(defaultPageIndex)
  // set page number
  const setPageIndex = (cur: number) => {
    pageIndex.value = cur
  }
  // jump how many pages to
  const jumpToPageIndex = (step: number) => {
    pageIndex.value += step
  }
  // previous page
  const prePage = () => {
    if (pageIndex.value - 1 > 0) jumpToPageIndex(-1)
  }
  // next page
  const nextPage = (calcTotalPage: number) => {
    if (pageIndex.value + 1 <= calcTotalPage) jumpToPageIndex(1)
  }
  // click numbers to jump
  // double arrow -- quick to
  // double arrow -- quick back
  return {
    pageIndex,
    setPageIndex,
    jumpToPageIndex,
    prePage,
    nextPage
  }
}
