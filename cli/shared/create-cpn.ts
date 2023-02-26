import { ensureDirSync, writeFileSync } from 'fs-extra'
import { resolve } from 'path'
import { lightBlue, lightGreen } from 'kolorist'

import genCpnTemplate from '../template/src/cpn'
import genTypesTemplate from '../template/src/types'
import genStyleTemplate from '../template/style/style'
import genTestTemplate from '../template/test/test'
import genIndexTemplate from '../template'

import { WRITE_FILE_OPTIONS } from '../src/constant'

export interface CpnInfo {
  name: string
  title: string
  category: string
}

export default function createCpn(info: CpnInfo) {
  const { name } = info
  // 这里可以对name做一个命名的规范处理....
  // 拼接组件目录
  const cpnDir = resolve('../src', name)
  // 组件目录下的文件的dir
  const cpnSrcDir = resolve(cpnDir, 'src')
  const styleDir = resolve(cpnDir, 'style')
  const testDir = resolve(cpnDir, 'test')
  // 创建文件夹
  ensureDirSync(cpnSrcDir)
  ensureDirSync(styleDir)
  ensureDirSync(testDir)

  // 文件和内容创建
  // 核心文件：组件文件
  const cpnFilePath = resolve(cpnSrcDir, name + '.tsx')
  writeFileSync(cpnFilePath, genCpnTemplate(name), WRITE_FILE_OPTIONS)

  // 核心文件：组件类型文件
  const typesFilePath = resolve(cpnSrcDir, name + '-type.ts')
  writeFileSync(typesFilePath, genTypesTemplate(name), WRITE_FILE_OPTIONS)

  // 核心文件：组件样式文件
  // const styleFilePath = styleDir + `/${name}.scss`
  const styleFilePath = resolve(styleDir, name + '.scss')
  writeFileSync(styleFilePath, genStyleTemplate(name), WRITE_FILE_OPTIONS)

  // 核心文件：测试文件
  // const testFilePath = testDir + `/${name}.test.ts`
  const testFilePath = resolve(testDir, name + '.test.ts')
  writeFileSync(testFilePath, genTestTemplate(name), WRITE_FILE_OPTIONS)

  // 组件索引文件
  const indexFilePath = cpnDir + `/index.ts`
  writeFileSync(indexFilePath, genIndexTemplate(name), WRITE_FILE_OPTIONS)

  // 创建成功通知
  console.log(
    lightGreen(`
        ✔️ 组件${name}目录创建生成
    `)
  )
  console.log(
    lightBlue(`
        ✔️ 组件目录：${cpnSrcDir}
    `)
  )
}
