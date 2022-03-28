<template>
  <a-layout id="components-layout-demo-side" theme="light">
    <a-layout-sider collapsible>
      <a-menu :default-selected-keys="['1']" mode="inline" theme="light" @click="menuClick" v-model="selectedKeys">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>个人信息</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="team" />
          <span>我的求购信息</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="heart" />
          <span>我的收藏</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="eye" /><span>我的商品</span></span>
          <a-menu-item key="4"> 在卖 </a-menu-item>
          <a-menu-item key="5"> 草稿 </a-menu-item>
          <a-menu-item key="6"> 已下架 </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="height: cal(100vh); margin: 0 16px"> <router-view /> </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data: () => {
    return {selectedKeys: ['1']};
  },
  methods: {
    menuClick(value) {
      let {key} = value;
      if (key == '1') {
        this.$router.push({path: '/common/personCenter/personInfo'});
      } else if (key == '2') {
        this.$router.push({path: '/common/personCenter/myWants'});
      } else if (key == '3') {
        this.$router.push({path: '/common/personCenter/myCollection'});
      } else if (key == '4') {
        this.$router.push({path: '/common/personCenter/myProducts?type=buying'});
      } else if (key == '5') {
        this.$router.push({path: '/common/personCenter/myProducts?type=draft'});
      } else if (key == '6') {
        this.$router.push({path: '/common/personCenter/myProducts?type=out'});
      }
    },
    refreshMenu() {
      let path = this.$route.path;
      let query = this.$route.query;
      if (path == '/common/personCenter/personInfo') {
        this.selectedKeys = ['1'];
      } else if (path == '/common/personCenter/myWants') {
        this.selectedKeys = ['2'];
      } else if (path == '/common/personCenter/myCollection') {
        this.selectedKeys = ['3'];
      } else if (path.indexOf('/common/personCenter/myProducts') == 0 && query.type == 'buying') {
        this.selectedKeys = ['4'];
      } else if (path.indexOf('/common/personCenter/myProducts') == 0 && query.type == 'draft') {
        this.selectedKeys = ['5'];
      } else if (path.indexOf('/common/personCenter/myProducts') == 0 && query.type == 'out') {
        this.selectedKeys = ['6'];
      }
    },
  },
  mounted() {
    this.refreshMenu();
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: #84c1ff;
  margin: 16px;
}
#components-layout-demo-side .ant-layout-sider {
  background: #ffffff;
}
#components-layout-demo-side .ant-layout-sider-trigger {
  color: #002140;
  background: #ffffff;
}
#components-layout-demo-side .ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: 1px solid #ffffff;
}
</style>
