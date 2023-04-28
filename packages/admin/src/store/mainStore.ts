import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useMainStore = defineStore('mainStore', () => {
  const userInfo = reactive<Record<string,any>>({});

  return {
    userInfo,
  }
})
