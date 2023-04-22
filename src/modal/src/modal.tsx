import { defineComponent, toRefs } from 'vue'
import BaseModal from './components/base-modal'
import { ModalProps, modalProps } from './modal-type'

export default defineComponent({
  name: 'GModal',
  props: modalProps,
  emits: ['update:modelValue'],
  setup(props: ModalProps, { slots, emit }) {
    const { modelValue, title, width, showClose, center, alignCenter } =
      toRefs(props)
    const alignCenterStyle = alignCenter.value
      ? {
          marginTop: 0,
          top: '50%',
          transform: 'translateY(-50%)'
        }
      : {}
    return () => (
      <BaseModal
        class="s-modal"
        isShow={modelValue.value}
        onUpdate:isShow={() => {
          emit('update:modelValue')
        }}
      >
        <div
          class="s-modal-container"
          style={{ width: width.value, ...alignCenterStyle }}
        >
          {/* 标题title */}
          {slots.header ? (
            slots.header?.({
              close: () => {
                emit('update:modelValue', false)
              }
            })
          ) : (
            <div
              class="s-modal-header"
              style={{ textAlign: center.value ? 'center' : 'left' }}
            >
              {title.value}
              {/* 关闭modal的 X 号*/}
              {showClose.value && (
                <svg
                  onClick={() => {
                    emit('update:modelValue', false)
                  }}
                  class="s-modal-close"
                  viewBox="0 0 1024 1024"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                  ></path>
                </svg>
              )}
            </div>
          )}
          {/* 内容default */}
          <div class="s-modal-default">{slots.default?.()}</div>
          {/* 操作区footer */}
          <div class="s-modal-footer">{slots.footer?.()}</div>
        </div>
      </BaseModal>
    )
  }
})
