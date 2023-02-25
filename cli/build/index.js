'use strict'
exports.__esModule = true
var commander_1 = require('commander')
// 创建一个命令对象
var cmd = new commander_1.Command()
// 注册命令、参数，以及用户传入之后的回调函数
// $tsnd ./src/index.ts create --type component
cmd
  .command('create')
  // 命令描述
  .description('创建一个组件的配置文件')
  // 命令参数 -t 或 --type
  // <type> 必填， [type] 选填
  .option('-t --type <type>', '创建类型可选值: component, lib-entry')
  // 注册回调函数
  .action(function (args) {
    console.log(args)
  })
cmd.parse()
