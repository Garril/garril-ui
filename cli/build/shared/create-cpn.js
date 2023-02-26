'use strict'
exports.__esModule = true
var fs_extra_1 = require('fs-extra')
var path_1 = require('path')
var kolorist_1 = require('kolorist')
var cpn_1 = require('../template/src/cpn')
var types_1 = require('../template/src/types')
var style_1 = require('../template/style/style')
var test_1 = require('../template/test/test')
var template_1 = require('../template')
var constant_1 = require('../src/constant')
function createCpn(info) {
  var name = info.name
  // 这里可以对name做一个命名的规范处理....
  // 拼接组件目录
  var cpnDir = (0, path_1.resolve)('../src', name)
  // 组件目录下的文件的dir
  var cpnSrcDir = (0, path_1.resolve)(cpnDir, 'src')
  var styleDir = (0, path_1.resolve)(cpnDir, 'style')
  var testDir = (0, path_1.resolve)(cpnDir, 'test')
  // 创建文件夹
  ;(0, fs_extra_1.ensureDirSync)(cpnSrcDir)
  ;(0, fs_extra_1.ensureDirSync)(styleDir)
  ;(0, fs_extra_1.ensureDirSync)(testDir)
  // 文件和内容创建
  // 核心文件：组件文件
  var cpnFilePath = (0, path_1.resolve)(cpnSrcDir, name + '.tsx')
  ;(0, fs_extra_1.writeFileSync)(
    cpnFilePath,
    (0, cpn_1['default'])(name),
    constant_1.WRITE_FILE_OPTIONS
  )
  // 核心文件：组件类型文件
  var typesFilePath = (0, path_1.resolve)(cpnSrcDir, name + '-type.ts')
  ;(0, fs_extra_1.writeFileSync)(
    typesFilePath,
    (0, types_1['default'])(name),
    constant_1.WRITE_FILE_OPTIONS
  )
  // 核心文件：组件样式文件
  // const styleFilePath = styleDir + `/${name}.scss`
  var styleFilePath = (0, path_1.resolve)(styleDir, name + '.scss')
  ;(0, fs_extra_1.writeFileSync)(
    styleFilePath,
    (0, style_1['default'])(name),
    constant_1.WRITE_FILE_OPTIONS
  )
  // 核心文件：测试文件
  // const testFilePath = testDir + `/${name}.test.ts`
  var testFilePath = (0, path_1.resolve)(testDir, name + '.test.ts')
  ;(0, fs_extra_1.writeFileSync)(
    testFilePath,
    (0, test_1['default'])(name),
    constant_1.WRITE_FILE_OPTIONS
  )
  // 组件索引文件
  var indexFilePath = cpnDir + '/index.ts'
  ;(0, fs_extra_1.writeFileSync)(
    indexFilePath,
    (0, template_1['default'])(name),
    constant_1.WRITE_FILE_OPTIONS
  )
  // 创建成功通知
  console.log(
    (0, kolorist_1.lightGreen)(
      '\n        \u2714\uFE0F \u7EC4\u4EF6'.concat(
        name,
        '\u76EE\u5F55\u521B\u5EFA\u751F\u6210\n    '
      )
    )
  )
  console.log(
    (0, kolorist_1.lightBlue)(
      '\n        \u2714\uFE0F \u7EC4\u4EF6\u76EE\u5F55\uFF1A'.concat(
        cpnSrcDir,
        '\n    '
      )
    )
  )
}
exports['default'] = createCpn
