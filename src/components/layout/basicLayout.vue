<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header class="page-header">
      <div class="logo" />
      <a-menu
        theme="light"
        mode="horizontal"
        :default-selected-keys="['1']"
        :style="{lineHeight: '62px'}"
        @click="menuClick"
        v-model="selectedKeys"
      >
        <a-menu-item key="1">首页</a-menu-item>
        <a-menu-item key="2">淘二手</a-menu-item>
        <a-menu-item key="3">悬赏榜</a-menu-item>
        <a-menu-item key="4" style="float: right"><a-icon type="user" />个人中心</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="content-container">
      <!-- <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
      </a-breadcrumb> -->
      <div :style="{minHeight: '280px'}">
        <router-view></router-view>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      selectedKeys: ['1'],
    };
  },
  mounted() {
    this.refreshMenu();
  },
  methods: {
    menuClick(value) {
      let {key} = value;
      if (key == '1') {
        this.$router.push({path: '/'});
      } else if (key == '2') {
        this.$router.push({path: '/common/taoershou'});
      } else if (key == '3') {
        this.$router.push({path: '/common/wants'});
      } else if (key == '4') {
        this.$router.push({path: '/common/personCenter'});
      }
    },
    refreshMenu() {
      let path = this.$route.path;
      if (path == '/common/home') {
        this.selectedKeys = ['1'];
      } else if (path == '/common/taoershou') {
        this.selectedKeys = ['2'];
      } else if (path == '/common/wants') {
        this.selectedKeys = ['3'];
      } else if (path.indexOf('/common/personCenter') == 0) {
        this.selectedKeys = ['4'];
      }
    },
  },
  watch: {
    $route: {
      handler() {
        this.refreshMenu();
      },
    },
    deep: true,
  },
};
</script>
<style>
#components-layout-demo-top .logo {
  width: 140px;
  height: 63px;
  float: left;
  position: absolute;
  background-image: url(/img/logo.jpg);
  background-size: 100% 100%;
  margin: 0;
  margin-left: -45px;
}
.page-header {
  background-color: #ffffff;
}
.page-header .ant-menu-item {
  font-size: 16px;
}
.ant-menu-horizontal {
  border-bottom-color: #ffffff;
}
.ant-breadcrumb {
  text-align: left;
}
.content-container {
  width: 100%;
  margin: auto;
}
</style>
