import type { App } from 'vue'
// 入口文件
// 1、引入实现的组件，批量导出
import ButtonPlugin, { Button } from '../src/button'
// 2、批量导出组件
export { Button }
const pluginList = [ButtonPlugin]
// 3、导出vue插件
export default {
  install(app: App) {
    pluginList.forEach(plugin => {
      app.use(plugin)
    })
  }
}
