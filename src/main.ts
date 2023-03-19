import { createApp } from 'vue'

import './index.scss'

import App from './App.vue'
// 全量导出
import GarrilUI from './garril-ui'

createApp(App).use(GarrilUI).mount('#app')
