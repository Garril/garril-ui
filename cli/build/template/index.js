'use strict'
exports.__esModule = true
var utils_1 = require('./utils')
function genIndexTemplate(name) {
  var cpnName = (0, utils_1.upperFirstLetter)(name)
  return "import { App } from 'vue'\nimport "
    .concat(cpnName, " from './src/")
    .concat(name, "'\n\n// \u5177\u540D\u5BFC\u51FA\nexport { ")
    .concat(
      cpnName,
      ' }\n\n// \u5BFC\u51FA\u63D2\u4EF6\nexport default {\n  install(app: App) {\n    app.component('
    )
    .concat(cpnName, '.name, ')
    .concat(cpnName, ')\n  }\n}\n')
}
exports['default'] = genIndexTemplate
