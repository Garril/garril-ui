import { Command } from 'commander'
import createActionCB from '../command/create'

// 创建一个命令对象
const cmd = new Command()
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
  .action(createActionCB)

cmd.parse()
