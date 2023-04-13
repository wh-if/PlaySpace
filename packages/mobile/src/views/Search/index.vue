<template>
  <div class="main-box">
    <VanSearch
      v-model="searchState.inputValue"
      :clearable="false"
      @search="handleSearch"
    />
    <div class="search-result">
      <p class="result-info">
        总共查找到 {{ searchState.resultList.length }} 项
      </p>
      <div class="result-list">
        <div
          v-for="item in searchState.resultList"
          :key="item.id"
          class="result-item"
          @click="$router.push(`/product/${item.id}`)"
        >
          <img
            :src="item.poster[0]"
            alt=""
            width="80"
          />
          <div class="item-content">
            <h4>{{ item.name }}</h4>
            <VanTextEllipsis :content="item.description" />
            <p>￥{{ item.buyOptions[0].discountPrice }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProduct } from '@/api/product'
import { shallowReactive, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchState = shallowReactive({
  inputValue: (router.currentRoute.value.query.q as string) ?? '',
  resultList: [] as Record<string, any>[],
})

watch(router.currentRoute, () => {
  getProduct({ searchKeyWord: searchState.inputValue }).then((res) => {
    searchState.resultList = res.data
  })
})

function handleSearch() {
  router.push('/search?q=' + searchState.inputValue)
}
</script>

<style lang="scss" scoped>
.main-box {
  // background-color: #fff;
}

.result-list {
  .result-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .item-content {
      flex: 1;
    }
  }
}
</style>
