import axios from "axios";
import Element from "element-ui";
import store from "./store";
import router from "./router";
// axios.defaults.baseURL='http://106.52.174.244:8081'
axios.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers["Oauth-Token"] = localStorage.token;
  } // 可以统一设置请求头
  return config;
});
axios.interceptors.response.use(
  response => {
    const res = response.data;
    console.log("后置拦截");
    // 当结果的code是否为200的情况
    if (res.code === 0) {
      return response;
    } else {
      // 弹窗异常信息
      Element.Message({
        message: response.data.msg,
        type: "error",
        duration: 2 * 1000
      });
      // 直接拒绝往下面返回结果信息
      return Promise.reject(response.data.msg);
    }
  },
  error => {
    Element.Message({
      type: "warning",
      showClose: true,
      message: "连接超时"
    });
    return Promise.reject(error);
  }
);
