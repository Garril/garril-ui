import { defineComponent, ref, withModifiers } from 'vue'
export default defineComponent({
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const count = ref(0)
    const inc = () => {
      count.value++
      console.log('child cpn emit event')
      emit('click', count.value)
    }
    const list = ref<string[]>(['a', 'b', 'c'])

    return () => {
      const span = true ? <span>V-IF: True</span> : <span>V-IF: False</span>

      return (
        <div onClick={withModifiers(inc, ['self'])}>
          <span> test: {count.value} </span>
          <div>
            <input type="text" v-focus v-model={count.value} />
          </div>
          <div>{span}</div>
          <ul>
            {list.value.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div>{slots.default ? slots.default() : 'default content'}</div>
          <div>{slots.title ? slots.title() : 'default title content'}</div>
        </div>
      )
    }
  }
})
