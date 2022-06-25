import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Write from "../components/Write.vue";
import BlogDetail from '../components/BlogDetail.vue'
import Category from '@/components/Category'
import Tag from '@/components/Tag'
import Archives from '@/components/Archives'
import CategoryDetail from '@/components/CategoryDetail'
import TagDetail from '@/components/TagDetail'
Vue.use(Router);
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/write",
    name: "write",
    component: Write
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/category/:id',
    name: 'CategoryDetail',
    component: CategoryDetail
  },
  {
    path: '/tag',
    name: 'Tag',
    component: Tag
  },
  {
    path: '/tag/:id',
    name: 'TagDetail',
    component: TagDetail
  },
  {
    path: '/archives',
    name: 'Archives',
    component: Archives
  },
  {
    path: '/archives/:year/:month',
    name: 'Archives',
    component: Archives
  },
];
export default new Router({
  mode: "history",
  routes
});
