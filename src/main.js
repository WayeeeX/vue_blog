// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import "./axios";
import store from "./store";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import "./permission"
import 'github-markdown-css'
import 'element-ui/lib/theme-chalk/display.css';
import Header from '@/components/Header'
import Footer from '@/components/Footer'


Vue.prototype.$axios = axios;
Vue.use(ElementUI).use(mavonEditor);
Vue.config.productionTip = false;
Vue.component('Header',Header)
Vue.component('Footer',Footer)

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
