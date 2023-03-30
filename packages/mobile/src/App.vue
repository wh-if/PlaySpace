<template>
  <RouterView />
</template>

<script setup lang="ts">
import request from './utils/request'
request.get("/api/user").then(res => {
  console.log(res);
  
})
</script>

<style scoped lang="scss"></style>
