<template>
  <div class="layout">
    <VanSticky>
      <VanNavBar
        title="WHIF"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #right>
          <VanIcon
            name="search"
            size="18"
            @click="$router.push('/search')"
          />
        </template>
      </VanNavBar>
    </VanSticky>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const currentTab = ref('home')
const router = useRouter()

function onClickLeft() {
  router.back()
}
</script>

<style lang="scss" scoped></style>
