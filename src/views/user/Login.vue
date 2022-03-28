<template>
  <div class="page-container">
    <div class="login-container">
      <img src="/img/logo-nobk.png" class="login-logo" />
      <a-form id="login-form" :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['userName', {rules: [{required: true, message: '请输入用户名!'}]}]"
            placeholder="用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['password', {rules: [{required: true, message: '请输入密码!'}]}]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            style="float: left"
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
          >
            记住我
          </a-checkbox>
          <a class="login-form-forgot" href=""> 忘记密码 </a>
          <a-button type="primary" html-type="submit" class="login-form-button"> 登录 </a-button>
          <a-button type="link" @click="gotoRegistry" class="btn-link"> 注册 </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
const API_PREFIX_URL = 'http://127.0.0.1:3000';
const loginUrl = '/user/login';
// import axios from '../../util/rest';
// axios.defaults.withCredentials = true;
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: 'normal_login'});
  },
  methods: {
    handleSubmit(e) {
      let $this = this;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          window.console.log('Received values of form: ', values);
          $this
            .$http({
              method: 'get',
              url: loginUrl,
              params: values,
              headers: {
                'Content-type': 'application/json;charset=utf-8',
              },
              withCredentials: true,
            })
            .then(function (result) {
              if (result.data.status == 'success') {
                $this.getMenu();
              } else {
                $this.$message.error(result.data.message);
              }
            });
        }
      });
    },
    getMenu() {
      this.$router.push({path: '/common/home'});
    },
    gotoRegistry() {
      this.$router.push({path: '/user/registry'});
    },
  },
};
</script>
<style scoped>
.btn-link {
  padding: 0;
}
#login-form .login-form {
  max-width: 300px;
}
#login-form .login-form-forgot {
  float: right;
}
#login-form .login-form-button {
  width: 100%;
}
.login-container {
  width: 450px;
  top: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 40px;
  background: rgb(255, 255, 255, 0.5);
  border-radius: 10px;
}
.page-container {
  background-image: url(/asset/img/login-background.jpg);
  width: 100%;
  height: 100%;
}
.login-title {
  color: #fff;
  text-align: center;
  font-size: 36px;
}
.login-logo {
  width: 200px;
}
</style>
