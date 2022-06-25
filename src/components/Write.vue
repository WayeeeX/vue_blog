<template>
  <div class="m-container">
    <Header></Header>
    <div class="m-content" style="padding: 20px">
      <el-form
        ref="editForm"
        status-icon
        :model="editForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-col :span="21">
            <el-input v-model="editForm.title"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input type="textarea" v-model="editForm.summary"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="editForm.content" />
        </el-form-item>
        <el-form-item label="分类" prop="content">
          <el-select
            v-model="editForm.category"
            value-key="id"
            placeholder="请选择文章分类"
          >
            <el-option
              v-for="c in categorys"
              :key="c.id"
              :label="c.categoryname"
              :value="c"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="content">
          <el-checkbox-group v-model="editForm.tags">
            <el-checkbox
              v-for="t in tags"
              :key="t.id"
              :label="t.id"
              name="tags"
              >{{ t.tagname }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">立即发表</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>


export default {
  name: "BlogEdit",
  data () {
    return {
      categorys: [],
      tags: [],
      editForm: {
        id: null,
        title: '',
        summary: '',
        content: '',
        category: '',
        tags: [],
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请输入摘要', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // const blogId = this.$route.params.blogId
    // const _this = this
    // if (blogId) {
    //   this.$axios.get('/blog/' + blogId).then((res) => {
    //     const blog = res.data.data
    //     _this.editForm.id = blog.id
    //     _this.editForm.title = blog.title
    //     _this.editForm.summary = blog.summary
    //     _this.editForm.content = blog.content
    //   });
    // }
    this.getCategoryAndTag()
  },
  methods: {
    submitForm () {
      const _this = this
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          let tags = this.editForm.tags.map(function (item) {
            return { id: item }
          })
          let editForm = {
            id: null,
            title: this.editForm.title,
            summary: this.editForm.summary,
            category: this.editForm.category,
            tags: tags,
            body: {
              content: this.editForm.content
            }

          }

          this.$axios.post('http://106.52.174.244:8889/articles/publish', editForm).then((res) => {
            _this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push("/")
              }
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    getCategoryAndTag () {
      this.$axios.get('http://106.52.174.244:8889/tags').then((res) => {
        this.tags = res.data.data
      })
      this.$axios.get('http://106.52.174.244:8889/categorys').then((res) => {
        this.categorys = res.data.data
      })
    }
  }
}
</script>