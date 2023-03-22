import { App } from 'vue'
import Popover from './src/popover'
import BasePopover from './src/components/base-popover'

// 具名导出
export { Popover, BasePopover }

// 导出插件
export default {
  install(app: App) {
    app.component(Popover.name, Popover)
    app.component(BasePopover.name, BasePopover)
  }
}
