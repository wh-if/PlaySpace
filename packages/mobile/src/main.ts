import { createApp, watch } from 'vue'
import router from './router'
import 'vant/lib/index.css';
import Vant from "vant";
import { createPinia } from 'pinia';
import App from './App.vue'
import './style.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(Vant);
app.use(router)
app.mount('#app')

const storagedState = JSON.parse(localStorage.getItem('piniaState') || '{}')
pinia.state.value = storagedState;

watch(
  pinia.state,
  (state) => {
    // 每当状态发生变化时，将整个 state 持久化到本地存储。
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
