<template>
  <el-main>
    <el-row :gutter="24">
      <el-col :span="16" :offset="0" :xs="24">
        <!-- 文章列表 -->
        <div class="article">
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
                    ><i class="el-icon-view"></i
                    >{{ blog.viewCounts }}&nbsp;&nbsp;<i
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
          <!--分页列表  -->
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
      <!-- 侧边栏 -->
      <el-col :span="7" :offset="1">
        <div class="aside hidden-xs-only">
          <el-card :body-style="{ padding: '15px' }" class="intro">
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
          <el-card
            class="hotTag"
            :body-style="{ padding: '15px', paddingTop: '5px' }"
          >
            <div slot="header">
              <h2>最热标签</h2>
              <a href="/tag" style="margin-left: 85px">查看全部</a>
            </div>
            <div class="tags">
              <el-tag
                v-for="item in items"
                :key="item.label"
                :type="item.type"
                effect="plain"
                @click="tagDetail(item.id)"
              >
                {{ item.tagname }}
              </el-tag>
            </div>
          </el-card>
          <hotArticleCard></hotArticleCard>
          <archivesCard></archivesCard></div
      ></el-col>
    </el-row>
  </el-main>
</template>
<script>
import hotArticleCard from '@/components/card/hotArticleCard'
import archivesCard from '@/components/card/archivesCard'
export default {

  data () {
    return {
      items: [

      ],
      effect: 'plain',
      blogs: [],
      currentPage: 1,
      pageSize: 5,
      total: 0
    }
  },
  methods: {
    page () {
      const _this = this
      this.$axios.get('http://106.52.174.244:8889/articles').then((res) => {
        console.log(res.data)
        this.blogs = res.data.data
        this.total = res.data.data.length
      })
      this.$axios.get('http://106.52.174.244:8889/tags/hot').then((res) => {
        this.items = res.data.data
      })
    },
    blogDetail (id) {
      this.$router.push({ name: 'BlogDetail', params: { blogId: id } })
    },
    tagDetail(id){
        this.$router.push({name:'TagDetail',params:{id:id}})
    },

  },
  mounted () {
    this.page();
  },
  components: {
    hotArticleCard,
    archivesCard,
  }
}
</script>
<style scoped>
/* .el-main {
  width: 1100px;
  margin: 20px auto;
} */

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
.hotTag {
  margin: 15px 0;
  padding-top: 0;
}
.hotTag div:nth-child(1) {
  display: flex;
  justify-content: space-between;
}
.tags{
    margin: 0 auto;
    width:240px;
    display: flex;
    flex-wrap: wrap;
}
/* .hotTag div {
  border-bottom: 1px solid black;
} */
.hotTag .el-tag {
  margin-top: 12px;
  cursor: pointer;
}
.title {
  cursor: pointer;
}
.title:hover {
  color: skyblue;
}
</style>