<template>
  <div class="home">
    <div class="header-back"></div>
    <div class="home-container">
      <a-row class="taortshou-container">
        <a-row class="first-row">
          <a-col :span="13" style="padding-right: 10px">
            <a-card style="margin-right: 50px" class="home-card">
              <a-row class="tao-title">
                <a-col>
                  <h1 class="title1">淘二手</h1>
                </a-col>
              </a-row>
              <a-row>
                <a-col>
                  <span v-for="item in productMenu" :key="item.name" class="productMenu-item">
                    <icon-font :type="item.icon" style="margin-right: 3px" />{{ item.label }}
                  </span></a-col
                >
              </a-row>
              <a-row>
                <a-col> <a-input-search placeholder="输入你想要的商品" @search="onSearch" class="searchbox" /> </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col :span="11" style="padding-left: 10px">
            <a-card class="home-card">
              <a-row class="tao-title">
                <a-col :span="24">
                  <h1 class="title1">信息发布</h1>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <p>线下交易，方便快捷</p>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24"
                  ><a-button
                    type="primary"
                    icon="upload"
                    size="large"
                    style="margin-right: 20px"
                    @click="publishProducts"
                  >
                    发布闲置</a-button
                  ><a-button type="primary" icon="upload" size="large" @click="publishWants"> 张贴悬赏</a-button></a-col
                >
              </a-row>
              <a-row>
                <a-col> </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>

        <a-col :span="24">
          <span class="inspectTitle"
            ><span>服务全校</span><span class="inspectTitleNum"> 60,000 </span><span>多名师生</span></span
          >
        </a-col>
        <a-col :span="24">
          <a-menu v-model="current" mode="horizontal" @click="carouselMenuClick">
            <a-menu-item :key="item.id" v-for="item in carouselList"> {{ item.title }} </a-menu-item>
          </a-menu>
          <el-carousel
            :interval="10000"
            arrow="always"
            class="home-carousel"
            indicator-position="none"
            @change="carouselChange"
            ref="carousel"
            height="370px"
          >
            <el-carousel-item v-for="item in carouselList" :key="item.key">
              <a-row>
                <a-col :span="12" class="descriptionContainer" :class="'descriptionContainer-' + item.id">
                  <a-row>
                    <a-col>
                      <p class="subtitle">{{ item.subtitle }}</p>
                    </a-col>
                    <a-col class="description">
                      <p>{{ item.descrption }}</p>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :span="12">
                  <div class="carousel-img-container">
                    <img :src="item.img" />
                  </div>
                </a-col>
              </a-row>
            </el-carousel-item>
          </el-carousel>
        </a-col>
        <a-col :span="24">
          <div class="title-container">
            <p class="headTitle">正在热卖</p>
            <div class="titleLine"></div>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="menuTitle-container">
            <icon-font type="icon-xuhao1" class="icon-number" /><span class="menuTitle"><p>电子产品</p></span>
          </div>
        </a-col>
        <a-col :span="24" style="margin-bottom: 30px">
          <a-row>
            <a-col :span="6" v-for="item in electronItems" :key="item.id">
              <a-card hoverable style="width: 240px; margin-bottom: 20px">
                <img slot="cover" alt="example" :src="item.img" style="height: 240px" />
                <a-card-meta>
                  <template slot="description"> {{ item.description }}</template>
                  <template slot="title">
                    <a-row>
                      <a-col :span="12">{{ item.name }}</a-col>
                      <a-col :span="12" class="product-price">￥{{ item.price }}</a-col>
                    </a-row>
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="24">
          <div class="menuTitle-container">
            <icon-font type="icon-xuhao2" class="icon-number" /><span class="menuTitle"><p>二手书籍</p></span>
          </div>
        </a-col>
        <a-col :span="24" style="margin-bottom: 30px">
          <a-row>
            <a-col :span="6" v-for="item in bookItems" :key="item.id">
              <a-card hoverable style="width: 240px; margin-bottom: 20px">
                <img slot="cover" alt="example" :src="item.img" style="height: 240px" />
                <a-card-meta>
                  <template slot="description"> {{ item.description }}</template>
                  <template slot="title">
                    <a-row>
                      <a-col :span="12">{{ item.name }}</a-col>
                      <a-col :span="12" class="product-price">￥{{ item.price }}</a-col>
                    </a-row>
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="24">
          <div class="menuTitle-container">
            <icon-font type="icon-xuhao3" class="icon-number" /><span class="menuTitle"><p>服装鞋帽</p></span>
          </div>
        </a-col>
        <a-col :span="24">
          <a-row>
            <a-col :span="6" v-for="item in clothesItems" :key="item.id">
              <a-card hoverable style="width: 240px; margin-bottom: 20px">
                <img slot="cover" alt="example" :src="item.img" style="height: 240px" />
                <a-card-meta>
                  <template slot="description"> {{ item.description }}</template>
                  <template slot="title">
                    <a-row>
                      <a-col :span="12">{{ item.name }}</a-col>
                      <a-col :span="12" class="product-price">￥{{ item.price }}</a-col>
                    </a-row>
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
    <div id="components-back-top-demo-custom">
      <a-back-top>
        <div class="ant-back-top-inner"><a-icon type="caret-up" /></div>
      </a-back-top>
    </div>
  </div>
</template>

<script>
const productMenu = [
  {
    name: 'bookAndStationery',
    label: '书籍文具',
    icon: 'icon-Book',
  },
  {
    name: 'electronicProduct',
    label: '电子产品',
    icon: 'icon-Desktop',
  },
  {
    name: 'clothes',
    label: '服装配饰',
    icon: 'icon-Dress',
  },
  {
    name: 'furniture',
    label: '宿舍家具',
    icon: 'icon-Desk',
  },
  {
    name: 'beautyCare',
    label: '美妆护理',
    icon: 'icon-kouhong',
  },
  {
    name: 'food',
    label: '零食',
    icon: 'icon-Tea',
  },
  {
    name: 'others',
    label: '其他',
    icon: 'icon-XLS_File',
  },
];
const carouselList = [
  {
    img: '/img/home/1.jpg',
    descrption: '担心实物与图片不符?害怕物流太慢？' + '\n' + '线下交易模式，支持当面验货！',
    title: '线下交易',
    subtitle: '线下交易 方便快捷',
    id: '1',
  },
  {
    img: '/img/home/2.jpg',
    descrption: '学校太大，宿舍楼找不到！ \n点我导航（输入目的地，可以单行至目的地）',
    title: '宿舍布局',
    subtitle: '宿舍布局 方便出行',
    id: '2',
  },
  {
    img: '/img/home/3.jpg',
    descrption: '采用以学号为基础的用户实名制，\n从根本上杜绝了校园诈骗',
    title: '信息可靠',
    subtitle: '信息可靠 反对诈骗',
    id: '3',
  },
  {
    img: '/img/home/4.jpg',
    descrption: '群聊信息太多？图片加载不出？  \n来海纳百物吧！一站式服务解决您的所有需求',
    title: '打破常规',
    subtitle: '打破常规 跳出群聊',
    id: '4',
  },
];
const electronItems = [
  {
    id: 1,
    name: '富士X-T30II微单',
    description: '八成新保修期2年',
    price: '6100',
    img: '/img/products/electronic/camera.png',
  },
  {
    id: 2,
    name: 'kindle电子书',
    description: '九成新看书很方便',
    price: '545',
    img: '/img/products/electronic/elecbook.jpg',
  },
  {
    id: 3,
    name: '佳能200d二代',
    description: '文艺女生必备',
    price: '4780',
    img: '/img/products/electronic/camera1.jpg',
  },
  {
    id: 4,
    name: 'iPad Air4',
    description: '天蓝色，64G，九成新',
    price: '5600',
    img: '/img/products/electronic/ipad.jpg',
  },

  {
    id: 5,
    name: 'iphone13',
    description: '远峰蓝，128G全新未拆封',
    price: '7500',
    img: '/img/products/electronic/iphone13.jpg',
  },
  {
    id: 6,
    name: 'MacBook Pro',
    description: '13英寸M1芯片',
    price: '10580',
    img: '/img/products/electronic/mac.jpg',
  },
  {
    id: 7,
    name: 'Apple Watch SE',
    description: '用过一个月无磨损！',
    price: '2499',
    img: '/img/products/electronic/watch.jpg',
  },
  {
    id: 8,
    name: '富士SQ1拍立得',
    description: '氛围感十足送一盒相纸',
    price: '750',
    img: '/img/products/electronic/weidan.jpg',
  },
];
const bookItems = [
  {
    id: 1,
    name: '读者',
    description: '2010-22期 有轻微折痕',
    price: '5',
    img: '/img/products/book/1.jpg',
  },
  {
    id: 2,
    name: '血战长津湖',
    description: '4.2折 现代出版社 无污渍',
    price: '21.80',
    img: '/img/products/book/2.jpg',
  },
  {
    id: 3,
    name: '读法必备',
    description: '3.5折 有划线 ',
    price: '14.00',
    img: '/img/products/book/3.jpg',
  },
  {
    id: 4,
    name: '高等数学习题',
    description: '沈阳出版社 有划痕、折页',
    price: '13.70',
    img: '/img/products/book/4.jpg',
  },

  {
    id: 5,
    name: '绝叫',
    description: '全新 未拆封 可小刀',
    price: '58.00',
    img: '/img/products/book/5.jpg',
  },
  {
    id: 6,
    name: '岛上书店',
    description: '2.9折 江苏凤凰文艺出版社',
    price: '10.10',
    img: '/img/products/book/6.jpg',
  },
  {
    id: 7,
    name: '高校导读书目',
    description: '1-5全套 有轻微折痕 磨铁',
    price: '93.50',
    img: '/img/products/book/7.jpg',
  },
  {
    id: 8,
    name: '明朝那些事儿',
    description: '中国友谊出版公司 轻度污渍',
    price: '9.20',
    img: '/img/products/book/8.jpg',
  },
];
const clothesItems = [
  {
    id: 1,
    name: '圣诞毛衣',
    description: '未下水，仅上身一次，9成新',
    price: '78',
    img: '/img/products/clothes/1.jpg',
  },
  {
    id: 2,
    name: '毛绒帽子',
    description: '冬天必备！全新工厂代工',
    price: '28.8',
    img: '/img/products/clothes/2.jpg',
  },
  {
    id: 3,
    name: '灰色阔腿裤',
    description: '面有一点起球，仅穿过两次',
    price: '58',
    img: '/img/products/clothes/3.jpg',
  },
  {
    id: 4,
    name: 'nerdy运动套装',
    description: '韩国免税店购入，八折出',
    price: '763',
    img: '/img/products/clothes/4.jpg',
  },

  {
    id: 5,
    name: '运动卫衣外套',
    description: '新旧程度如图，不议价',
    price: '216',
    img: '/img/products/clothes/5.jpg',
  },
  {
    id: 6,
    name: '白色马海毛围巾',
    description: '朋友送的，围巾太多了',
    price: '49.9',
    img: '/img/products/clothes/6.jpg',
  },
  {
    id: 7,
    name: 'alloy彩带包',
    description: '去年入手，几乎全新',
    price: '2160',
    img: '/img/products/clothes/7.jpg',
  },
  {
    id: 8,
    name: 'ae经典卫衣',
    description: '最显白的单品！',
    price: '1440',
    img: '/img/products/clothes/8.jpg',
  },
];
export default {
  name: 'Home',
  data() {
    return {
      productMenu,
      carouselList,
      electronItems,
      bookItems,
      clothesItems,
      current: ['1'],
    };
  },
  components: {},
  methods: {
    onSearch(value) {
      console.log(value);
    },
    getProps(props) {
      return this.carouselList[props.i].title;
    },
    carouselChange(value) {
      this.current = [value + 1 + ''];
    },
    carouselMenuClick(value) {
      let key = value.key;
      this.$refs.carousel.setActiveItem(Number(key) - 1);
    },
    publishProducts() {
      this.$router.push({path: '/common/publishProduct'});
    },
    publishWants() {
      this.$router.push({path: '/common/publishWants'});
    },
  },
  watch: {},
};
</script>
<style>
.menuTitle {
  font-size: 24px;
  margin-left: 7px;
}
.menuTitle-container {
  margin-bottom: 10px;
}
.menuTitle p {
  display: inline;
}
.icon-number {
  font-size: 24px;
}
.icon-number svg {
  height: 24px;
  width: 24px;
}
.headTitle {
  text-align: center;
  font-size: 30px;
  margin: 0;
  /* color: #bae7ff; */
  color: #1f1f1f;
}
.title-container {
  text-align: center;
  margin: 42px 0;
}
.titleLine {
  width: 50px;
  height: 3px;
  background-color: #1890ff;
  margin: auto;
}
.first-row {
  background-color: #ffffff;
}

.taortshou-container {
  text-align: left;
  margin-top: -105px;
}
.home-container {
  width: 1200px;
  margin: auto;
}
.tao-title {
  color: #0d1a26;

  margin-bottom: 5px;
  margin-top: 8px;
  font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
    Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-size: 25px;
  font-variant: tabular-nums;
  line-height: 38px;
}
.tao-title h1 {
  font-weight: 800;
}
.productMenu-item {
  margin-right: 10px;
  cursor: pointer;
}
.ant-col .searchbox {
  margin-top: 20px;
  width: 100%;
}
.home-card {
  height: 195px;
  width: 100%;
  border: none !important;
}
/**/
.carousel-img-container {
  height: 370px;
  width: 100%;
}
.carousel-img-container img {
  height: 100%;
  width: 100%;
}
.home-carousel {
  background: #ffffff;
}
.ant-menu.ant-menu-horizontal.ant-menu-root.ant-menu-light {
  text-align: center;

  font-size: 18px;
  line-height: 60px;
}
.ant-menu-item.ant-menu-item-selected {
  font-weight: 900;
}
.description {
  white-space: pre-wrap;
  padding: 0 0 0 50px;
  color: #707070;
  font-size: 14px;
  line-height: 26px;
}
.subtitle {
  position: relative;
  color: #1f1f1f;
  font-weight: 700;
  font-size: 34px;
  line-height: 47px;
  padding: 100px 0 0 50px;
}
.descriptionContainer {
  height: 370px;
}
.descriptionContainer-1 {
  background-color: #b5a368;
  background-image: linear-gradient(160deg, #b5a368 0%, #ffffff 100%);
}
.descriptionContainer-2 {
  background-color: #ffec80;
  background-image: linear-gradient(147deg, #ffec80 0%, #ffffff 74%);
}
.descriptionContainer-3 {
  background-color: #bae7ff;
  background-image: linear-gradient(160deg, #bae7ff 0%, #ffffff 100%);
}
.descriptionContainer-4 {
  background-color: #fcd8fc;
  background-image: linear-gradient(160deg, #fcd8fc 0%, #ffffff 100%);
}
.inspectTitle {
  position: relative;
  display: inline-block;
  color: #1f1f1f;
  font-size: 24px;
  line-height: 22px;
  text-align: center;
  width: 100%;
  padding: 20px 0;
  color: #595959;
  margin-top: 37px;
  margin-bottom: 50px;
}
.inspectTitle .inspectTitleNum {
  font-size: 40px;
  color: #1f1f1f;
}
.header-back {
  height: 300px;
  width: 100%;
  background-image: url(../assets/background.jpg);
  background-size: cover;
  /* position: absolute; */
}
.product-price {
  text-align: right;
  color: #ff4d4f;
  font-weight: 800;
  font-size: 20px;
  line-height: 14px;
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
.title1 {
  color: #2c3e50;
}
</style>
