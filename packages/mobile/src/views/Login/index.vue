<template>
  <div class="main-content">
    <h1 class="title">W H I F</h1>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="accountNumber"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          plain
          size="large"
          type="primary"
          native-type="submit"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { login } from '@/api/user'
import { useMainStore } from '@/store/mainStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const username = ref('')
const password = ref('')
const mainStore = useMainStore()
const router = useRouter()
const onSubmit = (values: any) => {
  login(values).then((res) => {
    if (res.data !== null) {
      mainStore.$patch({
        userInfo: res.data,
      })
      console.log(history.state);
      
      router.go(-1)
    }
  })
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  padding: 20px 0;
  font-family: 'Chiller';
  font-size: 3rem;
}
</style>
