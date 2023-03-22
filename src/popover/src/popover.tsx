import { defineComponent, ref, toRefs } from 'vue'
import { PopoverProps, popoverProps } from './popover-type'
import BasePopover from './components/base-popover'

export default defineComponent({
  name: 'GPopOver',
  props: popoverProps,
  emits: ['update:modalValue'],
  setup(props: PopoverProps, { slots }) {
    const { modelValue, title } = toRefs(props)

    return () => (
      <>
        {modelValue.value && (
          <BasePopover class="s-popover" {...props}>
            <h4 class="s-popover-title">{title.value}</h4>
            {slots.default?.()}
          </BasePopover>
        )}
      </>
    )
  }
})
