<template>
  <el-main>
    <el-row :gutter="24">
      <el-col :span="16" :offset="0">
        <div class="article">
          <el-timeline>
            <el-timeline-item
              :timestamp="blog.created"
              placement="top"
              v-for="blog in blogs"
              :key="blog"
            >
              <el-card>
                <h4>
                  <router-link
                    :to="{ name: 'BlogDetail', params: { blogId: blog.id } }"
                    >{{ blog.title }}</router-link
                  >
                </h4>
                <p>{{ blog.description }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
          <el-pagination
            class="mpage"
            background
            layout="prev, pager, next"
            :current-page="currentPage"
            :page-size="pageSize"
            @current-change="page"
            :total="total"
          >
          </el-pagination></div
      ></el-col>
      <el-col :span="7" :offset="1">
        <div class="aside">
          <el-card :body-style="{ padding: '0px' }" class="intro">
            <el-image
              style="width: 100px; height: 100px"
              :src="require('../assets/logo.png')"
            ></el-image>
            <h1>个人博客</h1>
            <div>
              <span><i class="el-icon-phone"></i></span>
              <span><i class="el-icon-share"></i></span>
            </div>
          </el-card>
          <el-card class="hot">
            <div>
              <h2>最热标签</h2>
              <a href="#" style="margin-left: 85px">查看全部</a>
            </div>
            <el-tag
              v-for="item in items"
              :key="item.label"
              :type="item.type"
              effect="plain"
            >
              {{ item.label }}
            </el-tag>
          </el-card>
        </div></el-col
      >
    </el-row>
  </el-main>
</template>
<script>
export default {
  data () {
    return {
      items: [
        { type: '', label: '标签一' },
        { type: 'success', label: '标签二' },
        { type: 'info', label: '标签三' },
        { type: 'danger', label: '标签四' },
        { type: 'warning', label: '标签五' }
      ],
      effect: 'plain',
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 2
    }
  },
  methods: {
    page (currentPage) {
      const _this = this
      this.$axios.get('http://localhost:8081/blogs?currentPage=' + currentPage).then((res) => {
        console.log(res.data.data.records)
        _this.blogs = res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
      })
    }
  },
  mounted () {
    this.page(1);
  }
}
</script>
<style scoped>
.el-main {
  width: 1100px;
  margin: 20px auto;
}
.el-card {
  padding-top: 10px;
}
.aside .el-card h1 {
  text-align: center;
  padding-bottom: 10px;
  font-size: 30px;
  border-bottom: 1px solid black;
}
.intro {
  text-align: center;
  font-size: 30px;
}
h2 {
  font-size: 20px;
  display: inline;
}
a {
  text-decoration: none;
  font-size: 18px;
  color: rgb(120, 182, 248);
}
.hot {
  margin-top: 15px;
  padding-top: 0;
}
.hot div {
  border-bottom: 1px solid black;
}
.hot .el-tag {
  margin-top: 12px;
  cursor: pointer;
}
</style>