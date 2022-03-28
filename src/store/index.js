import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentProduct: null,
  },
  mutations: {
    refreshCurrentProduct: function (state, currentProduct) {
      state.currentProduct = currentProduct;
    },
  },
  actions: {},
  modules: {},
});
