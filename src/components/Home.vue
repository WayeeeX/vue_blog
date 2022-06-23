<template>

    <el-container direction="vertical">

          <Header></Header>
        <Content></Content>
        <Footer></Footer>

    </el-container>

</template>
<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import Content from './Content.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    Header,
    Footer,
    Content
  }
}
</script>

<style  scoped>

.el-container {
  width: 100%;
}
</style>