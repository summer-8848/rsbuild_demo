import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import mainRoutes from './routes/main';
import { Lazyload } from 'vant';

import '@/styles/main.scss';
// 引入toast样式
import 'vant/es/toast/style';

const pinia = createPinia();

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...mainRoutes],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

const app = createApp(App);
//app.component('svg-icon', SvgIcon);
app.use(pinia);
app.use(router);
app.use(Lazyload);
app.mount('#root');
