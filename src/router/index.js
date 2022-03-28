import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/common/home',
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "layout" */ '@/components/layout/userLayout.vue'),
    children: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'userLogin',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login.vue'),
      },
      {
        path: '/user/registry',
        name: 'userRegistry',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Registry.vue'),
      },
    ],
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
        name: 'productItem',
        path: '/common/productItem',
        meta: {
          label: '商品详情',
        },
        component: () => import(/* webpackChunkName: "layout" */ '@/views/products/productItem.vue'),
      },
      {
        name: 'wants',
        path: '/common/wants',
        meta: {
          label: '悬赏榜',
        },
        component: () => import(/* webpackChunkName: "layout" */ '@/views/wants/wants.vue'),
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
      {
        name: 'personCenter',
        path: '/common/personCenter',
        meta: {
          label: '个人中心',
        },
        component: () => import(/* webpackChunkName: "layout" */ '@/components/layout/personLayout.vue'),
        redirect: '/common/personCenter/personInfo',
        children: [
          {
            name: 'personInfo',
            path: '/common/personCenter/personInfo',
            meta: {
              label: '个人信息',
            },
            component: () => import(/* webpackChunkName: "layout" */ '@/views/personCenter/personInfo.vue'),
          },
          {
            name: 'myProduct',
            path: '/common/personCenter/myProducts',
            meta: {
              label: '我的商品',
            },
            component: () => import(/* webpackChunkName: "layout" */ '@/views/personCenter/myProduct.vue'),
          },
          {
            name: 'myProduct',
            path: '/common/personCenter/myWants',
            meta: {
              label: '我的求购信息',
            },
            component: () => import(/* webpackChunkName: "layout" */ '@/views/personCenter/myWants.vue'),
          },
          {
            name: 'myProduct',
            path: '/common/personCenter/myCollection',
            meta: {
              label: '我的收藏',
            },
            component: () => import(/* webpackChunkName: "layout" */ '@/views/personCenter/myCollection.vue'),
          },
        ],
      },
    ],
  },
  {
    name: '403',
    path: '/exception/403',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/exception/403.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach((to) => {
  NProgress.done();
});
export default router;
