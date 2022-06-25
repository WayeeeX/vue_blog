<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h2 style="font-size: 20px">文章归档</h2>
    </div>
    <div
      v-for="archive in archives"
      class="text item"
      @click="getArchive(archive.year, archive.month)"
    >
      {{ archive.year + "年" + archive.month + "月" }}
    </div>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      archives: []
    }
  },
  methods: {
    getArchives () {
      this.$axios.get('http://localhost:8889/articles/listArchives').then((res) => {
        this.archives = res.data.data
      })
    },
    getArchive (year, month) {
      this.$router.push({ name: 'Archives', params: { year: year, month: month } })
    }
  },
  created () {
    this.getArchives()
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