import type { RouteRecordRaw } from 'vue-router';

const mainRoutes: Array<RouteRecordRaw> = [
  // 入口
  { path: '/', component: () => import('@/views/main/index.vue') },

  /** 项目 **/
  { path: '/project/list', component: () => import('@/views/main/index.vue') },
  { path: '/project/store', component: () => import('@/views/main/index.vue') },
  { path: '/project/update', component: () => import('@/views/main/index.vue') },

  /** 客户 **/
  { path: '/customer/list', component: () => import('@/views/main/index.vue') },
  { path: '/customer/store', component: () => import('@/views/main/index.vue') },
  { path: '/customer/update', component: () => import('@/views/main/index.vue') },

  /** 跟进记录 **/
  { path: '/follow/list', component: () => import('@/views/main/index.vue') },
  { path: '/follow/store', component: () => import('@/views/main/index.vue') },
  { path: '/follow/update', component: () => import('@/views/main/index.vue') },
  // 跟进记录审核
  { path: '/follow/review', component: () => import('@/views/main/index.vue') },
  // 跟进计划
  { path: '/follow/plan', component: () => import('@/views/main/index.vue') },
];

export default mainRoutes;
