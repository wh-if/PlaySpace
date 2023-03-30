<template>
  <div>
    <VanSidebar v-model="active">
      <SidebarItem title="标签名称" />
      <SidebarItem title="标签名称" />
      <SidebarItem title="标签名称" />
    </VanSidebar>
  </div>
</template>

<script setup lang="ts">
import { SidebarItem } from 'vant'
import { ref } from 'vue'
const active = ref(0)
</script>

<style lang="scss" scoped></style>
