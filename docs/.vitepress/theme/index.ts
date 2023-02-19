import Theme from 'vitepress/theme'
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import 'vitepress-theme-demoblock/theme/styles/index.css'

import type {App} from 'vue'

import Test from '../../../src/components/Test'
import HelloWorld from '../../../src/components/HelloWorld.vue'


export default {
  ...Theme,
  // extends the instance of our application program
  enhanceApp({app}:{app:App<never>}) {
    // regist cpn
    app.component('HelloWorld', HelloWorld)
    app.component('Test', Test)
    app.component('DemoBlock', DemoBlock)
    app.component('Demo', Demo)
  }
}