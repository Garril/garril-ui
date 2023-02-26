import { upperFirstLetter } from './utils'

export default function genIndexTemplate(name) {
  const cpnName = upperFirstLetter(name)
  return `\
import { App } from 'vue'
import ${cpnName} from './src/${name}'

// 具名导出
export { ${cpnName} }

// 导出插件
export default {
  install(app: App) {
    app.component(${cpnName}.name, ${cpnName})
  }
}
`
}
