import { computePosition, arrow, offset } from '@floating-ui/dom'
import { defineComponent, nextTick, ref, toRefs, watch } from 'vue'
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
      computePosition(hostDom.value, overlayRef.value, {
        middleware,
        placement: placement.value
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
    watch(
      modelValue,
      newVal => {
        if (newVal) {
          nextTick(updatePosition)
        }
      },
      {
        immediate: true
      }
    )

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
