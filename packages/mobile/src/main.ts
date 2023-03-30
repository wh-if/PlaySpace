import { createApp } from 'vue'
import router from './router'
import 'vant/lib/index.css';
import Vant from "vant";
import App from './App.vue'
import './style.css'

const app = createApp(App)
app.use(Vant);
app.use(router)
app.mount('#app')
