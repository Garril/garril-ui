import { App } from 'vue'
import Tabs from './src/tabs'
import TabItem from './src/components/tab-item'

// 具名导出
export { Tabs, TabItem }

// 导出插件
export default {
  install(app: App) {
    app.component(Tabs.name, Tabs)
    app.component(TabItem.name, TabItem)
  }
}
