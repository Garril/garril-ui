import { computePosition } from '@floating-ui/dom'
import { defineComponent, nextTick, ref, toRefs, watch } from 'vue'
import { BasePopoverProps, basePopoverProps } from './base-popover-type'

export default defineComponent({
  name: 'GBasePopOver',
  props: basePopoverProps,
  emits: ['update:modalValue'],
  setup(props: BasePopoverProps, { slots, attrs, emit }) {
    const { modelValue, hostDom } = toRefs(props)
    // 气泡卡片
    const overlayRef = ref()
    // 计算定位
    const updatePosition = () => {
      computePosition(hostDom.value, overlayRef.value).then(({ x, y }) => {
        Object.assign(overlayRef.value.style, {
          left: x + 'px',
          top: y + 'px'
        })
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
            {slots.default?.()}
          </div>
        )}
      </>
    )
  }
})
