<template>
  <el-container direction="vertical">
    <Header></Header>
    <el-main>
      <el-card :body-style="{ padding: '20px' }">
        <ul>
          <li class="box" v-for="item in category" @click="categoryDetail(item.id)">
            <div class="top">
              <img
                :src="
                  require('../assets/imgs/catagory/' +
                    item.avatar.split('/').slice(-1))
                "
                alt=""
              />
              <span>{{ item.categoryname }}</span>
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
      category: []
    }
  },
  methods: {
    getCategory () {
      this.$axios.get('http://106.52.174.244:8889/categorys/detail').then((res) => {
        this.category = res.data.data
        console.log(this.category)
      })
    },
    categoryDetail(id){
        this.$router.push({name:"CategoryDetail", params: { id: id }})
    }
  },
  created () {
    this.getCategory()
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

  float: left;
  display: inline;
  margin: 0;
  padding: 0;
  margin-right: 20px;
  margin-top: 20px;
  width: 286px;
  height: 228px;
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
    margin-top: 50px;
    justify-content: center;
}
</style>