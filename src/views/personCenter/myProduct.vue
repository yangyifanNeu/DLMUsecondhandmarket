<template>
  <div>
    <a-card class="myProduct-card">
      <a-table :columns="columns" :data-source="data" :pagination="{pageSize: 3}">
        <img slot="img" slot-scope="text" :src="text" style="width: 120px; height: 120px" />

        <span slot="action" slot-scope="text, record">
          <a-button @click="editProduct(record)" type="link" style="margin-left: -15px">编辑</a-button>
          <a-button @click="deleteProduct(record)" type="link">下架</a-button>
        </span>
      </a-table>
    </a-card>
    <a-modal title="修改商品" :visible="visible" @ok="saveEdit" @cancel="closeModal" cancel-text="取消" ok-text="保存">
      <a-form id="login-form" :form="form" :label-col="{span: 5}" :wrapper-col="{span: 19}">
        <a-form-item label="商品名">
          <a-input v-decorator="['name', {rules: [{required: true, message: '请输入商品名!'}]}]"> </a-input>
        </a-form-item>
        <a-form-item label="商品描述">
          <a-input v-decorator="['description', {rules: [{required: true, message: '请输入商品描述!'}]}]"> </a-input>
        </a-form-item>
        <a-form-item label="标签">
          <a-select
            mode="multiple"
            placeholder="请选择标签"
            style="width: 100%"
            v-decorator="['tag', {rules: [{required: true, message: '请输入商品描述!'}]}]"
          >
            <a-select-option v-for="item in tags" :key="item.id" :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    dataIndex: 'img',
    key: 'img',
    title: '商品图片',
    slots: {title: 'img'},
    scopedSlots: {customRender: 'img'},
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '原价',
    dataIndex: 'originalprice',
    key: 'originalprice',
  },
  {
    title: '现价',
    key: 'currentprice',
    dataIndex: 'currentprice',
  },
  {
    title: '商品描述',
    key: 'description',
    dataIndex: 'description',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
    className: 'column-action',
  },
];

var data = [];

export default {
  data() {
    return {
      data,
      columns,
      visible: false,
      tags: [],
      currentRecord: {},
    };
  },
  mounted() {
    var $this = this;
    this.getData();
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
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: 'product'});
  },
  methods: {
    getData() {
      let $this = this;
      this.$http({
        method: 'get',
        url: '/product/getProductsByCurrentUser',
        headers: {
          'Content-type': 'application/json;charset=utf-8',
        },
        withCredentials: true,
      }).then(function (result) {
        let data = result.data;
        console.log(data);
        $this.data = data.map((item) => {
          item.key = item.id;
          item.tag = item.tags.map((item) => item.id);
          return item;
        });
      });
    },
    editProduct(record) {
      console.log(record);
      this.visible = true;
      var $this = this;
      this.currentRecord = record;
      setTimeout(function () {
        let nameObj = {name: record.name};
        let descriptionObj = {description: record.description};
        let tagObj = {tag: record.tag};
        $this.form.setFieldsValue(nameObj);
        $this.form.setFieldsValue(descriptionObj);
        $this.form.setFieldsValue(tagObj);
      }, 100);
    },
    saveEdit() {
      let $this = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          let data = Object.assign({}, values, {id: $this.currentRecord.id});
          $this.updateProduct(data);
        }
      });
    },
    closeModal() {
      this.visible = false;
    },
    deleteProduct() {},
    updateProduct(data) {
      let $this = this;
      this.$http({
        method: 'post',
        data: data,
        url: '/product/updateProduct',
        headers: {
          'Content-type': 'application/json;charset=utf-8',
        },
        withCredentials: true,
      }).then(function (result) {
        $this.visible = false;
        $this.$notification['success']({
          message: '消息',
          description: '更新商品成功！',
        });
        $this.currentRecord = Object.assign($this.currentRecord, data);
      });
    },
  },
};
</script>
<style>
.myProduct-card {
  margin-top: 15px;
  margin-bottom: 15px;
  /* height: calc(100vh - 100px); */
}
/* .column-action {
  text-align: center !important;
} */
</style>
