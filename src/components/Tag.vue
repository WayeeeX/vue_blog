<template>
  <el-container direction="vertical">
    <Header></Header>
    <el-main>
      <el-card :body-style="{ padding: '20px' }">
        <ul>
          <li class="box" v-for="item in tag" @click="tagDetail(item.id)">
            <div class="top">
              <img
                :src="
                  require('../assets/imgs/tag/' +
                    item.avatar.split('/').slice(-1))
                "
                alt=""
              />
              <span>{{ item.tagname }}</span>
            </div>
            <span class="count">{{ item.articles }}&nbsp;文章</span>
          </li>
        </ul>
      </el-card>
    </el-main>
    <Footer></Footer>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      tag: []
    }
  },
  methods: {
    getTag () {
      this.$axios.get('http://localhost:8889/tags/detail').then((res) => {
        this.tag = res.data.data
        console.log(this.tag)
      })
    },
    tagDetail(id){
        this.$router.push({name:'TagDetail',params:{id:id}})
    }
  },
  created () {
    this.getTag()
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
.box {
  /* float: left; */
  display: inline;
  margin: 0;
  padding: 0;
  margin-right: 20px;
  margin-top: 20px;
  width: 286px;
  height: 166px;
  border: 1px solid gray;
}

ul {
    display: flex;
    flex-wrap: wrap;
  padding: 0px;
  margin: 0px;
}
img {
  /* vertical-align: middle; */
  width: 77px;
  height: 77px;
  margin:10px 0;
}
.top {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.count {
    display: flex;
    color:gray;
    margin-top: 20px;
    justify-content: center;
}
</style>