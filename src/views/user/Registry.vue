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
            v-decorator="[
              'studentId',
              {rules: [{required: true, message: '请输入学号!'}, {validator: studentIdValidator}]},
            ]"
            placeholder="学号"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-search
            size="large"
            v-decorator="[
              'email',
              {
                rules: [
                  {required: true, message: '请输入邮箱'},
                  {type: 'email', message: '邮箱格式错误'},
                ],
              },
            ]"
            placeholder="邮箱"
            @search="getVerifyCode"
          >
            <a-icon slot="prefix" type="mail" style="color: rgba(0, 0, 0, 0.25)" />
            <a-button slot="enterButton" type="primary" :loading="verifyCodeLoading">
              {{ verifyCodeText }}
            </a-button>
          </a-input-search>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['verifyCode', {rules: [{required: true, message: '请输入验证码!'}]}]"
            placeholder="验证码"
          >
            <a-icon slot="prefix" type="message" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['phone', {rules: [{required: true, message: '手机号不能为空'}, {validator: phoneValidator}]}]"
            placeholder="手机号"
          >
            <a-icon type="phone" slot="prefix" style="color: rgba(0, 0, 0, 0.25)"></a-icon>
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
          <a-input
            size="large"
            v-decorator="['confirmPassword', {rules: [{required: true, message: '请再次输入密码!'}]}]"
            type="password"
            placeholder="确认密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" block size="large" html-type="submit"> 注册 </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
const API_PREFIX_URL = 'http://127.0.0.1:3000';
const registryUrl = '/user/registry';
const verifyCodeUrl = '/user/getCode';
// import axios from 'axios';
// axios.defaults.withCredentials = true;
import validatorFunc from '../../util/validateUtil';
import NProgress from 'nprogress';
export default {
  data: function () {
    return {
      verifyCodeText: '获取验证码',
      verifyCodeLoading: false,
    };
  },
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
              method: 'post',
              url: registryUrl,
              data: values,
              headers: {
                'Content-type': 'application/json;charset=utf-8',
              },
              withCredentials: true,
            })
            .then(function (res) {
              if (res.status == 200) {
                if (res.data.status == 'success') {
                  $this.$message.success(res.data.message);
                  NProgress.start();
                  setTimeout(() => {
                    NProgress.done();
                    $this.$router.push({path: '/user/login?registry=true'});
                  }, 4000);
                } else {
                  $this.$message.error(res.data.message);
                }
              }
              //$this.getMenu();
              //TODO 跳转登录页
            });
        }
      });
    },
    getVerifyCode() {
      // eslint-disable-next-line no-unused-vars
      this.form.validateFields(['email'], (err, value) => {
        if (!err) {
          var seconds = 60;
          let $this = this;
          $this.verifyCodeText = seconds + 's';
          $this
            .$http({
              method: 'get',
              params: value,
              url: verifyCodeUrl,
              headers: {
                'Content-type': 'application/json;charset=utf-8',
              },
              withCredentials: true,
            })
            .then((res) => {
              if (res.data.status == 'success') {
                $this.$message.success(res.data.message);
                let timer = setInterval(function () {
                  seconds--;
                  $this.verifyCodeText = seconds + 's';
                  if (seconds < 1) {
                    $this.verifyCodeText = '获取验证码';
                    clearInterval(timer);
                    $this.verifyCodeLoading = false;
                  }
                }, 1000);
                this.verifyCodeLoading = true;
              } else {
                $this.$message.error(res.data.message);
              }
            });
        }
      });
    },
    getMenu() {
      this.$router.push({path: '/common/home'});
    },
    ...validatorFunc,
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
.login-logo {
  width: 200px;
}
</style>
