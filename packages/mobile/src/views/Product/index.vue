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
      <van-tabs
        v-model:active="state.activeBuyOption"
        :swipe-threshold="2"
        type="card"
        style="margin-bottom: 20px"
      >
        <VanTab
          v-for="(item, index) in state.productData.buyOptions"
          :key="index"
          :title="item.optionName"
          :name="index"
        ></VanTab>
      </van-tabs>
      <h2 class="product-price">
        <span class="discount">￥{{ currentProduct.discountPrice }}</span>
        <span class="origin">￥{{ currentProduct.price }}</span>
      </h2>
      <h3>{{ state.productData.name }}</h3>
      <van-text-ellipsis
        :content="state.productData.description"
        expand-text="展开"
        class="description-box"
        collapse-text="收起"
      />
      <p>
        <VanTag
          type="success"
          v-for="(item, index) in state.productData.tagArray"
          :key="index"
        >
          {{ item }}
        </VanTag>
      </p>
    </div>

    <div class="content box">
      <img
        v-for="item in state.productData.content"
        :key="item"
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
        @click="
          () => {
            state.addToCart = true
            state.chooseFormVisible = true
          }
        "
      />
      <van-action-bar-button
        type="danger"
        text="立即购买"
        @click="
          () => {
            state.addToCart = false
            state.chooseFormVisible = true
          }
        "
      />
    </van-action-bar>

    <VanPopup
      v-model:show="state.chooseFormVisible"
      position="bottom"
      closeable
      :style="{ height: '40%', paddingTop: '50px' }"
      round
    >
      <OptionsChooseForm
        :options="state.productData.buyOptions"
        :active-option="state.activeBuyOption"
        @complete="handleChooseComplete"
      ></OptionsChooseForm>
    </VanPopup>
  </div>
</template>

<script setup lang="ts">
import { getProduct } from '@/api/product'
import { shallowReactive, watch, computed } from 'vue'
import { useMainStore } from '@/store/mainStore'
import { useRouter } from 'vue-router'
import OptionsChooseForm from './components/OptionsChooseForm.vue'

const state = shallowReactive<{
  productData: Record<string, any>
  activeBuyOption: number
  chooseFormVisible: boolean
  addToCart: boolean
}>({
  productData: {},
  activeBuyOption: 0,
  chooseFormVisible: false,
  addToCart: false,
})

const router = useRouter()
const mainStore = useMainStore()

const currentProduct = computed(() => {
  const buyOptions = state.productData.buyOptions

  if (buyOptions) {
    return {
      price: buyOptions[state.activeBuyOption].price,
      discountPrice: buyOptions[state.activeBuyOption].discountPrice,
    }
  } else {
    return {
      price: 0,
      discountPrice: 0,
    }
  }
})

function getProductData(productId: number) {
  getProduct({ productId }).then(({ data }) => {
    state.activeBuyOption = 0
    data.tagArray = []
    Object.keys(data.tag).forEach((item) => {
      if (data.tag[item]) {
        switch (item) {
          case 'new':
            data.tagArray.push('新品')
            break
          case 'hot':
            data.tagArray.push('热销')
            break
          case 'wellChoice':
            data.tagArray.push('精选')
            break
        }
      }
    })

    state.productData = data
  })
}

function handleChooseComplete(data: any) {
  state.chooseFormVisible = false

  data.productPicture = state.productData.poster[0]
  data.productName = state.productData.name
  data.buyOptions = state.productData.buyOptions
  data.productId = state.productData.id
  mainStore.$state.cartProductList.push(data)
  if (state.addToCart) {
    router.push('/cart')
  } else {
    mainStore.$state.cartProductChecked = [
      mainStore.$state.cartProductList.length - 1,
    ]
    router.push('/order/create')
  }
}

watch(
  router.currentRoute,
  (val) => {
    if (typeof val.params.id === 'string') {
      if (!isNaN(parseInt(val.params.id))) {
        getProductData(parseInt(val.params.id))
      }
      
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

.product-price {
  padding: 10px 0;
  .discount {
    color: red;
  }
  .origin {
    color: #999;
    text-decoration: line-through;
    font-size: 15px;
    margin-left: 12px;
  }
}
</style>
