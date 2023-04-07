<template>
  <div>
    <div
      v-for="item in orderList"
      :key="item.id"
      @click="viewOrder(item.id)"
      class="order-item"
    >
      <p>
        <span>编号：{{ item.orderNumber }}</span>
        <span style="float: right">{{
          item.status == '0' ? '待支付' : '配送中'
        }}</span>
      </p>
      <div class="products-info">
        <div class="order-price">{{ item.totalPrice }}</div>
        <div class="products-imgs">
          <div
            v-for="(postItem, index) in item.productPictures"
            :key="index"
            class="img-box"
          >
            <img
              :src="postItem"
              :alt="postItem"
              width="80"
            />
          </div>
        </div>
      </div>
      <p style="text-align: right">
        {{ new Date(parseInt(item.createTime)).toLocaleString() }}
      </p>
      <VanDivider />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getOrder } from '@/api/order'
import { shallowRef } from 'vue'
import { useRouter } from 'vue-router'

const orderList = shallowRef<Record<string, any>[]>()

const router = useRouter()

function viewOrder(orderId: number | string) {
  router.push('/order/' + orderId)
}

getOrder().then((res) => {
  orderList.value = res.data
})
</script>

<style lang="scss" scoped>
.order-item {
  background-color: #fff;
  padding: 12px;

  .products-info {
    position: relative;
    height: 80px;
    margin: 10px 0;
    padding: 10px 0;

    .products-imgs {
      overflow: scroll;
      display: flex;

      .img-box {
        background-color: #f5f5f5;
        border-radius: 8px;
        margin: 0 8px;
      }
    }

    .order-price {
      position: absolute;
      width: 120px;
      height: 100%;
      text-align: right;
      right: 0;
      color: red;
      font-size: 20px;
      background: linear-gradient(to right, #fff0, #fff, #fff);
      line-height: 80px;
      vertical-align: middle;
    }
  }
}
</style>
