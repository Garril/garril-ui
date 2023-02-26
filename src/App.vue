<template>
  <div>
    <Test class="test" @click="onclick">
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
    <GTree :data="data"></GTree>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Test from './components/Test'

const onclick = (val: any) => {
  console.log('app click output')
  console.log(val)
}
const confirm = () => {
  console.log('confirm')
}
const data = ref([
  {
    label: 'vue3',
    id: '1',
    level: 1,
    children: [
      {
        label: 'ts',
        id: '5',
        parentId: '1',
        level: 2
      }
    ]
  },
  {
    label: 'vite',
    id: '2',
    expanded: true,
    level: 1,
    children: [
      {
        label: 'ui',
        id: '3',
        parentId: '2',
        expanded: true,
        level: 2,
        children: [
          {
            label: 'cli',
            id: '4',
            parentId: '3',
            isLeaf: true,
            level: 3
          }
        ]
      }
    ]
  },
  {
    label: 'tsnd',
    id: '6',
    level: 1
  }
])
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
