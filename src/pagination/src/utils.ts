export function getCenterPage(
  calcTotalPage: number, // 计算出的总页码
  pageIndex: number, // 当前页码
  pageCount: number // 底部显示的页数按钮 数量
) {
  // 首页和尾页 两个按钮固定显示，且数组代表页码，
  // 所以0不要，而且末页页码不在数组中
  const totalPageArr = Array.from({ length: calcTotalPage }, (v, i) => i)
  // eg: calcTotalPage = 5 --> totalPageArr: [0,1,2,3,4]
  if (calcTotalPage <= pageCount) {
    // eg: calcTotalPage = 5，totalPageArr = [0,1,2,3,4], pageCount = 6
    // 要取 [2,3,4]，1是首页，5是末页
    // 全显示
    return totalPageArr.slice(2, calcTotalPage)
  } else {
    // 中位数
    const mid = Math.ceil(pageCount / 2)
    // totalPageArr = [0,1,2,3,4,5,6,7,8]，calcTotalPage = 9, pageCount = 7 --> mid = 4
    if (pageIndex <= mid) {
      // pageIndex = 2/3/4
      // 要取[2,3,4,5,6] ---> slice(2,7)
      // 左边全显示
      return totalPageArr.slice(2, pageCount)
    } else if (pageIndex >= calcTotalPage - mid + 1) {
      // pageIndex = 6/7/8 (与前面不同，前面1是首位不能取，这里8不是末尾可取)
      // 要取[4,5,6,7,8]  ---> slice(4,9)
      // 右边全显示
      return totalPageArr.slice(calcTotalPage - pageCount + 2, calcTotalPage)
    } else {
      // pageIndex = 5
      // 要取[3,4,5,6,7] ---> slice(3,8)
      // 中间显示
      return totalPageArr.slice(pageIndex - mid + 2, pageIndex + mid - 1)
    }
  }
}
