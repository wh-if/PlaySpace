<template>
  <header class="nav-bar">
    <!-- <ElMenu>
      <ElMenuItem>323</ElMenuItem>
    </ElMenu> -->
  </header>
  <div class="content" style="display: flex;">
  <ElMenu
    mode="vertical"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    class="side-bar"
  >
    <ElMenuItem>323</ElMenuItem>
  </ElMenu>
  <main class="main-content">
     <RouterView />
  </main>
  </div>
  

</template>

<script setup lang="ts">
import { ref } from 'vue'

const isCollapse = ref(false)
</script>

<style lang="scss" scoped>
.nav-bar {
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  height: 60px;
}
.content{
  position: absolute;
  width: 100%;
  top: 60px;
  bottom: 0;
}
.side-bar {
  width: 200px;
  // position: absolute;
  // top: 60px;
  // bottom: 0;
}

.main-content{
  padding: 20px;
  flex: 1;
  // position: absolute;
  // top: 60px;
  // bottom: 0;
}
</style>
