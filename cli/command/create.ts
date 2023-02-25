// inquirer 生成选项列表,让用户去选择type
// 只适用于nodejs，只有cjs格式, 8.2.2 用 * as 解决
import * as inquirer from 'inquirer'
// 用户type输入错误，爆红提示
import { red } from 'kolorist'
import createCpn from '../shared/create-cpn'
// 常量
import { CREATE_TYPES, DOCS_CATEGORIES } from '../src/constant'

export default async function createActionCB(args = { type: '' }) {
  // args: { type: 'xxx' }
  let { type } = args
  // 没输入type
  if (!type) {
    const res = await inquirer.prompt([
      {
        // 获取属性名称
        name: 'type',
        // 交互方式
        type: 'list',
        // 提示信息
        message: '(必填) 请选择创建类型: ',
        // 选项列表
        choices: CREATE_TYPES,
        // 默认选项
        default: 0
      }
    ])
    type = res.type

    // 输入type错误,要求重新输入
  } else if (!CREATE_TYPES.includes(type)) {
    console.log(
      red(
        `当前类型仅支持: ${CREATE_TYPES.join(
          ', '
        )}\n您输入的为: ${type}, 请重新选择!`
      )
    )
    return createActionCB()
  }
  // 创建文件相关内容
  try {
    switch (type) {
      case 'component':
        // 1、我们还需要收集: 要创建的组件的相关信息
        const info = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: '(必填) 请输入组件的name, 将用作文件以及文件夹的名称: ',
            validate(value: string) {
              if (value.trim() === '') {
                return '组件name不能为空！'
              }
              // 校验通过
              return true
            }
          },
          {
            name: 'title',
            type: 'input',
            message:
              '(必填) 请输入组件的中文名称, 将用作组件在文档列表中的名称: ',
            validate(value: string) {
              if (value.trim() === '') {
                return '组件名称不能为空！'
              }
              // 校验通过
              return true
            }
          },
          {
            name: 'category',
            type: 'list',
            message: '(必填) 请选择组件的分类, 将用作文档列表的分类: ',
            choices: DOCS_CATEGORIES,
            default: 0
          }
        ])
        // 2、拿到info，创建组件文件
        createCpn(info)
        break
      case 'lib-entry':
        break
      default:
        break
    }
  } catch (err) {
    console.log(red(err))
  }
}
