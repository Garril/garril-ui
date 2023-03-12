import { ref } from 'vue'

export default function usePage(defaultPageIndex = 1) {
  // page number
  const pageIndex = ref(defaultPageIndex)
  // set page number -- click numbers to jump
  const setPageIndex = (cur: number) => {
    pageIndex.value = cur
  }
  // jump how many pages to ( double arrow -- quick to or back )
  const jumpToPageIndex = (step: number, calcTotalPage?: number) => {
    let res = pageIndex.value + step
    if (calcTotalPage && res > calcTotalPage) {
      res = calcTotalPage
    } else if (res < 1) {
      res = 1
    }
    pageIndex.value = res
  }
  // previous page
  const prePage = (calcTotalPage: number) => {
    jumpToPageIndex(-1, calcTotalPage)
  }
  // next page
  const nextPage = (calcTotalPage: number) => {
    jumpToPageIndex(1, calcTotalPage)
  }
  return {
    pageIndex,
    setPageIndex,
    jumpToPageIndex,
    prePage,
    nextPage
  }
}
