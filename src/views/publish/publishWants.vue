<template>
  <div class="publish-wants-container">
    <h1 class="title">发布求购商品</h1>
    <a-form id="components-form-demo-validate-other" :form="form" v-bind="formItemLayout" @submit="handleSubmit">
      <a-form-item label="请选择商品类别" has-feedback>
        <a-select
          v-decorator="['select', {rules: [{required: true, message: '请选择商品类别!'}]}]"
          placeholder="请选择商品类别"
        >
          <a-select-option value="服装"> 服装 </a-select-option>
          <a-select-option value="鞋"> 鞋 </a-select-option>
          <a-select-option value="配饰"> 配饰 </a-select-option>
          <a-select-option value="美妆"> 美妆 </a-select-option>
          <a-select-option value="电子产品"> 电子产品 </a-select-option>
          <a-select-option value="零食"> 零食 </a-select-option>
          <a-select-option value="宿舍家具"> 宿舍家具 </a-select-option>
          <a-select-option value="书籍文具"> 书籍文具 </a-select-option>
          <a-select-option value="医药"> 医药 </a-select-option>
          <a-select-option value="其他"> 其他 </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item v-bind="formItemLayout">
        <span slot="label">
          请输入商品名称&nbsp;
          <a-tooltip title="你想买什么?">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-input
          v-decorator="[
            'productName',
            {
              rules: [{required: true, message: '请填写商品名称!', whitespace: true}],
            },
          ]"
          placeholder="商品品牌可以不填哦！"
        />
      </a-form-item>

      <a-form-item label="期望价格" style="text-align: left">
        <a-input-number
          v-decorator="['expectPrice', {rules: [{required: true, message: '请填写期望价格!'}]}]"
          :min="0"
        />
        <span class="ant-form-text"> RMB </span>
      </a-form-item>

      <a-form-item label="期望成色" has-feedback>
        <a-select
          placeholder=" 请选择能接受的商品新旧程度 "
          v-decorator="['expectCondition', {rules: [{required: true, message: '请填写期望成色!'}]}]"
        >
          <a-select-option value="全新"> 全新 </a-select-option>
          <a-select-option value="几乎全新"> 几乎全新 </a-select-option>
          <a-select-option value="轻微痕迹"> 轻微痕迹 </a-select-option>
          <a-select-option value="明显痕迹"> 明显痕迹 </a-select-option>
          <a-select-option value="无所谓啦！"> 无所谓啦！ </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="求购描述">
        <a-textarea
          placeholder="请买家对求购物品进行简单描述"
          :rows="4"
          v-decorator="['description', {rules: [{required: true, message: '请填写期望成色!'}]}]"
        />
      </a-form-item>

      <a-form-item style="text-align: left" label="封面" extra="相似的也可以哒">
        <a-upload
          v-decorator="[
            'upload',
            {
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
              rules: [{required: true, message: '请上传封面!'}],
            },
          ]"
          name="logo"
          action="/upload.do"
          list-type="picture"
        >
          <a-button> <a-icon type="upload" /> 点击上传 </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item label="有没有更多图片想要上传">
        <div class="dropbox">
          <a-upload-dragger
            v-decorator="[
              'dragger',
              {
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="files"
            action="/upload.do"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">单击或拖动图片到此区域以上传，支持单次或批量上传</p>
          </a-upload-dragger>
        </div>
      </a-form-item>

      <a-form-item :wrapper-col="{span: 12, offset: 7}">
        <a-button type="primary" html-type="submit" class="product"> 上传 </a-button>
        <a-button type="primary"> 暂存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    formItemLayout: {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    },
  }),
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: 'validate_other'});
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    normFile(e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
  },
};
</script>

<style lang="less">
#components-form-demo-validate-other .dropbox {
  height: 180px;
  line-height: 1.5;
}
.product {
  margin-right: 20px;
}
.publish-wants-container {
  background-color: #ffffff;
  margin-top: 20px;
  width: 1200px;
  margin: auto;
  padding-bottom: 10px;
  .title {
    text-align: center;
    font-size: 30px;
    margin: 20px 0;
    color: #1f1f1f;
    padding-top: 20px;
  }
  .ant-form-explain {
    text-align: left;
  }
}
</style>
