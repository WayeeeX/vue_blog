import router from "./router";
router.beforeEach((to,from,next) => {
   if(to.path!= "/write"){
    next()
   }else{
    const token = localStorage.getItem('token')
    if(token){
        next()
    }else{
        next({path:'/login'})
    }
   }
})