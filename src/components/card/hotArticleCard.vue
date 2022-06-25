<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h2 style="font-size: 20px">最热文章</h2>
    </div>
    <div
      v-for="article in articles"
      class="text item title"
      @click="blogDetail(article.id)"
      
    >
      {{ article.title }}
    </div>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      articles: []
    }
  },
  methods: {
    getHotArticles () {
      this.$axios.get('http://106.52.174.244:8889/articles/hot').then((res) => {
        this.articles = res.data.data
      })
    },
    blogDetail (id) {
      this.$router.push({ name: 'BlogDetail', params: { blogId: id } })
    }
  },
  created () {
    this.getHotArticles()
  }
}
</script>
<style scoped>

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.title {
  cursor: pointer;
}
.title:hover {
  color: skyblue;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  /* width: 480px; */
  margin-bottom: 15px;
}
</style>