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
    <GTree :data="data" checkable></GTree>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Test from './components/Test'
import { TREE_TEST_DATA } from './tree/src/constant'

const onclick = (val: any) => {
  console.log('app click output')
  console.log(val)
}
const confirm = () => {
  console.log('confirm')
}
const data = ref(TREE_TEST_DATA)
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
