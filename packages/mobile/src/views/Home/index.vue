<template>
  <div>
    <VanSwipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <VanSwipeItem
        v-for="item in state.bannerList"
        :key="item.id"
      >
        <a :href="item.bannerUrl" class="banner"> 
          <img :src="item.bannerPic" :alt="item.bannerTitle">
        </a>
      </VanSwipeItem>
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
import { getBannerList } from '@/api/systemConfig'
import { ref, shallowReactive } from 'vue'

type StateType = {
  bannerList: Record<string,any>[]
}

const state = shallowReactive<StateType>({
  bannerList: [],
})

getBannerList().then((res) => {
  state.bannerList = res.data
})
const currentTab = ref(1)
</script>

<style lang="scss" scoped>
// .my-swipe .van-swipe-item {
//   color: #fff;
//   font-size: 20px;
//   line-height: 150px;
//   text-align: center;
//   background-color: #39a9ed;
// }

.banner{
  img{
    width: 100%;
  }
}
</style>
