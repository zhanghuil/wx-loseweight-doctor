// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import Cube from 'cube-ui'
import App from './App'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import '@/common/fonts/iconfont.css'
import storage from './common/js/storage'

import md5 from 'js-md5';
import api from './request/api'
import { fetchPost, fetchPut, fetchGet, fetchDelete } from './request/http'
import qs from 'qs'
import './common/js/directive'

import vConsole from 'vconsole'
// Vue.prototype.$vConsole = new vConsole()

Vue.use(Cube)
// import Toast from 'common/js/toast'  //自定义提示框

Vue.config.productionTip = false
// Vue.use(Toast);  //启用新的提示组件
Vue.prototype.$md5 = md5
Vue.prototype.api = api
Vue.prototype.$fetchPost = fetchPost
Vue.prototype.$fetchPut = fetchPut
Vue.prototype.$fetchGet = fetchGet
Vue.prototype.$fetchDelete = fetchDelete
Vue.prototype.qs = qs

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})



/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}
	// next()
	if (to.matched.some(record => record.meta.requiresAuth)) {
		//这里判断用户是否登录，验证本地存储是否有token
		if (!storage.getItem('Token')) { // 判断当前的token是否存在
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
		} else {
			next()
		}
	}
	next() // 确保一定要调用 next()
})

