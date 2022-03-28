import axios from 'axios';
import router from '../router/index';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response.status == '403') {
      router.push({name: '403'});
    }
    return Promise.reject(error);
  },
);
export default axios;
