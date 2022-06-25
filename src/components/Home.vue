<template>

    <el-container direction="vertical">

          <Header></Header>
        <Content></Content>
        <Footer></Footer>

    </el-container>

</template>
<script>
import Footer from './Footer.vue'
import Content from './Content.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    Content
  }
}
</script>

<style  scoped>

.el-container {
  width: 100%;
  height: 100%;
}
</style>