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
              :key="item.name"
              closable
              @close="closeTag(item)"
              >{{ item.label }}</a-tag
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
            ><a-checkable-tag v-for="item in productMenu" :key="item.name" v-model="item.selected" color="blue"
              ><icon-font :type="item.icon" style="margin-right: 3px" />{{ item.label }}</a-checkable-tag
            >
          </a-form-item>
          <a-form-item label="品相"
            ><a-checkable-tag v-for="item in conditions" :key="item.id" v-model="item.selected">{{
              item.label
            }}</a-checkable-tag>
          </a-form-item>
        </a-form>
      </a-row>
    </div>
    <a-row class="product-container">
      <a-col :span="6" v-for="item in productList" :key="item.id">
        <a-card hoverable style="width: 240px; margin-bottom: 20px">
          <img slot="cover" alt="example" :src="item.img" style="height: 240px" />
          <a-card-meta>
            <template slot="description" class="product-detail"> {{ item.description }}</template>
            <template slot="title">
              <a-row>
                <a-col :span="12" class="product-price" style="padding: 5px 0 9px 0">￥{{ item.price }}</a-col>
                <a-col :span="12"></a-col>
              </a-row>
              <a-row>
                <a-col :span="12" class="product-name">{{ item.name }}</a-col>
                <a-col :span="12"></a-col>
              </a-row>
            </template>
          </a-card-meta>
        </a-card>
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
const conditions = [
  {
    id: '1',
    label: '全新',
    selected: false,
  },
  {
    id: '2',
    label: '几乎全新',
    selected: false,
  },
  {
    id: '3',
    label: '微瑕',
    selected: false,
  },
  {
    id: '4',
    label: '明显瑕疵',
    selected: false,
  },
  {
    id: '5',
    label: '破旧',
    selected: false,
  },
  {
    id: '6',
    label: '无法使用',
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
const electronItems = [
  {
    id: 1,
    name: '富士X-T30II微单',
    description: '全新 几乎全新',
    price: '6100-6800',
    img: '/img/products/electronic/camera.png',
  },
  {
    id: 2,
    name: 'kindle电子书',
    description: '几乎全新 微瑕',
    price: '545-670',
    img: '/img/products/electronic/elecbook.jpg',
  },
  {
    id: 3,
    name: '佳能200d二代',
    description: '几乎全新 全新',
    price: '4780-5580',
    img: '/img/products/electronic/camera1.jpg',
  },
  {
    id: 4,
    name: 'iPad Air4',
    description: '全新 几乎全新',
    price: '5600-7310',
    img: '/img/products/electronic/ipad.jpg',
  },

  {
    id: 5,
    name: 'iphone13',
    description: '破旧 无法使用',
    price: '5700-6800',
    img: '/img/products/electronic/iphone13.jpg',
  },
  {
    id: 6,
    name: 'MacBook Pro',
    description: '微瑕 明显瑕疵',
    price: '10580-12000',
    img: '/img/products/electronic/mac.jpg',
  },
  {
    id: 7,
    name: 'Apple Watch SE',
    description: '明显瑕疵 破旧',
    price: '1200-1500',
    img: '/img/products/electronic/watch.jpg',
  },
  {
    id: 8,
    name: '富士SQ1拍立得',
    description: '微瑕 几乎全新',
    price: '240-580',
    img: '/img/products/electronic/weidan.jpg',
  },
];
const bookItems = [
  {
    id: 1,
    name: '读者',
    description: '破旧 无法使用',
    price: '5-8',
    img: '/img/products/book/1.jpg',
  },
  {
    id: 2,
    name: '血战长津湖',
    description: '明显瑕疵 破旧',
    price: '21.80-25',
    img: '/img/products/book/2.jpg',
  },
  {
    id: 3,
    name: '读法必备',
    description: '全新 几乎全新',
    price: '14-28',
    img: '/img/products/book/3.jpg',
  },
  {
    id: 4,
    name: '高等数学习题',
    description: '全新 几乎全新',
    price: '13-18',
    img: '/img/products/book/4.jpg',
  },

  {
    id: 5,
    name: '绝叫',
    description: '微瑕 明显瑕疵',
    price: '58-60',
    img: '/img/products/book/5.jpg',
  },
  {
    id: 6,
    name: '岛上书店',
    description: '全新 几乎全新',
    price: '10-12',
    img: '/img/products/book/6.jpg',
  },
  {
    id: 7,
    name: '高校导读书目',
    description: '明显瑕疵 破旧',
    price: '93.5-25.8',
    img: '/img/products/book/7.jpg',
  },
  {
    id: 8,
    name: '明朝那些事儿',
    description: '明显瑕疵 破旧',
    price: '9.2-10.8',
    img: '/img/products/book/8.jpg',
  },
];
const clothesItems = [
  {
    id: 1,
    name: '圣诞毛衣',
    description: '全新 几乎全新',
    price: '78-88',
    img: '/img/products/clothes/1.jpg',
  },
  {
    id: 2,
    name: '毛绒帽子',
    description: '微瑕 明显瑕疵',
    price: '28.8-38',
    img: '/img/products/clothes/2.jpg',
  },
  {
    id: 3,
    name: '灰色阔腿裤',
    description: '明显瑕疵',
    price: '28-48',
    img: '/img/products/clothes/3.jpg',
  },
  {
    id: 4,
    name: 'nerdy运动套装',
    description: '几乎全新',
    price: '763-883',
    img: '/img/products/clothes/4.jpg',
  },

  {
    id: 5,
    name: '运动卫衣外套',
    description: '明显瑕疵',
    price: '216-258',
    img: '/img/products/clothes/5.jpg',
  },
  {
    id: 6,
    name: '白色马海毛围巾',
    description: '几乎全新',
    price: '49.9-59.9',
    img: '/img/products/clothes/6.jpg',
  },
  {
    id: 7,
    name: 'alloy彩带包',
    description: '几乎全新 微瑕',
    price: '1880-2000',
    img: '/img/products/clothes/7.jpg',
  },
  {
    id: 8,
    name: 'ae经典卫衣',
    description: '明显瑕疵 破旧',
    price: '880-1000',
    img: '/img/products/clothes/8.jpg',
  },
];
const eatingItems = [
  {
    id: 1,
    name: '蓝莓味燕麦片',
    description: '早八营养早餐首选',
    price: '80',
    img: '/img/products/eating/1.jpg',
  },
  {
    id: 2,
    name: '芝士味饼干',
    description: '芝士浓郁口感极佳',
    price: '125',
    img: '/img/products/eating/2.jpg',
  },
  {
    id: 3,
    name: '乳酪小蛋糕',
    description: '口感细腻保质期一年',
    price: '45',
    img: '/img/products/eating/3.jpg',
  },
  {
    id: 4,
    name: '巧克力夹心曲奇',
    description: '巧克力浓郁倍感丝滑',
    price: '55',
    img: '/img/products/eating/4.jpg',
  },

  {
    id: 5,
    name: '好利来oreo蛋糕',
    description: '未拆封全新出',
    price: '88',
    img: '/img/products/eating/5.jpg',
  },
  {
    id: 6,
    name: '乐事四味薯片',
    description: '家庭宿舍版一次性畅享',
    price: '65',
    img: '/img/products/eating/6.jpg',
  },
  {
    id: 7,
    name: '布朗尼饼干',
    description: '颜值口感都很棒！',
    price: '70',
    img: '/img/products/eating/7.jpg',
  },
  {
    id: 8,
    name: '趣多多爆逗曲奇',
    description: '爆浆又酥脆',
    price: '25',
    img: '/img/products/eating/8.jpg',
  },
];
const furnitureItems = [
  {
    id: 1,
    name: '脏衣篓',
    description: '脏衣服没处放？一整个消灭掉',
    price: '45',
    img: '/img/products/furniture/1.jpg',
  },
  {
    id: 2,
    name: '零食小推车',
    description: '几乎全新 占地小易取放',
    price: '135',
    img: '/img/products/furniture/2.jpg',
  },
  {
    id: 3,
    name: '常亮小夜灯',
    description: '微瑕 熬夜赶ddl必备',
    price: '65',
    img: '/img/products/furniture/3.jpg',
  },
  {
    id: 4,
    name: '清洁洗菜盆',
    description: '宿舍方便洗菜盛装',
    price: '13',
    img: '/img/products/furniture/4.jpg',
  },

  {
    id: 5,
    name: '吹风机固定器',
    description: '全新 女生宿舍收纳',
    price: '40',
    img: '/img/products/furniture/5.jpg',
  },
  {
    id: 6,
    name: '首饰收纳盒',
    description: '耳钉戒指再也不会丢啦',
    price: '26',
    img: '/img/products/furniture/6.jpg',
  },
  {
    id: 7,
    name: '抽屉收纳盒',
    description: '一开抽屉马上找到！',
    price: '70',
    img: '/img/products/furniture/7.jpg',
  },
  {
    id: 8,
    name: '桌面收纳利器',
    description: '微瑕 ins风',
    price: '45',
    img: '/img/products/furniture/8.jpg',
  },
];
const elseItems = [
  {
    id: 1,
    name: '芝麻街时钟',
    description: '滴滴滴早八不迟到！',
    price: '75',
    img: '/img/products/else/1.jpg',
  },
  {
    id: 2,
    name: '泡泡玛特相框',
    description: '几乎全新 限量版发售',
    price: '330',
    img: '/img/products/else/2.jpg',
  },
  {
    id: 3,
    name: 'iPad Pro 保护壳',
    description: '未拆封 从此爱不释手',
    price: '58',
    img: '/img/products/else/3.jpg',
  },
  {
    id: 4,
    name: 'ins风桌面小盆栽',
    description: '桌面的一抹绿色',
    price: '34',
    img: '/img/products/else/4.jpg',
  },

  {
    id: 5,
    name: '星黛露可爱装饰',
    description: '全新 营造温馨宿舍',
    price: '260',
    img: '/img/products/else/5.jpg',
  },
  {
    id: 6,
    name: '极简手账本',
    description: '用笔记录美好生活',
    price: '88',
    img: '/img/products/else/6.jpg',
  },
  {
    id: 7,
    name: '急用医药箱',
    description: '全新 小体积大用处！',
    price: '100',
    img: '/img/products/else/7.jpg',
  },
  {
    id: 8,
    name: '速热卷发棒',
    description: '轻松当自己的Tony老师',
    price: '180',
    img: '/img/products/else/8.jpg',
  },
];
const productList = [].concat(electronItems, bookItems, clothesItems, eatingItems, furnitureItems, elseItems);
productList.forEach((item, index) => {
  item.id = index + '';
});

export default {
  data() {
    return {
      searchValue: null,
      productMenu,
      conditions,
      productList,
      priceLow: null,
      priceHigh: null,
    };
  },
  methods: {
    onSearch(value) {
      console.log(value);
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
  },
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
    background: #ffffff;
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
