import { computed, defineComponent, toRefs } from 'vue'
import { IconProps, iconProps } from './icon-type'
import '../style/iconfont.js'
import '../style/iconfont.css'

export default defineComponent({
  name: 'GIcon',
  props: iconProps,
  setup(props: IconProps, { attrs }) {
    const { prefix, name, color } = toRefs(props)
    // 根据类型，对size做转换
    const size = computed(() => {
      if (typeof props.size === 'string' && props.size !== 'inherit') {
        // 做个简单的格式判断 --- px结尾
        if (!props.size.endsWith('px')) {
          return props.size + 'px'
        }
      } else if (typeof props.size === 'number') {
        return props.size + 'px'
      }
      return props.size
    })
    // http/https图片资源
    const imgIcon = (
      // svg或其他图片，一旦设置都是单色，不能调整，除非换一张
      <img
        src={props.name}
        style={{
          width: size.value,
          height: 'auto',
          objectFit: 'contain',
          verticalAlign: 'middle'
        }}
        {...attrs}
      ></img>
    )
    // iconfont
    const fontIcon = (
      <span
        class={[prefix.value + 'font', prefix.value + '-' + name.value]}
        style={{ fontSize: size.value, color: color.value }}
      ></span>
    )
    const icon = /http|https/.test(name.value) ? imgIcon : fontIcon
    // 针对外部在GIcon上设置width，希望能在icon上一直生效的问题：
    // 直接return icon，根组件会继承非属性特性，父的width会直接继承，放到icon上
    // 但是如果icon外面包了一层icon_container，width就会不生效。-继承到icon_container上了
    // 所以进行展开非属性特性。---  attrs
    return () => icon
  }
})
