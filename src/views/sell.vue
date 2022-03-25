<template>
  <div style="background: #D2E9FF">
    <a-row>
      <a-col :span="6" style="text-align: center">
        <a-divider orientation="left" style="font-size: 20px"> 出闲置 </a-divider>
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
      <a-col :span="6" style="padding: 50px">
        <a-divider>商品类别</a-divider>
        <a-select style="width: 120px" @change="handleChange">
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
      <a-col :span="6" style="padding: 50px">
        <a-divider>成色</a-divider>
        <a-select style="width: 120px" @change="handleChange">
          <a-select-option value="1"> 全新未拆封 </a-select-option>
          <a-select-option value="2"> 几乎全新 </a-select-option>
          <a-select-option value="3"> 轻微痕迹 </a-select-option>
          <a-select-option value="4"> 明显痕迹 </a-select-option>
        </a-select>
      </a-col>
      <a-col :span="6" style="padding: 50px">
        <a-divider>购买渠道</a-divider>
        <a-select style="width: 120px" @change="handleChange">
          <a-select-option value="1"> 品牌专柜 </a-select-option>
          <a-select-option value="2"> 网购 </a-select-option>
          <a-select-option value="3"> 其他 </a-select-option>
        </a-select>
      </a-col>

      <a-col :span="4" style="margin-left: 50px">
        <a-divider>原价</a-divider>
        <a-input prefix="￥" suffix="RMB" />
      </a-col>
      <a-col :span="4" style="margin-left: 110px">
        <a-divider>现价</a-divider>
        <a-input prefix="￥" suffix="RMB" />
      </a-col>
      <a-col :span="12" style="padding: 50px">
        <a-textarea placeholder="商品描述" />
      </a-col>
      <a-col :span="24" style="text-align: right">
        <a-button style="font-size: 20px"> <a-icon key="edit" type="edit" />填写个人信息</a-button>
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
<style>
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
</style>
