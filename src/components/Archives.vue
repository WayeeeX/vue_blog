<template>
  <el-container direction="vertical">
    <Header></Header>
    <el-main>
      <!-- <el-card> -->
      <!-- 下拉菜单 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          归档菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            icon="el-icon-tickets"
            v-for="item in archives"
            @click.native="changeArchive(item.year, item.month)"
            >{{
              item.year + "年" + item.month + "月  (" + item.count + ")"
            }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 文章列表 -->
      <!-- <el-timeline>
        <el-timeline-item
          :timestamp="blog.createDate"
          placement="top"
          v-for="blog in blogs"
        >
          <el-card :body-style="{ paddingBottom: '5' }">
            <div class="top">
              <h2>{{ blog.title }}</h2>
              <span
                ><i class="el-icon-view"></i>{{ blog.viewCounts }}&nbsp;&nbsp;<i
                  class="el-icon-s-comment"
                ></i
                >{{ blog.commentCounts }}</span
              >
            </div>
            <p class="summary">{{ blog.summary }}</p>
            <div class="bottom">
              <span
                ><i class="el-icon-user-solid"></i
                >{{ blog.author.nickname }}</span
              >
              <div>
                <el-tag v-for="tag in blog.tags" size="small">{{
                  tag.tagname
                }}</el-tag>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline> -->
      <el-timeline>
        <el-timeline-item
          v-bind:timestamp="blog.createDate"
          placement="top"
          v-for="blog in blogs"
        >
          <el-card :body-style="{ paddingBottom: '5' }">
            <div class="top">
              <h2 class="title" @click="blogDetail(blog.id)">
                {{ blog.title }}
              </h2>
              <span
                ><i class="el-icon-view"></i>{{ blog.viewCounts }}&nbsp;&nbsp;<i
                  class="el-icon-s-comment"
                ></i
                >{{ blog.commentCounts }}</span
              >
            </div>
            <p class="summary">{{ blog.summary }}</p>
            <div class="bottom">
              <span
                ><i class="el-icon-user-solid"></i
                >{{ blog.author.nickname }}</span
              >
              <div>
                <el-tag v-for="tag in blog.tags" size="small">{{
                  tag.tagname
                }}</el-tag>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <!-- </el-card> -->
    </el-main>
    <Footer></Footer>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      blogs: [],
      archives: [],
      page: {
        pageNumber: 1,
        pageSize: 5,
        year: null,
        month: null
      }
    }
  },
  methods: {
    getArchives () {
      this.$axios.get('http://localhost:8889/articles/listArchives').then((res) => {
        this.archives = res.data.data
      })
    },
    getBlogs () {
      this.$axios.get('http://localhost:8889/articles', { params: this.page }).then((res) => {
        this.blogs = res.data.data
      })
    },
    changeArchive (year, month) {
      this.page.year = year
      this.page.month = month
      this.getBlogs()
    },
    blogDetail (id) {
      this.$router.push({ name: 'BlogDetail', params: { blogId: id } })
    },
  },
  created () {
    if (this.$route.params.year && this.$route.params.month) {
      this.page.year = this.$route.params.year
      this.page.month = this.$route.params.month
    }
    this.getBlogs()
    this.getArchives()
  },
}
</script>

<style scoped>
.el-container {
  width: 100%;
  height: 100%;
}
/* .el-card {
} */
.el-main {
  margin: 0 50px;
}
.el-dropdown {
  margin-bottom: 15px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.title {
  cursor: pointer;
}
.title:hover {
  color: skyblue;
}
.top {
  display: flex;
  justify-content: space-between;
}
.summary {
  margin: 5px 0;
}
.bottom {
  display: flex;
  justify-content: space-between;
}
</style>