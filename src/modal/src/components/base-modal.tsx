import { defineComponent, toRefs } from 'vue'
import { baseModalProps, BaseModalProps } from './base-modal-type'

export default defineComponent({
  name: 'GBaseModal',
  props: baseModalProps,
  emits: ['update:isShow'],
  setup(props: BaseModalProps, { slots, emit }) {
    const { isShow } = toRefs(props)
    return () => (
      <div>
        {isShow.value && (
          <div class="s-base-modal">
            {/* 透明遮罩 */}
            <div
              class="s-base-modal--mask"
              onClick={() => {
                emit('update:isShow', false)
              }}
            ></div>
            {/* 具体内容 */}
            {slots.default?.()}
          </div>
        )}
      </div>
    )
  }
})
