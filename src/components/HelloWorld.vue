<template>
  <div>
    <span>i am the cpn helloworld</span>
    <h1 class="text-3xl font-bold underline">
      {{ msg }}
    </h1>
    <button>button</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<style scoped></style>
