import { ensureDirSync } from 'fs-extra'
import { resolve } from 'path'
import { lightBlue, lightGreen } from 'kolorist'

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
}
