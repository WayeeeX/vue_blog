<template>
  <el-container direction="vertical">
    <Header></Header>
    <div class="main">
      <div class="title">
        <h1>{{ blog.title }}</h1>
      </div>
      <div class="info">
        <img src="../assets/logo.png" alt="" />
        <div>
          <span>{{ blog.author.nickname }}</span>
          <span style="font-size: 10px; color: rgb(164, 163, 164)">{{
            blog.createDate +
            " 阅读 " +
            blog.viewCounts +
            " 评论 " +
            blog.commentCounts
          }}</span>
        </div>
      </div>
      <div class="content">
        <mavon-editor
          class="markdown"
          :value="blog.body.content"
          :subfield="false"
          :defaultOpen="prop.defaultOpen"
          :toolbarsFlag="prop.toolbarsFlag"
          :editable="prop.editable"
          :scrollStyle="prop.scrollStyle"
        ></mavon-editor>
      </div>
      <div><el-tag class="end">结束</el-tag></div>
      <span class="tag">标签：</span
      ><el-tag type="success" v-for="tag in blog.tags">{{ tag.tagname }}</el-tag
      ><br />
      <span class="category">分类：</span
      ><el-tag type="success">{{ blog.category.categoryname }}</el-tag>
      <div class="comment">
        <!-- 输入评论 -->
        <el-row :gutter="24">
          <el-col :span="2">
            <img
              src="../assets/logo.png"
              alt=""
              style="width: 42px; height: 42px"
          /></el-col>
          <el-col :span="22"
            ><el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="输入你的评论.."
              v-model="textarea1"
            >
            </el-input
          ></el-col>
        </el-row>
        <el-button type="success" @click="addComment(null)">评论</el-button>
        <!-- 已经评论 -->
        <div style="margin: 30px 0">{{ blog.commentCounts + " 条评论" }}</div>
        <div class="comments" v-for="(comment, index) in comments">
          <!-- 评论人信息 -->
          <div class="cAuthor">
            <img src="../assets/logo.png" alt="" />
            <div>
              <span>{{ comment.author.nickname }}</span>
              <span style="font-size: 10px; color: rgb(164, 163, 164)">{{
                1 + index + "楼 " + comment.createDate
              }}</span>
            </div>
          </div>
          <!-- 评论信息 -->
          <p class="body">{{ comment.content }}</p>
          <!-- 评论按钮 -->
          <div style="margin-bottom: 10px">
            <span style="color: #a6a6a6"
              ><i class="el-icon-s-comment"></i>评论</span
            >
          </div>
          <!-- 评论的评论 -->
          <div class="uComments">
            <div
              v-for="uComment in comment.childrens"
              style="border-bottom: 1px solid #f0f0f0; margin-bottom: 8px"
            >
              <!-- 上行 -->
              <div style="margin-bottom: 7px">
                <span style="color: #78b6f7; margin-right: 10px">{{
                  uComment.author.nickname + ":"
                }}</span
                >{{ uComment.content }}
              </div>
              <!-- 下行 -->
              <div style="color: #a6a6a6; font-size: 12px">
                <span>{{ uComment.createDate }}</span>
                <span><i class="el-icon-s-comment"></i>回复</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-container>
</template>
<script>
import 'github-markdown-css/github-markdown.css' // 然后添加样式markdown-body
import Header from "@/components/Header";
export default {
  name: "BlogDetail",
  data () {
    return {
      textarea1: '',
      blog: {
        id: null,
        author: {
          id: null,
          avatar: "",
          nickname: "",
        },
        body: {
          content: "",
        },
        category: {
          categoryname: "",
        },
        commentCounts: null,
        createDate: "",
        tags: [],
        title: "",
        viewCounts: ""
      },
      ownBlog: false,
      editor: {
        value: '',
        toolbarsFlag: false,
        subfield: false,
        defaultOpen: 'preview'
      },
      comments: [],
      commentForm: {
        article: {
          id: null
        },
        content: '',
        parent: {
          id: null
        },
      }
    }
  },
  computed: {
    prop () {
      let data = {
        subfield: false,// 单双栏模式
        defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
      return data
    }
  },
  methods: {
    getBlog () {

      let blogId = this.$route.params.blogId
      this.blog.id = blogId
      this.$axios.get('http://localhost:8889/articles/view/' + blogId).then((res) => {
        const data = res.data.data
        this.blog.author = data.author
        this.blog.body.content = data.body.content
        this.editor = data.body.content
        this.blog.category.categoryname = data.category.categoryname
        this.blog.commentCounts = data.commentCounts
        this.blog.createDate = data.createDate
        this.blog.tags = data.tags
        this.blog.title = data.title
        this.blog.viewCounts = data.viewCounts
      }),
        this.$axios.get('http://localhost:8889/comments/article/' + blogId).then((res) => {
          this.comments = res.data.data
          console.log(this.comments[0].author.nickname)
        })
    },
    addComment (thisId) {
      this.commentForm = {
        article: {
          id: this.blog.id
        },
        content: this.textarea1,
        parent: {
          id: thisId
        },
      }
      this.$axios.post('http://localhost:8889/comments/create/change',this.commentForm).then((res)=>{
        data = res.data.data
        console.log(res)
        
      })
    }
  },
  created () {
    this.getBlog()
  }
}
</script>


<style scoped>
.el-container {
  height: 100%;
}
.main {
  /* background-color: #fff; */
  margin: 50px 230px;
  /* padding: 30px; */
}
.title,
.info,
.end {
  display: flex;
  justify-content: center;
}
.end {
  width: 100%;
  height: 30px;
  margin-top: 30px;
}

.tag,
.category {
  display: inline-block;
  margin-top: 12px;
  padding: 2px;
  border-left: 4px solid rgb(197, 202, 195);
}
.info {
  /* vertical-align: middle; */
  margin: 30px 0;
}
.info img {
  width: 42px;
  height: 42px;
  margin-right: 8px;
}
.info span {
  display: block;
}
.comment {
  margin-top: 50px;
}
.comments {
  padding-top: 20px;
  padding-bottom: 15px;
  border-top: 1px solid rgb(240, 240, 240);
  border-bottom: 1px solid rgb(240, 240, 240);
}
.cAuthor {
  display: flex;
}
.cAuthor img {
  width: 42px;
  height: 42px;
  margin-right: 8px;
}
.cAuthor span {
  display: block;
}
.body {
  margin: 10px 0;
}
.uComments {
  border-left: 4px solid #c5cac3;
  padding-left: 16px;
}
</style>