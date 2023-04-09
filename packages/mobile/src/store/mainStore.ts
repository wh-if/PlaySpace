import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useMainStore = defineStore('mainStore', () => {
  const cartProductList = ref<Record<any, any>[]>([]);
  const cartProductChecked = ref<number[]>([]);
  const userInfo = reactive<Record<string,any>>({});

  return {
    cartProductList,
    userInfo,
    cartProductChecked,
  }
})
