<template>
  <el-container direction="vertical">
    <Header></Header>
    <!-- 分类信息 -->
    <el-card>
      <img
        :src="
          require('../assets/imgs/catagory/' +
            category.avatar.split('/').slice(-1))
        "
        alt=""
      />
      <h1>{{ category.categoryname }}</h1>
      <span>文章</span>
    </el-card>
    <!-- 分类文章列表 -->
    <!-- <el-timeline class="articleList" style="margin-top:20px">
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
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      category: {},
      blogs: [],
      page: {
        pageNumber: 1,
        pageSize: 5,
        categoryId: null
      }
    }
  },
  methods: {
    getCategory () {
      const id = this.$route.params.id
      this.page.categoryId = id
      this.$axios.get('http://localhost:8889/categorys/detail/' + this.page.categoryId).then((res) => {
        this.category = res.data.data
        this.getBlogs()
      })
    },
    getBlogs () {
      this.$axios.get('http://localhost:8889/articles', { params: this.page }).then((res) => {
        this.blogs = res.data.data
      })
    }, 
    blogDetail (id) {
      this.$router.push({ name: 'BlogDetail', params: { blogId: id } })
    },
  },
  created () {
    this.getCategory()
  },
}
</script>

<style scoped>
.el-container {
  width: 100%;
  /* height: 100%; */
}
.el-card {
  text-align: center;
}
.title {
  cursor: pointer;
}
.title:hover {
  color: skyblue;
}
</style>