// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import Cube from 'cube-ui'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
import '@/common/fonts/iconfont.css'

Vue.use(Cube)
// import Toast from 'common/js/toast'  //自定义提示框

Vue.config.productionTip = false
// Vue.use(Toast);  //启用新的提示组件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})



/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

