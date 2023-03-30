<template>
  <div>
    <VanSwipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <VanSwipeItem>1</VanSwipeItem>
      <VanSwipeItem>2</VanSwipeItem>
      <VanSwipeItem>3</VanSwipeItem>
      <VanSwipeItem>4</VanSwipeItem>
    </VanSwipe>
    <VanGrid :column-num="3">
      <VanGridItem
        v-for="value in 6"
        :key="value"
        icon="photo-o"
        text="文字"
      />
    </VanGrid>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentTab = ref(1)
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
