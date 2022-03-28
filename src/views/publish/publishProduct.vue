<template>
  <div class="publish-product-container">
    <h1 class="title">发布商品</h1>
    <a-row>
      <a-col :span="6" style="text-align: center">
        <p></p>

        <a-upload
          name="avatar"
          list-type="picture-card"
          :file-list="fileList"
          :remove="handleRemove"
          :before-upload="beforeUpload"
          :show-upload-list="false"
          class="avatar-uploader"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="avatar-uploader-img" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">商品封面</div>
          </div>
        </a-upload>
      </a-col>
      <a-col :span="6" class="product-first-col">
        <a-row>
          <a-col :span="8" class="label-col">
            <p class="form-label-dlmu">商品类别:</p>
          </a-col>
          <a-col :span="16" class="widget-col">
            <a-select style="width: 150px" v-model="product.category">
              <a-select-option :value="item.id" v-for="item in categoryList" :key="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6" class="product-first-col">
        <a-row>
          <a-col :span="8" class="label-col">
            <p class="form-label-dlmu">成色:</p>
          </a-col>
          <a-col :span="16" class="widget-col">
            <a-select style="width: 150px" v-model="product.condition">
              <a-select-option :value="item.codevalue" v-for="item in productConditionList" :key="item.id">
                {{ item.codename }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6" class="product-first-col">
        <a-row>
          <a-col :span="8" class="label-col">
            <p class="form-label-dlmu">购买渠道:</p>
          </a-col>
          <a-col :span="16" class="widget-col">
            <a-select style="width: 150px" v-model="product.buyingway">
              <a-select-option :value="item.codevalue" v-for="item in buyingWayList" :key="item.id">
                {{ item.codename }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6">
        <a-row>
          <a-col :span="8" class="label-col">
            <p class="form-label-dlmu">商品名:</p>
          </a-col>
          <a-col :span="16" class="widget-col">
            <a-input style="width: 150px" v-model="product.name" />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6">
        <a-row>
          <a-col :span="8" class="label-col">
            <p class="form-label-dlmu">原价:</p>
          </a-col>
          <a-col :span="16" class="widget-col">
            <a-input prefix="￥" suffix="RMB" style="width: 150px" v-model="product.originalprice" />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6">
        <a-row>
          <a-col :span="8" class="label-col">
            <p class="form-label-dlmu">现价:</p>
          </a-col>
          <a-col :span="16" class="widget-col">
            <a-input prefix="￥" suffix="RMB" style="width: 150px" v-model="product.currentprice" />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="18">
        <a-row>
          <a-col :span="4" class="label-col" style="width: 11%">
            <p class="form-label-dlmu">商品标签:</p>
          </a-col>
          <a-col :span="20" class="widget-col">
            <a-select mode="multiple" placeholder="请选择标签" style="width: 100%" v-model="product.tags">
              <a-select-option v-for="item in tags" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="18">
        <a-row>
          <a-col :span="4" class="label-col" style="width: 11%">
            <p class="form-label-dlmu">商品描述:</p>
          </a-col>
          <a-col :span="20" class="widget-col">
            <a-textarea placeholder="商品描述" v-model="product.description" />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="18">
        <a-row>
          <a-col :span="24" class="widget-col publishbtn-col">
            <a-button type="primary" @click="publishProduct">发布</a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      loading: false,
      imageUrl: '',
      fileList: [],
      categoryList: [],
      productConditionList: [],
      buyingWayList: [],
      tags: [],
      product: {
        category: null,
        condition: null,
        name: null,
        description: null,
        originalprice: null,
        currentprice: null,
        buyingway: null,
        tags: [],
      },
    };
  },
  methods: {
    handleChange(info) {
      // Get this url from response in real world.
      getBase64(info.file, (imageUrl) => {
        this.imageUrl = imageUrl;
        this.loading = false;
      });
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return false;
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    emptyProductInfo() {
      let product = this.product;
      for (const key in product) {
        if (Object.hasOwnProperty.call(product, key)) {
          product[key] = null;
        }
      }
      this.imageUrl = null;
    },
    publishProduct() {
      var $this = this;
      this.$confirm({
        title: '确定发布商品?',
        // content: '清空存储卡?',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          let data = Object.assign({}, $this.product, {img: $this.imageUrl});
          $this
            .$http({
              method: 'post',
              url: '/product/createProucts',
              data: data,
              headers: {
                'Content-type': 'application/json;charset=utf-8',
              },
              withCredentials: true,
            })
            .then(function (res) {
              console.log(res.data);
              $this.$notification['success']({
                message: '消息',
                description: '发布商品成功！',
              });
              $this.emptyProductInfo();
            });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
  },
  mounted() {
    var $this = this;
    this.$http({
      method: 'get',
      url: '/category/getCategory',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
      },
      withCredentials: true,
    }).then(function (result) {
      $this.categoryList = result.data;
    });
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
    var $this = this;
    this.$http({
      method: 'get',
      url: '/tag/allTags',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
      },
      withCredentials: true,
    }).then(function (result) {
      $this.tags = result.data.map((item) => {
        item.label = item.name;
        return item;
      });
    });
  },
};
</script>
<style lang="less">
.avatar-uploader > .ant-upload {
  width: 300px;
  height: 300px;
}
.avatar-uploader-img {
  width: 280px;
  height: 280px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.publish-product-container {
  background-color: #ffffff;
  width: 1200px;
  margin: auto;
  padding-bottom: 10px;
  margin-top: 20px;
  padding-left: 25px;
  min-height: calc(100vh - 120px);
  margin-bottom: 20px;
  .title {
    text-align: center;
    font-size: 30px;
    margin: 20px 0;
    color: #1f1f1f;
    padding-top: 20px;
  }
  .form-label-dlmu {
    width: auto;
    display: inline-block;
    margin-right: 10px;
  }
  .product-first-col {
    margin-top: 25px;
  }
  .label-col {
    text-align: right;
    line-height: 28px;
    margin-bottom: 20px;
  }
  .widget-col {
    text-align: left;
  }
  .publishbtn-col {
    text-align: center;
    margin-top: 5px;
  }
}
</style>
