<template>
  <div class="main-box">
    <VanSwipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <VanSwipeItem
        v-for="(item, index) in state.productData.poster"
        :key="index"
      >
        <img
          class="banner"
          :src="item"
          :alt="item"
        />
      </VanSwipeItem>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
      </template>
    </VanSwipe>

    <div class="box">
      <h3>{{ state.productData.name }}</h3>
      <van-text-ellipsis
        :content="state.productData.description"
        expand-text="展开"
        class="description-box"
        collapse-text="收起"
      />
      <p>
        <van-tag
          type="success"
          v-for="(item, index) in state.productData.tag"
          :key="index"
        >
          {{ item }}
        </van-tag>
      </p>
    </div>

    <div class="content box">
      <img
        v-for="item in state.productData.content"
        :src="item"
        :alt="item"
      />
    </div>

    <van-action-bar>
      <van-action-bar-icon
        icon="chat-o"
        text="客服"
        color="#ee0a24"
      />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
      />
      <van-action-bar-icon
        icon="star"
        text="已收藏"
        color="#ff5000"
      />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
      />
      <van-action-bar-button
        type="danger"
        text="立即购买"
      />
    </van-action-bar>
  </div>
</template>

<script setup lang="ts">
import { getProduct } from '@/api/product'
import { shallowReactive, watch } from 'vue'
import { useRouter } from 'vue-router'

const state = shallowReactive<{ productData: Record<string, any> }>({
  productData: {},
})

const router = useRouter()

function getProductData(productId: number) {
  getProduct({ productId }).then((res) => {
    console.log(res)

    state.productData = res
  })
}

watch(
  () => router.currentRoute.value.params.id,
  (val) => {
    if (typeof val === 'string') {
      getProductData(parseInt(val))
    }
  },
  {
    immediate: true,
  }
)
</script>

<style lang="scss" scoped>
.banner {
  height: 40vh;
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}

.box {
  background-color: #fff;
  border-radius: 10px;
  margin: 20px 8px;
  padding: 12px;
}

.description-box {
  font-size: 12px;
  margin: 6px 0;
}

.content {
  img {
    width: 100%;
  }
}
</style>
