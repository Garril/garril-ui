<template>
  <div>
    <!-- <Test class="test" @click="onclick">
      <template #default> default slot</template>
      <template #title>
        <h3>default title h3</h3>
      </template>
    </Test>
    <GButton type="primary" size="large">确定</GButton>
    <GButton type="primary" size="medium" @click="confirm">确定</GButton>
    <GButton type="primary" size="small" disabled @click="confirm"
      >确定</GButton
    >
    <GButton type="primary" size="medium" block>primary-block</GButton>
    <GButton type="secondary" size="medium" block>secondary-block</GButton>
    <hr />
    <div class="bg-slate-400">没有checkbox和lineable和lazy,只有operable</div>
    <GTree :data="data" checkable:false></GTree>

    <div class="bg-slate-400">有checkbox和operable和lazy和dragdrop</div>
    <GTree
      :data="data"
      checkable
      operable
      :dragdrop="{ prev: true, next: true, inner: true }"
      lazy
      @lazy-load="lazyLoadCB"
    ></GTree>
    <div class="bg-slate-400">有checkbox和lineable无lazy</div>
    -->
    <!-- 在拖拽移动node的时候，check的改变没有做相应变化，所以一般不让check和dragdrop一块开启 -->
    <!-- <GTree
      :data="data"
      lineable
      operable
      :dragdrop="{ prev: true, next: true, inner: true }"
    >
      <template #icon="{ node, clickExpandedNode }">
        <span v-if="node.isLeaf" class="devui-tree-node__indent"></span>
        <span
          v-else
          @click="
            event => {
              event.stopPropagation()
              clickExpandedNode(node)
            }
          "
        >
          <svg
            :style="{
              transform: node.expanded ? 'rotate(90deg)' : '',
              display: 'inline-block',
              margin: '0 5px',
              cursor: 'pointer'
            }"
            viewBox="0 0 1024 1024"
            width="12"
            height="12"
          >
            <path
              d="M857.70558 495.009024 397.943314 27.513634c-7.132444-7.251148-18.794042-7.350408-26.048259-0.216941-7.253194 7.132444-7.350408 18.795065-0.216941 26.048259l446.952518 454.470749L365.856525 960.591855c-7.192819 7.192819-7.192819 18.85544 0 26.048259 3.596921 3.596921 8.311293 5.39487 13.024641 5.39487s9.42772-1.798972 13.024641-5.39487L857.596086 520.949836C864.747973 513.797949 864.796068 502.219239 857.70558 495.009024z"
            ></path>
          </svg>
        </span>
      </template>
      <template #content="node">
        <svg
          v-if="node.isLeaf"
          id="octicon_file_16"
          style="margin-right: 8px; display: inline-block"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="#57606a"
        >
          <path
            fill-rule="evenodd"
            d="M3.75 1.5a.25.25 0 00-.25.25v11.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25V6H9.75A1.75 1.75 0 018 4.25V1.5H3.75zm5.75.56v2.19c0 .138.112.25.25.25h2.19L9.5 2.06zM2 1.75C2 .784 2.784 0 3.75 0h5.086c.464 0 .909.184 1.237.513l3.414 3.414c.329.328.513.773.513 1.237v8.086A1.75 1.75 0 0112.25 15h-8.5A1.75 1.75 0 012 13.25V1.75z"
          ></path>
        </svg>
        <svg
          v-else
          id="octicon_file-directory-fill_16"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="#54aeff"
          style="display: inline-block; margin-right: 8px"
        >
          <path
            d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"
          ></path>
        </svg>
        {{ node.label }}
        <svg
          v-if="node.isLeaf"
          title="modified"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="#9a6700"
          style="position: absolute; right: 0; margin-right: 8px"
        >
          <path
            fill-rule="evenodd"
            d="M2.75 2.5h10.5a.25.25 0 01.25.25v10.5a.25.25 0 01-.25.25H2.75a.25.25 0 01-.25-.25V2.75a.25.25 0 01.25-.25zM13.25 1H2.75A1.75 1.75 0 001 2.75v10.5c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0015 13.25V2.75A1.75 1.75 0 0013.25 1zM8 10a2 2 0 100-4 2 2 0 000 4z"
          ></path>
        </svg>
      </template>
    </GTree> -->
    <div class="bg-slate-400">虚拟列表</div>
    <GTree :data="mockData" :height="300"></GTree>
    <GPagination v-model:curPageIndex="curIndex" :total="50"></GPagination>
    <GPager :total="50" @update-pager-index="changeIndex"></GPager>
    <!-- <GForm :model="{ name: 'userform' }" layout="horizontal">
      <GFormItem label="username: "> <input type="text" /></GFormItem>
    </GForm> -->
    <p>
      <span>labelSize:</span>
      <label>
        <input v-model="labelSize" type="radio" value="sm" />
        sm
      </label>
      <label>
        <input v-model="labelSize" type="radio" value="md" />
        md
      </label>
      <label>
        <input v-model="labelSize" type="radio" value="lg" />
        lg
      </label>
    </p>
    <p>
      <span>labelAlign:</span>
      <label>
        <input v-model="labelAlign" type="radio" value="start" />
        start
      </label>
      <label>
        <input v-model="labelAlign" type="radio" value="center" />
        center
      </label>
      <label>
        <input v-model="labelAlign" type="radio" value="end" />
        end
      </label>
    </p>
    <GForm
      ref="loginFormRef"
      :model="model"
      layout="horizontal"
      :label-align="labelAlign"
      :label-size="labelSize"
      :rules="rules"
      @form-submit="onLogin"
    >
      <GFormItem label="用户名：" field="user">
        <GInput v-model="model.user" />
      </GFormItem>
      <GFormItem label="密码：" field="password">
        <GInput v-model="model.password" type="password" />
      </GFormItem>
      <GFormItem>
        <button>登录</button>
      </GFormItem>
    </GForm>

    <!-- <GBaseModal v-model:isShow="isModalShow">
      <div
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 400px;
          height: 400px;
        "
      >
        <img src="./assets/img/pkq.png" alt="" />
      </div>
    </GBaseModal>
    <button
      style="border: 1px solid black; padding: 5px 10px; margin-left: 10px"
      @click="openModalShow"
    >
      open Modal
    </button> -->

    <GModal v-model="visible" title="提示" :show-close="false" align-center>
      <template #header="{ close }">
        <div
          class="my-header"
          style="display: flex; justify-content: space-between; padding: 0 20px"
        >
          <h4>My slot title!</h4>
          <GButton type="danger" @click="close">Close</GButton>
        </div>
      </template>
      <span>this is a message!</span>
      <template #footer>
        <div>
          <GButton style="margin-right: 12px" @click="visible = false"
            >quit</GButton
          >
          <GButton @click="visible = false">yes</GButton>
        </div>
      </template>
    </GModal>
    <GButton @click="open"></GButton>
    <div>
      <div>以图标的方式，存到字体中</div>
      <GIcon name="facebook" size="40" color="skyblue"></GIcon>
      <GIcon name="react" size="30" color="red"></GIcon>
      <GIcon name="react" size="30px" color="blue"></GIcon>
      <GIcon name="vue" :size="30" color="green"></GIcon>
      <span style="width: 50px; display: inline-block">
        <GIcon name="https://vitejs.dev/logo.svg" width="30"></GIcon>
      </span>
      <div>通过元件的方式引入到页面中，用svg显示（拓展性更强）</div>
      <GIcon
        element="react"
        size="30"
        color="red"
        style="display: inline-block"
      ></GIcon>
      <GIcon
        element="vue"
        size="30px"
        color="blue"
        style="display: inline-block"
      ></GIcon>
      <GIcon
        element="webpack"
        size="30px"
        color="blue"
        style="display: inline-block"
      ></GIcon>
    </div>
    <GTabs v-model="curTab" close-able add-able>
      <GTabItem id="home" title="home">首页</GTabItem>
      <GTabItem id="radio" title="radio">视频</GTabItem>
      <GTabItem id="article" title="article">文章</GTabItem>
      <GTabItem id="profile" title="profile">个人</GTabItem>
    </GTabs>
    <div
      @click="changePopState"
      style="width: 200px; border: 1px solid red"
      ref="hostDom"
    >
      change pop state
    </div>
    <GPopOver v-model="isPopShow" :host-dom="hostDom" title="标题"
      >content in the popover</GPopOver
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Test from './components/Test'
import { TREE_TEST_DATA } from './tree/src/constant'
import { LazyNodeResType } from './tree/src/hooks/type/use-tree-type'
import { IFlatTreeNode } from './tree/src/tree-type'

const isPopShow = ref(false)
const hostDom = ref()
const changePopState = () => {
  isPopShow.value = !isPopShow.value
}

const curTab = ref('home')

const visible = ref(false)
const isModalShow = ref(false)
const openModalShow = () => {
  isModalShow.value = true
}
const open = () => {
  visible.value = true
}

const loginFormRef = ref()
const onLogin = () => {
  loginFormRef.value.validateFormData((valid: boolean) => {
    if (valid) {
      console.log('login success')
    } else {
      console.log('login failed')
    }
  })
}
const rules = ref({
  user: [{ required: true, message: '必须输入用户名' }],
  password: [{ required: true, message: '必须输入密码' }]
})

const model = ref({
  user: 'garril',
  password: '123456'
})
const labelSize = ref('md')
const labelAlign = ref('start')

const data = ref(TREE_TEST_DATA)

const onclick = (val: any) => {
  console.log('app click output')
  console.log(val)
}
const confirm = () => {
  console.log('confirm')
}
const lazyLoadCB = (
  node: IFlatTreeNode,
  callback: (result: LazyNodeResType) => void
) => {
  // 用定时器模拟了异步请求
  setTimeout(() => {
    // data就是异步请求拿到的数据
    const data = [
      {
        label: 'lazy node 1',
        expanded: true,
        id: '100',
        children: [
          {
            id: '101',
            label: 'lazy node 1-1'
          },
          {
            id: '102',
            label: 'lazy node 1-2'
          }
        ]
      },
      {
        id: '200',
        label: 'lazy node 2'
      }
    ]
    if (node.id === '2' || node.id === '3') {
      callback({ parentNode: node, childNodes: data })
    } else {
      callback({ parentNode: node, childNodes: [] })
    }
  }, 1000)
}
const mockData = ref([
  ...Array.from({ length: 50 }).map((item, index) => ({
    id: 'node-' + index,
    label: 'node_label-' + index
  }))
])
const changeIndex = (val: any) => {
  console.log(val)
}
const curIndex = ref(0)
watch(
  () => curIndex.value,
  newVal => {
    console.log('curIndexnew', newVal)
  }
)
</script>

<style scoped>
.test {
  background-color: skyblue;
}
#app {
  font-family: Arial, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
