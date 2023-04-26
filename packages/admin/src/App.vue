<template>
  <h1>{{ msg }}</h1>
  <ElButton @click="msg = 'hello world'">click me</ElButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('hello')
</script>

<style scoped lang="scss"></style>
