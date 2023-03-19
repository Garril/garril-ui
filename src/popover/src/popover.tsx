import { computePosition } from '@floating-ui/dom'
import { defineComponent, nextTick, ref, toRefs, watch } from 'vue'
import { PopoverProps, popoverProps } from './popover-type'

export default defineComponent({
  name: 'GPopOver',
  props: popoverProps,
  emits: ['update:modalValue'],
  setup(props: PopoverProps, { slots, attrs, emit }) {
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
          <div ref={overlayRef} class="s-popover" {...attrs}>
            {slots.default?.()}
          </div>
        )}
      </>
    )
  }
})
