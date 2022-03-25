import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/common/home',
  },
  {
    path: '/common',
    component: () => import(/* webpackChunkName: "layout" */ '@/components/layout/basicLayout.vue'),
    children: [
      {
        name: 'home',
        path: '/common/home',
        meta: {
          label: '主页',
        },
        component: () => import(/* webpackChunkName: "layout" */ '@/views/Home.vue'),
      },
      {
        name: 'taoershou',
        path: '/common/taoershou',
        meta: {
          label: '淘二手',
        },
        component: () => import(/* webpackChunkName: "layout" */ '@/views/products/products.vue'),
      },
      {
        name: 'xuanshangbang',
        path: '/common/xuanshangbang',
        meta: {
          label: '悬赏榜',
        },
        component: () => import(/* webpackChunkName: "layout" */ '@/views/products/request.vue'),
      },
      {
        name: 'publishProduct',
        path: '/common/publishProduct',
        meta: {
          label: '发布闲置',
        },
        component: () => import(/* webpackChunkName: "layout" */ '@/views/publish/publishProduct'),
      },
      {
        name: 'publishWants',
        path: '/common/publishWants',
        meta: {
          label: '发布求购信息',
        },
        component: () => import(/* webpackChunkName: "layout" */ '@/views/publish/publishWants'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
