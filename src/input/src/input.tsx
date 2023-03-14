import { defineComponent, inject } from 'vue'
import { FormItemContext } from '../../form/src/components/form-item-type'
import { InputProps, inputProps } from './input-type'

export default defineComponent({
  name: 'GInput',
  props: inputProps,
  emits: ['update:modelValue'],
  setup(props: InputProps, { emit }) {
    // 注入校验方法
    const formItemCtx = inject('FORM_ITEM_CTX') as FormItemContext

    const onInputCB = (event: Event) => {
      const val = (event.target as HTMLInputElement).value
      /* 后续要做lazy处理 */
      emit('update:modelValue', val)
      formItemCtx.validate()
    }
    return () => {
      return (
        <div class="s-input-wrapper">
          <input
            class="s-input"
            type={props.type}
            value={props.modelValue}
            onInput={onInputCB}
          />
        </div>
      )
    }
  }
})
