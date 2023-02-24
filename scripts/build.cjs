/* 将来这个是node去执行的，所以是js
  又因为vite.config type="module", 使用require报错
  将所有require改为import也行，但__dirname的引入反而麻烦
*/
const path = require('path')
const fs = require('fs')
const { defineConfig, build } = require('vite')

// 基础配置
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})

// 入口文件
const entryFile = path.resolve(__dirname, './entry.ts')
// 输出目录
const outputDir = path.resolve(__dirname, '../build')
// 组件目录
const cpnsDir = path.resolve(__dirname, '../src')

// rollup配置（设置格式）
const rollupOptions = {
  // 外置
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

// 生成build文件夹下的package.json
const fsExtra = require('fs-extra') // 操作文件系统
const version = require('../package.json').version
const preSetPackageJson = name => {
  // 预设
  const fileStr = `{
    "name": "${name ? name : 'garril'}",
    "version": "${version}",
    "main": "${name ? 'index.umd.js' : `${name}.umd.js`}",
    "module": "${name ? 'index.umd.js' : `${name}.es.js`}",
    "author": "Garril",
    "description": "Practice building a cpn store",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/Garril/garril-ui"
    },
    "keywords": ["vue3", "组件库", "tsx", "UI", "scss", "vite"],
    "license": "ISC",
    "bugs": {
      "url": "https://github.com/Garril/garril-ui/issues"
    }
  }`
  if (name) {
    // 单个组件，输出对应的package.json
    fsExtra.outputFile(
      path.resolve(outputDir, 'config/package.json'),
      fileStr,
      'utf-8'
    )
  } else {
    // 全量
    fsExtra.outputFile(
      path.resolve(outputDir, 'package.json'),
      fileStr,
      'utf-8'
    )
  }
}

// 执行创建
// 全量构建
const buildAll = async name => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: entryFile,
          name: name,
          fileName: name,
          formats: ['es', 'umd']
        },
        outDir: outputDir
      }
    })
  )
  preSetPackageJson(name)
}
// 按需构建 (name: 组件/文件名)
const buildSingle = async name => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(cpnsDir, name),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd']
        },
        outDir: path.resolve(outputDir, name)
      }
    })
  )
  // 只打一个组件，不需要传参
  preSetPackageJson()
}

const buildLib = async () => {
  // 全量打包
  await buildAll('garril-ui')
  // 按需打包
  fs.readdirSync(cpnsDir)
    .filter(name => {
      // 要目录，且目录内还有index.ts文件
      // current path
      const filePath = path.resolve(cpnsDir, name)
      // is a folder?
      const isDir = fs.lstatSync(filePath).isDirectory()
      // folder contain the index?
      return isDir && fs.readdirSync(filePath).includes('index.ts')
    })
    .forEach(async name => {
      await buildSingle(name)
    })
}
buildLib()
