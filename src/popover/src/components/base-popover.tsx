import { computePosition, arrow, offset, autoPlacement } from '@floating-ui/dom'
import { defineComponent, nextTick, onUnmounted, ref, toRefs, watch } from 'vue'
import { BasePopoverProps, basePopoverProps } from './base-popover-type'

export default defineComponent({
  name: 'GBasePopOver',
  props: basePopoverProps,
  emits: ['update:modalValue'],
  setup(props: BasePopoverProps, { slots, attrs }) {
    const { modelValue, hostDom, showArrow, placement } = toRefs(props)

    // 箭头ref
    const arrowRef = ref()
    // 气泡卡片
    const overlayRef = ref()

    // 计算定位
    const updatePosition = () => {
      const middleware = []
      if (showArrow.value) {
        middleware.push(offset(8))
        middleware.push(arrow({ element: arrowRef.value }))
      }
      // 用户如果没有设置placement，依靠autoPlacement中间件，做个自动调整定位
      if (!placement.value) {
        middleware.push(autoPlacement())
      }
      // 在滚动、窗口尺寸、宿主元素的位置大小发生变化。这3种情况下，需要重新自动调整定位
      computePosition(hostDom.value, overlayRef.value, {
        middleware,
        placement: placement.value || 'bottom'
      }).then(({ x, y, middlewareData, placement }) => {
        Object.assign(overlayRef.value.style, {
          left: x + 'px',
          top: y + 'px'
        })
        if (showArrow.value) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow!
          // 箭头的偏移量 和 border哪条边设置透明，需要一个映射表
          /* 获取当前所在边 (placement拿到当前定位的值，用外面placement.value也可)
            比如我现在拿到了 top-end */
          const currentSide = placement.split('-')[0]
          const staticSide = {
            // 反方向，气泡卡片在宿主bottom位置，箭头就应该是指向top
            top: 'bottom',
            bottom: 'top',
            left: 'right',
            right: 'left'
          }[currentSide]
          // 算法
          const SIDE = ['top', 'right', 'bottom', 'left']
          const preIndex = (SIDE.indexOf(currentSide) + 4 - 1) % 4
          const nextSide = SIDE[preIndex]
          // left和top计算之后，需要重新计算 箭头 的位置
          Object.assign(arrowRef.value.style, {
            left: arrowX + 'px',
            top: arrowY + 'px',
            [staticSide!]: '-4px',
            [`border-${currentSide}-color`]: 'transparent',
            [`border-${nextSide}-color`]: 'transparent'
          })
        }
      })
    }

    // 创建mutationserver监听宿主元素的状态变化
    const mutationObserver = new MutationObserver(entries => {
      // entries可以拿到变化的项，做相应的，粒度更小的更新，可优化
      updatePosition()
    })

    watch(
      modelValue,
      newVal => {
        if (newVal) {
          nextTick(updatePosition)
          // 监听两个事件 以及宿主元素尺寸、定位变化
          hostDom.value &&
            mutationObserver.observe(hostDom.value, { attributes: true })
          window.addEventListener('resize', updatePosition)
          window.addEventListener('scroll', updatePosition)
        } else {
          mutationObserver.disconnect()
          window.removeEventListener('resize', updatePosition)
          window.removeEventListener('scroll', updatePosition)
        }
      },
      {
        immediate: true
      }
    )
    // popover频繁的弹出和销毁
    onUnmounted(() => {
      mutationObserver.disconnect()
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition)
    })

    return () => (
      <>
        {modelValue.value && (
          <div ref={overlayRef} class="s-base-popover" {...attrs}>
            {/* 箭头 */}
            {showArrow.value && (
              <div class="s-base-popover--arrow" ref={arrowRef}></div>
            )}
            {/* 弹窗内容 */}
            {slots.default?.()}
          </div>
        )}
      </>
    )
  }
})
