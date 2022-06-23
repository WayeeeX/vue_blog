<template>
  <div>
    <div class="loginBox">
      <h1>登陆页面</h1>
      <el-form :model="loginForm" ref="loginForm" :rules="rules">
        <el-form-item size="normal" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>

        <el-form-item size="normal" prop="password">
          <el-input
            placeholder="密码"
            v-model="loginForm.password"
            show-password
          ></el-input>
        </el-form-item>

        <el-button type="primary" @click="submitForm('loginForm')"
          >登陆</el-button
        >
        <el-button type="danger" @click="resetForm('loginForm')"
          >重置</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    submitForm (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交逻辑
          this.$axios.post('http://106.52.174.244:8081/login', this.loginForm).then((res) => {
            const token = res.headers['authorization']
            _this.$store.commit('SET_TOKEN', token)
            _this.$store.commit('SET_USERINFO', res.data.data)
            _this.$router.push("/")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
body {
  background-color: rgb(245, 245, 245);
}

.loginBox {
  position: absolute;
  width: 350px;
  height: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  background-color: #fff;
}
h1 {
  margin: 20px 0;
  text-align: center;
  font-size: 30px;
}
.el-form-item {
  margin-left: 20px;
  margin-bottom: 20px;
  width: 300px;
}
.el-button {
  margin-left: 20px !important;
  margin-bottom: 10px !important;
  width: 140px;
}
</style>