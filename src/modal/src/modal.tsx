import { defineComponent, toRefs } from 'vue'
import BaseModal from './components/base-modal'
import { ModalProps, modalProps } from './modal-type'

export default defineComponent({
  name: 'GModal',
  props: modalProps,
  emits: ['update:modelValue'],
  setup(props: ModalProps, { slots, emit }) {
    const { modelValue, title } = toRefs(props)
    return () => (
      <BaseModal
        class="s-modal"
        isShow={modelValue.value}
        onUpdate:isShow={() => {
          emit('update:modelValue')
        }}
      >
        <div class="s-modal-container">
          {/* 标题title */}
          {slots.header ? (
            slots.header?.()
          ) : (
            <div class="s-modal-header">{title.value}</div>
          )}
          {/* 内容default */}
          <div className="s-modal-default">{slots.default?.()}</div>
          {/* 操作区footer */}
          <div className="s-modal-footer">{slots.footer?.()}</div>
        </div>
      </BaseModal>
    )
  }
})
