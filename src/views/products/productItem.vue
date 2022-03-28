<template>
  <div class="productContainer">
    <a-row>
      <a-col :span="6"> <img :src="currentProduct.img" alt="" style="height: 240px" /> </a-col>
      <a-col :span="18">
        <a-descriptions :title="currentProduct.name">
          <a-descriptions-item label="现价">{{ currentProduct.currentprice }}</a-descriptions-item>
          <a-descriptions-item label="原价"> {{ currentProduct.originalprice }}</a-descriptions-item>
          <a-descriptions-item label="成色"> {{ productConditionLabel }} </a-descriptions-item>
          <a-descriptions-item label="购买渠道"> {{ buyingwayLabel }} </a-descriptions-item>
          <a-descriptions-item label="描述信息">
            {{ currentProduct.description }}
          </a-descriptions-item>
        </a-descriptions>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data: () => {
    return {
      productConditionList: [],
      buyingWayList: [],
    };
  },
  beforeMount() {
    let $this = this;
    this.$http({
      method: 'get',
      url: '/codelist/getCodelist',
      params: {name: 'condition'},
      headers: {
        'Content-type': 'application/json;charset=utf-8',
      },
      withCredentials: true,
    }).then(function (result) {
      $this.productConditionList = result.data;
    });
    this.$http({
      method: 'get',
      url: '/codelist/getCodelist',
      params: {name: 'buyingway'},
      headers: {
        'Content-type': 'application/json;charset=utf-8',
      },
      withCredentials: true,
    }).then(function (result) {
      $this.buyingWayList = result.data;
    });
  },
  computed: {
    ...mapState(['currentProduct']),
    buyingwayLabel() {
      let result;
      let $this = this;
      this.buyingWayList.forEach((item) => {
        if (item.codevalue == $this.currentProduct.buyingway) {
          result = item.codename;
        }
      });
      return result;
    },
    productConditionLabel() {
      let result;
      let $this = this;
      this.productConditionList.forEach((item) => {
        if (item.codevalue == $this.currentProduct.condition) {
          result = item.codename;
        }
      });
      return result;
    },
  },
};
</script>

<style>
.productContainer {
  text-align: left;
  background: #fff;
  min-height: 500px;
  width: 1200px;
  margin: 20px auto;

  padding: 30px 30px;
}
</style>
