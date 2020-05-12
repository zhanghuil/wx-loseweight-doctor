import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: resolve => require(['@/components/index'], resolve),
			meta: {
				title: '患者'
			}
		},
		{
			path: '/search',
			name: 'search',
			component: resolve => require(['@/components/search'], resolve),
			meta: {
				title: '患者'
			}
		},
		{
			path: '/doctorCard',
			name: 'doctorCard',
			component: resolve => require(['@/components/doctorCard'], resolve),
			meta: {
				title: '医师名片'
			}
		},
		{
			path: '/login',
			name: 'login',
			component: resolve => require(['@/components/login'], resolve),
			meta: {
				title: '医学减重医生平台'
			}
		},
		{
			path: '/forgetPwd',
			name: 'forgetPwd',
			component: resolve => require(['@/components/forgetPwd'], resolve),
			meta: {
				title: '忘记密码'
			}
		},
		{
			path: '/my',
			name: 'my',
			component: resolve => require(['@/components/my'], resolve),
			meta: {
				title: '我的'
			}
		},
		{
			path: '/myInfo',
			name: 'myInfo',
			component: resolve => require(['@/components/myInfo'], resolve),
			meta: {
				title: '我的信息'
			}
		},
	]
})
