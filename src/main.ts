import {createApp} from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import '@/assets/tailwind.css';
import App from './App.vue';
import router from './route';

createApp(App)
    .use(router)
    .use(Antd)
    .mount('#app')
