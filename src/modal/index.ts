import { App } from 'vue'
import Modal from './src/modal'
import BaseModal from './src/components/base-modal'

// 具名导出
export { Modal, BaseModal }

// 导出插件
export default {
  install(app: App) {
    app.component(Modal.name, Modal)
    app.component(BaseModal.name, BaseModal)
  }
}
