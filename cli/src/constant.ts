import { WriteFileOptions } from 'fs-extra'

// 创建类型
export const CREATE_TYPES: string[] = ['component', 'lib-entry']
// 组件分类
export const DOCS_CATEGORIES: string[] = [
  '通用',
  '导航',
  '反馈',
  '数据录入',
  '数据展示',
  '布局'
]
export const WRITE_FILE_OPTIONS: WriteFileOptions = { encoding: 'utf-8' }
