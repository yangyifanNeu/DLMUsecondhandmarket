<template>
  <div class="productsPage-container">
    <div class="search-area">
      <a-row>
        <a-form :label-col="{span: 5}" :wrapper-col="{span: 19}">
          <a-form-item label="已选择">
            <a-tag color="#1890ff" v-if="!hasSelectCategory">无</a-tag
            ><a-tag
              color="#1890ff"
              v-for="item in selectedProductMenu"
              :key="item.id"
              closable
              @close="closeTag(item)"
              >{{ item.name }}</a-tag
            >
            <a-input-search
              placeholder="在当前分类下搜索"
              style="width: 400px"
              @search="onSearch"
              v-model="searchValue"
            />
            <a-button type="primary" @click="searchClick" class="search-btn">搜索</a-button>
          </a-form-item>
          <a-form-item label="分类"
            ><a-checkable-tag v-for="item in productMenu" :key="item.id" v-model="item.selected" color="blue"
              ><icon-font :type="item.icon" style="margin-right: 3px" v-if="item.icon.indexOf('icon') == 0" /><a-icon
                v-else
                type="item.icon"
              />{{ item.name }}</a-checkable-tag
            >
          </a-form-item>
          <a-form-item label="热词"
            ><a-checkable-tag v-for="item in hotWords" :key="item.id" v-model="item.selected">{{
              item.label
            }}</a-checkable-tag>
          </a-form-item>
          <a-form-item label="价格区间" style="margin-bottom: 0">
            <a-form-item :style="{display: 'inline-block', width: 'calc(27% - 12px)'}">
              <a-input-number style="width: 100%" v-model="priceLow" />
            </a-form-item>
            <span :style="{display: 'inline-block', width: '24px', textAlign: 'center'}"> - </span>
            <a-form-item :style="{display: 'inline-block', width: 'calc(27% - 12px)'}">
              <a-input-number style="width: 100%" v-model="priceHigh" />
            </a-form-item>
          </a-form-item>
        </a-form>
      </a-row>
    </div>
    <a-row class="product-container" v-if="!loading">
      <a-col :span="6" v-for="item in filterProduct" :key="item.id">
        <a-card hoverable style="width: 240px; margin-bottom: 20px" @click="productDetail(item)">
          <img slot="cover" alt="example" :src="item.img" style="height: 240px" />
          <a-card-meta>
            <template slot="description" class="product-detail"> {{ item.description }}</template>
            <template slot="title">
              <a-row>
                <a-col :span="12" class="product-name">{{ item.name }}</a-col>
                <a-col :span="12" class="product-price">￥{{ item.price }}</a-col>
              </a-row>
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
    <a-row class="product-container" v-if="loading">
      <a-col :span="6" :gutter="15">
        <a-skeleton />
      </a-col>
      <a-col :span="6" :gutter="15">
        <a-skeleton />
      </a-col>
      <a-col :span="6" :gutter="15">
        <a-skeleton />
      </a-col>
      <a-col :span="6" :gutter="15">
        <a-skeleton />
      </a-col>
    </a-row>
    <div id="components-back-top-demo-custom">
      <a-back-top>
        <div class="ant-back-top-inner"><a-icon type="caret-up" /></div>
      </a-back-top>
    </div>
  </div>
</template>

<script>
const hotWords = [
  {
    id: '1',
    label: '考研',
    selected: false,
  },
  {
    id: '2',
    label: '期末',
    selected: false,
  },
  {
    id: '3',
    label: '四六级',
    selected: false,
  },
  {
    id: '4',
    label: '计算机二级',
    selected: false,
  },
  {
    id: '5',
    label: '国考',
    selected: false,
  },
  {
    id: '6',
    label: '家具',
    selected: false,
  },
  {
    id: '7',
    label: '衣服',
    selected: false,
  },
  {
    id: '8',
    label: '旅行',
    selected: false,
  },
  {
    id: '9',
    label: '冬季',
    selected: false,
  },
  {
    id: '10',
    label: '就业',
    selected: false,
  },
  {
    id: '11',
    label: '社团',
    selected: false,
  },
  {
    id: '12',
    label: '篮球',
    selected: false,
  },
  {
    id: '13',
    label: '足球',
    selected: false,
  },
];
const productMenu = [
  {
    name: 'bookAndStationery',
    label: '书籍文具',
    icon: 'icon-Book',
    selected: false,
  },
  {
    name: 'electronicProduct',
    label: '电子产品',
    icon: 'icon-Desktop',
    selected: false,
  },
  {
    name: 'clothes',
    label: '服装配饰',
    icon: 'icon-yifu',
    selected: false,
  },
  {
    name: 'furniture',
    label: '宿舍家具',
    icon: 'icon-jiajudianqi',
    selected: false,
  },
  {
    name: 'beautyCare',
    label: '美妆护理',
    icon: 'icon-meizhuang',
    selected: false,
  },
  {
    name: 'food',
    label: '零食',
    icon: 'icon-ic_drink',
    selected: false,
  },
  {
    name: 'others',
    label: '其他',
    icon: 'icon-XLS_File',
    selected: false,
  },
];

export default {
  data() {
    return {
      searchValue: null,
      productMenu: [],
      hotWords: [],
      productList: [],
      priceLow: null,
      priceHigh: null,
      filterWords: null,
      loading: false,
    };
  },
  methods: {
    onSearch(value) {
      this.getProductsByCondition();
    },
    searchClick() {
      this.onSearch(this.searchValue);
    },
    closeTag(tagData) {
      this.productMenu.forEach((item) => {
        if (item.name == tagData.name) {
          item.selected = false;
        }
      });
    },
    getProductsByCondition() {
      this.loading = true;
      let $this = this;
      let condition = {price: [this.priceLow, this.priceHigh]};
      if (this.searchValue) {
        condition.keyWords = this.searchValue;
      }
      if (this.selectedProductMenu.length > 0) {
        condition.category = this.selectedProductMenu.map((item) => item.id);
      }
      if (this.selectedHotWords.length > 0) {
        condition.hotWords = this.selectedHotWords;
      }
      this.$http({
        method: 'post',
        url: '/product/getProductsByCondition',
        data: condition,
        headers: {
          'Content-type': 'application/json;charset=utf-8',
        },
        withCredentials: true,
      })
        .then(function (result) {
          let data = result.data;
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            element.price = Number(element.currentprice);
            if (element.category !== '1') {
              element.price = element.price.toFixed(0);
            }
          }
          $this.productList = data;
        })
        .finally(() => {
          $this.loading = false;
        });
    },
    getCategory() {
      let r;
      let p = new Promise((resolve) => {
        r = resolve;
      });
      var $this = this;
      this.$http({
        method: 'get',
        url: '/category/getCategory',
        headers: {
          'Content-type': 'application/json;charset=utf-8',
        },
        withCredentials: true,
      }).then(function (result) {
        let category;
        if ($this.$route.query) {
          category = $this.$route.query.category;
        }
        $this.productMenu = result.data.map((item) => {
          if (category && item.id == category) {
            item.selected = true;
          } else {
            item.selected = false;
          }
          return item;
        });
        r();
      });
      return p;
    },
    getTags() {
      var $this = this;
      this.$http({
        method: 'get',
        url: '/tag/allTags',
        headers: {
          'Content-type': 'application/json;charset=utf-8',
        },
        withCredentials: true,
      }).then(function (result) {
        $this.hotWords = result.data.map((item) => {
          item.label = item.name;
          return item;
        });
      });
    },
    productDetail(product) {
      this.$store.commit('refreshCurrentProduct', product);
      this.$router.push({name: 'productItem'});
    },
  },
  computed: {
    hasSelectCategory() {
      let selected = false;
      this.productMenu.forEach((item) => {
        if (item.selected == true) {
          selected = true;
        }
      });
      return selected;
    },
    selectedProductMenu() {
      let selectedProductMenu = this.productMenu.filter((item) => {
        return item.selected;
      });
      return selectedProductMenu;
    },
    filterProduct() {
      let category = this.selectedProductMenu.map((item) => {
        return item.id;
      });
      if (category.length == 0) {
        return this.productList;
      }
      let filtedProducts = this.productList.filter((item) => {
        if (category.includes(item.pcategories[0]['id'])) {
          return true;
        } else {
          return false;
        }
      });
      return filtedProducts;
    },
    selectedHotWords() {
      let data = this.hotWords.filter((item) => item.selected);
      let result = data.map((item) => item.id);
      return result;
    },
  },
  beforeMount() {
    if (this.$route.query && this.$route.query.text) {
      this.searchValue = this.$route.query.text;
    }
    this.getCategory().then(() => this.getProductsByCondition());
    this.getTags();
  },
  mounted() {},
};
</script>

<style lang="less">
.search-area {
  background: #ffffff;
  margin-top: 20px;
  padding-top: 20px;
  .ant-form-item-control {
    text-align: left;
  }
  .ant-tag-checkable {
    color: #1890ff;
    background: #e6f7ff;
    border-color: #91d5ff;
  }
  .ant-tag-checkable-checked {
    background-color: #1890ff;
    color: #fff;
  }
}
.productsPage-container {
  width: 1200px;
  margin: auto;
  .product-container {
    padding-left: 54px;
    padding-top: 26px;
    margin-top: 20px;
    margin-bottom: 15px;
    background: #ffffff;
    min-height: 300px;
  }
  .ant-tag {
    cursor: pointer;
  }
  .ant-card-meta-description {
    text-align: left;
  }
  .product-name {
    text-align: left;
  }
}
.search-btn {
  margin-left: 10px;
}
#components-back-top-demo-custom .ant-back-top {
  bottom: 100px;
}
#components-back-top-demo-custom .ant-back-top-inner {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 22px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 20px;
}
</style>
