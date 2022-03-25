<template>
  <div class="publish-product-container">
    <h1 class="title">发布商品</h1>
    <a-row>
      <a-col :span="6" style="text-align: center">
        <p></p>

        <a-upload
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-col>
      <a-col :span="6" class="product-first-col">
        <a-row>
          <a-col :span="8" class="label-col">
            <p class="form-label-dlmu">商品类别:</p>
          </a-col>
          <a-col :span="16" class="widget-col">
            <a-select style="width: 150px" @change="handleChange">
              <a-select-option value="1"> 书籍文具 </a-select-option>
              <a-select-option value="2"> 电子产品 </a-select-option>
              <a-select-option value="3"> 服装配饰 </a-select-option>
              <a-select-option value="4"> 宿舍家具 </a-select-option>
              <a-select-option value="5"> 医药保健 </a-select-option>
              <a-select-option value="6"> 美妆护理 </a-select-option>
              <a-select-option value="7"> 零食 </a-select-option>
              <a-select-option value="8"> 其他 </a-select-option>
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
            <a-select style="width: 150px" @change="handleChange">
              <a-select-option value="1"> 全新未拆封 </a-select-option>
              <a-select-option value="2"> 几乎全新 </a-select-option>
              <a-select-option value="3"> 轻微痕迹 </a-select-option>
              <a-select-option value="4"> 明显痕迹 </a-select-option>
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
            <a-select style="width: 150px" @change="handleChange">
              <a-select-option value="1"> 品牌专柜 </a-select-option>
              <a-select-option value="2"> 网购 </a-select-option>
              <a-select-option value="3"> 其他 </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-col>

      <a-col :span="6">
        <a-row>
          <a-col :span="8" class="label-col">
            <p class="form-label-dlmu">原价:</p>
          </a-col>
          <a-col :span="16" class="widget-col">
            <a-input prefix="￥" suffix="RMB" style="width: 150px" />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6">
        <a-row>
          <a-col :span="8" class="label-col">
            <p class="form-label-dlmu">现价:</p>
          </a-col>
          <a-col :span="16" class="widget-col">
            <a-input prefix="￥" suffix="RMB" style="width: 150px" />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="18">
        <a-row>
          <a-col :span="4" class="label-col" style="width: 11%">
            <p class="form-label-dlmu">商品描述:</p>
          </a-col>
          <a-col :span="20" class="widget-col">
            <a-textarea placeholder="商品描述" />
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
    };
  },
  methods: {
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
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
      return isJpgOrPng && isLt2M;
    },
    methods: {
      handleChange(value) {
        console.log(`selected ${value}`);
      },
    },
  },
};
</script>
<style lang="less">
.avatar-uploader > .ant-upload {
  width: 300px;
  height: 300px;
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
}
</style>
