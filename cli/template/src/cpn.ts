import { upperFirstLetter } from '../utils'
// 创建组件核心文件模板
export default function genCpnTemplate(name: string) {
  const cpnName = 'G' + upperFirstLetter(name)
  const className = 's-' + name
  const propsName = name + 'Props'
  const propsTypeName = upperFirstLetter(name) + 'Props'
  const propsFileName = name + '-type'
  return `
import { defineComponent } from 'vue'
import { ${propsTypeName}, ${propsName} } from './${propsFileName}'

export default defineComponent({
  name: '${cpnName}',
  props: ${propsName},
  setup(props: ${propsTypeName}) {
    return () => {
      return <div class="${className}"></div>
    }
  }
})  
`
}
