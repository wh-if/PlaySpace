<template>
  <div class="main-content">
    <VanSidebar
      v-model="active"
      class="category-sidebar"
    >
      <template
        v-for="item in state.categoryList"
        :key="item.id"
      >
        <h3
          v-if="!!item.withTitle"
          style="padding: 10px 0; text-align: center"
        >
          {{ item.withTitle }}
        </h3>
        <VanSidebarItem :title="item.name" />
      </template>
    </VanSidebar>
    <!-- <VanGrid
      :column-num="2"
      icon-size="64"
      
    >
      <VanGridItem
        v-for="value in 8"
        :key="value"
        :icon="'/public/navImg/' + value + '.webp'"
      />
    </VanGrid> -->
    <van-list
      class="product-list"
      finished-text="没有更多了"
    >
      <VanCard
        v-for="item in state.productList"
        :key="item.id"
        :price="item.buyOptions[0].discountPrice"
        :desc="item.description"
        :title="item.name"
        :thumb="`/api${item.poster[Math.floor(Math.random() * 4)]}`"
        :origin-price="item.buyOptions[0].price"
        @click="handleViewProduct(item.id)"
      />
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { getCategory, getProduct } from '@/api/product'
import { ref, shallowReactive, watch } from 'vue'
import { useRouter } from 'vue-router';
const active = ref(0)
const router   = useRouter()

const state = shallowReactive<Record<string, any>>({
  categoryList: [],
  activeBar: 0,
  productList: [],
})

getCategory().then((res) => {
  let result: any[] = []
  if (Array.isArray(res)) {
    res.forEach((item) => {
      if (item.children) {
        item.children[0].withTitle = item.name
        item.children.forEach((i: any) => {
          result.push(i)
        })
      } else {
        result.push(item)
      }
    })
  }

  state.categoryList = result
})

function handleViewProduct(id:number|string) {
  router.push('/product/'+id)
}

watch(
  active,
  (newVal) => {
    let queryParams
    console.log(newVal)

    if (newVal !== 0) {
      queryParams = { categoryId: state.categoryList[newVal].id }
    }

    getProduct(queryParams).then((res) => {
      state.productList = res.data
    })
  },
  {
    immediate: true,
  }
)
</script>

<style lang="scss" scoped>
.main-content {
  // display: flex;

  .category-sidebar {
    position: fixed;
    width: 84px;
  }
  .product-list {
    padding-left: 84px;
  }
}
</style>
