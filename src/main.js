import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
import {Icon} from 'ant-design-vue';
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '/style/iconfont.js',
});
Vue.use(ElementUI);
Vue.use(Antd);
Vue.component('IconFont', IconFont);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
