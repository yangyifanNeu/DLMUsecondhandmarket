<template>
  <div
    :style="{
      padding: '15px 0',
      background: '#fffff',
      minHeight: '360px',
    }"
    style="height: calc(100vh - 64px)"
  >
    <a-row :gutter="16" style="height: 100%">
      <a-col :span="6" style="height: 100%"
        ><a-card title="个人信息" style="height: 100%">
          <a-row>
            <a-col><a-avatar :size="64" src="/img/avatar.jpg"></a-avatar></a-col>
            <a-col style="line-height: 350%; font-size: 20px; font-weight: 450; height: 70px">{{
              productInformation.name
            }}</a-col>
          </a-row>
          <a-row style="padding: 10px 0">
            <a-col :span="10" class="info-label">学号</a-col>
            <a-col :span="14" class="info-content">
              {{ productInformation.studentId }}
            </a-col>
          </a-row>
          <a-row style="padding: 10px 0">
            <a-col :span="10" class="info-label">电话</a-col>
            <a-col :span="14" class="info-content">
              {{ productInformation.phone }}
            </a-col>
          </a-row>
          <a-row style="padding: 10px 0">
            <a-col :span="10" class="info-label">邮箱</a-col>
            <a-col :span="14" class="info-content">
              {{ productInformation.email }}
            </a-col>
          </a-row>
          <a-row style="padding: 10px 0">
            <a-col :span="8"></a-col>
            <a-col :span="8"><a-button style="height: 35px; width: 100px" type="primary"> 修改信息 </a-button></a-col>
            <a-col :span="8"></a-col>
          </a-row> </a-card
      ></a-col>
      <a-col :span="18" style="height: 100%">
        <a-card title="最近浏览量" style="height: 100%">
          <a-row :gutter="10">
            <a-col :span="8" v-for="item in productOnsale" :key="item.id">
              <a-card hoverable>
                <img :src="item.img" alt="" style="width: 250px; height: 250px" />
                <a-card-meta :title="item.description" class="explore-card-title">
                  <template slot="description"><a-icon type="eye" /> {{ item.views }} </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const productInformation = [
  {
    id: '11',
    name: 'kyoongcc',
    gender: '女',
    studentId: '2220204242',
    dormitory: '英华二',
    telephone: '10086',
    wechat: '20020413',
  },
];
const productOnsale = [
  {
    id: '0',
    description: 'mlb老花卫衣',
    views: '920',
    img: '/img/products/clothes/1.jpg',
  },
  {
    id: '1',
    description: '匡威书包',
    views: '230',
    img: '/img/products/clothes/2.jpg',
  },
  {
    id: '2',
    description: 'new balance羊羔绒外套',
    views: '244',
    img: '/img/products/clothes/3.jpg',
  },
];
export default {
  data: () => {
    return {
      productInformation: {},
      productOnsale: productOnsale,
    };
  },
  mounted() {
    let $this = this;
    this.$http({
      method: 'get',
      url: '/user/getCurrentUser',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
      },
      withCredentials: true,
    }).then(function (result) {
      $this.productInformation = result.data;
    });
  },
};
</script>

<style>
.explore-card-title {
  margin-top: 10px;
}

.info-label {
  text-align: right;
  padding-right: 20px;
}
.info-content {
  text-align: left;
}
</style>
