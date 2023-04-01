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
        <a
          :href="item.bannerUrl"
          class="banner"
        >
          <img
            :src="item.bannerPic"
            :alt="item.bannerTitle"
          />
        </a>
      </VanSwipeItem>
    </VanSwipe>
    <VanGrid :column-num="4" icon-size="64">
      <VanGridItem
        v-for="value in 8"
        :key="value"
        :icon="'/public/navImg/' + value + '.webp'"
      />
    </VanGrid>
  </div>
</template>

<script setup lang="ts">
import { getBannerList } from '@/api/systemConfig'
import { ref, shallowReactive } from 'vue'

type StateType = {
  bannerList: Record<string, any>[]
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
.banner {
  img {
    width: 100%;
  }
}
</style>
