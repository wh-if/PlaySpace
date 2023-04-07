<template>
  <div>
    <VanCheckboxGroup
      ref="checkBoxRef"
      v-model="mainStore.$state.cartProductChecked"
    >
      <div
        v-for="(item, index) in mainStore.$state.cartProductList"
        :key="item.productId"
        class="product-item"
      >
        <VanCheckbox
          :name="index"
          style="width: 20px"
        />
        <div class="item-info">
          <div class="img-box">
            <img
              :src="item.productPicture"
              width="90"
              :alt="item.productName"
            />
          </div>

          <div>
            <h4>{{ item.productName }}</h4>
            <p style="font-size: 14px; color: gray">
              {{ item.buyOptions[item.activeOption].optionName }}
            </p>
            <p style="color: red; font-size: larger; padding-top: 16px">
              ￥ {{ item.buyOptions[item.activeOption].discountPrice }}
            </p>
            <van-stepper
              v-model="item.buyCount"
              class="buy-count-box"
              integer
            />
          </div>
        </div>
      </div>
    </VanCheckboxGroup>
    <van-submit-bar
      :price="totalPrice * 100"
      button-text="去结算"
      @submit="onSubmit"
    >
      <van-checkbox
        v-model="checkAll"
        @click="checkBoxRef.toggleAll(checkAll)"
      >
        全选
      </van-checkbox>
      <template #tip> 你的收货地址不支持配送, <span>修改地址</span> </template>
    </van-submit-bar>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/mainStore'
import { showToast } from 'vant'
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'

const mainStore = useMainStore()
const router = useRouter()

const checkBoxRef = ref()
const checkAll = ref(false)
const totalPrice = ref(0)

watch(
  () => mainStore.$state.cartProductChecked,
  (val) => {
    const listLength = mainStore.$state.cartProductList.length
    if (val.length === listLength && listLength !== 0) {
      checkAll.value = true
    } else {
      checkAll.value = false
    }
    totalPrice.value = val.reduce((pre, cur) => {
      const targetProduct = mainStore.$state.cartProductList[cur]
      return (pre +=
        targetProduct.buyOptions[targetProduct.activeOption].discountPrice *
        targetProduct.buyCount)
    }, 0)
  },
  {
    immediate: true,
  }
)

function onSubmit() {
  if (mainStore.$state.cartProductChecked.length === 0) {
    showToast('请至少选择一个商品！')
    return
  }

  router.push('/order/create')
}
</script>

<style lang="scss" scoped>
.product-item {
  background-color: #fff;
  padding: 15px;
  display: flex;
  margin-bottom: 8px;
  .item-info {
    display: flex;
    flex: 1;
    position: relative;

    .img-box {
      background-color: #f5f5f5;
      border-radius: 8px;
      margin: 0 10px;
    }

    p {
      padding-top: 6px;
    }
    .buy-count-box {
      position: absolute;
      right: 8px;
      bottom: 5px;
    }
  }
}
</style>
