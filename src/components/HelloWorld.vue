<template>
  <h1 class="text-3xl font-bold underline">
    {{ msg }}
  </h1>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<style scoped></style>
