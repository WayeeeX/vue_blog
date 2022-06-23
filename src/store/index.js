import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {

    //这里放全局参数
    token:'',
    userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
  },

  mutations: {
    SET_TOKEN: (state,token)=>{
        state.token = token
        localStorage.setItem('token',token)
    },
    SET_USERINFO: (state,userInfo)=>{
        state.userInfo = userInfo
        sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state)=>{
        localStorage.setItem('token','')
        sessionStorage.setItem('userInfo',JSON.stringify(''))
        state.userInfo={}
    }
    //这里是set方法

  },

 getters: {        //这里是get方法,并且每次打开浏览器优先执行该方法，获取所有的状态   },
    getUser: state =>{
        return state.userInfo
    }
},
  actions: {

    // 处理state的方法体

  },

  modules: {

//这里是我自己理解的是为了给全局变量分组，所以需要写提前声明其他store文件，然后引入这里

  }

})