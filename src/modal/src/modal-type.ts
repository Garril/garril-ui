import { ExtractPropTypes } from 'vue'

export const modalProps = {
  modelValue: {
    // 是否展示
    type: Boolean,
    default: false
  },
  title: {
    // 标题
    type: String,
    default: ''
  },
  width: {
    // 弹框的宽度
    type: String,
    default: '30%'
  },
  showClose: {
    // 显示关闭 x
    type: Boolean,
    default: true
  },
  center: {
    // title居中 -- 没用slots.header的情况下
    type: Boolean,
    default: false
  },
  alignCenter: {
    // modal整体 竖直方向居中
    type: Boolean,
    default: false
  }
} as const
export type ModalProps = ExtractPropTypes<typeof modalProps>
