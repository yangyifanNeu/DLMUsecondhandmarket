<template>
  <a-result status="403" title="403" sub-title="您尚未登录或者登录状态已过期.请重新登录！">
    <template #extra>
      <a-button type="primary" @click="backHome"> 返回登录 </a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    backHome() {
      this.$router.push({name: 'userLogin'});
    },
  },
};
</script>
