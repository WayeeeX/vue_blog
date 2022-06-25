<template>
  <el-header>
    <el-row>
      <el-col :span="4" class="hidden-sm-and-down">
        <h1>Blog</h1>
      </el-col>
      <el-col :span="20" :xs="10">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item class="hidden-sm-and-up">
            <el-dropdown class="hidden-sm-and-up" trigger="click">
              <span class="el-dropdown-link">
                菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <a href="/"><el-dropdown-item>首页</el-dropdown-item></a>
                <a href="/category"
                  ><el-dropdown-item>分类</el-dropdown-item></a
                >
                <a href="/tag"><el-dropdown-item>标签</el-dropdown-item></a>
                <a href="/archives"
                  ><el-dropdown-item>归档</el-dropdown-item></a
                >
                <a href="/login"
                  ><el-dropdown-item divided v-show="!hasLogin"
                    >登陆</el-dropdown-item
                  ></a
                >
                <!-- <a href="#"
                  ><el-dropdown-item v-show="!hasLogin"
                    >注册</el-dropdown-item
                  ></a
                > -->
                <a href="/write"
                  ><el-dropdown-item divided v-show="hasLogin"
                    >写文章</el-dropdown-item
                  ></a
                >
                <a href="#" @click="logout"
                  ><el-dropdown-item divided v-show="hasLogin"
                    >退出</el-dropdown-item
                  ></a
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
          <el-menu-item index="/" class="hidden-xs-only">首页</el-menu-item>
          <el-menu-item index="/category" class="hidden-xs-only"
            >分类</el-menu-item
          >
          <el-menu-item index="/tag" class="hidden-xs-only">标签</el-menu-item>
          <el-menu-item index="/archives" class="hidden-xs-only"
            >归档</el-menu-item
          >

          <el-menu-item index="/write" v-show="hasLogin" class="hidden-xs-only"
            >&nbsp;&nbsp;&nbsp;<i class="el-icon-edit"></i>写文章</el-menu-item
          >

          <el-col :span="6" :offset="0" class="hidden-md-and-down">
            <el-menu-item
              ><el-input placeholder="搜索" size="normal" clearable></el-input>
            </el-menu-item>
          </el-col>
          <!-- <el-col :span="2" :offset="0">
            <el-menu-item index="/login" v-show="!hasLogin"
              >&nbsp;&nbsp;&nbsp;登陆
            </el-menu-item>
            <el-menu-item v-show="hasLogin" @click="logout"
              >&nbsp;&nbsp;&nbsp;退出
            </el-menu-item>
          </el-col> -->
          <el-menu-item index="/login" v-show="!hasLogin" class="hidden-xs-only"
            >&nbsp;&nbsp;&nbsp;登陆
          </el-menu-item>
          <el-menu-item v-show="hasLogin" @click="logout" class="hidden-xs-only"
            >&nbsp;&nbsp;&nbsp;退出
          </el-menu-item>
          <!-- <el-col :span="2" :offset="0">
            <el-menu-item index="/register" v-show="!hasLogin"
              >&nbsp;&nbsp;&nbsp;注册
            </el-menu-item>
          </el-col> -->
          <!-- <el-menu-item
            index="/register"
            v-show="!hasLogin"
            class="hidden-xs-only"
            >&nbsp;&nbsp;&nbsp;注册
          </el-menu-item> -->
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

      },
      hasLogin: false
    }
  },
  created () {
    if (localStorage.token) {
      this.user = sessionStorage.userInfo
      this.hasLogin = true
    } else {
      this.hasLogin = false
    }
  },
  methods: {
    logout () {
      const _this = this
      this.$axios.get('http://106.52.174.244:8889/logout').then((res) => {
        _this.$store.commit('REMOVE_INFO')
        this.$router.push('/')
        this.$message({
          message: '退出成功',
          type: 'success'
        })
      });
    }
  }
}
</script>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}

.el-header {
  width: 100%;
  height: 75px;
  background-color: #545c64;
  border-bottom: 1px solid black;
}
h1 {
  height: 65px;
  font-size: 30px;
  line-height: 65px;
}
.el-input {
  width: 250px;
}
a {
  text-decoration: none;
  color: #fff;
}
.el-dropdown-menu a {
  color: #000;
}
</style>