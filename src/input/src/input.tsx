import { defineComponent } from 'vue'
import { InputProps, inputProps } from './input-type'

export default defineComponent({
  name: 'GInput',
  props: inputProps,
  emits: ['update:modelValue'],
  setup(props: InputProps, { emit }) {
    const onInputCB = (event: Event) => {
      const val = (event.target as HTMLInputElement).value
      /* 后续要做lazy处理 */
      emit('update:modelValue', val)
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
