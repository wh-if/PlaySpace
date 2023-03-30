<template>
  <div class="layout">
    <VanNavBar
      title="WHIF"
      left-text="返回"
      left-arrow
    >
      <template #right>
        <VanIcon
          name="search"
          size="18"
        />
      </template>
    </VanNavBar>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const currentTab = ref('home')
const router = useRouter()
</script>

<style lang="scss" scoped></style>
