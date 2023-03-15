import { defineComponent } from 'vue'
import { ModalProps, modalProps } from './modal-type'

export default defineComponent({
  name: 'GModal',
  props: modalProps,
  setup(props: ModalProps) {
    return () => {
      return <div class="s-modal"></div>
    }
  }
})
