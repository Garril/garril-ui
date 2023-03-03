import { computed, defineComponent, onMounted, ref, toRefs } from 'vue'
import { VirtualListProps, virtualListProps } from './virtual-list-type'
import '../style/virtual-list.scss'

export default defineComponent({
  name: 'GVirtualList',
  props: virtualListProps,
  setup(props: VirtualListProps, { slots }) {
    const { data, itemHeight, component: Component } = toRefs(props)
    // 容器高度
    const containerHeight = ref(0)
    // 起始索引
    const startIndex = ref(0)
    // 容器ref
    const containerRef = ref()
    // 列表在Y轴的偏移量
    const offsetY = ref(0)

    // 可视区列表元素数量
    const visibleCount = computed(() =>
      Math.ceil(containerHeight.value / itemHeight.value)
    )
    // 可视区域的数据
    const visibleData = computed(() => {
      // 防止最后范围过大出bug
      const limitedLen = Math.min(
        startIndex.value + visibleCount.value,
        data.value.length
      )
      return data.value.slice(startIndex.value, limitedLen)
    })

    // 容器高度自适应
    onMounted(() => {
      containerHeight.value = containerRef.value?.clientHeight
    })

    const scrollEvent = (event: UIEvent) => {
      const { scrollTop } = event.target as HTMLElement
      // visibleData会相应的重新计算
      startIndex.value = Math.floor(scrollTop / itemHeight.value)
      // 改变列表元素在y轴的偏移量
      offsetY.value = scrollTop - (scrollTop % itemHeight.value)
    }

    return () => {
      return (
        <Component.value
          class="s-virtual-list--container"
          onScroll={scrollEvent}
          ref={containerRef}
        >
          <div
            class="s-virtual-list--blank"
            style={{ height: `${data.value.length * itemHeight.value}px` }}
          ></div>
          <div
            class="s-virtual-list"
            style={{ transform: `translate3d(0,${offsetY.value}px,0)` }}
          >
            {visibleData.value.map((item, index) =>
              slots.default?.({ item, index })
            )}
          </div>
        </Component.value>
      )
    }
  }
})
