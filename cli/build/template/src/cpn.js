'use strict'
exports.__esModule = true
var utils_1 = require('../utils')
// 创建组件核心文件模板
function genCpnTemplate(name) {
  var cpnName = 'G' + (0, utils_1.upperFirstLetter)(name)
  var className = 's-' + name
  var propsName = name + 'Props'
  var propsTypeName = (0, utils_1.upperFirstLetter)(name) + 'Props'
  var propsFileName = name + '-type'
  return "\nimport { defineComponent } from 'vue'\nimport { "
    .concat(propsTypeName, ', ')
    .concat(propsName, " } from './")
    .concat(propsFileName, "'\n\nexport default defineComponent({\n  name: '")
    .concat(cpnName, "',\n  props: ")
    .concat(propsName, ',\n  setup(props: ')
    .concat(propsTypeName, ') {\n    return () => {\n      return <div class="')
    .concat(className, '"></div>\n    }\n  }\n})  \n')
}
exports['default'] = genCpnTemplate
