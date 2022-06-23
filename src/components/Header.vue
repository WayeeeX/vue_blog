<template>
  <el-header>
    <el-row>
      <el-col :span="4">
        <h1>Blog</h1>
      </el-col>
      <el-col :span="20">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="2">分类</el-menu-item>
          <el-menu-item index="3">标签</el-menu-item>
          <el-menu-item index="4">归档</el-menu-item>
          <el-col :span="3" :offset="2">
            <el-menu-item index="/write" v-show="hasLogin"
              >&nbsp;&nbsp;&nbsp;<i class="el-icon-edit"></i
              >写文章</el-menu-item
            >
          </el-col>
          <el-col :span="6" :offset="0">
            <el-menu-item
              ><el-input placeholder="搜索" size="normal" clearable></el-input>
            </el-menu-item>
          </el-col>
          <el-col :span="2" :offset="2">
            <el-menu-item index="/login" v-show="!hasLogin"
              >&nbsp;&nbsp;&nbsp;登陆
            </el-menu-item>
            <el-menu-item v-show="hasLogin" @click="logout"
              >&nbsp;&nbsp;&nbsp;退出
            </el-menu-item>
          </el-col>
          <el-col :span="2" :offset="0">
            <el-menu-item index="/register" v-show="!hasLogin"
              >&nbsp;&nbsp;&nbsp;注册
            </el-menu-item>
          </el-col>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
</template>
<script>
export default {
  data () {
    return {
      user: {
        username: ''
      },
      hasLogin: false
    }
  },
  created () {
    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username
      this.hasLogin = true
    }
  },
 methods: {
     logout () {
    const _this = this
    this.$axios.get('http://localhost:8081/logout', {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then((res) => {
      _this.$store.commit('REMOVE_INFO')
      _this.$router.push('/login')
    });
  }
 }
}
</script>
<style scoped>
.el-header {
  width: 100%;
  height: 75px;
  background-color: #545c64;
  border-bottom: 1px solid black;
}
h1 {
  height: 75px;
  font-size: 30px;
  line-height: 55px;
}
.el-input {
  width: 250px;
}
a {
  text-decoration: none;
  color: #fff;
}
</style>