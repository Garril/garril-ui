export function getCenterPage(
  totalPage: number, // 总页码
  pageIndex: number, // 当前页码
  pageSize: number // 页的条目数
) {
  const totalPageArr = Array.from({ length: totalPage }, (v, i) => i)
  if (totalPage <= pageSize) {
    return totalPageArr.slice(2, totalPage)
  } else {
    const mid = Math.ceil(pageSize / 2)
    if (pageIndex <= mid) {
      return totalPageArr.slice(2, pageSize)
    } else if (pageIndex >= totalPage - mid + 1) {
      return totalPageArr.slice(totalPage - pageSize + 2, totalPage)
    } else {
      return totalPageArr.slice(pageIndex - mid + 2, pageIndex + mid - 1)
    }
  }
}
