<template>
  <div class="main-box">
    <div
      v-if="!isCreatePage"
      class="order-info"
    >
      <p>订单状态：{{ orderData?.status == 0 ? '待支付' : '配送中' }}</p>
      <p>订单编号：{{ orderData?.orderNumber }}</p>
      <p>
        下单时间：{{
          new Date(parseInt(orderData?.createTime)).toLocaleString()
        }}
      </p>
    </div>
    <AddressCard
      ref="addressCardRef"
      :address-id="orderData?.addressId"
    />
    <div class="product-list">
      <div
        v-for="item in productList"
        :key="item.productId"
        class="product-item"
      >
        <div class="img-box">
          <img
            :src="item.productPicture"
            width="90"
            :alt="item.productName"
          />
        </div>

        <div>
          <h4>{{ item.productName }}</h4>
          <p style="color: gray; font-size: 14px">
            {{ item.buyOptions[item.activeOption].optionName }}
          </p>
          <p style="color: red; font-size: larger; padding-top: 16px">
            ￥ {{ item.buyOptions[item.activeOption].discountPrice }}
          </p>
          <span class="buy-count-box">X {{ item.buyCount }}</span>
        </div>
      </div>
    </div>
    <van-submit-bar
      :price="totalPrice * 100"
      :button-type="submitBarState.buttonType"
      :button-text="submitBarState.buttonText"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/mainStore'
import AddressCard from './components/AddressCard.vue'
import { computed, ref } from 'vue'
import { addOrder, getOrder, payOrder } from '@/api/order'
import { useRouter } from 'vue-router'
import { shallowRef } from 'vue'
import { ButtonType, showToast } from 'vant'

const mainStore = useMainStore()
const addressCardRef = ref()
const router = useRouter()
const orderData = shallowRef()

const isCreatePage = computed(
  () => router.currentRoute.value.params.id === 'create'
)

const productList = computed(() => {
  if (isCreatePage.value) {
    return mainStore.$state.cartProductChecked.map(
      (item) => mainStore.$state.cartProductList[item]
    )
  } else {
    return orderData.value?.productItems ?? []
  }
})

const totalPrice = computed(() =>
  productList.value.reduce(
    (pre: any, cur: any) =>
      (pre += cur.buyOptions[cur.activeOption].discountPrice * cur.buyCount),
    0
  )
)

const submitBarState = computed(() => {
  switch (orderData.value?.status) {
    case '0':
      return {
        buttonText: '立即支付',
        buttonType: 'success' as ButtonType,
      }
      case '1':
      return {
        buttonText: '',
        buttonType: 'default' as ButtonType,
      }
    default:
      return {
        buttonText: '提交订单',
        buttonType: 'danger' as ButtonType,
      }
  }
})

function onSubmit() {
  if (!orderData.value?.status) {
    addOrder({
      addressId: addressCardRef.value.chosenAddressId,
      productItems: productList.value,
    }).then((res) => {
      mainStore.$patch({
        cartProductList: mainStore.cartProductList.filter(
          (_, index) => !mainStore.cartProductChecked.includes(index)
        ),
        cartProductChecked: [],
      })

      router.replace(`/order/${res.data.orderId}`)
    })
  } else if (orderData.value.status == 0) {
    payOrder(orderData.value.id).then((res) => {
      // showToast(res.message)
    })
  }
}

if (!isCreatePage.value) {
  getOrder(router.currentRoute.value.params.id as string).then((res) => {
    orderData.value = res.data
  })
}
</script>

<style lang="scss" scoped>
.main-box {
  // padding: 10px 0;

  .order-info {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    p {
      padding: 5px;
    }
  }

  .product-list {
    background-color: #fff;
    border-radius: 8px;
    padding: 10px 5px;
    margin: 10px;
    .product-item {
      display: flex;
      flex: 1;
      position: relative;
      padding: 15px 0;

      .img-box {
        background-color: #f5f5f5;
        border-radius: 8px;
        margin: 0 10px;
      }

      p {
        padding-top: 6px;
        font-size: 15px;
      }
      .buy-count-box {
        position: absolute;
        right: 8px;
        bottom: 20px;
        color: gray;
        font-size: 14px;
      }
    }
  }
}
</style>
