import { ExtractPropTypes, PropType } from 'vue'
export const iconProps = {
  name: {
    // icon-vue中的vue
    type: String,
    default: ''
  },
  prefix: {
    // 前缀
    type: String,
    default: 'icon'
  },
  size: {
    // type: String || Number, --- 错误用法,认为是 String
    // type: [String, Number], --- ts报错
    type: [String, Number] as PropType<string | number>,
    default: 'inherit'
  },
  color: {
    type: String,
    default: 'inherit'
  },
  element: {
    type: String,
    default: null
  }
} as const
export type IconProps = ExtractPropTypes<typeof iconProps>
